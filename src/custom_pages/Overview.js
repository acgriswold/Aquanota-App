import React, { Component } from 'react';
import '../css/App.css';

import DisplayGraphLine from "../custom_modules/DisplayGraphLine";
import DisplayGraphPie from "../custom_modules/DisplayGraphPie";

class Overview extends Component {
  render() {
    return <div className = "Overview">
          <DisplayGraphLine/>
          <DisplayGraphPie/>
      </div>;
  }
}

export default Overview;
