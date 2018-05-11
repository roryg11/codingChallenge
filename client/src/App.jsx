import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import LineChartComponent from './components/LineChart.jsx';
import BarChartComponent from './components/BarChart.jsx';


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			organizationCriteria: 'alphabetical'
		};
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
				<div class="chartContainer">
				  { this.state.chartType === 'Listens by artist'
					? <BarChartComponent />
					:	<LineChartComponent />
					}		
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));