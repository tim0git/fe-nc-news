import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Router } from "@reach/router";
import TopicsList from "./components/TopicsList";
import ArticlesList from "./components/ArticlesList";
import ArticleCardById from "./components/ArticleCardById";

export default class App extends Component {
  state = {
    user: "jessjelly",
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar />
        <Router>
          <TopicsList path="/topics" />
          <TopicsList path="/topics/:topic" />
          <ArticlesList path="/" />
          <ArticleCardById path="/article/:article_id" user={this.state.user} />
        </Router>
      </div>
    );
  }
}
