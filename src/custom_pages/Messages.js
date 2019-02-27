import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../css/App.css';

class Page404 extends Component {
    render() {
        return (
            <div className="App">
                <div className = "App-header">
                <code>
                    <p>Page not found...</p>
                    <Link className="App-link" to="/">Go Home?</Link>
                </code>
                </div>
            </div>
        );
    }
}

export default Page404;
