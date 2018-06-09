const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const config = {
  entry: {
    client: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./client/client.js"
    ]
  },
  target: "web",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist/public/"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|pdf)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: "popper.js",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "index.html",
      title: "Prince Mukka",
      template: path.resolve(__dirname, "../assets/index.html")
    }),
    new WebpackMd5Hash(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map"
};

module.exports = config;
