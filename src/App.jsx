import React, { Component } from "react";
import { Route, Switch, IndexRoute } from "react-router-dom";
import Generator from "./components/Generator";
import TextFile from "./components/Generator/TextFile.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/:randomstring" component={TextFile} />
          <Route path="*" component={Generator} />
        </Switch>
      </div>
    );
  }
}

export default App;
