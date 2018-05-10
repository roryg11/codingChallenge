import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const BarChartComponent = (props) => {

	if (props.artistInfo){
		var data = props.artistInfo.data.map(entry => {
			return {name: entry.displayables[0].displayInfo.name, 'total listens': entry.value}
		})
	}

  	return (
    	<BarChart width={900} height={400} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="total listens" fill="#82ca9d" />
      </BarChart>
    );
 }
export default BarChartComponent;
