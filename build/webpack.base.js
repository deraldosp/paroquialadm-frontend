'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    client: './client/index.js'
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: config.publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../client'),
      components: path.join(__dirname, '../client/components'),
      modules: path.join(__dirname, '../client/modules'),
      services: path.join(__dirname, '../client/services')
    },
    modules: [
      _.cwd('node_modules'),
      // this meanse you can get rid of dot hell
      // for example import 'components/Foo' instead of import '../../components/Foo'
      _.cwd('client')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader']
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.es6$/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      template: path.resolve(__dirname, 'index.html'),
      filename: _.outputIndexPath
    }),
    new webpack.LoaderOptionsPlugin(_.loadersOptions()),
    new CopyWebpackPlugin([
      {
        from: _.cwd('./static'),
        // to the root of dist path
        to: './'
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT),
      'process.env.HOST_API_V1': JSON.stringify(process.env.HOST_API_V1),
      'process.env.HOST_GRAPHQL': JSON.stringify(process.env.HOST_GRAPHQL),
      'process.env.DEFAULT_WORKSPACE': JSON.stringify(process.env.DEFAULT_WORKSPACE),
      'process.env.PUSHER_KEY': JSON.stringify(process.env.PUSHER_KEY),
      'process.env.PUSHER_DEBUG': JSON.stringify(process.env.PUSHER_DEBUG),
      'process.env.PUSHER_CLUSTER': JSON.stringify(process.env.PUSHER_CLUSTER),
      'process.env.HOST_INTERNAL_BUCKET': JSON.stringify(process.env.HOST_INTERNAL_BUCKET),
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
      'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
      'process.env.GRANT_TYPE': JSON.stringify(process.env.GRANT_TYPE),
      'process.env.DOMAIN_CONFIG': JSON.stringify(process.env.DOMAIN_CONFIG), 
    }),
  ],
  target: _.target
}
