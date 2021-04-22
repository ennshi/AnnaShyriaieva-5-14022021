module.exports = {
    mode: 'production',
    entry: {
        index: './src/pages/index.js',
        cart: './src/pages/cart.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/docs/js',
    },
    devServer: {
        contentBase: __dirname + '/docs',
        compress: true,
        port: 9000,
    },
};
