import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "./Tab";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ContentTabs from "./DialogContent";

import PersonPinIcon from "@material-ui/icons/PersonPin";

const styles = theme => ({
  badge: {
    top: 0,
    right: -8,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

class ScrollDialog extends React.Component {
  state = {
    open: false,
    value: 0,
    users: [],
    requestUser: [],
    friendsUser: [],
    badgeSize: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {
    axios.get("/friend/getPeople").then(res => {
      this.setState({ users: res.data });
    });
    axios.get("/friend/getAllRequest").then(res => {
      this.setState({
        requestUser: res.data
      });
    });
    axios.get("/friend/getAllFriends").then(res => {
      this.setState({ friendsUser: res.data });
    });
  }

  addPeopleHandler = (requestUser, index) => {
    axios
      .post("/friend/requestUser", {
        requestUser: requestUser
      })
      .then(res => {});
    this.setState(this.state.users.splice(index, 1));
  };

  ConfirmFriendHandler = (confirmName, index) => {
    axios
      .post("/friend/ConfirmFriend", {
        confirmName: confirmName
      })
      .then(res => {});
    this.setState(this.state.requestUser[0].request.splice(index, 1));
  };
  RemoveFriendHandler = (friend, index) => {
    axios
      .post("/friend/RemoveFriend", {
        friend: friend
      })
      .then(res => {});
    this.setState(this.state.friendsUser[0].friends.splice(index, 1));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.requestUser.length > 1 ? (
          <Badge
            color="primary"
            badgeContent={this.state.requestUser[0].request.length}
            classes={{ badge: classes.badge }}
          >
            <Button onClick={() => this.setState({ open: true, badgeSize: 0 })}>
              <PersonPinIcon />
            </Button>
          </Badge>
        ) : (
          <Button onClick={() => this.setState({ open: true })}>
            <PersonPinIcon />
          </Button>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            <Tabs
              handleChange={this.handleChange}
              value={this.state.value}
              badgeSize={this.state.badgeSize}
            />
          </DialogTitle>

          <ContentTabs
            value={this.state.value}
            handleChangeIndex={this.handleChangeIndex}
            Users={this.state.users}
            requestUser={this.state.requestUser}
            friendsUser={this.state.friendsUser}
            addPeopleHandler={this.addPeopleHandler}
            RemoveFriendHandler={this.RemoveFriendHandler}
            ConfirmFriendHandler={this.ConfirmFriendHandler}
          />

          <DialogActions>
            <Button
              onClick={() => this.setState({ open: false })}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ScrollDialog.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ScrollDialog);
