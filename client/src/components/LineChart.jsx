import React from 'react';
import ReactDOM from 'react-dom';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



class LineChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: undefined
    }
  }

  componentDidMount() {
   fetch('/api/timeChartData')
   .then(response => response.json())
   .then(body => {
      let data = body.data.map(entry => {
        let formattedDate = this.formatDate(entry.date);
        return {date: formattedDate, 'number of listens': entry.value, target: 400}
      });
      this.setState({timeChartData: data})
    });
  }

  formatDate(unixTimestamp) {
    let readableDate = new Date(unixTimestamp);
    return readableDate.toString().split(' ').slice(0, 4).join(' ');
  }

  render() {
    return (
      <LineChart width={900} height={450} data={this.state.timeChartData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="target" stroke="#ff0000" />
       <Line type="monotone" dataKey="number of listens" stroke="#82ca9d" />
      </LineChart>
    )
  }
}

export default LineChartComponent;



// const LineChartComponent = (props) => {

//   if (props.weeklyPlays) {
//     var data = props.weeklyPlays.data.map(entry => {
//       return {date: entry.date, 'number of listens': entry.value, target: 400};
//     })
//   }

//   	return (
//     	<LineChart width={900} height={450} data={data}
//             margin={{top: 5, right: 30, left: 20, bottom: 5}}>
//        <XAxis dataKey="date"/>
//        <YAxis/>
//        <CartesianGrid strokeDasharray="3 3"/>
//        <Tooltip/>
//        <Legend />
//        <Line type="monotone" dataKey="target" stroke="#ff0000" />
//        <Line type="monotone" dataKey="number of listens" stroke="#82ca9d" />
//       </LineChart>
//     );
//   }


// export default LineChartComponent;
