const path = require('path');

const config = {
  entry: {
    server: './server/server.js'
  },
  target: 'node',
  mode:"development",
  output: {
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  node:{
    __dirname:false
  }
}

module.exports = config;