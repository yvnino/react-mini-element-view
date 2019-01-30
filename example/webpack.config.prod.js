const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');
const _ = require('lodash');

module.exports = {
  entry: {
    js: './app/index.js',
    vendor: _.keys(pkg.dependencies)
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new CopyWebpackPlugin([{ from: './app/assets', to: 'assets' }]),
    new HtmlWebpackPlugin({
      template: 'index.html', // Load a custom template 
      inject: 'body', // Inject all scripts into the body 
      hash: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loaders: ['babel-loader?retainLines=true']
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif)$/i,
        exclude: [/node_modules/],
        loaders: ['file-loader']
      }
    ]
  }
};
