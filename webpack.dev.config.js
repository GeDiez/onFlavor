const path = require('path');
const webpack = require('webpack');
const manifest = require('./modules-manifest.json');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    rhl: 'react-hot-loader/patch',
    bundle: path.resolve(__dirname, 'web_app/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'javascript/[name].js',
    publicPath: '/',
  },
  devServer: {
    open: true,
    port: 9000,
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
  },
  watch: false,
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
        },
      },
      {
        test: /(\.css)$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlPlugin({
      chunks: ['rhl', 'bundle'],
      filename: 'index.html',
      template: './assets/index.html',
      chunksSortMode: function(chunk1, chunk2) {
        const orders = ['rhl', 'bundle'];
        const order1 = orders.indexOf(chunk1.names[0]);
        const order2 = orders.indexOf(chunk2.names[0]);
        if (order1 > order2) {
          return 1;
        } else if (order1 < order2) {
          return -1;
        } else {
          return 0;
        }
      },
    }),
    new webpack.DllReferencePlugin({
      manifest,
    }),
  ],
};
