import React from "react";
import { Link } from "@reach/router";

export default function Header() {
  return (
    <header className="headerContainer">
      <Link to="/">
        <h1>{`NC News <Link />`}</h1>
      </Link>
    </header>
  );
}
