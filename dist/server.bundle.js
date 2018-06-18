/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/config.js":
/*!**************************!*\
  !*** ./server/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/portfolio',
  port: process.env.PORT || 8000
};

module.exports = config;

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(/*! express */ "express");
var webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware");
var webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ "webpack-hot-middleware");
var webpack = __webpack_require__(/*! webpack */ "webpack");
var path = __webpack_require__(/*! path */ "path");
var mongoose = __webpack_require__(/*! mongoose */ "mongoose");
var serverConfig = __webpack_require__(/*! ./config */ "./server/config.js");

var app = express();

mongoose.connect(serverConfig.mongoURL, function (error) {
  if (error) {
    console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
    throw error;
  }
});

console.log("============Environment===========");
console.log("development");

if (true) {
  var webpackConfig = __webpack_require__(/*! ../webpack.client.dev.js */ "./webpack.client.dev.js");
  var compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: "client.bundle.js",
    publicPath: "/",
    stats: {
      colors: true
    },
    historyApiFallback: true
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000
  }));
}

app.get("/", function (req, res) {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname, "../dist/public/index.html"));
});

var server = app.listen(3000, function () {
  var _server$address = server.address(),
      host = _server$address.host,
      port = _server$address.port;

  console.log("Example app listening at http://%s:%s", host, port);
});

/***/ }),

/***/ "./webpack.client.dev.js":
/*!*******************************!*\
  !*** ./webpack.client.dev.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(/*! path */ "path");
var HtmlWebpackPlugin = __webpack_require__(/*! html-webpack-plugin */ "html-webpack-plugin");
var webpack = __webpack_require__(/*! webpack */ "webpack");
var WebpackMd5Hash = __webpack_require__(/*! webpack-md5-hash */ "webpack-md5-hash");
var MiniCssExtractPlugin = __webpack_require__(/*! mini-css-extract-plugin */ "mini-css-extract-plugin");
var CleanWebpackPlugin = __webpack_require__(/*! clean-webpack-plugin */ "clean-webpack-plugin");

var config = {
  entry: {
    client: ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", "./client/client.js"]
  },
  target: "web",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist/public/"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["env"]
        }
      }
    }, {
      test: /\.css$/,
      use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.scss$/,
      use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
    }, {
      test: /\.(ttf|eot|woff|woff2|pdf)$/,
      loader: "file-loader",
      options: {
        name: "fonts/[name].[ext]"
      }
    }, {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      loader: "file-loader",
      options: {
        name: "images/[name].[ext]"
      }
    }]
  },
  plugins: [new CleanWebpackPlugin("dist", {}), new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Popper: "popper.js",
    Util: "exports-loader?Util!bootstrap/js/dist/util"
  }), new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }), new MiniCssExtractPlugin({
    filename: "style.[contenthash].css"
  }), new HtmlWebpackPlugin({
    // Also generate a test.html
    filename: "index.html",
    title: "Prince Mukka",
    template: path.resolve(__dirname, "../assets/index.html")
  }), new WebpackMd5Hash(), new webpack.HotModuleReplacementPlugin()],
  devtool: "inline-source-map"
};

module.exports = config;

/***/ }),

/***/ "clean-webpack-plugin":
/*!***************************************!*\
  !*** external "clean-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("clean-webpack-plugin");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),

/***/ "mini-css-extract-plugin":
/*!******************************************!*\
  !*** external "mini-css-extract-plugin" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mini-css-extract-plugin");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ "webpack-md5-hash":
/*!***********************************!*\
  !*** external "webpack-md5-hash" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-md5-hash");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc2VydmVyLmpzIiwid2VicGFjazovLy8uL3dlYnBhY2suY2xpZW50LmRldi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbGVhbi13ZWJwYWNrLXBsdWdpblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodG1sLXdlYnBhY2stcGx1Z2luXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2VicGFjay1kZXYtbWlkZGxld2FyZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndlYnBhY2staG90LW1pZGRsZXdhcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrLW1kNS1oYXNoXCIiXSwibmFtZXMiOlsiY29uZmlnIiwibW9uZ29VUkwiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09fVVJMIiwicG9ydCIsIlBPUlQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXhwcmVzcyIsInJlcXVpcmUiLCJ3ZWJwYWNrRGV2TWlkZGxld2FyZSIsIndlYnBhY2tIb3RNaWRkbGV3YXJlIiwid2VicGFjayIsInBhdGgiLCJtb25nb29zZSIsInNlcnZlckNvbmZpZyIsImFwcCIsImNvbm5lY3QiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJ3ZWJwYWNrQ29uZmlnIiwiY29tcGlsZXIiLCJ1c2UiLCJob3QiLCJmaWxlbmFtZSIsInB1YmxpY1BhdGgiLCJzdGF0cyIsImNvbG9ycyIsImhpc3RvcnlBcGlGYWxsYmFjayIsImhlYXJ0YmVhdCIsImdldCIsInJlcSIsInJlcyIsIl9fZGlybmFtZSIsInNlbmRGaWxlIiwicmVzb2x2ZSIsInNlcnZlciIsImxpc3RlbiIsImFkZHJlc3MiLCJob3N0IiwiSHRtbFdlYnBhY2tQbHVnaW4iLCJXZWJwYWNrTWQ1SGFzaCIsIk1pbmlDc3NFeHRyYWN0UGx1Z2luIiwiQ2xlYW5XZWJwYWNrUGx1Z2luIiwiZW50cnkiLCJjbGllbnQiLCJ0YXJnZXQiLCJtb2RlIiwib3V0cHV0IiwicnVsZXMiLCJ0ZXN0IiwiZXhjbHVkZSIsImxvYWRlciIsIm9wdGlvbnMiLCJwcmVzZXRzIiwibmFtZSIsInBsdWdpbnMiLCJQcm92aWRlUGx1Z2luIiwiJCIsImpRdWVyeSIsIlBvcHBlciIsIlV0aWwiLCJEZWZpbmVQbHVnaW4iLCJKU09OIiwic3RyaW5naWZ5IiwidGl0bGUiLCJ0ZW1wbGF0ZSIsIkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luIiwiZGV2dG9vbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25FQSxJQUFNQSxTQUFTO0FBQ2JDLFlBQVVDLFFBQVFDLEdBQVIsQ0FBWUMsU0FBWixJQUF5QixxQ0FEdEI7QUFFYkMsUUFBTUgsUUFBUUMs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YTtBQUlwQkMsY0FBVXRELEtBQUt1QixPQUFMLENBQWFGLFNBQWIsRUFBd0Isc0JBQXhCO0FBSlUsR0FBdEIsQ0FkTyxFQW9CUCxJQUFJUSxjQUFKLEVBcEJPLEVBcUJQLElBQUk5QixRQUFRd0QsMEJBQVosRUFyQk8sQ0F4REk7QUErRWJDLFdBQVM7QUEvRUksQ0FBZjs7QUFrRkEvRCxPQUFPQyxPQUFQLEdBQWlCUixNQUFqQixDOzs7Ozs7Ozs7OztBQ3pGQSxpRDs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJzZXJ2ZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyL3NlcnZlci5qc1wiKTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgbW9uZ29VUkw6IHByb2Nlc3MuZW52Lk1PTkdPX1VSTCB8fCAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9wb3J0Zm9saW8nLFxuICBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDgwMDAsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZzsiLCJjb25zdCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5jb25zdCB3ZWJwYWNrRGV2TWlkZGxld2FyZSA9IHJlcXVpcmUoXCJ3ZWJwYWNrLWRldi1taWRkbGV3YXJlXCIpO1xuY29uc3Qgd2VicGFja0hvdE1pZGRsZXdhcmUgPSByZXF1aXJlKFwid2VicGFjay1ob3QtbWlkZGxld2FyZVwiKTtcbmNvbnN0IHdlYnBhY2sgPSByZXF1aXJlKFwid2VicGFja1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuY29uc3Qgc2VydmVyQ29uZmlnID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbm1vbmdvb3NlLmNvbm5lY3Qoc2VydmVyQ29uZmlnLm1vbmdvVVJMLCBlcnJvciA9PiB7XG4gIGlmIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJQbGVhc2UgbWFrZSBzdXJlIE1vbmdvZGIgaXMgaW5zdGFsbGVkIGFuZCBydW5uaW5nIVwiKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn0pO1xuXG5jb25zb2xlLmxvZyhcIj09PT09PT09PT09PUVudmlyb25tZW50PT09PT09PT09PT1cIik7XG5jb25zb2xlLmxvZyhwcm9jZXNzLmVudi5OT0RFX0VOVik7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICBjb25zdCB3ZWJwYWNrQ29uZmlnID0gcmVxdWlyZShcIi4uL3dlYnBhY2suY2xpZW50LmRldi5qc1wiKTtcbiAgY29uc3QgY29tcGlsZXIgPSB3ZWJwYWNrKHdlYnBhY2tDb25maWcpO1xuICBhcHAudXNlKFxuICAgIHdlYnBhY2tEZXZNaWRkbGV3YXJlKGNvbXBpbGVyLCB7XG4gICAgICBob3Q6IHRydWUsXG4gICAgICBmaWxlbmFtZTogXCJjbGllbnQuYnVuZGxlLmpzXCIsXG4gICAgICBwdWJsaWNQYXRoOiBcIi9cIixcbiAgICAgIHN0YXRzOiB7XG4gICAgICAgIGNvbG9yczogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGhpc3RvcnlBcGlGYWxsYmFjazogdHJ1ZVxuICAgIH0pXG4gICk7XG4gIGFwcC51c2UoXG4gICAgd2VicGFja0hvdE1pZGRsZXdhcmUoY29tcGlsZXIsIHtcbiAgICAgIGxvZzogY29uc29sZS5sb2csXG4gICAgICBwYXRoOiBcIi9fX3dlYnBhY2tfaG1yXCIsXG4gICAgICBoZWFydGJlYXQ6IDEwICogMTAwMFxuICAgIH0pXG4gICk7XG59XG5cbmFwcC5nZXQoXCIvXCIsIChyZXEsIHJlcykgPT4ge1xuICBjb25zb2xlLmxvZyhfX2Rpcm5hbWUpO1xuICByZXMuc2VuZEZpbGUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9kaXN0L3B1YmxpYy9pbmRleC5odG1sXCIpKTtcbn0pO1xuXG5jb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDMwMDAsICgpID0+IHtcbiAgY29uc3QgeyBob3N0LCBwb3J0IH0gPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBjb25zb2xlLmxvZyhcIkV4YW1wbGUgYXBwIGxpc3RlbmluZyBhdCBodHRwOi8vJXM6JXNcIiwgaG9zdCwgcG9ydCk7XG59KTtcbiIsImNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IEh0bWxXZWJwYWNrUGx1Z2luID0gcmVxdWlyZShcImh0bWwtd2VicGFjay1wbHVnaW5cIik7XG5jb25zdCB3ZWJwYWNrID0gcmVxdWlyZShcIndlYnBhY2tcIik7XG5jb25zdCBXZWJwYWNrTWQ1SGFzaCA9IHJlcXVpcmUoXCJ3ZWJwYWNrLW1kNS1oYXNoXCIpO1xuY29uc3QgTWluaUNzc0V4dHJhY3RQbHVnaW4gPSByZXF1aXJlKFwibWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cIik7XG5jb25zdCBDbGVhbldlYnBhY2tQbHVnaW4gPSByZXF1aXJlKFwiY2xlYW4td2VicGFjay1wbHVnaW5cIik7XG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgZW50cnk6IHtcbiAgICBjbGllbnQ6IFtcbiAgICAgIFwid2VicGFjay1ob3QtbWlkZGxld2FyZS9jbGllbnQ/cGF0aD0vX193ZWJwYWNrX2htciZ0aW1lb3V0PTIwMDAwXCIsXG4gICAgICBcIi4vY2xpZW50L2NsaWVudC5qc1wiXG4gICAgXVxuICB9LFxuICB0YXJnZXQ6IFwid2ViXCIsXG4gIG1vZGU6IFwiZGV2ZWxvcG1lbnRcIixcbiAgb3V0cHV0OiB7XG4gICAgcGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0L3B1YmxpYy9cIiksXG4gICAgZmlsZW5hbWU6IFwiW25hbWVdLltoYXNoXS5qc1wiLFxuICAgIHB1YmxpY1BhdGg6IFwiL1wiXG4gIH0sXG4gIG1vZHVsZToge1xuICAgIHJ1bGVzOiBbXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC5qcyQvLFxuICAgICAgICBleGNsdWRlOiAvbm9kZV9tb2R1bGVzLyxcbiAgICAgICAgdXNlOiB7XG4gICAgICAgICAgbG9hZGVyOiBcImJhYmVsLWxvYWRlclwiLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHByZXNldHM6IFtcImVudlwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGVzdDogL1xcLmNzcyQvLFxuICAgICAgICB1c2U6IFtcInN0eWxlLWxvYWRlclwiLCBNaW5pQ3NzRXh0cmFjdFBsdWdpbi5sb2FkZXIsIFwiY3NzLWxvYWRlclwiXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGVzdDogL1xcLnNjc3MkLyxcbiAgICAgICAgdXNlOiBbXG4gICAgICAgICAgXCJzdHlsZS1sb2FkZXJcIixcbiAgICAgICAgICBNaW5pQ3NzRXh0cmFjdFBsdWdpbi5sb2FkZXIsXG4gICAgICAgICAgXCJjc3MtbG9hZGVyXCIsXG4gICAgICAgICAgXCJwb3N0Y3NzLWxvYWRlclwiLFxuICAgICAgICAgIFwic2Fzcy1sb2FkZXJcIlxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXN0OiAvXFwuKHR0Znxlb3R8d29mZnx3b2ZmMnxwZGYpJC8sXG4gICAgICAgIGxvYWRlcjogXCJmaWxlLWxvYWRlclwiLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbmFtZTogXCJmb250cy9bbmFtZV0uW2V4dF1cIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXN0OiAvXFwuKHBuZ3xzdmd8anBnfGdpZnxqcGVnKSQvLFxuICAgICAgICBsb2FkZXI6IFwiZmlsZS1sb2FkZXJcIixcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG5hbWU6IFwiaW1hZ2VzL1tuYW1lXS5bZXh0XVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBuZXcgQ2xlYW5XZWJwYWNrUGx1Z2luKFwiZGlzdFwiLCB7fSksXG4gICAgbmV3IHdlYnBhY2suUHJvdmlkZVBsdWdpbih7XG4gICAgICAkOiBcImpxdWVyeVwiLFxuICAgICAgalF1ZXJ5OiBcImpxdWVyeVwiLFxuICAgICAgUG9wcGVyOiBcInBvcHBlci5qc1wiLFxuICAgICAgVXRpbDogXCJleHBvcnRzLWxvYWRlcj9VdGlsIWJvb3RzdHJhcC9qcy9kaXN0L3V0aWxcIlxuICAgIH0pLFxuICAgIG5ldyB3ZWJwYWNrLkRlZmluZVBsdWdpbih7XG4gICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KCdkZXZlbG9wbWVudCcpXG4gICAgfSksXG4gICAgbmV3IE1pbmlDc3NFeHRyYWN0UGx1Z2luKHtcbiAgICAgIGZpbGVuYW1lOiBcInN0eWxlLltjb250ZW50aGFzaF0uY3NzXCJcbiAgICB9KSxcbiAgICBuZXcgSHRtbFdlYnBhY2tQbHVnaW4oe1xuICAgICAgLy8gQWxzbyBnZW5lcmF0ZSBhIHRlc3QuaHRtbFxuICAgICAgZmlsZW5hbWU6IFwiaW5kZXguaHRtbFwiLFxuICAgICAgdGl0bGU6IFwiUHJpbmNlIE11a2thXCIsXG4gICAgICB0ZW1wbGF0ZTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9hc3NldHMvaW5kZXguaHRtbFwiKVxuICAgIH0pLFxuICAgIG5ldyBXZWJwYWNrTWQ1SGFzaCgpLFxuICAgIG5ldyB3ZWJwYWNrLkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luKClcbiAgXSxcbiAgZGV2dG9vbDogXCJpbmxpbmUtc291cmNlLW1hcFwiXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsZWFuLXdlYnBhY2stcGx1Z2luXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHRtbC13ZWJwYWNrLXBsdWdpblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtaW5pLWNzcy1leHRyYWN0LXBsdWdpblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2tcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2VicGFjay1kZXYtbWlkZGxld2FyZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLWhvdC1taWRkbGV3YXJlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2stbWQ1LWhhc2hcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==