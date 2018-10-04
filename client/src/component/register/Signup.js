import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../css/signup.css";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      usedUsername: false,
      userRegistered: false
    };
  }

  register(e) {
    e.preventDefault();
    if (
      this.state.name === "" ||
      this.state.username === "" ||
      this.state.password === ""
    ) {
      return;
    }
    axios
      .post("/users/signup", {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.setState({
          usedUsername: res.data.usedUsername,
          userRegistered: res.data.userRegistered
        });
      })
      .catch(err => {
        console.log("Error making post request");
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="signup-wraper">
        <div className="signup-box">
          <div className="title-form">Register</div>
          <form onSubmit={e => this.register(e)}>
            <div className="register-from">
              <TextField
                label="Name"
                className={classes.textField}
                onChange={obj => this.setState({ name: obj.target.value })}
                margin="normal"
              />
              <TextField
                label="username"
                className={classes.textField}
                onChange={obj => this.setState({ username: obj.target.value })}
                margin="normal"
              />
              <TextField
                label="Password"
                className={classes.textField}
                onChange={obj => this.setState({ password: obj.target.value })}
                type="password"
                autoComplete="current-password"
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Signup
              </Button>
            </div>
          </form>
          {this.state.usedUsername ? (
            <div className="error-register">
              <p> username is available </p>
            </div>
          ) : (
            <p />
          )}
          <div className="Link-acount">
            <NavLink to="/Login">Login</NavLink>
          </div>
        </div>
        {this.state.userRegistered ? <Redirect to="/" /> : ""}
      </div>
    );
  }
}
Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
// export default Signup;
