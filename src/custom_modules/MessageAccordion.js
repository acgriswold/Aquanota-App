import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LinearProgress from '@material-ui/core/LinearProgress';


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
});

const data = [{
                  date: "2019-3-27",
                  tankNumber: "1",
                  pH: 6.3,
                  temp: 32,
                  ec: 324,
                  message: "On Track"
                },
                {
                  date: "2019-3-26",
                  tankNumber: "2",
                  pH: 6.3,
                  temp: 32,
                  ec: 324,
                  message: "On Track"
                },
                {
                  date: "2019-3-24",
                  tankNumber: "1",
                  pH: 6.3,
                  temp: 32,
                  ec: 324,
                  message: "On Track"
                },
                {
                  date: "2019-3-23",
                  tankNumber: "2",
                  pH: 6.3,
                  temp: 32,
                  ec: 324,
                  message: "On Track"
                },
                {
                  date: "2019-3-22",
                  tankNumber: "2",
                  pH: 6.3,
                  temp: 32,
                  ec: 324,
                  message: "On Track"
                },
                {
                  date: "2019-3-21",
                  tankNumber: "2",
                  pH: 2,
                  temp: 32,
                  ec: 324,
                  message: "At Risk"
                }

]

class MessageAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sensorType: props.id,
      data: [{
        "id": "",
        "color": "hsl(353, 70%, 50%)",
        "data": [{
          "x": 0,
          "y": 0
        }]
      }]
    };

    const accordion = this;
    var reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/1"
    //filter by dates
    reqURL += "/0/99999999999999";
    // var payload = {"payload": [{ "id": "pH", "data": 8.00 }, { "id": "temperature", "data": 32.00 }, { "id": "conductivity", "data": 534.00 }]};
    
    fetch(reqURL, {
        method: "GET"
      })
      .then(res => res.json())
      .then(
        (result) => {
          var returnedData = result;

          console.log(returnedData);
          // setTimeout(function () {
            accordion.setState({
              isLoaded: true,
              data: data,
              error: false
            });
          // }, 1000);
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

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded, error, isLoaded } = this.state;

    var panels = data.map((comp, i) => {
        // replace option with your component name
        return <ExpansionPanel expanded={expanded === i} onChange={this.handleChange(i)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{comp.date} Check:</Typography>
            <Typography className={classes.secondaryHeading}>Tank {comp.tank}: {comp.message}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                    pH levels are at {comp.pH}.  Temperature levels are at {comp.temp} C.  
                    Electro Conductivity levels are at {comp.ec} µS / cm
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    })

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