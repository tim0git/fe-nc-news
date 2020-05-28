import React from "react";
import { Link } from "@reach/router";

export default function TopicCard(props) {
  const { slug, description, style, index } = props;
  return (
    <li className={style ? `topicCardMin${index}` : "topicCard"}>
      <Link className="topicLink" to={`/topics/${slug}?`}>{`<${slug}>`}</Link>
      {!style && <p>{description}</p>}
    </li>
  );
}
