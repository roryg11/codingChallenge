const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const request = require('request');
const chartData = require('./services/chartData.js')();
const timeChartData = require('./services/timeChartData.js')();
const errorChartData = require('./services/errorChartData.js')();
const helper = require('./serverHelpers/helpers.js');
const path = require('path');

// configuration
app.use(express.static(__dirname + '/client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


// routes =================================

app.get("/api/chartingData", (req, res) => {
  res.json(chartData)
	// res.json(errorChartData)
});

app.get("/api/timeChartData/", (req, res) => {
	let dataToSend;
	let [dayFrom, dayTo] = [req.query.from, req.query.to];
	if (dayFrom && dayTo) dataToSend = helper.filterByDate(dayFrom, dayTo, timeChartData);
  res.json(dataToSend || timeChartData);
   // res.json(errorChartData)
});

// application -------------------------------------
app.get("/home", (req,res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));

});

app.listen(7060);
console.log('App listening on port 7060');
