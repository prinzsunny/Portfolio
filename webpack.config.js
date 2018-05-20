const path = require('path');

const config = {
  entry: {
    app: './server/server.js'
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
  devtool: 'inline-source-map'
}

module.exports = config;