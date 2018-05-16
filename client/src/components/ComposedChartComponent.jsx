import React from 'react';
import NavBar from './NavBar.jsx';
import LineChartComponent from './LineChart.jsx';
import BarChartComponent from './BarChart.jsx';

class ComposedChartComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				<LineChartComponent /> 
				<BarChartComponent />
			</div>
		)
	}
}

export default ComposedChartComponent;