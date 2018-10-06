import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "../component/Main";
import uthURuser from "../component/uthURuser";
import homeRoute from "../component/homeRoute";
import Signup from "../component/register/Signup";
import Login from "../component/register/Login";
import Error from "../component/Error.js";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={homeRoute} exact />
            <Route path="/t/:username" component={Main} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/Login" component={Login} exact />
            <Route path="/u" component={uthURuser} exact />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
