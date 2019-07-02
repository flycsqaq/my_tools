const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('./utils') 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

exports.plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: resolve('public/index.html') 
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  })
]
