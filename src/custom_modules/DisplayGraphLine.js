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
  "hsl(212, 88%, 27%)",
  "hsl(205, 91%, 35%)",
  "hsl(200, 63%, 46%)",
  "hsl(194, 60%, 57%)",
  "hsl(174, 44%, 64%)",
  "hsl(135, 44%, 76%)",
  "hsl(109, 49%, 85%)",
  "hsl(107, 50%, 91%)",
  "hsl(85, 67%, 96%)"
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
        var url = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/1/2019-3-12/2019-3-13/"
        url += this.state.sensorType;

        fetch(url,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    var data = result.Items;

                    //Group data by SubjectEventID
                    var groupedData = data.reduce(function (r, a) {
                        //Used as Object for Iterations
                        r[a.SubjectEventID] = r[a.SubjectEventID] || [];
                        r[a.SubjectEventID].push(a);

                        return r;
                    }, []);

                    var graphData = [];
                    //Loops through groupedData and and sort for each sensor
                    Object.keys(groupedData).forEach(function (key, index) {
                        var sensorData = {
                            id: key,
                            color: "hsl(353, 70%, 50%)",
                        };

                        //Find averages for each data and save to data;
                        sensorData.data = displayGraph._returnAverageResult(this[key]);

                        //Sort averages by date
                        sensorData.data.sort(function (a, b) {
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(a.x) - new Date(b.x);
                        });

                        graphData.push(sensorData)
                    }, groupedData);

                    setTimeout(function() {
                        displayGraph.setState({
                        isLoaded: true,
                        data: graphData,
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
        let reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/"
        //filter by selected tank
        reqURL += value;
        //filter by dates
        reqURL += "/2019-3-12/2019-3-14/"
        //filter by sensorType
        reqURL += this.state.sensorType;

        fetch(reqURL, {method: "GET"})
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.Items){
                    var data = result.Items;

                    //Group data by SubjectEventID
                    var groupedData = data.reduce(function (r, a) {
                        //Used as Object for Iterations
                        r[a.SubjectEventID] = r[a.SubjectEventID] || [];
                        r[a.SubjectEventID].push(a);

                        return r;
                    }, []);

                    var graphData = [];
                    //Loops through groupedData and and sort for each sensor
                    Object.keys(groupedData).forEach(function (key, index) {
                        var sensorData = {
                            id: key,
                            color: "hsl(353, 70%, 50%)",
                        };

                        //Find averages for each data and save to data;
                        sensorData.data = displayGraph._returnAverageResult(this[key]);

                        //Sort averages by date
                        sensorData.data.sort(function (a, b) {
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(a.x) - new Date(b.x);
                        });

                        graphData.push(sensorData)
                    }, groupedData);

                    setTimeout(function() {
                        displayGraph.setState({
                        isLoaded: true,
                        data: graphData,
                        error: false
                        });
                    }, 1000); 
                    } else {
                        this.setState({
                            isLoaded: true,
                            error: true
                        });
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
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
            var key = r.SubjectEventID + "|" + r.SubmitterDate;

            // check if the key is already known
            if (typeof l[key] === "undefined") {
                // init with an "empty" object
                l[key] = {
                    sum: 0,
                    count: 0
                };
            }

            // sum up the values and count the occurences
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
                // construct the "old" format including the average value
                return {
                    x: keyParts[1],
                    y: (groupedData[key].sum / groupedData[key].count)
                };
            });

        console.log(avgGroupedData);

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
                                Currently Viewing: 
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
                                Currently Viewing: 
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
                                    "itemWidth": 80,
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
