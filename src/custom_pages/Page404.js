import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../css/Page404.css';

class Page404 extends Component {
    render() {
        return (
            <div className="Page404">
                <div className="Page404-header">
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
