import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ExpandMore from '@material-ui/icons/ExpandMore';

class TankMenu extends React.Component {
  state = {
    label: "Tank 1", // initial state
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null, label: event.currentTarget.innerText ? event.currentTarget.innerText : this.state.label });
  };

  componentDidUpdate(prevProps, prevStates) {
    // update parent component that new tank is selected
    // used to update graph, charts and labels of parent
    if (prevStates.label !== this.state.label){
      // for a selecting a tank, the value is passed into the change handler
      this.props.onChange('selectedTank', this.state.label.substr(-1));
    }
  };

  render() {
    const { anchorEl } = this.state;
    const divStyle = {display: "inline"};

    return (
      <div style={divStyle}>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            size="large"
            style={{
                color: "white",
                padding: "calc(4px + 1vmin)",
                fontSize: "calc(7px + 1vmin)",
                fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
            }}
            onClick={this.handleClick}
          >
            {this.state.label}
            <ExpandMore/>
          </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Tank 1</MenuItem>
          <MenuItem onClick={this.handleClose}>Tank 2</MenuItem>
          <MenuItem onClick={this.handleClose}>Tank 3</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default TankMenu;