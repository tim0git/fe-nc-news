import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../api/api";
import CommentForm from "./CommentForm";
import moment from "moment";

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

  deleteComment = (e, comment_id, author) => {
    if (this.props.user === author) {
      api.removeComment(comment_id).then((res) => {
        this.setState((currentState) => {
          return {
            comments: currentState.comments.filter((comment) => {
              return comment.comment_id !== comment_id;
            }),
          };
        });
      });
    }
  };

  postComment = (comment) => {
    const user = this.props.user;
    const { article_id } = this.props;
    if (user) {
      const messageBody = { username: user, body: comment };
      console.log(messageBody);
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
          <h2>{title}</h2>
          {this.props.article_id && <p className="articleBody">{body}</p>}
          <p className="alignLeft" >Votes: {votes}</p>
          <p className="alignLeft" >Topic: {topic}</p>
          <p className="alignLeft" >Author: {author}</p>
          <p className="alignLeft" >Created: {moment(created_at).format("MMMM Do YYYY")}</p>
          <p className="alignLeft" >Comments: {comment_count}</p>
        </article>
        {this.props.user ? (
          <CommentForm postComment={this.postComment} />
        ) : (
          <h4>Login to comment...</h4>
        )}
        {this.state.comments.map((comment) => {
          return (
      
            <ArticleCard

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
