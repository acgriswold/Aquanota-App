import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../css/App.css';
import DisplayGraphLine from "../custom_modules/DisplayGraphLine";
import DisplayGraphPie from "../custom_modules/DisplayGraphPie";

class Overview extends Component {
  render() {
    return <Router>
      <div className = "Overview">
        <code>
          <a className="App-link" href="/">Home</a>
          &nbsp;
          <a className="App-link" href="/Overview/LineGraph">Line Graph</a>
          &nbsp;
          <a className="App-link" href="/Overview/PieGraph">Pie Graph</a>
        </code>
        <div>
          <Switch>
            <Route path="/Overview/LineGraph" component={ DisplayGraphLine } />
            <Route path="/Overview/PieGraph" component={ DisplayGraphPie } />
          </Switch>
        </div>
      </div>
    </Router>;
  }
}

export default Overview;
