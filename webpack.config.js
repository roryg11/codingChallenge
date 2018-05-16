'use strict';

let path = require('path');
let SRC_DIR = path.join(__dirname, '/client/src/');
let DIST_DIR = path.join(__dirname, '/client/dist/')

module.exports = {
  entry: `${SRC_DIR}/App.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      },
     {
        test:/\.css$/,
        loader:['style-loader','css-loader']
      }
    ]
  }
}


