var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/index.js",
  module: {
      rules:[
          {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          },
          {
              // .css 解析
              test: /\.css$/,
              use: [
                  {loader: "style-loader"},
                  {loader: "css-loader"}
              ]
          },
          {
              // .css 解析
              test: /\.less/,
              use: [
                  {loader: "style-loader"},
                  {loader: "css-loader"},
                  {loader: "less-loader"}
              ]
          }
      ]
  },
  output: {
    path: __dirname,
    filename: "./build/bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
