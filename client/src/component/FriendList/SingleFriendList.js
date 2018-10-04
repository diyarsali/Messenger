import React from "react";
import SingleFriend from "./SingleFriend";
import SingleUser from "./SingleUser";
import "../css/SingleFriend.css";

const SingleFriendList = props => {
  let messages = props.message;
  let users = props.users;

  const usersComponent = users.map((user, i) => {
    for (let j = 0; j < messages.length; j++) {
      if (
        messages[j].senderUsername === users[i].username ||
        messages[j].receiverUsername === users[i].username
      ) {
        return (
          <SingleFriend
            key={i}
            username={users[i].username}
            isReceiverUsername={
              messages[j].receiverUsername === users[i].username
            }
            message={messages[j].message}
          />
        );
      } //end of if message
    } // end of for message

    return <SingleUser key={i} username={users[i].username} />;
  }); //end of users map

  return <React.Fragment>{usersComponent}</React.Fragment>;
};

export default SingleFriendList;
