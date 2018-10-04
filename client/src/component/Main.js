import React, { Component, Fragment } from 'react';
import Message from './message/Message';
import FriendList from './FriendList/FriendList';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      Loading: true,
      senderUsername: ''
    };
  }

  componentDidMount() {
    axios.get('/users/ensureAuthenticated').then(res => {
      this.setState({
        isAuthenticated: res.data.ensureAuthenticated,
        Loading: res.data.Loading
      });
    });
  }

  render() {
    if (this.state.Loading) {
      return <div> Loading</div>;
    } else {
      return (
        <Fragment>
          {this.state.isAuthenticated ? (
            <div className="flex-main">
              <FriendList
                usernameSelected={this.props.match.params.username}
              />
              <Message
                usernameSelected={this.props.match.params.username}
              />
            </div>
          ) : (
            <Redirect to="/Login" />
          )}
        </Fragment>
      );
    }
  }
}

export default Main;
