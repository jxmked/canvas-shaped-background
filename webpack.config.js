const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var devMode = process.env['NODE' + '_ENV'] !== 'production'

module.exports = function(env, config) {
    
    if(process.env['NODE' + '_ENV'] === void 0)
        devMode = config.mode !== "production";
    
    console.log("DEV MODE: " + String(devMode) + "\n")
    
    return {
        entry: './src/index.ts',
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader"
            }, {
                test: /\.(woff|ttf|otf|eot|woff2)$/i,
                loader: "file-loader"
            }, {
                test: /\.((s[ca]|c)ss)$/,
                exclude: /node_modules/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader",
                  "sass-loader",
                ],
            }]
        },
        
        resolve: {
            extensions: ['.ts', '.tsx', 'scss', 'sass', 'css']
        },
        
        output: {
            filename: devMode ? "[name].js" : "[name].[contenthash].js",
            chunkFilename: devMode ? "[id].js" : "[id].[contenthash].js",
            path: path.resolve(__dirname, './dist'),
            clean: true
        },
        
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        
        plugins: [
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
            }),
            
            new MiniCssExtractPlugin({
                filename: devMode ? "[name].css" : "[name].[contenthash].css",
                chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
            }),
        ]
    }
}