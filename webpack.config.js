var path = require('path');
var webpack = require('webpack');
var ReactStylePlugin = require('react-style-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
          Common: path.join(__dirname, 'src/common'),
          Model:path.join(__dirname, 'src/model'),
          Store:path.join(__dirname, 'src/store')
      }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }
    , {
      test: /\.css$/,
      loader:  'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!less' 
    }
    ]
  }
};

