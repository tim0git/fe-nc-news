import React from "react";

export default function ErrorAlert({ err }) {
  const message = err ? err : "Oops.. something went wrong 404 not found...";
  return (
    <div className="alertContainer">
      <h3 className="warning">{message}</h3>
    </div>
  );
}
