const { resolve } = require('../utils');

const tsImportPluginFactory = require('ts-import-plugin');

exports.jsRules = [
    {
        test: /\.(j|t)s(x?)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')], // 指定检查的目录
        options: {
            // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
            formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
    },
    {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
    },
    {
        test: /\.ts(x?)$/,
        use: [
            // {
            //     loader: 'cache-loader',
            //     options: {
            //         cacheDirectory: resolve('.cache-loader')
            //     }
            // },
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                style: true
                            })
                        ]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                }
            }
        ]
    }
];
