import React, { Component } from "react";
import * as api from "../api/api";
//import axios from "axios";

export default class LoginForm extends Component {
  state = {
    username: "",
    invalidUser: false,
  };

  updateUserName = (e) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username } = this.state;
    api
      .getUserByUsername(username)
      .then((user) => {
        this.props.loginUser(user.username);
        this.props.navigate("/");
      })
      .catch((err) => {
        this.setState({ invalidUser: true });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
        {this.state.invalidUser ? (
          <h3 className="warning">Please enter a valid username</h3>
        ) : (
          <h3 className="loginHeader">Please Login!!</h3>
        )}

        <label className="loginTextContainer">
          <input
          className="inputLoginBox"
            type="text"
            onChange={this.updateUserName}
            value={this.state.username}
          />
        </label>
        <button className="loginSubmitButton">Submit</button>
      </form>
    );
  }
}
