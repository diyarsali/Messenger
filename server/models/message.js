const mongoose = require('mongoose');

//message Schema

let MessageSchema = mongoose.Schema({
  senderUsername: {
    type: String,
    required: true
  },
  receiverUsername: {
    type: String,
    required: true
  },
  message:{
    type:String,
    required:true
},
  date: { type: Date  , default: Date.now}
});

const Message = (module.exports = mongoose.model('Message', MessageSchema));
