const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = resolve(__dirname, 'src', 'client');
const BUILD_DIR = resolve(__dirname, 'dist', 'client');

module.exports = {
    mode: 'production',
    entry: resolve(SRC_DIR, 'index.tsx'),
    output: {
        filename: 'bundle[chunkhash].js',
        path: BUILD_DIR
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'RLSS Brackets',
        publicPath: '/client',
        favicon: 'static/favicon.ico'
    })]
};