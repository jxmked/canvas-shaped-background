const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            reloadAll: true,
                            sourceMap: true
                        }
                    },
                    "css-loader",
                    "sass-loader",
                    "posscss-loader"
                ]
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file-loader"
            },
            {
                test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
                loader: "file-loader"
            }]
    },
    resolve: {
        extensions: ['.js',
            '.ts',
            '.tsx',
            '.scss',
            '.sass',
            '.css']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['dist']
            },
            files: ['./dist/*'],
            notify: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: './src/favicon.ico',
            template: './src/index.html'
        })
    ]
};