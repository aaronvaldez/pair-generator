import React, { Component } from "react";

import "./TextFile.css";

const TextFile = (props) => {
  const sprintPairs = JSON.parse(localStorage.getItem("sprintPairs"));
  return sprintPairs.map((pairs, i) => (
    <div id="text-container" key={i}>
      Sprint {i + 1}
      {JSON.parse(pairs).map((pair, j) => (
        <div key={j}>{pair[1] ? `${pair[0]} | ${pair[1]}` : pair[0]}</div>
      ))}
      <br />
    </div>
  ));
}

export default TextFile;
