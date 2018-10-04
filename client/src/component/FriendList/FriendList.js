import React, { Component } from "react";
import SearchFriend from "./SearchFriend";
import SingleFriendList from "./SingleFriendList";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Btn from "../Btn";
import "../css/FriendList.css";
import Add from "../Dialogs/Demo";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      users: [],
      message: [],
      inputValue: ""
    };
  }

  componentWillMount() {
    axios.get("/users").then(res => {
      this.setState({ users: res.data });
    });
    axios.get("/message/getLatestMessage").then(res => {
      this.setState({ message: res.data });
    });
  }

  logout(e) {
    e.preventDefault();
    axios
      .get("/users/logout")
      .then(res => {
        this.setState({ logout: true });
      })
      .catch(err => {
        console.log("Error making post request");
      });
  }

  SearchFirends = event => {
    this.setState({ inputValue: event.target.value }, () => {
      let inputValue = this.state.inputValue;
      if (inputValue === "") {
        axios.get("/users").then(res => {
          this.setState({ users: res.data });
          console.log(inputValue);
        });
      } else {
        axios
          .post("/users/getUsers", {
            username: inputValue,
            name: inputValue
          })
          .then(res => {
            this.setState({ users: res.data });
          });
      }
    });
  };

  render() {
    return (
      <div className="FriendList-wrapr">
        <div className="FriendList-header">
          <Add />
          <span>Friends</span>
          <Btn ButtonTitle="Logout" onSubmit={e => this.logout(e)} />
        </div>
        <div className="FriendList-container">
          <SearchFriend SearchFirends={this.SearchFirends} />
          <SingleFriendList
            users={this.state.users}
            message={this.state.message}
          />
        </div>
        {this.state.logout ? <Redirect to="/Login" /> : ""}
      </div>
    );
  }
}

export default FriendList;
