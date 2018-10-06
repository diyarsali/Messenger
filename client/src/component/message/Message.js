import React, { Component } from "react";
import MessageList from "./MessageList";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "../css/message.css";
import { Redirect } from "react-router-dom";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextField: "",
      message: [],
      senderUsername: "",
      noUserFound: false
    };
  }

  SendM(e) {
    e.preventDefault();
    if (this.state.TextField === "") {
      return;
    }
    axios
      .post("/message/send", {
        message: this.state.TextField,
        receiverUsername: this.props.usernameSelected
      })
      .then(res => {
        this.setState({ TextField: "" });
      })
      .catch(err => {
        console.log(err);
      });

    // render new message  when send a message
    axios
      .post("/message/latestMessage", {
        receiverUsername: this.props.usernameSelected
      })
      .then(res => {
        this.setState({ message: this.state.message.concat(res.data) });
      });
  }

  componentWillReceiveProps(nextPrps) {
    axios
      .post("/message/getMessage", {
        receiverUsername: nextPrps.usernameSelected
      })
      .then(res => {
        this.setState({
          message: res.data
        });
      });
  }

  componentWillMount() {
    axios.get("/message/getUsername").then(res => {
      this.setState({ senderUsername: res.data });
    });
    axios
      .post("/message/getMessage", {
        receiverUsername: this.props.usernameSelected
      })
      .then(res => {
        this.setState({
          message: res.data
        });
      });
    axios
      .post("/friend/findUserINURL", {
        receiverUsername: this.props.usernameSelected
      })
      .then(res => {
        this.setState({
          noUserFound: res.data
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.noUserFound ? (
          <div className="message-wraper">
            <div className="message-header">{this.props.usernameSelected}</div>
            <div className="message-box">
              <div className="chat-box">
                <MessageList
                  message={this.state.message}
                  senderUsername={this.state.senderUsername}
                />
              </div>
              <form onSubmit={e => this.SendM(e)}>
                <div className="input-box">
                  <TextField
                    onChange={obj =>
                      this.setState({ TextField: obj.target.value })
                    }
                    value={this.state.TextField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Type a message"
                    fullWidth
                    margin="normal"
                    type="name"
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Redirect to="/u" />
        )}
      </React.Fragment>
    );
  }
}

export default Message;
