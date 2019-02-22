import React, { Component } from 'react';
import '../css/Chart.css';
import { ResponsiveLine } from "@nivo/line";

import TankMenu from "./TankMenu";

const dataSet1 = [{
        "id": "DO",
        "color": "hsl(1, 70%, 50%)",
        "data": [
        {
            "x": 1,
            "y": 285
        },
        {
            "x": 3,
            "y": 286
        },
        {
            "x": 5,
            "y": 84
        },
        {
            "x": 7,
            "y": 108
        },
        {
            "x": 9,
            "y": 300
        },
        {
            "x": 11,
            "y": 204
        },
        {
            "x": 13,
            "y": 7
        },
        {
            "x": 15,
            "y": 198
        },
        {
            "x": 17,
            "y": 221
        },
        {
            "x": 19,
            "y": 281
        }
        ]
    },
    {
        "id": "Temp",
        "color": "hsl(4, 70%, 50%)",
        "data": [
        {
            "x": 1,
            "y": 222
        },
        {
            "x": 3,
            "y": 17
        },
        {
            "x": 5,
            "y": 262
        },
        {
            "x": 7,
            "y": 69
        },
        {
            "x": 9,
            "y": 223
        },
        {
            "x": 11,
            "y": 26
        },
        {
            "x": 13,
            "y": 69
        },
        {
            "x": 15,
            "y": 82
        },
        {
            "x": 17,
            "y": 109
        },
        {
            "x": 19,
            "y": 27
        }
        ]
    },
    {
        "id": "pH",
        "color": "hsl(41, 70%, 50%)",
        "data": [
        {
            "x": 1,
            "y": 48
        },
        {
            "x": 3,
            "y": 269
        },
        {
            "x": 5,
            "y": 19
        },
        {
            "x": 7,
            "y": 181
        },
        {
            "x": 9,
            "y": 18
        },
        {
            "x": 11,
            "y": 290
        },
        {
            "x": 13,
            "y": 131
        },
        {
            "x": 15,
            "y": 103
        },
        {
            "x": 17,
            "y": 151
        },
        {
            "x": 19,
            "y": 226
        }
        ]
    },
    {
        "id": "Chlorate",
        "color": "hsl(93, 70%, 50%)",
        "data": [
        {
            "x": 1,
            "y": 98
        },
        {
            "x": 3,
            "y": 191
        },
        {
            "x": 5,
            "y": 254
        },
        {
            "x": 7,
            "y": 282
        },
        {
            "x": 9,
            "y": 8
        },
        {
            "x": 11,
            "y": 154
        },
        {
            "x": 13,
            "y": 141
        },
        {
            "x": 15,
            "y": 86
        },
        {
            "x": 17,
            "y": 160
        },
        {
            "x": 19,
            "y": 292
        }
        ]
    },
    {
        "id": "Nitrate",
        "color": "hsl(353, 70%, 50%)",
        "data": [
        {
            "x": 1,
            "y": 268
        },
        {
            "x": 3,
            "y": 156
        },
        {
            "x": 5,
            "y": 77
        },
        {
            "x": 7,
            "y": 38
        },
        {
            "x": 9,
            "y": 12
        },
        {
            "x": 11,
            "y": 178
        },
        {
            "x": 13,
            "y": 287
        },
        {
            "x": 15,
            "y": 117
        },
        {
            "x": 17,
            "y": 9
        },
        {
            "x": 19,
            "y": 86
        }
        ]
    }];
const dataSet2 = [{
        "id": "DO",
        "color": "hsl(1, 70%, 50%)",
        "data": [{
                "x": 1,
                "y": 106
            },
            {
                "x": 3,
                "y": 48
            },
            {
                "x": 5,
                "y": 293
            },
            {
                "x": 7,
                "y": 384
            },
            {
                "x": 9,
                "y": 187
            },
            {
                "x": 11,
                "y": 100
            },
            {
                "x": 13,
                "y": 367
            },
            {
                "x": 15,
                "y": 109
            },
            {
                "x": 17,
                "y": 8
            },
            {
                "x": 19,
                "y": 270
            }
        ]
    },
    {
        "id": "Temp",
        "color": "hsl(4, 70%, 50%)",
        "data": [{
                "x": 1,
                "y": 239
            },
            {
                "x": 3,
                "y": 286
            },
            {
                "x": 5,
                "y": 166
            },
            {
                "x": 7,
                "y": 276
            },
            {
                "x": 9,
                "y": 7
            },
            {
                "x": 11,
                "y": 257
            },
            {
                "x": 13,
                "y": 352
            },
            {
                "x": 15,
                "y": 150
            },
            {
                "x": 17,
                "y": 353
            },
            {
                "x": 19,
                "y": 363
            }
        ]
    },
    {
        "id": "pH",
        "color": "hsl(41, 70%, 50%)",
           "data": [{
                   "x": 1,
                   "y": 276
               },
               {
                   "x": 3,
                   "y": 78
               },
               {
                   "x": 5,
                   "y": 138
               },
               {
                   "x": 7,
                   "y": 331
               },
               {
                   "x": 9,
                   "y": 18
               },
               {
                   "x": 11,
                   "y": 74
               },
               {
                   "x": 13,
                   "y": 41
               },
               {
                   "x": 15,
                   "y": 213
               },
               {
                   "x": 17,
                   "y": 219
               },
               {
                   "x": 19,
                   "y": 217
               }
           ]
    },
    {
        "id": "Chlorate",
        "color": "hsl(93, 70%, 50%)",
          "data": [{
                  "x": 1,
                  "y": 23
              },
              {
                  "x": 3,
                  "y": 236
              },
              {
                  "x": 5,
                  "y": 36
              },
              {
                  "x": 7,
                  "y": 162
              },
              {
                  "x": 9,
                  "y": 226
              },
              {
                  "x": 11,
                  "y": 68
              },
              {
                  "x": 13,
                  "y": 33
              },
              {
                  "x": 15,
                  "y": 328
              },
              {
                  "x": 17,
                  "y": 398
              },
              {
                  "x": 19,
                  "y": 365
              }
          ]
    },
    {
        "id": "Nitrate",
        "color": "hsl(353, 70%, 50%)",
    "data": [{
            "x": 1,
            "y": 325
        },
        {
            "x": 3,
            "y": 171
        },
        {
            "x": 5,
            "y": 22
        },
        {
            "x": 7,
            "y": 140
        },
        {
            "x": 9,
            "y": 44
        },
        {
            "x": 11,
            "y": 72
        },
        {
            "x": 13,
            "y": 134
        },
        {
            "x": 15,
            "y": 185
        },
        {
            "x": 17,
            "y": 243
        },
        {
            "x": 19,
            "y": 248
        }
    ]
    }
];

const dataSet3 = [
  {
    "id": "DO",
    "color": "hsl(1, 70%, 50%)",
    "data": [
      {
        "x": 1,
        "y": 123
      },
      {
        "x": 3,
        "y": 184
      },
      {
        "x": 5,
        "y": 124
      },
      {
        "x": 7,
        "y": 194
      },
      {
        "x": 9,
        "y": 54
      },
      {
        "x": 11,
        "y": 298
      },
      {
        "x": 13,
        "y": 245
      },
      {
        "x": 15,
        "y": 7
      },
      {
        "x": 17,
        "y": 309
      },
      {
        "x": 19,
        "y": 42
      }
    ]
  },
  {
    "id": "Temp",
    "color": "hsl(4, 70%, 50%)",
    "data": [
      {
        "x": 1,
        "y": 217
      },
      {
        "x": 3,
        "y": 286
      },
      {
        "x": 5,
        "y": 11
      },
      {
        "x": 7,
        "y": 65
      },
      {
        "x": 9,
        "y": 228
      },
      {
        "x": 11,
        "y": 143
      },
      {
        "x": 13,
        "y": 86
      },
      {
        "x": 15,
        "y": 103
      },
      {
        "x": 17,
        "y": 317
      },
      {
        "x": 19,
        "y": 192
      }
    ]
  },
  {
    "id": "pH",
    "color": "hsl(41, 70%, 50%)",
    "data": [
      {
        "x": 1,
        "y": 93
      },
      {
        "x": 3,
        "y": 323
      },
      {
        "x": 5,
        "y": 138
      },
      {
        "x": 7,
        "y": 42
      },
      {
        "x": 9,
        "y": 18
      },
      {
        "x": 11,
        "y": 172
      },
      {
        "x": 13,
        "y": 73
      },
      {
        "x": 15,
        "y": 79
      },
      {
        "x": 17,
        "y": 189
      },
      {
        "x": 19,
        "y": 192
      }
    ]
  },
  {
    "id": "Chlorate",
    "color": "hsl(93, 70%, 50%)",
    "data": [
      {
        "x": 1,
        "y": 260
      },
      {
        "x": 3,
        "y": 16
      },
      {
        "x": 5,
        "y": 266
      },
      {
        "x": 7,
        "y": 88
      },
      {
        "x": 9,
        "y": 156
      },
      {
        "x": 11,
        "y": 151
      },
      {
        "x": 13,
        "y": 307
      },
      {
        "x": 15,
        "y": 85
      },
      {
        "x": 17,
        "y": 4
      },
      {
        "x": 19,
        "y": 244
      }
    ]
  },
  {
    "id": "Nitrate",
    "color": "hsl(353, 70%, 50%)",
    "data": [
      {
        "x": 1,
        "y": 115
      },
      {
        "x": 3,
        "y": 313
      },
      {
        "x": 5,
        "y": 379
      },
      {
        "x": 7,
        "y": 381
      },
      {
        "x": 9,
        "y": 395
      },
      {
        "x": 11,
        "y": 194
      },
      {
        "x": 13,
        "y": 137
      },
      {
        "x": 15,
        "y": 81
      },
      {
        "x": 17,
        "y": 231
      },
      {
        "x": 19,
        "y": 309
      }
    ]
  }
]
let dataSet = dataSet3;

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
        this.state = { }
    }

    onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});

        if (value === "Tank 1") {
            dataSet = dataSet3;
        } else if (value === "Tank 2") {
            dataSet = dataSet2;
        } else if (value === "Tank 3") {
            dataSet = dataSet1;
        }
    };

    changeDate = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    render() {
        return (
            <div className="Display">
                <header className="Chart-header">
                    <p>
                        <code> 
                            Now Viewing 
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

export default DisplayGraphLine;
