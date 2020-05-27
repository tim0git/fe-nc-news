import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../api/api";
import CommentForm from "./CommentForm";

export default class ArticleCardById extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    isSent: false,
  };

  componentDidMount() {
    this.fetchArticleById();
  }

  postComment = (comment) => {
    const user = this.props.user;
    const article_id = this.props.article_id;

    if (user) {
      const messageBody = { username: user, body: comment };
      api.postCommentById(messageBody, article_id).then((res) => {
        console.dir(res);
        this.setState((currentState) => {
          return {
            comments: [res.comment, ...currentState.comments],
          };
        });
      });
    }
  };

  render() {
    const {
      title,
      body,
      votes,
      topic,
      author,
      created_at,
      comment_count,
    } = this.state.article;

    if (this.isLoading) return <h3>Loading...</h3>;
    return (
      <>
        <article className="articleCard">
          <h1>{title}</h1>
          {this.props.article_id && <p>{body}</p>}
          <p>Votes: {votes}</p>
          <p>Topic: {topic}</p>
          <p>Author: {author}</p>
          <p>Created: {created_at}</p>
          <p>Comments: {comment_count}</p>
        </article>
        <CommentForm postComment={this.postComment} />
        {this.state.comments.map((comment) => {
          return <ArticleCard key={comment.comment_id} {...comment} />;
        })}
      </>
    );
  }

  fetchArticleById() {
    const { article_id } = this.props;
    const arrayPromises = [
      api.getArticleById(article_id),
      api.getCommentsByArticleId(article_id),
    ];

    Promise.all(arrayPromises).then(([article, comments]) => {
      this.setState({ article, comments });
    });
  }
}
