import React from "react";

export default function VoteButtons({
  article_id,
  comment_id,
  updateVote,
  currentVote,
}) {
  return (
    <>
      <label>
        <button
          className="far fa-star fa-1x VoteUp"
          disabled={!(currentVote < 1) ? true : false}
          onClick={(e) =>
            updateVote(
              1,
              comment_id || article_id,
              comment_id ? "comments" : "articles"
            )
          }
        >
          Vote up
        </button>
      </label>
      <label>
        <button
          className="fas fa-star-half-alt fa-1x voteDown"
          disabled={!(currentVote > -1) ? true : false}
          onClick={(e) =>
            updateVote(
              -1,
              comment_id || article_id,
              comment_id ? "comments" : "articles"
            )
          }
        >
          Vote Down
        </button>
      </label>
    </>
  );
}
