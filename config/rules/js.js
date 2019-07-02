const { resolve } = require('../utils')

const tsImportPluginFactory = require('ts-import-plugin')

exports.jsRules = [
  {
    test: /\.ts(x?)$/,
    use: [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: resolve('.cache-loader')
        }
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                style: true
              }),
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
      }
    ],
  }
]