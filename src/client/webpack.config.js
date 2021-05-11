const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CLIENT_SRC_DIR = resolve(__dirname);
const BUILD_DIR = resolve(__dirname, '../..', 'dist', 'client');

module.exports = {
    mode: 'production',
    entry: resolve(CLIENT_SRC_DIR, 'index.tsx'),
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
                loader: 'ts-loader',
                options: {
                    configFile: resolve(CLIENT_SRC_DIR, 'tsconfig.json')
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'RLSS Brackets',
        favicon: 'static/favicon.ico'
    })]
};