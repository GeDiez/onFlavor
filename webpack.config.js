var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

module.exports = {
  entry: [
    'babel-polyfill',
    './web_app/main'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/javascripts/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }
    ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
  ]
};
