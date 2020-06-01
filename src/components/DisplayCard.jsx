import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api/api";
import VoteButtons from "./VoteButtons";
import moment from "moment";
import ErrorAlert from "./ErrorAlert";

export default class ArticleCard extends Component {
  state = {
    currentVote: 0,
    err: "",
  };

  updateVote = (value, id, location) => {
    this.setState((currentState) => {
      return {
        currentVote: currentState.currentVote + value,
      };
    });
    api.patchVote(id, value, location).catch((err) => {
      this.setState({ err: err.response.data.message });
    });
  };

  render() {
    const {
      article_id,
      title,
      body,
      votes,
      topic,
      author,
      created_at,
      comment_id,
      deleteComment,
      user,
    } = this.props;
    if (this.state.err) return <ErrorAlert err={this.state.err} />;

    return (
      <article className="articleCard">
        {comment_id ? (
          <h4>{title}</h4>
        ) : (
          <Link className="articleTitle" to={`/article/${article_id}`}>{title}</Link>
        )}
        {comment_id && <p className="commentBody">{body}</p>}
        <p className="alignLeft">Votes: {votes + this.state.currentVote}</p>
        {!comment_id && <p className="alignLeft">Topic: {topic}</p>}
        <p className="alignLeft">Author: {author}</p>
        <p className="alignLeft">
          Created: {moment(created_at).format("MMMM Do YYYY")}
        </p>
        <VoteButtons
          {...this.props}
          updateVote={this.updateVote}
          currentVote={this.state.currentVote}
        />
        {comment_id && user === author && (
          <button
            className="fas fa-trash-alt fa-1x deleteButton"
            onClick={(e) => deleteComment(e, comment_id, author)}
          >
            Delete
          </button>
        )}
      </article>
    );
  }
}
