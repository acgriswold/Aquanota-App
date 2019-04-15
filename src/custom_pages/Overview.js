import React, { Component } from 'react';
import '../css/App.css';

import DisplayGraphLine from "../custom_modules/DisplayGraphLine";
import DisplayGraphPie from "../custom_modules/DisplayGraphPie";
// import DisplayGraphBar from "../custom_modules/DisplayGraphBar";

class Overview extends Component {
  render() {
    return <div className = "Overview">
          <DisplayGraphLine id="pH"/>
          <DisplayGraphLine id="temperature"/>
          <DisplayGraphLine id="conductivity"/>
          <DisplayGraphPie/>
          {/* <DisplayGraphBar/> */}
      </div>;
  }
}

export default Overview;
