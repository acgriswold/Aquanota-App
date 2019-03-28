import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
    const { expanded } = this.state;

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

    return (
      <div className={classes.root}>
        {panels}
      </div>
    );
  }
}

MessageAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageAccordion);