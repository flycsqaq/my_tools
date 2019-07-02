const { styleRules } = require('./style')
const { jsRules } = require('./js')
const { fileRules } = require('./file')

exports.rules = [
  ...styleRules,
  ...jsRules,
  ...fileRules
]