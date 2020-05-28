import React from "react";

export default function PaginationNav({ setPage, page, maxPage }) {
  return (
    <div className="paginationContainer">
      <label>
        <button
          disabled={page < 2}
          className="fas fa-backward fa-1x pagButton"
          onClick={(e) => setPage(-1)}
        ></button>
        <p>Prev Page</p>
      </label>
      <label>
        <button
          disabled={page >= maxPage}
          className="fas fa-forward fa-1x pagButton"
          onClick={(e) => setPage(1)}
        ></button>
        <p>Next Page</p>
      </label>
    </div>
  );
}
