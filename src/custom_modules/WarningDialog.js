import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from '@material-ui/core/Slide';

import '../css/index.css';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class WarningDialog extends React.Component {
  state = {
    open: false,
    type: "pH",
    units: "moles per liter, of hydrogen ions",
    data: "4.5",
    tankID: "1"
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (event) => {
    console.log(event.target.innerText)
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Trigger Modal Notification
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{"High " + this.state.type + " content!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                <span className="text-body">
                    Tank
                    <span className="emphasize">
                        {this.state.tankID}
                    </span>
                    may be at risk.  Its {this.state.type} has risen above the recommended amount.
                </span>
                <br></br>
                <br></br>
                <span className="text-body">
                    This tank is experiencing an average of 
                    <span className="emphasize">
                        {this.state.data}
                    </span>
                    {this.state.units} above the normal amounts.
                </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Quiet
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Options
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

WarningDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog({breakpoint: 'xs'})(WarningDialog);