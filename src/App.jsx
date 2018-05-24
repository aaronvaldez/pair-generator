import React, { Component } from "react";
import { Route, Switch, IndexRoute } from "react-router-dom";
import Generator from "./components/Generator";
import TextFile from "./components/TextFile";

const App = () => (
  <div style={{'min-height':'100vh'}}>
    <Switch>
      <Route path="/:randomstring" component={TextFile} />
      <Route path="*" component={Generator} />
    </Switch>
  </div>
);

export default App;
