import React, { Component } from 'react';
import '../css/App.css';
import {Link} from "react-router-dom";

import DisplayGraphLine from "../custom_modules/DisplayGraphLine";
import DisplayGraphPie from "../custom_modules/DisplayGraphPie";

class Overview extends Component {
  render() {
    return <div className = "Overview">
        <code>
          <Link to="/" className="App-link"> Home </Link>
        </code>
        <div>
          <DisplayGraphLine/>
          <DisplayGraphPie/>
        </div>
      </div>;
  }
}

export default Overview;
