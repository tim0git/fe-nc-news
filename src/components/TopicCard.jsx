import React from "react";
import { Link } from "@reach/router";

export default function TopicCard({ slug, description }) {
  return (
    <div>
      <Link to={`/topics/${slug}`}>{slug}</Link>
      <p>{description}</p>
    </div>
  );
}
