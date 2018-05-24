import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import randomstring from "randomstring";

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

  shuffle(arr) {
    let shuffled = arr.slice();
    for (let i = 0; i < shuffled.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getRandomPairs(sprint) {
    let pairs = [];
    let students = this.state.students.split("\n").filter(val => val !== "");
    let reshuffleSprint = Math.ceil(students.length / 2);
    if (sprint === 1 || sprint % reshuffleSprint === 0) {
      students = this.shuffle(students);
      for (let i = 0; i < students.length; i += 2) {
        pairs.push([students[i], students[i + 1]]);
      }
      this.firstPairs = pairs;
    } else {
      let temp = this.firstPairs[0][1];
      for (let i = 0; i < this.firstPairs.length - 1; i++) {
        this.firstPairs[i][1] = this.firstPairs[i + 1][1];
      }
      this.firstPairs[this.firstPairs.length - 1][1] = temp;
      if (sprint % 2 === 0) {
        this.firstPairs.forEach(pair => pairs.push([pair[1], pair[0]]));
      } else {
        this.firstPairs.forEach(pair => pairs.push([pair[0], pair[1]]));
      }
      pairs = this.shuffle(pairs);
    }
    return pairs;
  }

  generatePairs(e) {
    e.preventDefault();
    const students = this.state.students;
    const sprintPairs = [];
    if (students) {
      const sprints = +this.state.sprints;
      for (let i = 1; i <= sprints; i++) {
        sprintPairs.push(JSON.stringify(this.getRandomPairs(i)));
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
      <div id="page-container">
        <div className="generator-title">Hack Reactor Student Pair Generator</div>
        <div id="generator-container">
          <form className="generator-form" onChange={e => this.formHandler(e)} onSubmit={(e) => this.generatePairs(e)}>
            <div>
              <p>How many sprints?</p>
              <input type="text" name="sprints" size="62" maxLength="255" />
            </div>
            <br />
            <div>
              <p>Names of students (separated by line break):</p>
              <textarea name="students" rows="20" cols="60" />
            </div>
            <br />
            <button
              className="button"
              type="submit"
              value="Get Pairs"
            >
              Get Pairs
            </button>
          </form>
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
                <h3 className="sprint-title">Sprint {i + 1}</h3>
                <table className="sprint-pairs">
                  <tbody>
                    {JSON.parse(pairs).map((pair, j) => (
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
      </div>
    );
  }
}

export default Generator;
