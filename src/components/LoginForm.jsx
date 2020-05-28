import React, { Component } from "react";
import * as api from "../api/api";

export default class LoginForm extends Component {
  state = {
    username: "",
    invalidUser: false,
    err: "",
  };

  updateUserName = (e) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username } = this.state;
    const { loginUser, navigate } = this.props;
    api
      .getUserByUsername(username)
      .then((user) => {
        loginUser(user.username);
        navigate("/");
      })
      .catch((err) => {
        this.setState({ invalidUser: true });
      });
  }; // error handled

  render() {
    const { username } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
        {this.state.invalidUser ? (
          <h3 className="warning">
            Please enter a valid username Hint "jessjelly"
          </h3>
        ) : (
          <h3 className="loginHeader">Please Login!!</h3>
        )}

        <label className="loginTextContainer">
          <input
            className="inputLoginBox"
            type="text"
            onChange={this.updateUserName}
            value={username}
          />
        </label>
        <button className="loginSubmitButton">Submit</button>
      </form>
    );
  }
}
