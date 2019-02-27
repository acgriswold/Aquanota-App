import React, { Component } from 'react';
import '../css/Chart.css';
import { ResponsiveLine } from "@nivo/line";

import TankMenu from "./TankMenu";

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
            isLoaded: true,
            data: [{
                "id": "",
                "color": "hsl(353, 70%, 50%)",
                "data": [{
                    "x": 0,
                    "y": 0
                }]
            }]
        };

        fetch("https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/1",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: false
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
        let reqURL = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/"
        //send request to specific url for selected tank
        reqURL += value;

        fetch(reqURL, {method: "GET"})
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.data){
                        this.setState({
                            isLoaded: true,
                            data: result.data
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
                        error: false
                    });
                }
            )
    };

    changeDate = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    render() {
        let { error, isLoaded } = this.state;
        this._updateGraph();

        if (error) {
            return (<code> error! </code>)
        } else if (!isLoaded) {
            return (<header className="Chart-header">
                        <p>
                            <code> 
                                Loading... 
                            </code> 
                        </p>
                    </header>)
        } else {
            return (
                <div className="Display">
                    <header className="Chart-header">
                        <p>
                            <code> 
                                Currently Viewing: 
                                <TankMenu onChange={this.onChange.bind(this)}></TankMenu>
                            </code> 
                        </p>
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
