const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CLIENT_SRC_DIR = resolve(__dirname);
const BUILD_DIR = resolve(__dirname, '../..', 'dist', 'client');

// HTML Template
const template = ({ htmlWebpackPlugin }) => `
    <html>
      <head>
        <meta charset="utf-8">
        <title>RLSS Brackets</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="icon" href="favicon.ico">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Quantico:ital,wght@1,700&display=swap" rel="stylesheet">
        ${htmlWebpackPlugin.tags.headTags}
      </head>
      <body>
        <div id="root"></div>
        ${htmlWebpackPlugin.tags.bodyTags}
      </body>
    </html>
  `;



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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'RLSS Brackets',
        favicon: 'static/favicon.ico',
        templateContent: template
    })]
};