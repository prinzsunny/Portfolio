const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    client: './client/client.js'
  },
  target: 'web',
  mode:"development",
  output: {
    path: path.resolve(__dirname, "dist/public/"),
    filename: '[name].bundle.js',
    publicPath: '/'
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
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: path.resolve(__dirname, "assets/index.html")
    }) ],
  devtool: 'inline-source-map'
}

module.exports = config;