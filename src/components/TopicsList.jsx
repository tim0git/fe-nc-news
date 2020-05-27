import React, { Component } from "react";
import TopicCard from "./TopicCard";
import axios from "axios";
import ArticlesList from "./ArticlesList";

export default class TopicsList extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    if (this.state.isLoading) return <h3>Loading...</h3>;
    return (
      <>
        <section>
          <ul>
            {this.state.topics.map((topic) => {
              return <TopicCard key={topic.slug} {...topic} />;
            })}
          </ul>
        </section>
        {this.props.topic && <ArticlesList topic={this.props.topic} />}
      </>
    );
  }

  fetchTopics = () => {
    axios
      .get("https://be-nc-reddit-app.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({ topics: data.topics, isLoading: false });
      });
  };
}
