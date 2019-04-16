import React, { Component } from 'react';
import '../css/Chart.css';
import { ResponsiveLine } from "@nivo/line";

import TankMenu from "./TankMenu";
import LinearProgress from '@material-ui/core/LinearProgress';

let dataSet = [{
                "id": "",
                "color": "hsl(353, 70%, 50%)",
                "data": [{
                    "x": 0,
                    "y": 0
                }]
            }];

const colorPalette = [
    "hsl(194, 60%, 57%)",
    "hsl(200, 63%, 46%)",
    "hsl(205, 91%, 35%)",
    "hsl(212, 88%, 27%)",
    "hsl(174, 44%, 64%)",
];

class DisplayGraphLine extends Component {
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

        const displayGraph = this;
        var reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/1/sensordata/"
        //filter by sensorType
        reqURL += this.state.sensorType;
        //filter by dates YYYYMMDDhhmmss
        // reqURL += "/1/99999999999999/"

        fetch(reqURL,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    var data = result.Items;

                    var sortedSensorData = [];
                    //Group data by SubjectEventID
                    var groupedBySensor = data.reduce(function (r, a) {
                        if (a.SubjectEventID) {
                            r[a.SubjectEventID] = r[a.SubjectEventID] || [];
                            r[a.SubjectEventID].push(a);
                        }
                        return r;
                    }, []);

                    //Loops through groupedBySensor and sort for date
                    //Find averages for each date
                    Object.keys(groupedBySensor).forEach(function (key, index) {
                        var averagedData = {
                            id: key,
                            color: "hsl(1, 70%, 50%)",
                        };

                        //Find averages for each date and save to data;
                        averagedData.data = displayGraph._returnAverageResult(this[key]);
                        
                        //Sort averages by date
                        averagedData.data.sort(function (a, b) {
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(a.x) - new Date(b.x);
                        });

                        sortedSensorData.push(averagedData)
                    }, groupedBySensor);

                    setTimeout(function() {
                        displayGraph.setState({
                        isLoaded: true,
                        data: sortedSensorData,
                        error: false
                        });
                    }, 1000); 
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    _updateGraph() {
        dataSet = this.state.data;
    }

    onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});

       const displayGraph = this;
       var reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/1/sensordata/"
       //filter by sensorType
       reqURL += this.state.sensorType;
       //filter by dates
       // reqURL += "/1/99999999999999/"

       fetch(reqURL, {
            method: "GET"
        })
        .then(res => res.json())
        .then(
            (result) => {
                var data = result.Items;

                var sortedSensorData = [];
                //Group data by SubjectEventID
                var groupedBySensor = data.reduce(function (r, a) {
                    if (a.SubjectEventID) {
                        r[a.SubjectEventID] = r[a.SubjectEventID] || [];
                        r[a.SubjectEventID].push(a);
                    }
                    return r;
                }, []);

                //Loops through groupedBySensor and sort for date
                //Find averages for each date
                Object.keys(groupedBySensor).forEach(function (key, index) {
                    var averagedData = {
                        id: key,
                        color: "hsl(1, 70%, 50%)",
                    };

                    //Find averages for each date and save to data;
                    averagedData.data = displayGraph._returnAverageResult(this[key]);

                    //Sort averages by date
                    averagedData.data.sort(function (a, b) {
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(a.x) - new Date(b.x);
                    });

                    sortedSensorData.push(averagedData)
                }, groupedBySensor);

                setTimeout(function () {
                    displayGraph.setState({
                        isLoaded: true,
                        data: sortedSensorData,
                        error: false
                    });
                }, 1000);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    };

    changeDate = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    _returnAverageResult(objectArr) {
        // group the data
        var groupedData = objectArr.reduce(function (l, r) {
            // construct a unique key out of the properties we want to group by
            // submitter date will only be year, month, day
            var dayOnly = r.SubmitterDate.substring(0, 8);
            var key = r.SubjectEventID + "|" + dayOnly;

            // check if the key is already known
            if (typeof l[key] === "undefined") {
                // init with an "empty" object
                l[key] = {
                    sum: 0,
                    count: 0
                };
            }

            // sum up the values and count iterations
            l[key].sum += r.SubjectEventData;
            l[key].count += 1;

            return l;
        }, {});

        // calculate the averages
        var avgGroupedData = Object.keys(groupedData)
            // iterate over the elements in <groupedData> and transform them into the "old" format
            .map(function (key) {
                // split the constructed key to get the parts
                var keyParts = key.split(/\|/);
                // construct {x, y} format including the average value
                // x is dayOnly y is data
                return {
                    x: keyParts[1],
                    y: (groupedData[key].sum / groupedData[key].count)
                };
            });

        return avgGroupedData;
    }
    
    render() {
        let { error, isLoaded } = this.state;
        this._updateGraph();

        if (error) {
            return (<div className="Display">
                    <header className="Chart-header">
                        <span>
                            <code> 
                                Currently Viewing Averages: 
                                <TankMenu onChange={this.onChange.bind(this)}></TankMenu>
                            </code> 
                        </span>
                    </header>
                    <div className="Display-chart">
                        <header className="Chart-header">
                        <span>
                            <code style={{color: 'white'}}> We have run into an error!  Please try again. </code>
                        </span>
                    </header>
                    </div>
                </div>
            )
        } else if (!isLoaded) {
            return (<div className="Display">
                    <header className="Chart-header">
                        <span>
                            <code> 
                                We are currently loading your data!
                                <br></br>
                                This may take a while...
                            </code> 
                        </span>
                    </header>
                    <div className="Display-chart">
                        <LinearProgress></LinearProgress>
                        <LinearProgress></LinearProgress>
                    </div>
                </div>)
        } else {
            return (
                <div className="Display">
                    <header className="Chart-header">
                        <span>
                            <code> 
                                Currently Viewing Averages: 
                                <TankMenu onChange={this.onChange.bind(this)}></TankMenu>
                            </code> 
                        </span>
                    </header>
                    <div className="Display-chart">
                        <ResponsiveLine
                            data={dataSet}
                            margin={{
                                "top": 70,
                                "right": 50,
                                "bottom": 50,
                                "left": 60
                            }}
                            xScale={{
                                "type": "point"
                            }}
                            yScale={{
                                "type": "linear",
                                "stacked": false,
                                "min": "auto",
                                "max": "auto"
                            }}
                            curve="natural"
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                "orient": "bottom",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "Week Number",
                                "legendOffset": 36,
                                "legendPosition": "middle"
                            }}
                            axisLeft={{
                                "orient": "left",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "Levels",
                                "legendOffset": -40,
                                "legendPosition": "middle"
                            }}
                            colors={colorPalette}
                            lineWidth={2.5}
                            dotSize={10}
                            dotColor="inherit:darker(0.3)"
                            dotBorderWidth={2}
                            dotBorderColor="#ffffff"
                            enableDotLabel={true}
                            dotLabel="y"
                            dotLabelYOffset={-12}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            legends = {
                                [{
                                    "anchor": "top-left",
                                    "direction": "row",
                                    "justify": false,
                                    "translateX": 0,
                                    "translateY": -40
                                    ,
                                    "itemsSpacing": 0,
                                    "itemDirection": "left-to-right",
                                    "itemWidth": 85,
                                    "itemHeight": 20,
                                    "itemOpacity": 0.75,
                                    "symbolSize": 12,
                                    "symbolShape": "circle",
                                    "symbolBorderColor": "rgba(0, 0, 0, .5)",
                                    "effects": [{
                                        "on": "hover",
                                        "style": {
                                            "itemBackground": "rgba(0, 0, 0, .03)",
                                            "itemOpacity": 1
                                        }
                                    }]
                                }]
                            }
                        />
                    </div>
                </div>
            );
        }
    }
}

export default DisplayGraphLine;
