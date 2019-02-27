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

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>2/27/2019 Check:</Typography>
            <Typography className={classes.secondaryHeading}>Tank 1: High Risk</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                    pH levels are at 9.  Temperature levels are at 16.9 C.  
                    Electro Conductivity levels are at 1032 µS / cm
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>2/26/2019 Check:</Typography>
            <Typography className={classes.secondaryHeading}>Tank 1: Mid Warning</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                    pH levels are at 8.2.  Temperature levels are at 28.5 C.  
                    Electro Conductivity levels are at 643 µS / cm
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>2/24/2019 Check:</Typography>
            <Typography className={classes.secondaryHeading}>Tank 2: On Track</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                    pH levels are at 7.4.  Temperature levels are at 34.2 C.  
                    Electro Conductivity levels are at 312 µS / cm
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>2/22/2019 Check:</Typography>
            <Typography className={classes.secondaryHeading}>Tank 1: On Track</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                    pH levels are at 6.  Temperature levels are at 32.4 C.  
                    Electro Conductivity levels are at 232 µS / cm
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

MessageAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageAccordion);