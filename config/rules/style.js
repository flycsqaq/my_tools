const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve } = require('../utils') 
const theme = require('../../theme')

const styleCache = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: resolve('.cache-loader')
  }
}

exports.styleRules = [
  {
    test: /\.s(a|c)ss$/,
    include: [resolve('src')],
    use: [
      MiniCssExtractPlugin.loader,
      styleCache,
      {
        loader: 'typings-for-css-modules-loader',
        options: {
          modules: true,
          namedExport: true,
          camelCass: true,
          sass: true
        }
      },
      'sass-loader'
    ]
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      styleCache,
      'css-loader'
    ]
  },
  {
    test: /\.less$/,
    include: [resolve('node_module')],
    use: [
      MiniCssExtractPlugin.loader,
      styleCache,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: theme
        }
      }
    ]
  }
]