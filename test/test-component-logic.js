
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
  /* TODO: 
    - test sorting functions with chartData.js
  */
})

