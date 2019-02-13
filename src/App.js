import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link} from "react-router-dom";
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import logo from './img/logo.svg';
import './css/App.css';
import Overview from "./custom_pages/Overview";
import Page404 from "./custom_pages/Page404";

class App extends Component {
  state = { showNav: false };

  render() {
    return <Router>
      <div className = "App">
        <div className = "header">
          <MenuIcon onClick={() => this.setState({showNav: true})}/>
        </div>
        <SideNav
          showNav={this.state.showNav}
          onHideNav={()=>this.setState({showNav:false})}
          title={<div>Aquanota <img src={logo} width='26' /></div>}
          titleStyle={{backgroundColor: '#2196F3'}}
          items={[
            <Link className="App-link" to="/"> Home </Link>,
            <Link className="App-link" to="/overview"> Overview </Link>,
            <Link className="App-link" to="/logout"> Logout </Link>,
            ]} />
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
          <Link to="/Overview" className="App-link"> 
              Continue to App 
          </Link>
        </header>
);

export default App;
