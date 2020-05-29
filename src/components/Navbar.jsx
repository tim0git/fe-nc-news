import React from "react";
import { Link } from "@reach/router";

export default function Navbar({ logOut, isLoggedIn }) {
  return (
    <>
      <nav className="navContainer">
        <label className="menuButton">
          <Link
            className="fas fa-home fa-2x"
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/"
          ></Link>
          <p>Home</p>
        </label>
        <label className="menuButton">
          <Link
            to="/topics"
            className="far fa-newspaper fa-2x"
            style={{ color: "inherit", textDecoration: "inherit" }}
          ></Link>
          <p>Topics</p>
        </label>
        <label className="menuButton">
          {isLoggedIn ? (
            <label>
              <Link
                to="/login"
                className="fas fa-user fa-2x"
                style={{ color: "inherit", textDecoration: "inherit" }}
              ></Link>
              <p>Login</p>
            </label>
          ) : (
            <label className="menuButton">
              <Link
                to="/login"
                onClick={logOut}
                className="fas fa-sign-out-alt fa-2x"
                style={{ color: "inherit", textDecoration: "inherit" }}
              ></Link>
              <p>Logout</p>
            </label>
          )}
        </label>
      </nav>
    </>
  );
}
