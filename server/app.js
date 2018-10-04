const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/database");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const app = express();

// db connections
mongoose.connect(config.database);
let db = mongoose.connection;
// check mongoDB connections
db.once("open", function() {
  console.log("connecting to mongoBD");
});
//check for mongoDb error
db.on("error", err => {
  console.log(err);
});

// bodyparder midellware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
let User = require("./models/user");

// passport config
require("./config/passport")(passport);
// passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());
//global variable for logged in
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/user", (req, res) => {
  res.send(req.user);
});
// home route
app.get("/", (req, res) => {
  res.send("home");
});

let usersRoute = require("./routes/User.js");
let messageRoute = require("./routes/message.js");
let FriendRoute = require("./routes/Friends.js");

app.use("/users", usersRoute);
app.use("/message", messageRoute);
app.use("/friend", FriendRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
