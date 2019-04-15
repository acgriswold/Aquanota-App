import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import MessageAccordion from "../custom_modules/MessageAccordion";
import '../css/App.css';
import '../css/Message.css';

class MessageBoard extends Component {
    render() {
        return (
            <div className="MessageBoard">
                <div className = "MessageBoard-header">
                    <code>
                        <span>Message Alerts</span>
                    </code>
                </div>
                <div className = "MessageBoard-body">
                    <MessageAccordion></MessageAccordion>
                </div>
            </div>
        );
    }
}

export default MessageBoard;
