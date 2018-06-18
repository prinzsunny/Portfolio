const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const path = require("path");
const mongoose = require("mongoose");
const serverConfig = require("./config");

const app = express();

mongoose.connect(serverConfig.mongoURL, error => {
  if (error) {
    console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
    throw error;
  }
});

if (process.env.NODE_ENV  && process.env.NODE_ENV === "development") {
  const webpackConfig = require("../webpack.client.dev.js");
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
}

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname, "../dist/public/index.html"));
});

const server = app.listen(3000, () => {
  const { host, port } = server.address();
  console.log("Example app listening at http://%s:%s", host, port);
});
