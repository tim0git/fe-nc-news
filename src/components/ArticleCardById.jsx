import React, { Component } from "react";
import DisplayCard from "./DisplayCard";
import * as api from "../api/api";
import CommentForm from "./CommentForm";
import moment from "moment";
import ErrorAlert from "./ErrorAlert";

export default class ArticleCardById extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    isSent: false,
    err: "",
  };

  componentDidMount() {
    this.fetchArticleById();
  }

  deleteComment = (e, comment_id, author) => {
    this.setState((currentState) => {
      return {
        comments: currentState.comments.filter((comment) => {
          return comment.comment_id !== comment_id;
        }),
      };
    });
    api.removeComment(comment_id).catch((err) => {
      this.setState({ err: err.response.data.message, isLoading: false });
    });
  };

  postComment = (comment) => {
    const { article_id, user } = this.props;
    const messageBody = { username: user, body: comment };
    api
      .postCommentById(messageBody, article_id)
      .then((res) => {
        console.dir(res);
        this.setState((currentState) => {
          return {
            comments: [res.comment, ...currentState.comments],
          };
        });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.message, isLoading: false });
      });
  }; // route tested

  fetchArticleById() {
    const { article_id } = this.props;
    const arrayPromises = [
      api.getArticleById(article_id),
      api.getCommentsByArticleId(article_id),
    ];
    Promise.all(arrayPromises)
      .then(([article, comments]) => {
        this.setState({ article, comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.message, isLoading: false });
      });
  }

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
    if (this.state.isLoading) return <h3>Loading...</h3>;
    if (this.state.err) return <ErrorAlert err={this.state.err} />;
    return (
      <>
        <article className="articleCard">
          <h2>{title}</h2>
          {this.props.article_id && <p className="articleBody">{body}</p>}
          <p className="alignLeft">Votes: {votes}</p>
          <p className="alignLeft">Topic: {topic}</p>
          <p className="alignLeft">Author: {author}</p>
          <p className="alignLeft">
            Created: {moment(created_at).format("MMMM Do YYYY")}
          </p>
          <p className="alignLeft">Comments: {comment_count}</p>
        </article>
        {this.props.user ? (
          <CommentForm postComment={this.postComment} />
        ) : (
          <h4>Login to comment...</h4>
        )}
        {this.state.comments.map((comment) => {
          return (
            <DisplayCard
              key={comment.comment_id}
              {...comment}
              deleteComment={this.deleteComment}
              user={this.props.user}
            />
          );
        })}
      </>
    );
  }
}
