const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')   
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: '/node_modules/'
        }, {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
              loader: 'file-loader',
             }],
        }],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          server: { baseDir: ['dist'] },
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
