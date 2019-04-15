import React, { Component } from 'react';
import '../css/Chart.css';
import { ResponsivePie } from "@nivo/pie";

import LinearProgress from '@material-ui/core/LinearProgress';

let dataSet = [{
            "id": "Chlorate",
            "label": "Chlorate",
            "value": 266,
        },
        {
            "id": "Nitrate",
            "label": "Nitrate",
            "value": 165,
        },
        {
            "id": "Nitrite",
            "label": "Nitrite",
            "value": 80,
        },
        {
            "id": "Dissolved Oxygen",
            "label": "Dissolved Oxygen",
            "value": 92,
        }
    ];

const colorPalette = [
    "hsl(212, 88%, 27%)",
    "hsl(205, 91%, 35%)",
    "hsl(200, 63%, 46%)",
    "hsl(194, 60%, 57%)",
    "hsl(174, 44%, 64%)",
];

class DisplayGraphPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sensorType: props.id,
            data: [{
                "id": "Chlorate",
                "label": "Chlorate",
                "value": 266,
            },
            {
                "id": "Nitrate",
                "label": "Nitrate",
                "value": 165,
            },
            {
                "id": "Nitrite",
                "label": "Nitrite",
                "value": 80,
            },
            {
                "id": "Dissolved Oxygen",
                "label": "Dissolved Oxygen",
                "value": 92,
            }]
        };

        const displayGraph = this;
        setTimeout(function () {
            displayGraph.setState({
                isLoaded: true,
                // data: graphData,
                error: false
            });
        }, 1000);

        //commented out because logic isn't really here
        //id want parts per million with different nutrients in water
        //doesn't work with pH vs conductivity vs temp
        // var url = "https://zs1uuzh2ie.execute-api.us-east-2.amazonaws.com/beta/tankdata/1/1-1-1/9999-12-31/"

        // fetch(url, {
        //         method: "GET"
        //     })
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             var data = result.Items;

        //             //Group data by SubjectEventID
        //             var groupedData = data.reduce(function (r, a) {
        //                 //Used as Object for Iterations
        //                 r[a.SubjectEventID] = r[a.SubjectEventID] || [];
        //                 r[a.SubjectEventID].push(a);

        //                 return r;
        //             }, []);

        //             var graphData = [];
        //             //Loops through groupedData and and sort for each sensor
        //             Object.keys(groupedData).forEach(function (key, index) {
        //                 var sensorData = {
        //                     id: key,
        //                     label: key
        //                 };

        //                 //Find averages for each data and save to data;
        //                 sensorData.value = displayGraph._returnAverageResult(this[key]);

        //                 graphData.push(sensorData)
        //             }, groupedData);

        //             console.log(graphData);

        //             setTimeout(function () {
        //                 displayGraph.setState({
        //                     isLoaded: true,
        //                     data: graphData,
        //                     error: false
        //                 });
        //             }, 1000);
        //         },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         (error) => {
        //             console.log(error);
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )
    }
    
    _returnAverageResult(objectArr) {
        var sumAndCount = objectArr.reduce(function ({count, sum}, a) {
            return (a.SubjectEventData) ?
                {count: count+1, sum: sum+parseFloat(a.SubjectEventData)} :
                {count, sum};
        }, {count:0, sum:0});

        return (sumAndCount.sum/sumAndCount.count);
    }

    _updateGraph() {
        dataSet = this.state.data;
    }
    
    render() {
        let { error, isLoaded } = this.state;
        this._updateGraph();

        if (error) {
            return (<div className="Display">
                    <header className="Chart-header">
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
                        <p>
                            <code> All Time Averages </code>
                        </p>
                    </ header>
                    <div className="Display-pie">
                        <ResponsivePie
                            data = { dataSet }
                            margin={{
                                "top": 40,
                                "right": 80,
                                "bottom": 80,
                                "left": 80
                            }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            colors = {
                                colorPalette
                            }
                            colorBy="id"
                            borderWidth={1}
                            borderColor="inherit:darker(0.2)"
                            radialLabelsSkipAngle={10}
                            radialLabelsTextXOffset={6}
                            radialLabelsTextColor="#333333"
                            radialLabelsLinkOffset={0}
                            radialLabelsLinkDiagonalLength={16}
                            radialLabelsLinkHorizontalLength={24}
                            radialLabelsLinkStrokeWidth={1}
                            radialLabelsLinkColor="inherit"
                            slicesLabelsSkipAngle={10}
                            slicesLabelsTextColor="#333333"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            legends={[
                                {
                                    "anchor": "bottom",
                                    "direction": "row",
                                    "translateY": 56,
                                    "itemWidth": 100,
                                    "itemHeight": 18,
                                    "itemTextColor": "#999",
                                    "symbolSize": 18,
                                    "symbolShape": "circle",
                                    "effects": [
                                        {
                                            "on": "hover",
                                            "style": {
                                                "itemTextColor": "#000"
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default DisplayGraphPie;
