'use strict'

module.exports = {
  title: 'paroquialadm',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: 'localhost',
    port: 4000
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  // publicPath: process.env.NODE_ENV === 'production' ? '/paroquialadm-frontend/' : '/',
  publicPath: '/',
  assetsPath: './'
}
