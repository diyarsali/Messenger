import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/SingleFriend.css';

const SingleFriend = props => {
  return (
    <React.Fragment>
      <div className="wraper">
        <div className="box">
          <NavLink to={'/t/' + props.username} className="SingleFriendLink ">
            <div className="friend-username">
              <span className="friend-title"> Username: </span>
              {props.username}
            </div>
          </NavLink>
          <div className="last-message">
            {props.isReceiverUsername ? (
              <span className="last-message-title"> you: </span>
            ) : (
              ''
            )}
            {props.message}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleFriend;
