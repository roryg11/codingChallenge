import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class BarChartComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			organizationCriteria: 'alphabetical',
			showResults: false,
			ordering: 'descending',
			chartData: []
		}

		this.search = this.search.bind(this);
		this.updateSearchValue = this.updateSearchValue.bind(this);
		this.frequencySort = this.frequencySort.bind(this);
	}

	componentDidMount() {
		fetch('/api/chartingData')
		.then(response => response.json())
		.then(body => {
			const data = body.data.map(entry => {
				return {name: entry.displayables[0].displayInfo.name, 'total listens': entry.value}
			});
			this.setState({chartData: data});
		})
		.catch(error => {
			console.log(error);
			this.setState({error: true});
		});
	}

	alphabeticalSort(a, b) {
		return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
	}
	
	frequencySort(a, b) {
		if (this.state.ordering === 'descending') {
			return a['total listens'] > b['total listens'] ? -1 : 1;
		}
		if (this.state.ordering === 'ascending') {
			return a['total listens'] > b['total listens'] ? 1 : -1;
		}
	}

	organizeBy(criteria) {
		let sortedData;
		if (criteria === 'frequencyOfListen') {
			sortedData = this.state.chartData.slice().sort(this.frequencySort);
		}

		if (criteria === 'alphabetical') {
			sortedData = this.state.chartData.slice().sort(this.alphabeticalSort);
		}

		this.setState({sortedChartData: sortedData, ordering: this.state.ordering === 'ascending' ? 'descending' : 'ascending'})
	}

	renderErrorMessage() {
		return (
			<span class="errorNotice">Error retrieving data from server. Please try again later.</span>
		)
	}


	search() {

		const query = this.state.query;
		this.state.chartData.find(record => {
			if (record.name.toLowerCase() === query.toLowerCase()) {
				this.setState({showResults: true, query: record.name, queryResults: record['total listens']}); 
			} 
		})
	}

	showResults() {
		return (
			<div class="searchResults"> You've listened to {this.state.query} {this.state.queryResults} times </div> 
		)
	}

	updateSearchValue(event) {
		this.state.query = event.target.value;
	}

	render() {
		const data = this.state.sortedChartData || this.state.chartData.slice();

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
		      			<button class="controlButton" onClick={() => {this.organizeBy('frequencyOfListen')}}>
		      			  Organize by listen count {this.state.ordering === 'ascending' 
		      			  ? <Glyphicon glyph="download"></Glyphicon>
		      			  :<Glyphicon glyph="upload"></Glyphicon> }
		      			</button>
								<button class="controlButton" onClick={() => {this.organizeBy('alphabetical')}}> Organize alphabetically </button>
								<br/>
								<input type="text" id="searchField" placeholder="Artist name" onChange={this.updateSearchValue}></input>
								<button class="controlButton" onClick={this.search}> Find <Glyphicon glyph="search"></Glyphicon> </button>
							</div>
									{ this.state.showResults ? this.showResults() : null}
						</div>
					}
			</div>
		)
	}
}


export default BarChartComponent;


