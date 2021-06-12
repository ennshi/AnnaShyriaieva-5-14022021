const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'docs/'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, '/docs'),
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(webp|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/static/index.html',
        }),
    ],
};
