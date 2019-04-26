import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

class AveragesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };

    const averagesTable = this;
    var reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/messages/1"
    //filter by dates YYYYMMDDhhmmss
    // reqURL += "/0/99999999999999";
    
    fetch(reqURL, {
        method: "GET"
      })
      .then(res => res.json())
      .then(
        (result) => {
          var data = result;

          setTimeout(function () {
            averagesTable.setState({
              data: data,
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
          averagesTable.setState({
            isLoaded: true,
            error: true
          });
        }
      )
  }

  state = {
    expanded: null,
  };

  render() {
    const { classes } = this.props;
    const { error, isLoaded } = this.state;

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
                            Constructing your averages
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

          </div>
        );
    }
  }
}

AveragesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AveragesTable);