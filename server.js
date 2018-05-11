var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('request');
var chartData = require('./services/chartData.js')();
var timeChartData = require('./services/timeChartData.js')();
var errorChartData = require('./services/errorChartData.js')();
var path = require('path');

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

app.get("/api/timeChartData", (req, res) => {
  res.json(timeChartData);
   // res.json(errorChartData)
});

// application -------------------------------------
app.get("/home", (req,res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));

});

app.listen(7060);
console.log('App listening on port 7060');
