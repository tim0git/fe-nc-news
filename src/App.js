import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Router } from "@reach/router";
import TopicsList from "./components/TopicsList";
import ArticlesList from "./components/ArticlesList";
import DisplayCard from "./components/DisplayCard";
import LoginForm from "./components/LoginForm";

export default class App extends Component {
  state = {
    user: "",
  };

  loginUser = (username) => {
    this.setState({ user: username });
  };

  logOut = () => {
    this.setState({ user: "" });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar
          user={this.state.user.length > 0 ? false : true}
          logOut={this.logOut}
        />
        <Router>
          <TopicsList path="/topics" />
          <TopicsList path="/topics/:topic" />
          <ArticlesList path="/" />
          <DisplayCard path="/article/:article_id" user={this.state.user} />
          <LoginForm path="/login" loginUser={this.loginUser} />
        </Router>
      </div>
    );
  }
}
