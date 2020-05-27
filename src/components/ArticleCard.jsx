import React from "react";
import { Link } from "@reach/router";

export default function ArticleCard(props) {
  const {
    article_id,
    title,
    body,
    votes,
    topic,
    author,
    created_at,
  } = props;
  return (
    <article className="articleCard">
      {props.comment_id ? (
        <h4>{title}</h4>
      ) : (
        <Link to={`/article/${article_id}`}>{title}</Link>
      )}
      {props.comment_id && <p>{body}</p>}
      <p>Votes: {votes}</p>
      <p>Topic: {topic}</p>
      <p>Author: {author}</p>
      <p>Created: {created_at}</p>
    </article>
  );
}
