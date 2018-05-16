import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import NavBar from './NavBar.jsx';

class BarChartComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      organizationCriteria: 'alphabetical',
      showResults: false,
      ordering: 'ascending',
      chartData: [],
      query: undefined
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


  search(e) {
    e.preventDefault();
    let queryResults;
    let { query } = this.state;

    if (query) {
      this.state.chartData.find(record => {
        if (record.name.toLowerCase() === query.toLowerCase()) {
          queryResults = record['total listens'];
          query = record.name
        } 
      })
      this.setState({showResults: true, query: query, queryResults: queryResults || 0}); 
    }
  }

  showResults() { // fix empty string problem here 
    const { query, queryResults } = this.state;
    return (
      <div class="searchResults">
      { queryResults !== 0
       ? `You've listened to ${query} ${queryResults} times.`
       : `No data found for ${query}.`
      }
       </div> 
    )
  }

  isValidInput(input) {
    const reducedInput = input.split('').reduce((accum, char) => {
      if (!accum.includes(char)) accum.push(char);
      return accum;
    }, []);
    if (reducedInput.length > 1 && reducedInput !== ' ') return true
    return false
  }

  updateSearchValue(event) {
    const value = event.target.value;
    this.state.query = this.isValidInput(value) ? value : undefined;
  }



  render() {
    const data = this.state.sortedChartData || this.state.chartData;

    return (
      <div>
 
        <div class="chartContainer">
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
                 <form>
                    <input required type="text" id="searchField" placeholder="Artist name" onChange={this.updateSearchValue}></input>
                    <button class="controlButton" onClick={ (e) => {this.search(e)}}> Find <Glyphicon glyph="search"></Glyphicon> </button>
                 </form>
                </div>
              </div>
            }
            </div>
          <br/>
          { this.state.showResults ? this.showResults() : null }
      </div>
    )
  }
}


export default BarChartComponent;


