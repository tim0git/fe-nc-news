import React from "react";

export default function ErrorAlert({ err }) {
  const message = err ? err : "Oops.. something went wrong 404 not found...";
  return (
    <div>
      <h3>{message}</h3>
    </div>
  );
}
