
const {describe, it} = require('mocha');
const {expect} = require('chai');
const data = require('../services/chartData.js')();
const chart = require('../componentHelpers/chartHelpers.js');


describe('componentHelper', function() {
	// check function exists
	it('should have a function called "alphabeticalSort"', () => {
    expect(typeof chart.alphabeticalSort).to.equal('function');
  });
  it('should have a function called "frequencySort"', () => {
    expect(typeof chart.frequencySort).to.equal('function');
  });
	// check for empty results condition
	it('should return an empty array if no data is found', () => {
	 	expect(JSON.stringify(server.filterByDate(1494806399999, 1, data))).to.equal('[]')
	});
	// check for full data range if dates exceed data range
	it('should return an array with all data if date range exceed data date range', () => {
	 	expect(JSON.stringify(server.filterByDate(1, 14948063999993, data))).to.equal(JSON.stringify(Array.from(data.data)))
	})

	it('should return an array populated with correct records if data in range is found', () => {
		const expected = [{"date": 1486339199999, "value": 222.0}, {"date": 1486943999999, "value": 214.0}, {"date": 1487548799999, "value": 374.0}, 
											{"date": 1488153599999, "value": 275.0}, {"date": 1488758399999, "value": 357.0}, {"date": 1489363199999, "value": 403.0}, {"date": 1489967999999, "value": 383.0}]
	 	expect(JSON.stringify(server.filterByDate(1486339199999, 1489967999999, data))).to.equal(JSON.stringify(Array.from(expected)))
	})
})

