let webpack = require('webpack');
require('babel-polyfill');

module.exports = {
  entry: ['babel-polyfill', './web_app/main.js'],
  devtool: 'eval-source-map',
  output: {
    path: __dirname + '/public/javascripts/',
    filename: 'bundle.js',
    publicPath: '/javascripts',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.jsx', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('DEVELOPMENT') },
    }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
};
