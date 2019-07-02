const { resolve }  = require('../utils')
exports.fileRules = [
  {
    test: /\.svg$/,
    loader: '@svgr/webpack',
    include: resolve('src')
  }
]