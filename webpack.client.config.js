const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    client: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './client/client.js']
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
    }),
    new webpack.HotModuleReplacementPlugin(),
 ],
  devtool: 'inline-source-map'
}

module.exports = config;