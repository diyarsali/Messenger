const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Passport = require("passport");
const Message = require("../models/message");
const Friend = require("../models/friend");
// SIGNUP
router.post("/signup", (req, res) => {
  let data = req.body;
  let usernameAvailable = true;
  User.find({}, "username", (err, user) => {
    if (err) {
      console.log("Failed getting user in signin");
      return;
    }
    for (let i = 0; i < user.length; i++) {
      if (user[i].username == data.username) {
        usernameAvailable = false;
        console.log("avialable username");
        return false;
      }
    }
  });

  setTimeout(() => {
    if (usernameAvailable) {
      let newUser = new User();
      newUser.name = data.name;
      newUser.username = data.username;
      newUser.password = data.password;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log("Failed generating salt bcrypt");
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save(err => {
            if (err) {
              console.log("Error saving user into mongo");
              return;
            }
            res.send({ userRegistered: true, usedUsername: false });
          });
        });
      });
    } else {
      res.send({ userRegistered: false, usedUsername: true });
    }
  }, 100);
});

//Login Post
router.post("/login", Passport.authenticate("local"), (req, res, next) => {
  // let SelfUser = req.user.username;
  // Message.findOne(
  //   { $or: [{ senderUsername: SelfUser }, { receiverUsername: SelfUser }] },
  //   { _id: 0, date: 0, message: 0 },
  //   (err, user) => {
  //     if (user) {
  //       if (user.senderUsername !== SelfUser) {
  //         res.send({ login: true, newestUser: user.senderUsername });
  //       } else {
  //         res.send({ login: true, newestUser: user.receiverUsername });
  //       }
  //     } else {
  //       res.send(Math.random());
  //     }
  //   }
  // ).sort({ date: -1 });
  res.send({ login: true });
});

//logout post
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout");
});

// // send userRegistered
// router.get("/", (req, res) => {
//   let userAuth = req.user.username;
//   Friend.findOne({ user: userAuth }, { _id: 0, friends: 1 }, (err, friends) => {
//     if (friends) {
//       User.find(
//         { username: { $ne: userAuth, $nin: friends.friends } },
//         { _id: 0, name: 1, username: 1 },
//         (err, user) => {
//           res.send(user);
//         }
//       );
//     }
//     User.find(
//       { username: { $ne: userAuth } },
//       { _id: 0, name: 1, username: 1 },
//       (err, user) => {
//         res.send(user);
//       }
//     );
//   });
// });

// send userRegistered
router.get("/", (req, res) => {
  let userAuth = req.user.username;
  User.find(
    { username: { $ne: userAuth } },
    { _id: 0, name: 1, username: 1 },
    (err, user) => {
      res.send(user);
    }
  );
});

// get users by search
router.post("/getUsers", (req, res) => {
  let user = req.body;
  let userAuth = req.user.username;
  User.find(
    {
      username: { $ne: userAuth },
      $or: [
        { username: { $regex: user.username } },
        { name: { $regex: user.name } }
      ]
    },
    {
      _id: 0,
      name: 1,
      username: 1
    },
    (err, user) => {
      res.send(user);
    }
  );
});

// test route for ensuer user is login
router.get("/ensureAuthenticated", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send({ ensureAuthenticated: true, Loading: false });
    return next();
  } else {
    res.send({ ensureAuthenticated: false });
  }
});

// // check if user Authenticate
// function ensureAuthenticated(req,res,next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   else{
//     res.send("user not  Authenticated");
//   }
// }

module.exports = router;
