import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import LineChartComponent from './components/LineChart.jsx';
import BarChartComponent from './components/BarChart.jsx';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';


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
      <div>
        <h1> Music Preferences Data </h1>
        <div class="appContainer">
         <Router>
            <Switch>
              <Route exact path='/' component={NavBar} />
              <Route path="/bar" component={BarChartComponent} />
              <Route path="/line" component={LineChartComponent} />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

 ReactDOM.render(<App />, document.getElementById('app'));