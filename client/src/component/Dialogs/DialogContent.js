import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";
import "../css/addpeople.css";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  button: {
    margin: theme.spacing.unit
  },
  backgroundColor: {
    backgroundColor: "green"
  }
});

class FullWidthTabs extends React.Component {
  render() {
    const { classes, theme } = this.props;
    let Users = this.props.Users;

    const usersComponent = Users.map((user, i) => {
      return (
        <div key={i} className="addpeople wrapper">
          <div className="add User-box">
            <div className="people  Title"> {Users[i].username}</div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.props.addPeopleHandler(Users[i].username, i)}
            >
              ADD
            </Button>
          </div>
        </div>
      );
    });

    let requestUser = this.props.requestUser;
    let requestComponent = "";
    if (requestUser.length !== 0) {
      requestComponent = requestUser[0].request.map((user, i) => {
        return (
          <div key={i} className="Friends wrapper">
            <div className="FriendRequest User-box">
              <div className="FriendName Title">
                {requestUser[0].request[i]}{" "}
              </div>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() =>
                  this.props.ConfirmFriendHandler(requestUser[0].request[i], i)
                }
              >
                Confirm
              </Button>
            </div>
          </div>
        );
      });
    }
    let friendsUser = this.props.friendsUser;
    let friendComponent = "";
    if (friendsUser.length !== 0) {
      friendComponent = friendsUser[0].friends.map((user, i) => {
        return (
          <div key={i} className="MyFriends wrapper">
            <div className="Remove User-box">
              <div className="FriendName  Title"> {user}</div>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => this.props.RemoveFriendHandler(user, i)}
              >
                Remove
              </Button>
            </div>
          </div>
        );
      });
    }
    return (
      <DialogContent>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.props.value}
          onChangeIndex={this.props.handleChangeIndex}
        >
          <DialogContentText>{usersComponent}</DialogContentText>
          <DialogContentText> {requestComponent} </DialogContentText>
          <DialogContentText>{friendComponent}</DialogContentText>
        </SwipeableViews>
      </DialogContent>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
