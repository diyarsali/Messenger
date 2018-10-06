const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Message = require("../models/message");
const Friend = require("../models/friend");

router.get("/getPeople", (req, res) => {
  let userAuth = req.user.username;
  Friend.find({ friends: userAuth }, { _id: 0 }, (err, users) => {
    if (users) {
      let userFriended = [];
      for (let i = 0; i < users.length; i++) {
        userFriended.push(users[i].user);
      }
      User.find(
        { username: { $ne: userAuth, $nin: userFriended } },
        { _id: 0, name: 1, username: 1 },
        (err, user) => {
          res.send(user);
        }
      );
    } else {
      User.find(
        { username: { $ne: userAuth } },
        { _id: 0, name: 1, username: 1 },
        (err, user) => {
          res.send(user);
        }
      );
    }
  });
});

// send friend list
router.get("/friends", (req, res) => {
  let userAuth = req.user.username;
  Friend.findOne({ user: userAuth }, { _id: 0, friends: 1 }, (err, friends) => {
    User.find(
      {
        username: { $ne: userAuth },
        username: friends.friends
      },
      { _id: 0, name: 1, username: 1 },
      (err, user) => {
        res.send(user);
      }
    );
  });
});
// when user type user that not friend with user
router.post("/findUserINURL", (req, res) => {
  let Params = req.body.receiverUsername;
  let authUser = req.user.username;
  Friend.findOne({ friends: Params, user: authUser }, (err, friends) => {
    if (friends) {
      res.send(false);
      console.log(friends.friends);
    } else {
      res.send(true);
    }
  });
});

// send request to people
router.post("/requestUser", (req, res) => {
  // let userAuth = "balen";
  ReqeustAvailable = true;
  let requestUser = req.user.username;
  let ActualUser = req.body.requestUser;
  Friend.findOne({ user: ActualUser }, (err, user) => {
    if (user) {
      for (let i = 0; i < user.request.length; i++) {
        if (user.request[i] == requestUser) {
          console.log("ReqeustAvailable");
          ReqeustAvailable = false;
          return;
        }
      }
      if (ReqeustAvailable) {
        Friend.update(
          { user: ActualUser, friends: { $ne: requestUser } },
          { $push: { request: requestUser } },
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("request sent");
            return;
          }
        );
      }
    } else {
      let newFriend = new Friend();
      newFriend.user = ActualUser;
      newFriend.request = requestUser;
      newFriend.save(err => {
        if (err) {
          console.log("Error saving Message into mongo");
          return;
        }
        res.send(true);
      });
    }
  });
});

// get ALl Request friend
router.get("/getAllRequest", (req, res) => {
  let userAuth = req.user.username;
  Friend.find(
    { user: userAuth },
    { _id: 0, request: 1 },
    (err, requestFriend) => {
      res.send(requestFriend);
    }
  );
});

// consfirm request
router.post("/ConfirmFriend", (req, res) => {
  confirmName = req.body.confirmName;
  ActualUser = req.user.username;
  Friend.findOne({ user: ActualUser }, (err, user) => {
    for (let i = 0; i < user.request.length; i++) {
      if (user.request[i] == confirmName) {
        Friend.update(
          { user: ActualUser, friends: { $ne: confirmName } },
          {
            $pull: { request: confirmName },
            $push: { friends: confirmName }
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("consfirm user" + confirmName);
            return;
          }
        );
      }
    }
  });
});

// get ALl Friends List
router.get("/getAllFriends", (req, res) => {
  let userAuth = req.user.username;
  Friend.find(
    { user: userAuth },
    { _id: 0, friends: 1 },
    (err, requestFriend) => {
      res.send(requestFriend);
    }
  );
});

//remove Friend post
router.post("/RemoveFriend", (req, res) => {
  friend = req.body.friend;
  ActualUser = req.user.username;
  ReqeustAvailable = true;
  Friend.findOne({ user: ActualUser }, (err, user) => {
    for (let i = 0; i < user.friends.length; i++) {
      if (user.friends[i] == friend) {
        Friend.update(
          { user: ActualUser },
          {
            $pull: { friends: friend }
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("friend user is removed");
            return;
          }
        );
      }
    }
  });
});

module.exports = router;
