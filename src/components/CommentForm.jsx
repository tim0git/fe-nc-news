import React, { Component } from "react";

export default class CommentForm extends Component {
  state = {
    comment: "",
  };

  onChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    const comment = this.state.comment;
    this.props.postComment(comment);
    this.setState({
      comment: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onHandleSubmit}>
        <label>
          <input
            onChange={this.onChange}
            type="text"
            name="Comment"
            id="comment"
            value={this.state.comment}
            placeholder="Write your comment here..."
          />
        </label>
        <button>Submit</button>
        <button type="reset">Clear</button>
      </form>
    );
  }
}
