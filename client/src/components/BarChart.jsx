import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class BarChartComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			organizationCriteria: this.props.organizationCriteria
		}
	}

	componentDidMount() {
		fetch('/api/chartingData')
		.then(response => response.json())
		.then(body => {
			let data = body.data.map(entry => {
				return {name: entry.displayables[0].displayInfo.name, 'total listens': entry.value}
			})
			this.setState({chartData: data});
		});
	}

	organizeBy(criteria) {
		if (criteria === 'frequencyOfListen') {
			let frequencySort = this.state.chartData.sort(function(a, b) {
				return a['total listens'] - b['total listens'];
			});
			this.setState({chartData: frequencySort});
		}
		if (criteria === 'alphabetical') {
			let alphabeticalSort = this.state.chartData.sort(this.alphabeticalSort);
			this.setState({chartData: alphabeticalSort});
		}
	}

	frequencyOfListenSort(a, b) {
		return a['total listens'] > b['total listens'] ? -1 : 1;
	}

	alphabeticalSort(a, b) {
		return a[0].toLowerCase() > b[0].toLowerCase() ? -1 : 1;
	}

	render() {
		return (
			<BarChart width={900} height={400} data={this.state.chartData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="total listens" fill="#82ca9d" />
      </BarChart>
		)
	}
}


export default BarChartComponent;