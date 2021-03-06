import React, { Component } from "react";
import ErrorAlert from "./ErrorAlert";

export default class CommentForm extends Component {
  state = {
    comment: "",
    err: "",
  };

  onChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    const comment = this.state.comment;
    if (comment.length < 15) {
      this.setState({ err: "comments must be at least 15 characters long" });
    } else {
      this.props.postComment(comment);
      this.setState({
        comment: "",
      });
    }
  };

  clearForm = (e) => {
    e.preventDefault();
    this.setState({ comment: "" });
  };

  render() {
    const { err, comment } = this.state;
    if (err) return <ErrorAlert err={err} />;
    return (
      <form onSubmit={this.onHandleSubmit} className="commentFormContainer">
        <label className="inputCommentContainer">
          <input
            className="commentInput"
            onChange={this.onChange}
            type="text"
            name="Comment"
            id="comment"
            value={comment}
            placeholder="Write your comment here..."
          />
        </label>
        <button className="commentSubmitButton">Submit</button>
        <button
          className="commentResetButton"
          onClick={(e) => this.clearForm(e)}
          type="reset"
        >
          Clear
        </button>
      </form>
    );
  }
}
