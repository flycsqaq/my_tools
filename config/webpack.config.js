const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

const { resolve } = require('./utils');
const { rules } = require('./rules/index');
const { plugins } = require('./plugins');

module.exports = {
    entry: {
        app: resolve('src/index.tsx')
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [...rules]
    },
    plugins: [...plugins],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        plugins: [
            new TsconfigPathsWebpackPlugin({
                configFile: resolve('tsconfig.json')
            })
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'commons'
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 5,
                    enforce: true
                }
            }
        },
        runtimeChunk: 'single'
    }
};
