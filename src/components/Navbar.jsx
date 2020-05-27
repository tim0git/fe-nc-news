import React from "react";
import { Link } from "@reach/router";

export default function Navbar() {
  return (
    <>
      <h2>Navbar</h2>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
      </ul>
    </>
  );
}
