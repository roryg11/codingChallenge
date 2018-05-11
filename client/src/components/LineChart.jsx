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
  }

  componentDidMount() {
   fetch('/api/timeChartData')
   .then(response => response.json())
   .then(body => {
      let data = body.data.map(entry => {
        let formattedDate = this.formatDate(entry.date);
        return {dateString: formattedDate, 'number of listens': entry.value, target: 400, unixDate: entry.date}
      });
      this.setState({timeChartData: data})
    })
   .catch(error => {
      this.setState({error: true});
      console.log(error);
    });
  }

  formatDate(unixTimestamp) {
    let readableDate = new Date(unixTimestamp);
    return readableDate.toString().split(' ').slice(0, 4).join(' ');
  }

  filterRange() {
    if (this.state.dayFrom && this.state.dayTo) {
      if (this.state.dayFrom > this.state.dayTo) {
        this.setState({modalOpen: true, modalMessage: 'Invalid date range. Please check the dates and try again.'});
      } else {
        let filteredDates = this.state.timeChartData.filter(date => {
          let convertedDate = new Date(date.dateString);
          if (convertedDate >= this.state.dayFrom && convertedDate <= this.state.dayTo) return convertedDate
        });
        filteredDates.length > 0 ? this.setState({filteredData: filteredDates}) : this.setState({modalOpen: true, modalMessage: 'No data in that range.'})
      }
    } else {
      this.setState({modalOpen: true, modalMessage: 'Please select date range.'})
    }
  }

  resetRange() {
    this.setState({filteredData: null});
  }

  onOpenModal() {
    this.setState({
      modalOpen: true
    });
  }

  onCloseModal() {
    this.setState({
      modalOpen: false
    });
  }

  renderErrorMessage() {
    return (
      <span class="errorNotice">Error retrieving data from server. Please try again later.</span>
    )
  }

  render() {
    const {modalOpen} = this.state;
    return (
      <div>
      { this.state.error 
        ? this.renderErrorMessage()
        : <div class="chartComponent">
          <LineChart width={900} height={400} data={this.state.filteredData || this.state.timeChartData}
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
              <span>To: </span> 
              <DayPickerInput class="dateInput" id="to" onDayChange={(day) => this.setState({dayTo: day})}/> 
            </div>
            <button class="controlButton" onClick={() => {this.filterRange()}}>Find in range</button>
            <button class="controlButton" onClick={() => {this.resetRange()}}>Show all dates</button>
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
