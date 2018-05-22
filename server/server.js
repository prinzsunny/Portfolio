/*import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

 app.get('/', function response(req, res) {
 	console.log(__dirname);
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
  });

app.listen(3000, () => console.log("Example app listening on port 3000!"));*/

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.client.config.js');
const path = require('path');
const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'client.bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.get('/', function response(req, res) {
 	console.log(__dirname);
    res.sendFile(path.resolve(__dirname, '../dist/public/index.html'));
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


