import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.css';
import DisplayGraphLine from "./custom_modules/DisplayGraphLine";
import DisplayGraphPie from "./custom_modules/DisplayGraphPie";

class App extends Component {
  render() {
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <code>Aquanota...</code> #1 Aquaponics Graphing App.
          </p>
        </header>
        <div className="App-body">
          <DisplayGraphLine />
          <DisplayGraphPie />
        </div>
      </div>;
  }
}

export default App;
