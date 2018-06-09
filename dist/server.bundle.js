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
var webpackConfig = __webpack_require__(/*! ../webpack.client.dev.js */ "./webpack.client.dev.js");
var serverConfig = __webpack_require__(/*! ./config */ "./server/config.js");

var app = express();
var compiler = webpack(webpackConfig);

mongoose.connect(serverConfig.mongoURL, function (error) {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

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
      test: /\.(ttf|eot|woff|woff2)$/,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc2VydmVyLmpzIiwid2VicGFjazovLy8uL3dlYnBhY2suY2xpZW50LmRldi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbGVhbi13ZWJwYWNrLXBsdWdpblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodG1sLXdlYnBhY2stcGx1Z2luXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2VicGFjay1kZXYtbWlkZGxld2FyZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndlYnBhY2staG90LW1pZGRsZXdhcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrLW1kNS1oYXNoXCIiXSwibmFtZXMiOlsiY29uZmlnIiwibW9uZ29VUkwiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09fVVJMIiwicG9ydCIsIlBPUlQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXhwcmVzcyIsInJlcXVpcmUiLCJ3ZWJwYWNrRGV2TWlkZGxld2FyZSIsIndlYnBhY2tIb3RNaWRkbGV3YXJlIiwid2VicGFjayIsInBhdGgiLCJtb25nb29zZSIsIndlYnBhY2tDb25maWciLCJzZXJ2ZXJDb25maWciLCJhcHAiLCJjb21waWxlciIsImNvbm5lY3QiLCJlcnJvciIsImNvbnNvbGUiLCJ1c2UiLCJob3QiLCJmaWxlbmFtZSIsInB1YmxpY1BhdGgiLCJzdGF0cyIsImNvbG9ycyIsImhpc3RvcnlBcGlGYWxsYmFjayIsImxvZyIsImhlYXJ0YmVhdCIsImdldCIsInJlcSIsInJlcyIsIl9fZGlybmFtZSIsInNlbmRGaWxlIiwicmVzb2x2ZSIsInNlcnZlciIsImxpc3RlbiIsImFkZHJlc3MiLCJob3N0IiwiSHRtbFdlYnBhY2tQbHVnaW4iLCJXZWJwYWNrTWQ1SGFzaCIsIk1pbmlDc3NFeHRyYWN0UGx1Z2luIiwiQ2xlYW5XZWJwYWNrUGx1Z2luIiwiZW50cnkiLCJjbGllbnQiLCJ0YXJnZXQiLCJtb2RlIiwib3V0cHV0IiwicnVsZXMiLCJ0ZXN0IiwiZXhjbHVkZSIsImxvYWRlciIsIm9wdGlvbnMiLCJwcmVzZXRzIiwibmFtZSIsInBsdWdpbnMiLCJQcm92aWRlUGx1Z2luIiwiJCIsImpRdWVyeSIsIlBvcHBlciIsIlV0aWwiLCJ0aXRsZSIsInRlbXBsYXRlIiwiSG90TW9kdWxlUmVwbGFjZW1lbnRQbHVnaW4iLCJkZXZ0b29sIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLElBQU1BLFNBQVM7QUFDYkMsWUFBVUMsUUFBUUMsR0FBUixDQUFZQyxTQUFaLElBQXlCLHFDQUR0QjtBQUViQyxRQUFNSCxRQUFRQyxHQUFSLENBQVlHLElBQVosSUFBb0I7QUFGYixDQUFmOztBQUtBQyxPQUFPQyxPQUFQLEdBQWlCUixNQUFqQixDOzs7Ozs7Ozs7Ozs7OztBQ0xBLElBQU1TLFVBQVUsbUJBQUFDLENBQVEsd0JBQVIsQ0FBaEI7QUFDQSxJQUFNQyx1QkFBdUIsbUJBQUFELENBQVEsc0RBQVIsQ0FBN0I7QUFDQSxJQUFNRSx1QkFBdUIsbUJBQUFGLENBQVEsc0RBQVIsQ0FBN0I7QUFDQSxJQUFNRyxVQUFVLG1CQUFBSCxDQUFRLHdCQUFSLENBQWhCO0FBQ0EsSUFBTUksT0FBTyxtQkFBQUosQ0FBUSxrQkFBUixDQUFiO0FBQ0EsSUFBTUssV0FBVyxtQkFBQUwsQ0FBUSwwQkFBUixDQUFqQjtBQUNBLElBQU1NLGdCQUFnQixtQkFBQU4sQ0FBUSx5REFBUixDQUF0QjtBQUNBLElBQU1PLGVBQWUsbUJBQUFQLENBQVEsb0NBQVIsQ0FBckI7O0FBRUEsSUFBTVEsTUFBTVQsU0FBWjtBQUNBLElBQU1VLFdBQVdOLFFBQVFHLGFBQVIsQ0FBakI7O0FBRUFELFNBQVNLLE9BQVQsQ0FBaUJILGFBQWFoQixRQUE5QixFQUF3QyxVQUFDb0IsS0FBRCxFQUFXO0FBQ2pELE1BQUlBLEtBQUosRUFBVztBQUNUQyxZQUFRRCxLQUFSLENBQWMsb0RBQWQsRUFEUyxDQUM0RDtBQUNyRSxVQUFNQSxLQUFOO0FBQ0Q7QUFDRixDQUxEOztBQU9BSCxJQUFJSyxHQUFKLENBQ0VaLHFCQUFxQlEsUUFBckIsRUFBK0I7QUFDN0JLLE9BQUssSUFEd0I7QUFFN0JDLFlBQVUsa0JBRm1CO0FBRzdCQyxjQUFZLEdBSGlCO0FBSTdCQyxTQUFPO0FBQ0xDLFlBQVE7QUFESCxHQUpzQjtBQU83QkMsc0JBQW9CO0FBUFMsQ0FBL0IsQ0FERjs7QUFZQVgsSUFBSUssR0FBSixDQUNFWCxxQkFBcUJPLFFBQXJCLEVBQStCO0FBQzdCVyxPQUFLUixRQUFRUSxHQURnQjtBQUU3QmhCLFFBQU0sZ0JBRnVCO0FBRzdCaUIsYUFBVyxLQUFLO0FBSGEsQ0FBL0IsQ0FERjs7QUFRQWIsSUFBSWMsR0FBSixDQUFRLEdBQVIsRUFBYSxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUN6QlosVUFBUVEsR0FBUixDQUFZSyxTQUFaO0FBQ0FELE1BQUlFLFFBQUosQ0FBYXRCLEtBQUt1QixPQUFMLENBQWFGLFNBQWIsRUFBd0IsMkJBQXhCLENBQWI7QUFDRCxDQUhEOztBQUtBLElBQU1HLFNBQVNwQixJQUFJcUIsTUFBSixDQUFXLElBQVgsRUFBaUIsWUFBTTtBQUFBLHdCQUNiRCxPQUFPRSxPQUFQLEVBRGE7QUFBQSxNQUM1QkMsSUFENEIsbUJBQzVCQSxJQUQ0QjtBQUFBLE1BQ3RCcEMsSUFEc0IsbUJBQ3RCQSxJQURzQjs7QUFFcENpQixVQUFRUSxHQUFSLENBQVksdUNBQVosRUFBcURXLElBQXJELEVBQTJEcEMsSUFBM0Q7QUFDRCxDQUhjLENBQWYsQzs7Ozs7Ozs7Ozs7Ozs7QUM1Q0EsSUFBTVMsT0FBTyxtQkFBQUosQ0FBUSxrQkFBUixDQUFiO0FBQ0EsSUFBTWdDLG9CQUFvQixtQkFBQWhDLENBQVEsZ0RBQVIsQ0FBMUI7QUFDQSxJQUFNRyxVQUFVLG1CQUFBSCxDQUFRLHdCQUFSLENBQWhCO0FBQ0EsSUFBTWlDLGlCQUFpQixtQkFBQWpDLENBQVEsMENBQVIsQ0FBdkI7QUFDQSxJQUFNa0MsdUJBQXVCLG1CQUFBbEMsQ0FBUSx3REFBUixDQUE3QjtBQUNBLElBQU1tQyxxQkFBcUIsbUJBQUFuQyxDQUFRLGtEQUFSLENBQTNCOztBQUVBLElBQU1WLFNBQVM7QUFDYjhDLFNBQU87QUFDTEMsWUFBUSxDQUNOLGlFQURNLEVBRU4sb0JBRk07QUFESCxHQURNO0FBT2JDLFVBQVEsS0FQSztBQVFiQyxRQUFNLGFBUk87QUFTYkMsVUFBUTtBQUNOcEMsVUFBTUEsS0FBS3VCLE9BQUwsQ0FBYUYsU0FBYixFQUF3QixjQUF4QixDQURBO0FBRU5WLGNBQVUsa0JBRko7QUFHTkMsZ0JBQVk7QUFITixHQVRLO0FBY2JuQixVQUFRO0FBQ040QyxXQUFPLENBQ0w7QUFDRUMsWUFBTSxPQURSO0FBRUVDLGVBQVMsY0FGWDtBQUdFOUIsV0FBSztBQUNIK0IsZ0JBQVEsY0FETDtBQUVIQyxpQkFBUztBQUNQQyxtQkFBUyxDQUFDLEtBQUQ7QUFERjtBQUZOO0FBSFAsS0FESyxFQVdMO0FBQ0VKLFlBQU0sUUFEUjtBQUVFN0IsV0FBSyxDQUFDLGNBQUQsRUFBaUJxQixxQkFBcUJVLE1BQXRDLEVBQThDLFlBQTlDO0FBRlAsS0FYSyxFQWVMO0FBQ0VGLFlBQU0sU0FEUjtBQUVFN0IsV0FBSyxDQUNILGNBREcsRUFFSHFCLHFCQUFxQlUsTUFGbEIsRUFHSCxZQUhHLEVBSUgsZ0JBSkcsRUFLSCxhQUxHO0FBRlAsS0FmSyxFQXlCTDtBQUNFRixZQUFNLHlCQURSO0FBRUVFLGNBQVEsYUFGVjtBQUdFQyxlQUFTO0FBQ1BFLGNBQU07QUFEQztBQUhYLEtBekJLLEVBZ0NMO0FBQ0VMLFlBQU0sMkJBRFI7QUFFRUUsY0FBUSxhQUZWO0FBR0VDLGVBQVM7QUFDUEUsY0FBTTtBQURDO0FBSFgsS0FoQ0s7QUFERCxHQWRLO0FBd0RiQyxXQUFTLENBQ1AsSUFBSWIsa0JBQUosQ0FBdUIsTUFBdkIsRUFBK0IsRUFBL0IsQ0FETyxFQUVQLElBQUloQyxRQUFROEMsYUFBWixDQUEwQjtBQUN4QkMsT0FBRyxRQURxQjtBQUV4QkMsWUFBUSxRQUZnQjtBQUd4QkMsWUFBUSxXQUhnQjtBQUl4QkMsVUFBTTtBQUprQixHQUExQixDQUZPLEVBUVAsSUFBSW5CLG9CQUFKLENBQXlCO0FBQ3ZCbkIsY0FBVTtBQURhLEdBQXpCLENBUk8sRUFXUCxJQUFJaUIsaUJBQUosQ0FBc0I7QUFDcEI7QUFDQWpCLGNBQVUsWUFGVTtBQUdwQnVDLFdBQU8sY0FIYTtBQUlwQkMsY0FBVW5ELEtBQUt1QixPQUFMLENBQWFGLFNBQWIsRUFBd0Isc0JBQXhCO0FBSlUsR0FBdEIsQ0FYTyxFQWlCUCxJQUFJUSxjQUFKLEVBakJPLEVBa0JQLElBQUk5QixRQUFRcUQsMEJBQVosRUFsQk8sQ0F4REk7QUE0RWJDLFdBQVM7QUE1RUksQ0FBZjs7QUErRUE1RCxPQUFPQyxPQUFQLEdBQWlCUixNQUFqQixDOzs7Ozs7Ozs7OztBQ3RGQSxpRDs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJzZXJ2ZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyL3NlcnZlci5qc1wiKTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgbW9uZ29VUkw6IHByb2Nlc3MuZW52Lk1PTkdPX1VSTCB8fCAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9wb3J0Zm9saW8nLFxuICBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDgwMDAsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZzsiLCJjb25zdCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5jb25zdCB3ZWJwYWNrRGV2TWlkZGxld2FyZSA9IHJlcXVpcmUoXCJ3ZWJwYWNrLWRldi1taWRkbGV3YXJlXCIpO1xuY29uc3Qgd2VicGFja0hvdE1pZGRsZXdhcmUgPSByZXF1aXJlKFwid2VicGFjay1ob3QtbWlkZGxld2FyZVwiKTtcbmNvbnN0IHdlYnBhY2sgPSByZXF1aXJlKFwid2VicGFja1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuY29uc3Qgd2VicGFja0NvbmZpZyA9IHJlcXVpcmUoXCIuLi93ZWJwYWNrLmNsaWVudC5kZXYuanNcIik7XG5jb25zdCBzZXJ2ZXJDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBjb21waWxlciA9IHdlYnBhY2sod2VicGFja0NvbmZpZyk7XG5cbm1vbmdvb3NlLmNvbm5lY3Qoc2VydmVyQ29uZmlnLm1vbmdvVVJMLCAoZXJyb3IpID0+IHtcbiAgaWYgKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignUGxlYXNlIG1ha2Ugc3VyZSBNb25nb2RiIGlzIGluc3RhbGxlZCBhbmQgcnVubmluZyEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn0pO1xuXG5hcHAudXNlKFxuICB3ZWJwYWNrRGV2TWlkZGxld2FyZShjb21waWxlciwge1xuICAgIGhvdDogdHJ1ZSxcbiAgICBmaWxlbmFtZTogXCJjbGllbnQuYnVuZGxlLmpzXCIsXG4gICAgcHVibGljUGF0aDogXCIvXCIsXG4gICAgc3RhdHM6IHtcbiAgICAgIGNvbG9yczogdHJ1ZVxuICAgIH0sXG4gICAgaGlzdG9yeUFwaUZhbGxiYWNrOiB0cnVlXG4gIH0pXG4pO1xuXG5hcHAudXNlKFxuICB3ZWJwYWNrSG90TWlkZGxld2FyZShjb21waWxlciwge1xuICAgIGxvZzogY29uc29sZS5sb2csXG4gICAgcGF0aDogXCIvX193ZWJwYWNrX2htclwiLFxuICAgIGhlYXJ0YmVhdDogMTAgKiAxMDAwXG4gIH0pXG4pO1xuXG5hcHAuZ2V0KFwiL1wiLCAocmVxLCByZXMpID0+IHtcbiAgY29uc29sZS5sb2coX19kaXJuYW1lKTtcbiAgcmVzLnNlbmRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vZGlzdC9wdWJsaWMvaW5kZXguaHRtbFwiKSk7XG59KTtcblxuY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigzMDAwLCAoKSA9PiB7XG4gIGNvbnN0IHsgaG9zdCwgcG9ydCB9ID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgY29uc29sZS5sb2coXCJFeGFtcGxlIGFwcCBsaXN0ZW5pbmcgYXQgaHR0cDovLyVzOiVzXCIsIGhvc3QsIHBvcnQpO1xufSk7XG4iLCJjb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBIdG1sV2VicGFja1BsdWdpbiA9IHJlcXVpcmUoXCJodG1sLXdlYnBhY2stcGx1Z2luXCIpO1xuY29uc3Qgd2VicGFjayA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpO1xuY29uc3QgV2VicGFja01kNUhhc2ggPSByZXF1aXJlKFwid2VicGFjay1tZDUtaGFzaFwiKTtcbmNvbnN0IE1pbmlDc3NFeHRyYWN0UGx1Z2luID0gcmVxdWlyZShcIm1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXCIpO1xuY29uc3QgQ2xlYW5XZWJwYWNrUGx1Z2luID0gcmVxdWlyZShcImNsZWFuLXdlYnBhY2stcGx1Z2luXCIpO1xuXG5jb25zdCBjb25maWcgPSB7XG4gIGVudHJ5OiB7XG4gICAgY2xpZW50OiBbXG4gICAgICBcIndlYnBhY2staG90LW1pZGRsZXdhcmUvY2xpZW50P3BhdGg9L19fd2VicGFja19obXImdGltZW91dD0yMDAwMFwiLFxuICAgICAgXCIuL2NsaWVudC9jbGllbnQuanNcIlxuICAgIF1cbiAgfSxcbiAgdGFyZ2V0OiBcIndlYlwiLFxuICBtb2RlOiBcImRldmVsb3BtZW50XCIsXG4gIG91dHB1dDoge1xuICAgIHBhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdC9wdWJsaWMvXCIpLFxuICAgIGZpbGVuYW1lOiBcIltuYW1lXS5baGFzaF0uanNcIixcbiAgICBwdWJsaWNQYXRoOiBcIi9cIlxuICB9LFxuICBtb2R1bGU6IHtcbiAgICBydWxlczogW1xuICAgICAge1xuICAgICAgICB0ZXN0OiAvXFwuanMkLyxcbiAgICAgICAgZXhjbHVkZTogL25vZGVfbW9kdWxlcy8sXG4gICAgICAgIHVzZToge1xuICAgICAgICAgIGxvYWRlcjogXCJiYWJlbC1sb2FkZXJcIixcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBwcmVzZXRzOiBbXCJlbnZcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcbiAgICAgICAgdXNlOiBbXCJzdHlsZS1sb2FkZXJcIiwgTWluaUNzc0V4dHJhY3RQbHVnaW4ubG9hZGVyLCBcImNzcy1sb2FkZXJcIl1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC5zY3NzJC8sXG4gICAgICAgIHVzZTogW1xuICAgICAgICAgIFwic3R5bGUtbG9hZGVyXCIsXG4gICAgICAgICAgTWluaUNzc0V4dHJhY3RQbHVnaW4ubG9hZGVyLFxuICAgICAgICAgIFwiY3NzLWxvYWRlclwiLFxuICAgICAgICAgIFwicG9zdGNzcy1sb2FkZXJcIixcbiAgICAgICAgICBcInNhc3MtbG9hZGVyXCJcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGVzdDogL1xcLih0dGZ8ZW90fHdvZmZ8d29mZjIpJC8sXG4gICAgICAgIGxvYWRlcjogXCJmaWxlLWxvYWRlclwiLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbmFtZTogXCJmb250cy9bbmFtZV0uW2V4dF1cIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXN0OiAvXFwuKHBuZ3xzdmd8anBnfGdpZnxqcGVnKSQvLFxuICAgICAgICBsb2FkZXI6IFwiZmlsZS1sb2FkZXJcIixcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG5hbWU6IFwiaW1hZ2VzL1tuYW1lXS5bZXh0XVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBuZXcgQ2xlYW5XZWJwYWNrUGx1Z2luKFwiZGlzdFwiLCB7fSksXG4gICAgbmV3IHdlYnBhY2suUHJvdmlkZVBsdWdpbih7XG4gICAgICAkOiBcImpxdWVyeVwiLFxuICAgICAgalF1ZXJ5OiBcImpxdWVyeVwiLFxuICAgICAgUG9wcGVyOiBcInBvcHBlci5qc1wiLFxuICAgICAgVXRpbDogXCJleHBvcnRzLWxvYWRlcj9VdGlsIWJvb3RzdHJhcC9qcy9kaXN0L3V0aWxcIlxuICAgIH0pLFxuICAgIG5ldyBNaW5pQ3NzRXh0cmFjdFBsdWdpbih7XG4gICAgICBmaWxlbmFtZTogXCJzdHlsZS5bY29udGVudGhhc2hdLmNzc1wiXG4gICAgfSksXG4gICAgbmV3IEh0bWxXZWJwYWNrUGx1Z2luKHtcbiAgICAgIC8vIEFsc28gZ2VuZXJhdGUgYSB0ZXN0Lmh0bWxcbiAgICAgIGZpbGVuYW1lOiBcImluZGV4Lmh0bWxcIixcbiAgICAgIHRpdGxlOiBcIlByaW5jZSBNdWtrYVwiLFxuICAgICAgdGVtcGxhdGU6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vYXNzZXRzL2luZGV4Lmh0bWxcIilcbiAgICB9KSxcbiAgICBuZXcgV2VicGFja01kNUhhc2goKSxcbiAgICBuZXcgd2VicGFjay5Ib3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbigpXG4gIF0sXG4gIGRldnRvb2w6IFwiaW5saW5lLXNvdXJjZS1tYXBcIlxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGVhbi13ZWJwYWNrLXBsdWdpblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0bWwtd2VicGFjay1wbHVnaW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2stZGV2LW1pZGRsZXdhcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2VicGFjay1ob3QtbWlkZGxld2FyZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLW1kNS1oYXNoXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=