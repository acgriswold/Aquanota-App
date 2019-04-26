import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LinearProgress from '@material-ui/core/LinearProgress';

import '../css/index.css';

const styles = theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
        width: '100vw',
    }, [theme.breakpoints.up('sm')]: {
        width: '75vw',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
   column: {
     flexBasis: '33.33%',
   },
   break: {
    borderLeft: `2px solid ${theme.palette.divider}`,
   }
});

class MessageAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sensorType: props.id,
      data: [{
        date: "",
        tankNumber: "1",
        pH: 0,
        temp: 0,
        ec: 0,
        message: "On Track"
      }]
    };

    const accordion = this;
    var reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/messages/1"
    //filter by dates YYYYMMDDhhmmss
    // reqURL += "/0/99999999999999";
    // var payload = {"payload": [{ "id": "pH", "data": 8.00 }, { "id": "temperature", "data": 32.00 }, { "id": "conductivity", "data": 534.00 }]};
    
    fetch(reqURL, {
        method: "GET"
      })
      .then(res => res.json())
      .then(
        (result) => {
          var data = result;

          //Group data by date)
          var groupedData = data.reduce(function (r, a) {
            var date = a.date;
            var formattedKey = date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substring(6,8) + " " + date.substring(8,10) + ":" + date.substring(10,12) + ":" + date.substring(12,14);
            //Used as Object for Iterations
            r[formattedKey] = r[formattedKey] || [];
            r[formattedKey].push(a);

            return r;
          }, []);

          var graphData = [];
          //Loops through groupedData and and sort for each sensor
          Object.keys(groupedData).forEach(function (key, index) {
            var timestampData = {
              date: key,
              number: "1",
              status: "on Track"
            };

            //Find averages for each data and save to data;
            timestampData = accordion._returnAverageResult(this[key], timestampData);
            
            graphData.push(timestampData);
          }, groupedData);

          //Sort averages by date
          graphData.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });

          accordion.setState({
            data: graphData,
          });
          setTimeout(function () {
            accordion.setState({
              data: graphData,
              error: false,
              isLoaded: true,
            });
          }, 1000);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          accordion.setState({
            isLoaded: true,
            error: true
          });
        }
      )
  }

  _returnAverageResult(objectArr, timestampData) {

    // TODO: Have work with Multiple Tanks
    // group the data
    objectArr.reduce(function (l, r) {
        // construct a unique key out of the properties we want to group by
        var primaryKey = r.sensorType;

        // check if the key is already known
        if (typeof l[primaryKey] === "undefined") {
            // init with an "empty" object
            l[primaryKey] = {
                data: r.data,
                message: r.message
            };
            timestampData[primaryKey] = {
                data: r.data,
                message: r.message
            };
            if (timestampData.status === "on Track" && (l[primaryKey].message.riskLevel === "Moderate risk" || l[primaryKey].message.riskLevel === "Severe risk")) {
              timestampData.status = l[primaryKey].message.riskLevel;
            } else if (l[primaryKey].tankStatus === "Moderate risk" && l[primaryKey].message.riskLevel === "Severe risk") {
              timestampData.status = l[primaryKey].message.riskLevel;
            }
        }

        return l;
    }, []);



    return timestampData;
  }

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  _doesExist(object, key, units) {
    var returnMsg = "";
    var riskLevel = "";
    if (object) {
      if (object.message.riskLevel==="on Track"){
        riskLevel = "noWarning";
      } else if (object.message.riskLevel==="Moderate risk"){
        riskLevel = "lowWarning";
      } else if (object.message.riskLevel==="Severe Risk"){
        riskLevel = "warning";
      }
      returnMsg = <div className="text-body">
            <span className="emphasize">{key}</span> 
            levels are at 
            <span className="emphasize">{object.data}</span>
             {units}
             <br/>
             <span className={riskLevel}>{object.message.riskLevel}</span>
          </div>
    }
    return returnMsg
  }

  render() {
    const { classes } = this.props;
    const { expanded, error, isLoaded } = this.state;



    if (error) {
        return (<div className="MessageBoard">
                <div className="MessageBoard-body">
                    <header className="MessageBoard-header">
                      <span>
                          <code style={{color: 'white'}}> We have run into an error!  Please try again. </code>
                      </span>
                  </header>
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return (<div className="MessageBoard">
                <header className="MessageBoard-header">
                    <span>
                        <code> 
                            We are currently loading your data!
                            <br></br>
                            This may take a while...
                        </code> 
                    </span>
                </header>
                <div className="MessageBoard-body">
                    <LinearProgress></LinearProgress>
                    <LinearProgress></LinearProgress>
                </div>
            </div>)
    } else {
        var panels = this.state.data.map((comp, i) => {
          // replace option with your component name
            return <ExpansionPanel key={i} expanded={expanded === i} onChange={this.handleChange(i)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{comp.date} Check:</Typography>
                <Typography className={classes.secondaryHeading}>Tank {comp.number}: {comp.status}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.column}>
                  <Typography>{this._doesExist(comp.pH, "pH", "")}  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.break}>{this._doesExist(comp.temperature, "Temp", "C")} </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.break}> {this._doesExist(comp.conductivity, "EC", "µS / cm")} </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
        })
        return (
          <div className={classes.root}>
            {panels}
          </div>
        );
    }
  }
}

MessageAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageAccordion);