import React, { Component } from "react";
import Helmet from "react-helmet";

import "./TextFile.css";

function TextFile(props) {
  const sprintPairs = JSON.parse(localStorage.getItem("sprintPairs"));
  return sprintPairs.map((pairs, i) => (
    <div id="text-container" key={i}>
    <Helmet bodyAttributes={{ style: "background-color : #fff" }} />
      Sprint {i + 1}
      {pairs.map((pair, j) => (
        <div key={j}>{pair[1] ? `${pair[0]} | ${pair[1]}` : pair[0]}</div>
      ))}
      <br />
    </div>
  ));
}

export default TextFile;
