const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    modules: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'reactstrap',
      'react-transition-group',
      'react-popper',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build/javascript'),
    filename: '[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name]-manifest.json'),
    }),
  ],
};
