const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = resolve(__dirname, 'src', 'client');
const BUILD_DIR = resolve(__dirname, 'dist', 'client');
const STATIC_DIR = resolve(__dirname, 'dist', 'static');

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
        favicon: resolve(STATIC_DIR, 'favicon.ico')
    })]
};