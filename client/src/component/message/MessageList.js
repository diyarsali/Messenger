import React from "react";
import "../css/message.css";

const MessageList = props => {
  let sender = props.senderUsername;
  let chat = props.message;
  const chats = chat.map((m, i) => {
    return (
      <React.Fragment key={i}>
        {chat[i].senderUsername === sender ? (
          <div className="sender">
            <div className="chat-message">{chat[i].message}</div>
          </div>
        ) : (
          <div className="receiver">
            <div className="chat-message"> {chat[i].message}</div>
          </div>
        )}
      </React.Fragment>
    );
  });

  return <React.Fragment>{chats}</React.Fragment>;
};

export default MessageList;
