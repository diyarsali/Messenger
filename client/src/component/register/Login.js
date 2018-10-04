import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login: false,
      failedLoggingin: false,
      latestUserChated: ""
    };
  }

  login(e) {
    e.preventDefault();

    axios
      .post("/users/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.setState({
          login: res.data.login
          // latestUserChated: res.data.newestUser
        });
      })
      .catch(err => {
        this.setState({ failedLoggingin: true });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="signup-wraper">
        <div className="signup-box">
          <div className="title-form">Login</div>
          <form onSubmit={e => this.login(e)}>
            <div className="register-from">
              <TextField
                label="username"
                onChange={obj => this.setState({ username: obj.target.value })}
                className={classes.textField}
                value={this.state.username}
                margin="normal"
              />
              <TextField
                label="Password"
                onChange={obj => this.setState({ password: obj.target.value })}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                value={this.state.password}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Login
              </Button>
            </div>
          </form>
          {this.state.failedLoggingin ? (
            <div className="error-register">
              <p> Username and Password is incorrect</p>
            </div>
          ) : (
            <p />
          )}
          <div className="Link-acount">
            <NavLink to="/Signup">I dont have an account</NavLink>
          </div>
        </div>
        {this.state.login ? <Redirect to="/t/diyar" /> : ""}
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
// export default Login;
