import React from "react";

export default function ArticlesNav({ setOrderBy, setSortBy, orderBool }) {
  const orderDesc = (
    <>
      <button
        className="fas fa-sort-amount-down-alt fa-2x orderIcon"
        onClick={setOrderBy}
      ></button>
      <p>Desc</p>
    </>
  );

  const orderAsc = (
    <>
      <button
        className="fas fa-sort-amount-up-alt fa-2x orderIcon"
        onClick={setOrderBy}
      ></button>
      <p>Asc</p>
    </>
  );

  return (
    <>
      <label className="commentsIcon">
        <button
          style={{ color: "none", textDecoration: "none" }}
          className="far fa-comments fa-2x commentsIcon"
          name="comment_count"
          onClick={(e) => setSortBy(e)}
        ></button>
        <p>Comments</p>
      </label>
      <label className="votesIcon">
        <button
          className="far fa-star fa-2x votesIcon"
          name="votes"
          onClick={(e) => setSortBy(e)}
        ></button>
        <p>Votes</p>
      </label>
      <label className="dateIcon">
        <button
          className="far fa-calendar-alt fa-2x dateIcon"
          name="created_at"
          onClick={(e) => setSortBy(e)}
        ></button>
        <p>Date</p>
      </label>
      <label className="orderIcon">{orderBool ? orderDesc : orderAsc}</label>
    </>
  );
}
