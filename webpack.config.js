const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const manifest = require('./modules-manifest.json');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'web_app/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'javascript/[name].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
          },
        },
      },
      {
        test: /(\.css)$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
            options: { minimize: true },
          },
        }),
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name][hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlPlugin({
      chunks: ['bundle'],
      filename: 'index.html',
      template: './assets/index.html',
    }),
    new ExtractTextPlugin('css/[name].[hash].css'),
    new webpack.DllReferencePlugin({
      manifest,
    }),
    //evitar modulos duplicados cuando tienes mas de un entry point
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),*/
  ],
};
