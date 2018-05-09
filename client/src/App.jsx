import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import Chart from './components/Chart.jsx';



class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount() {
		fetch('/api/chartingData')
		.then(response => response.json())
		.then(body => this.setState({chartData: body}));

		fetch('/api/timeChartData')
		.then(response => response.json())
		.then(body => this.setState({timeChartData: body}));
	}

	render() {
		return (
			<div class="mainContainer">
				<NavBar />
				<div>
					<h1> React is working </h1>
				<Chart />
				</div>
			</div>
		)
	}
}



ReactDOM.render(<App/>, document.getElementById('app'));