import React, { Component, Fragment } from "react";
import Message from "./message/Message";
import FriendList from "./FriendList/FriendList";
import { Redirect } from "react-router-dom";
import axios from "axios";

class homeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      Loading: true,
      newestUsername: "diyar"
    };
  }

  componentWillMount() {
    axios.get("/users/ensureAuthenticated").then(res => {
      this.setState(
        {
          isAuthenticated: res.data.ensureAuthenticated,
          Loading: res.data.Loading
        },
        () => {
          axios.get("/message/newestUsername").then(res => {
            this.setState({
              newestUsername: res.data
            });
          });
        }
      );
    });
    console.log("componentWillMount");
  }

  render() {
    console.log(this.state.newestUsername);
    if (this.state.Loading) {
      return <div> Loading</div>;
    } else {
      return (
        <Fragment>
          {this.state.isAuthenticated ? (
            <Redirect to={"/t/" + this.state.newestUsername} />
          ) : (
            <Redirect to="/Login" />
          )}
        </Fragment>
      );
    }
  }
}

export default homeRoute;
