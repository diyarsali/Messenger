const mongoose = require("mongoose");

//message Schema

let FriendSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  friends: [
    {
      type: String
    }
  ],
  request: [
    {
      type: String
    }
  ]
});

const Friend = (module.exports = mongoose.model("Friend", FriendSchema));
