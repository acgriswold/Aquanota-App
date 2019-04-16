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
  constructor(props) {
    super(props);
      this.state = {
        open: false,
        type: "pH",
        units: "moles per liter, of hydrogen ions",
        data: "4.5",
        tankID: "1",
        offset: {
          "highLow": "",
          "aboveBelow": ""
        }
      };

      this._shouldOpenCheck();
      //Every 10 Minutes,
      setInterval(
          function() {
            if (!this.state.open){
              this._shouldOpenCheck();
            }
          }
          .bind(this),
          300000
      );

    }



  _shouldOpenCheck = () => {
    const dialog = this;
    var reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/messages/1"
    //filter by dates YYYYMMDDhhmmss
    reqURL += "/20190415000000/20190415999999";
    // var payload = {"payload": [{ "id": "pH", "data": 8.00 }, { "id": "temperature", "data": 32.00 }, { "id": "conductivity", "data": 534.00 }]};
    
    fetch(reqURL, {
        method: "GET"
      })
      .then(res => res.json())
      .then(
        (result) => {
          var data = result;
          //Sort averages by date
          data.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return a.date - b.date;
          });

          var errorBase;
          data.forEach(function(poll){
            if (poll.message.riskLevel === "Moderate risk") {
              errorBase = poll;
            }
            if (poll.message.riskLevel === "Severe risk") {
              errorBase = poll;
            }
          });

          if (errorBase) {
            var units;
            if (errorBase.sensorType === "pH") {
              units = "moles per liter, of hydrogen ions";
            } else if (errorBase.sensorType === "conductivity") {
              units = "µS / cm";
            } else if (errorBase.sensorType === "temperature") {
              units = "C"
            }

            var offset = {
              "highLow": "",
              "aboveBelow": ""
            };
            if (errorBase.message.aboveBelow === "Too high") {
              offset.highLow = "High";
              offset.aboveBelow = "above";

            } else if (errorBase.message.aboveBelow === "Too low") {
              offset.highLow = "low";
              offset.aboveBelow = "below";
            }

            setTimeout(function () {
              dialog.setState({
                open: true,
                type: errorBase.sensorType,
                units: units,
                data: errorBase.data,
                tankID: errorBase.tankNumber,
                offset: offset
              });
            }, 1000);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          dialog.setState({
            isLoaded: true,
            error: true
          });
        }
      )
  };

  handleClose = (event) => {
    if (event.target.innerText === "QUIET") {

    } else if (event.target.innerText === "OPTIONS") {

    }
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Trigger Modal Notification
        </Button> */}
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{this.state.offset.highLow + " " + this.state.type + " content!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                <span className="text-body">
                    Tank
                    <span className="emphasize">
                        {this.state.tankID}
                    </span>
                    may be at risk.  Its {this.state.type} has gone {this.state.offset.aboveBelow} the recommended amount.
                </span>
                <br></br>
                <br></br>
                <span className="text-body">
                    This tank is experiencing an average of 
                    <span className="emphasize">
                        {this.state.data}
                    </span>
                    {this.state.units} {this.state.offset.aboveBelow} the normal amounts.
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