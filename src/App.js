import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Component/Admin/Login/Login";
import Signup from "./Component/Admin/Signup/Signup";
import ProtectedRoute from "./Component/ProtectedRoute";
import ForgotPassword from "./Component/ForgetPassword/ForgetPassword";
import SetPassword from "./Component/ForgetPassword/SetPassword/SetPassword";
import HomePage from "./Component/HomePage/HomePage";
import NotFound from "./Component/NotFound/NotFound";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route exact path="/forget-password" component={ForgotPassword} />
          <Route exact path="/set-password" component={SetPassword} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    );
  }
}
