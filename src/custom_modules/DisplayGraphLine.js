import React, { Component } from 'react';
import '../css/Chart.css';
import { ResponsiveLine } from "@nivo/line";

const dataSet = [{
                                "id": "japan",
                                "color": "hsl(1, 70%, 50%)",
                                "data": [
                                {
                                    "x": "plane",
                                    "y": 285
                                },
                                {
                                    "x": "helicopter",
                                    "y": 286
                                },
                                {
                                    "x": "boat",
                                    "y": 84
                                },
                                {
                                    "x": "train",
                                    "y": 108
                                },
                                {
                                    "x": "subway",
                                    "y": 300
                                },
                                {
                                    "x": "bus",
                                    "y": 204
                                },
                                {
                                    "x": "car",
                                    "y": 7
                                },
                                {
                                    "x": "moto",
                                    "y": 198
                                },
                                {
                                    "x": "bicycle",
                                    "y": 221
                                },
                                {
                                    "x": "others",
                                    "y": 281
                                }
                                ]
                            },
                            {
                                "id": "france",
                                "color": "hsl(4, 70%, 50%)",
                                "data": [
                                {
                                    "x": "plane",
                                    "y": 222
                                },
                                {
                                    "x": "helicopter",
                                    "y": 17
                                },
                                {
                                    "x": "boat",
                                    "y": 262
                                },
                                {
                                    "x": "train",
                                    "y": 69
                                },
                                {
                                    "x": "subway",
                                    "y": 223
                                },
                                {
                                    "x": "bus",
                                    "y": 26
                                },
                                {
                                    "x": "car",
                                    "y": 69
                                },
                                {
                                    "x": "moto",
                                    "y": 82
                                },
                                {
                                    "x": "bicycle",
                                    "y": 109
                                },
                                {
                                    "x": "others",
                                    "y": 27
                                }
                                ]
                            },
                            {
                                "id": "us",
                                "color": "hsl(41, 70%, 50%)",
                                "data": [
                                {
                                    "x": "plane",
                                    "y": 48
                                },
                                {
                                    "x": "helicopter",
                                    "y": 269
                                },
                                {
                                    "x": "boat",
                                    "y": 19
                                },
                                {
                                    "x": "train",
                                    "y": 181
                                },
                                {
                                    "x": "subway",
                                    "y": 18
                                },
                                {
                                    "x": "bus",
                                    "y": 290
                                },
                                {
                                    "x": "car",
                                    "y": 131
                                },
                                {
                                    "x": "moto",
                                    "y": 103
                                },
                                {
                                    "x": "bicycle",
                                    "y": 151
                                },
                                {
                                    "x": "others",
                                    "y": 226
                                }
                                ]
                            },
                            {
                                "id": "germany",
                                "color": "hsl(93, 70%, 50%)",
                                "data": [
                                {
                                    "x": "plane",
                                    "y": 98
                                },
                                {
                                    "x": "helicopter",
                                    "y": 191
                                },
                                {
                                    "x": "boat",
                                    "y": 254
                                },
                                {
                                    "x": "train",
                                    "y": 282
                                },
                                {
                                    "x": "subway",
                                    "y": 8
                                },
                                {
                                    "x": "bus",
                                    "y": 154
                                },
                                {
                                    "x": "car",
                                    "y": 141
                                },
                                {
                                    "x": "moto",
                                    "y": 86
                                },
                                {
                                    "x": "bicycle",
                                    "y": 160
                                },
                                {
                                    "x": "others",
                                    "y": 292
                                }
                                ]
                            },
                            {
                                "id": "norway",
                                "color": "hsl(353, 70%, 50%)",
                                "data": [
                                {
                                    "x": "plane",
                                    "y": 268
                                },
                                {
                                    "x": "helicopter",
                                    "y": 156
                                },
                                {
                                    "x": "boat",
                                    "y": 77
                                },
                                {
                                    "x": "train",
                                    "y": 38
                                },
                                {
                                    "x": "subway",
                                    "y": 12
                                },
                                {
                                    "x": "bus",
                                    "y": 178
                                },
                                {
                                    "x": "car",
                                    "y": 287
                                },
                                {
                                    "x": "moto",
                                    "y": 117
                                },
                                {
                                    "x": "bicycle",
                                    "y": 9
                                },
                                {
                                    "x": "others",
                                    "y": 86
                                }
                                ]
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
    render() {
        return (
            <div className="Display">
                <header className="Chart-header">
                    <p>
                        <code> Chart of Tank v. Tank v. Tank </code>
                    </p>
                </ header>
                <div className="Display-chart">
                    <ResponsiveLine
                        data={dataSet}
                        margin={{
                            "top": 50,
                            "right": 110,
                            "bottom": 50,
                            "left": 60
                        }}
                        xScale={{
                            "type": "point"
                        }}
                        yScale={{
                            "type": "linear",
                            "stacked": true,
                            "min": "auto",
                            "max": "auto"
                        }}
                        curve="monotoneX"
                        axisTop="null"
                        axisRight="null"
                        axisBottom={{
                            "orient": "bottom",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "transportation",
                            "legendOffset": 36,
                            "legendPosition": "middle"
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "count",
                            "legendOffset": -40,
                            "legendPosition": "middle"
                        }}
                        colors={colorPalette}
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
                        legends={[
                            {
                                "anchor": "bottom-right",
                                "color": "white",
                                "direction": "column",
                                "justify": false,
                                "translateX": 100,
                                "translateY": 0,
                                "itemsSpacing": 0,
                                "itemDirection": "left-to-right",
                                "itemWidth": 80,
                                "itemHeight": 20,
                                "itemOpacity": 0.75,
                                "symbolSize": 12,
                                "symbolShape": "circle",
                                "symbolBorderColor": "rgba(255, 255, 255, .5)",
                                "effects": [
                                    {
                                        "on": "hover",
                                        "style": {
                                            "itemBackground": "rgba(0, 0, 0, .03)",
                                            "itemOpacity": 1
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

export default DisplayGraphLine;
