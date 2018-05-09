import React from 'react';
import ReactDOM from 'react-dom';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



const LineChartComponent = (props) => {

  if (props.weeklyPlays) {
    var data = props.weeklyPlays.data.map(entry => {
      return {date: entry.date, 'number of listens': entry.value, target: 400};
    })
  }

  	return (
    	<LineChart width={900} height={450} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="target" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="number of listens" stroke="#82ca9d" />
      </LineChart>
    );
  }


export default LineChartComponent;
