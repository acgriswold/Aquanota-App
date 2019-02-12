import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link} from "react-router-dom";
import logo from './img/logo.svg';
import './css/App.css';
import Overview from "./custom_pages/Overview";
import Page404 from "./custom_pages/Page404";

class App extends Component {
  render() {
    return <HashRouter>
      <div className = "App">
        <Switch>
          <Route exact path="/" component={ Splash } />
          <Route path="/Overview" component={ Overview } />
          <Route component={ Page404 } />
        </Switch>
      </div>
    </HashRouter>;
  }
}

const Splash = () => (<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <code>Aquanota...</code> #1 Aquaponics Graphing App.
          </p>
          <Link to="/Overview" className="App-link"> 
              Continue to App 
          </Link>
        </header>
);

export default App;
