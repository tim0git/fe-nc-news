import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api/api";
import VoteButtons from "./VoteButtons";
import moment from "moment";

export default class ArticleCard extends Component {
  state = {
    currentVote: 0,
  };

  updateVote = (value, id, location) => {
    this.setState((currentState) => {
      return {
        currentVote: currentState.currentVote + value,
      };
    });
    api.patchVote(id, value, location).then((res) => {
      console.dir(res);
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
    return (
      <article className="articleCard">
        {comment_id ? (
          <h4>{title}</h4>
        ) : (
          <Link to={`/article/${article_id}`}>{title}</Link>
        )}
        {comment_id && <p className="commentBody">{body}</p>}
        <p className="alignLeft" >Votes: {votes + this.state.currentVote}</p>
        <p className="alignLeft" >Topic: {topic}</p>
        <p className="alignLeft" >Author: {author}</p>
        <p className="alignLeft" >Created: {moment(Date(created_at)).format('MMMM Do YYYY')}</p>
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
