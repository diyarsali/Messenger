const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Message = require("../models/message");
const Friend = require("../models/friend");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

//save messages
router.post("/send", (req, res) => {
  let message = req.body.message;
  let receiverUsername = req.body.receiverUsername;
  const encryptedMessage = cryptr.encrypt(message);
  let newMessage = new Message();
  senderUsername = req.user.username;
  newMessage.senderUsername = senderUsername;
  newMessage.receiverUsername = receiverUsername;
  newMessage.message = encryptedMessage;
  newMessage.save(err => {
    if (err) {
      console.log("Error saving Message into mongo");
      return;
    }
    res.send(true);
  });
});

router.post("/latestMessage", (req, res) => {
  let Params = req.body.receiverUsername;
  let SelfUser = req.user.username;
  // let SelfUser = ;
  Message.find(
    {
      $or: [
        { senderUsername: SelfUser, receiverUsername: Params },
        { senderUsername: Params, receiverUsername: SelfUser }
      ]
    },
    (err, message) => {
      if (err) {
        console.log("faile getting message from db");
      }
      let messageArray = message;
      for (let i = 0; i < messageArray.length; i++) {
        messageArray[i].message = cryptr.decrypt(messageArray[i].message);
      }
      res.send(messageArray);
    }
  )
    .sort({ date: -1 })
    .limit(1);
});

router.post("/getMessage", (req, res) => {
  let Params = req.body.receiverUsername;
  let SelfUser = req.user.username;
  Message.find(
    {
      $or: [
        { senderUsername: SelfUser, receiverUsername: Params },
        { senderUsername: Params, receiverUsername: SelfUser }
      ]
    },
    (err, message) => {
      if (err) {
        console.log("faile getting message from db");
      }

      let messageArray = message;
      if (messageArray.length != 0) {
        for (let i = 0; i < messageArray.length; i++) {
          messageArray[i].message = cryptr.decrypt(messageArray[i].message);
        }
      }
      res.send(messageArray);
    }
  );
});

//get user Login
router.get("/getUsername", (req, res) => {
  let senderUsername = req.user.username;
  res.send(senderUsername);
});

router.get("/getLatestMessage", (req, res) => {
  let SelfUser = req.user.username;
  Message.find(
    { $or: [{ senderUsername: SelfUser }, { receiverUsername: SelfUser }] },
    { _id: 0, date: 0 },
    (err, messages) => {
      let messageArray = messages;
      for (let i = 0; i < messageArray.length; i++) {
        messageArray[i].message = cryptr.decrypt(messageArray[i].message);
      }
      res.send(messageArray);
    }
  ).sort({ date: -1 });
});

//get newest friend username fro opnening Messanger
router.get("/newestUsername", (req, res) => {
  if (req.user) {
    let SelfUser = req.user.username;
    Message.findOne(
      { $or: [{ senderUsername: SelfUser }, { receiverUsername: SelfUser }] },
      { _id: 0, date: 0, message: 0 },
      (err, user) => {
        if (user.senderUsername !== SelfUser) {
          res.send(user.senderUsername);
        } else {
          res.send(user.receiverUsername);
        }
      }
    ).sort({ date: -1 });
  } else {
    res.send("");
  }
});

module.exports = router;
