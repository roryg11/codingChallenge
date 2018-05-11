import React from 'react';
import ReactDOM from 'react-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Modal from 'react-responsive-modal';


class LineChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
    this.requestDates = this.requestDates.bind(this);
    this.resetRange = this.resetRange.bind(this);
  }

  componentDidMount() {
   fetch('/api/timeChartData')
   .then(response => response.json())
   .then(body => {
      const data = this.formatResponse(body.data);
      this.setState({timeChartData: data});
    })
   .catch(error => {
      this.setState({error: true});
      console.log(error);
    });
  }

  formatDate(unixTimestamp) {
    const readableDate = new Date(unixTimestamp);
    return readableDate.toString().split(' ').slice(0, 4).join(' ');
  }


  formatResponse(body) {
    return body.map(entry => {
      const formattedDate = this.formatDate(entry.date);
      return {dateString: formattedDate, 'number of listens': entry.value, target: 400, unixDate: entry.date};
    });
  }


  onCloseModal() {
    this.setState({
      modalOpen: false
    });
  }

  onOpenModal() {
    this.setState({
      modalOpen: true
    });
  }

  rangeIsValid() {
    if (this.state.dayFrom && this.state.dayTo) {
      return this.state.dayFrom < this.state.dayTo ? true : false;
    } else {
      this.setState({modalOpen: true, modalMessage: 'Please select date range.'})
    }
  }

  renderErrorMessage() {
    return (
      <span class="errorNotice">Error retrieving data from server. Please try again later.</span>
    )
  }

  requestDates() {
    if (this.rangeIsValid()) {
      const dayFrom = new Date(this.state.dayFrom).getTime();
      const dayTo = new Date(this.state.dayTo).getTime();
      const urlWithParams = `api/timeChartData?from=${dayFrom}&to=${dayTo}`;
      fetch(urlWithParams)
      .then(response => response.json()) 
      .then(body => {
        const data = this.formatResponse(body);
        data.length > 0 ? this.setState({filteredData: data}) : this.setState({modalOpen: true, modalMessage: 'No data in that range.'});
      })
      .catch(error => {
        this.setState({error: true});
        console.log(error);
      })
    } else {
      this.setState({modalOpen: true, modalMessage: 'Invalid date range. Please check the dates and try again.'}); 
    }
  }

  resetRange() {
    this.setState({filteredData: null});
  }

  render() {
    const {modalOpen} = this.state;
    const data = this.state.filteredData ? this.state.filteredData.slice() : this.state.timeChartData;
    return (
      <div>
      { this.state.error 
        ? this.renderErrorMessage()
        : <div class="chartComponent">
          <LineChart width={900} height={400} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="dateString"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Line type="monotone" dataKey="target" stroke="#ff0000" />
           <Line type="monotone" dataKey="number of listens" stroke="#82ca9d" />
          </LineChart>
          <div class="buttonContainer">
            <div class="dateInput">
              <span>From: </span>
              <DayPickerInput class="dateInput" id="from" onDayChange={(day) => this.setState({dayFrom: day})}/>
              <br/>
              <span id="to">To: </span> 
              <DayPickerInput class="dateInput" onDayChange={(day) => this.setState({dayTo: day})}/> 
            </div>
            <button class="controlButton" onClick={this.requestDates}>Find in range</button>
            <button class="controlButton" onClick={this.resetRange}>Show all dates</button>
          </div>
          <Modal open={modalOpen} center="true" onClose={this.onCloseModal.bind(this)}>
            <div class="modalErrorMessage"> { this.state.modalMessage } </div>
          </Modal>
        </div>
      }
      </div>
    )
  }
}

export default LineChartComponent;
