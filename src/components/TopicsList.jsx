import React, { Component } from "react";
import TopicCard from "./TopicCard";
import axios from "axios";
import ArticlesList from "./ArticlesList";
import ErrorAlert from "./ErrorAlert";

export default class TopicsList extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: "",
  };

  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    const { err, isLoading, topics } = this.state;
    if (isLoading) return <h3>Loading...</h3>;
    if (err) return <ErrorAlert err={err} />;
    return (
      <>
        <section>
          <ul
            className={
              this.props.topic ? "topicListContainerMin" : "topicListContainer"
            }
          >
            {topics.map((topic, index) => {
              return (
                <TopicCard
                  index={index}
                  key={topic.slug}
                  {...topic}
                  style={this.props.topic ? true : false}
                />
              );
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
      })
      .catch((err) => {
        this.setState({ err: err.response.data.message, isLoading: false });
      });
  };
}
