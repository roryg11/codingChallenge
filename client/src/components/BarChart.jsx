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
			});
			this.setState({chartData: data});
		})
		.catch(error => {
			console.log(error);
			this.setState({error: true});
		});
	}

	organizeBy(criteria) {
		if (criteria === 'frequencyOfListen') {
			this.setState({sortedChartData: this.state.chartData});
		}

		if (criteria === 'alphabetical') {
			let alphabeticalSort = this.state.chartData.slice().sort(this.alphabeticalSort);
			this.setState({sortedChartData: alphabeticalSort});
		}
	}

	frequencyOfListenSort(a, b) {
		return a['total listens'] > b['total listens'] ? 1: -1;
	}

	alphabeticalSort(a, b) {
		return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
	}

	renderErrorMessage() {
		return (
			<span class="errorNotice">Error retrieving data from server. Please try again later.</span>
		)
	}

	updateSearchValue(event) {
		this.state.query = event.target.value;
	}

	search() {
		let query = this.state.query;
		this.state.chartData.find(record => {
			if (record.name === query) console.log(record['total listens'])
		})
	}

	render() {
		let data = this.state.sortedChartData || this.state.chartData.slice();

		return (
			<div>
				{ this.state.error 
					? this.renderErrorMessage()
					: <div class="chartComponent">
							<BarChart width={900} height={400} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					      <CartesianGrid strokeDasharray="3 3"/>
					      <XAxis dataKey="name"/>
					      <YAxis/>
					      <Tooltip/>
					      <Legend />
					      <Bar dataKey="total listens" fill="#82ca9d" />
				      </BarChart>
	      			<div class="buttonContainer">
		      			<button class="controlButton" onClick={() => {this.organizeBy('frequencyOfListen')}}> Organize by listen count</button>
								<button class="controlButton" onClick={() => {this.organizeBy('alphabetical')}}> Organize alphabetically </button>
								<br/>
								<input type="text" id="searchField" placeholder="Artist name" onChange={this.updateSearchValue.bind(this)}></input>
								<button class="controlButton" onClick={this.search.bind(this)}> Search for artist </button>
							</div>
						</div>
					}
			</div>
		)
	}
}


export default BarChartComponent;


