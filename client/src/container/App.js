import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "../component/Main";
import ifUserAuth from "../component/ifUserAuth";
import Signup from "../component/register/Signup";
import Login from "../component/register/Login";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ifUserAuth} exact />
            <Route path="/t/:username" component={Main} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/Login" component={Login} exact />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
