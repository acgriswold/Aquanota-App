import React, { Component } from 'react';
import '../css/Chart.css';
import { ResponsivePie } from "@nivo/pie";

const dataSet = [{
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
}];

const colorPalette = [
    "hsl(212, 88%, 27%)",
    "hsl(205, 91%, 35%)",
    "hsl(200, 63%, 46%)",
    "hsl(194, 60%, 57%)",
    "hsl(174, 44%, 64%)",
];

class DisplayGraphPie extends Component {
    render() {
        return (
            <div className="Display">
                <header className="Chart-header">
                    <p>
                        <code> Pies of what is in your water!!  (<i>Spoiler Alert!!</i> - It's not pie) </code>
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
                        /*defs={[
                            {
                                "id": "dots",
                                "type": "patternDots",
                                "background": "inherit",
                                "color": "rgba(255, 255, 255, 0.3)",
                                "size": 4,
                                "padding": 1,
                                "stagger": true
                            },
                            {
                                "id": "lines",
                                "type": "patternLines",
                                "background": "inherit",
                                "color": "rgba(255, 255, 255, 0.3)",
                                "rotation": -45,
                                "lineWidth": 6,
                                "spacing": 10
                            }
                        ]}
                        fill={[
                            {
                                "match": {
                                    "id": "Chlorate"
                                },
                                "id": "lines"
                            },
                        ]}*/
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

export default DisplayGraphPie;
