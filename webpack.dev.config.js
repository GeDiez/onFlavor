const path = require('path');
const webpack = require('webpack');
const manifest = require('./modules-manifest.json');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'web_app/main.js'),
    rhl: 'react-hot-loader/patch',
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
          options: {
            presets: ['es2015', 'react', 'stage-2'],
          },
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
      chunks: ['signin', 'signup'],
      filename: 'wellcome.html',
      template: './assets/index.html',
    }),
    new htmlPlugin({
      chunks: ['bundle'],
      filename: 'index.html',
      template: './assets/index.html',
    }),
    new webpack.DllReferencePlugin({
      manifest,
    }),
  ],
};
