import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './img/logo.svg';
import './css/App.css';
import Overview from "./custom_pages/Overview";
import Page404 from "./custom_pages/Page404";

class App extends Component {
  render() {
    return <Router>
      <div className = "App">
        <Switch>
          <Route exact path="/" component={ Splash } />
          <Route path="/Overview" component={ Overview } />
          <Route component={ Page404 } />
        </Switch>
      </div>
    </Router>;
  }
}

const Splash = () => (<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <code>Aquanota...</code> #1 Aquaponics Graphing App.
          </p>
          <a href="/Overview" className="App-link"> 
              Continue to App 
            </a>
        </header>
);

export default App;
