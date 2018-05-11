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
	  const {modalOpen} = this.state;
		return (
			<div class="appContainer">
				<h1> Music Preferences Data </h1>
				<div class="navContainer">
					<NavBar selectChart={this.handleChartSelection.bind(this)}/>
				</div>
				<div class="chartContainer">
					<BarChartComponent />
				</div>
					<br/>
				<div class="chartContainer secondary">
					<LineChartComponent weeklyPlays={this.state.timeChartData}/>
				</div>		
			</div>
		)
	}
}



ReactDOM.render(<App/>, document.getElementById('app'));