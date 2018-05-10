import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class BarChartComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			organizationCriteria: 'alphabetical',
			chartData: []
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
		if (a.name[0].toLowerCase() > b.name[0].toLowerCase()){
			return 1;
		} else if (a.name[0].toLowerCase() > b.name[0].toLowerCase()) {
			return -1;
		} else {
			return 0
		}
	}

	render() {
		let data = this.state.chartData.slice();
		return (
			<div class="chartComponent">
				<BarChart width={900} height={400} data={data}
	            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
	       <CartesianGrid strokeDasharray="3 3"/>
	       <XAxis dataKey="name"/>
	       <YAxis/>
	       <Tooltip/>
	       <Legend />
	       <Bar dataKey="total listens" fill="#82ca9d" />
	      </BarChart>
	      <div class="buttonContainer">
		      <button class="controlButton" onClick={() => {this.organizeBy('frequencyOfListen')}}> Organize by listen count</button>
					<button class="controlButton" onClick={() => {this.organizeBy('alphabetical')}}>Organize alphabetically</button>
				</div>
			</div>
		)
	}
}


export default BarChartComponent;


