const path = require('path')

const resolve = (...args) => {
  return path.join(__dirname, '../', ...args)
}

const resolveAssetsRootDir = (dir) => {
  return resolve('dist/', dir) 
}

exports.resolve = resolve
exports.resolveAssetsRootDir = resolveAssetsRootDir