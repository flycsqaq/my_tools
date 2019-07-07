const { resolve } = require('../utils');

exports.fileRules = [
    {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        include: resolve('src')
    },
    {
        test: /\.md$/,
        use: [
            {
                loader: 'html-loader?name=md/[name].[hash:6].[ext]'
            },
            {
                loader: 'markdown-loader'
            }
        ],
        include: resolve('docs')
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader?name=img/[name].[hash:6].[ext]'
            }
        ]
    }
];
