const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const path = require("path");
const webpackConfig = require("../webpack.client.config.js");

const app = express();
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    filename: "client.bundle.js",
    publicPath: "/",
    stats: {
      colors: true
    },
    historyApiFallback: true
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000
  })
);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname, "../dist/public/index.html"));
});

const server = app.listen(3000, () => {
  const { host, port } = server.address();
  console.log("Example app listening at http://%s:%s", host, port);
});
