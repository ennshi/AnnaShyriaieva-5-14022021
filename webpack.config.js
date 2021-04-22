const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/pages/index.js',
        cart: './src/pages/cart.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs/'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
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
            inject: true,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'panier.html',
            template: 'src/static/panier.html',
            inject: true,
            chunks: ['cart']
        }),
    ],
};
