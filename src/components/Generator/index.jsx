import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import randomstring from "randomstring";
import Helmet from "react-helmet";

import "./Generator.css";

class Generator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprints: 1,
      students: "",
      sprintPairs: []
    };
  }

  formHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value.trim()
    });
  }

  getRandomPairs() {
    const pairs = [];
    const students = this.state.students.split("\n");
    while (students.length) {
      let pair = [];
      pair.push(
        students.splice(Math.floor(Math.random() * students.length), 1)[0]
      );
      pair.push(
        students.splice(Math.floor(Math.random() * students.length), 1)[0]
      );
      pairs.push(pair);
    }
    return pairs;
  }

  generatePairs() {
    const students = this.state.students;
    const sprintPairs = [];
    if (students) {
      const sprints = +this.state.sprints;
      for (let i = 0; i < sprints; i++) {
        sprintPairs.push(this.getRandomPairs());
      }
      this.setState({ sprintPairs });
    }
  }

  createTextFile() {
    const url = randomstring.generate();
    const win = window.open(`/${url}`, "_blank");

    localStorage.setItem("sprintPairs", JSON.stringify(this.state.sprintPairs));
    win.focus();
  }

  render() {
    return (
      <div id="generator-container">
        <Helmet bodyAttributes={{ style: "background-color : #4aaded" }} />
        <h1 className="generator-title">Hack Reactor Student Pair Generator</h1>
        <form className="generator-form" onChange={e => this.formHandler(e)}>
          <div>
            <p>How many sprints?</p>
            <input type="text" name="sprints" size="62" maxLength="255" />
          </div>
          <br />
          <div>
            <p>Names of students (separated by line break):</p>
            <textarea name="students" rows="20" cols="60" maxLength="255" />
          </div>
          <br />
        </form>
        <button
          className="button"
          type="submit"
          value="Get Pairs"
          onClick={() => this.generatePairs()}
        >
          Get Pairs
        </button>
        {this.state.sprintPairs.length ? (
          <button
            className="button"
            type="submit"
            value="Get Text File"
            onClick={() => this.createTextFile()}
          >
            Get Text File
          </button>
        ) : null}
        {(this.state.sprintPairs.length &&
          this.state.sprintPairs.map((pairs, i) => (
            <div id="table-container" key={i}>
              <h3 className="generator-title">Sprint {i + 1}</h3>
              <table className="sprint-pairs">
                <tbody>
                  {pairs.map((pair, j) => (
                    <tr key={j}>
                      <td>{pair[0]}</td>
                      <td>{pair[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))) ||
          null}
      </div>
    );
  }
}

export default Generator;
