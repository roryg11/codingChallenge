import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import LineChartComponent from './components/LineChart.jsx';
import BarChartComponent from './components/BarChart.jsx';



class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			chartData: undefined,
			timeChartData: undefined
		};
	}

	componentDidMount() {
		fetch('/api/chartingData')
		.then(response => response.json())
		.then(body => this.setState({chartData: body}));

		fetch('/api/timeChartData')
		.then(response => response.json())
		.then(body => this.setState({timeChartData: body}));
	}

	handleChartSelection(type) {
		this.setState({chartType: type})
	}

	render() {
		return (
			<div class="appContainer">
				<h1> Music Preferences Data </h1>
				<div class="navContainer">
					<NavBar selectChart={this.handleChartSelection.bind(this)}/>
				</div>
				<div class="mainContainer">
					<BarChartComponent artistInfo={this.state.chartData}/>
				</div>
					<br/>
				<div class="secondaryContainer">
					<LineChartComponent weeklyPlays={this.state.timeChartData}/>
				</div>		
			</div>
		)
	}
}



ReactDOM.render(<App/>, document.getElementById('app'));