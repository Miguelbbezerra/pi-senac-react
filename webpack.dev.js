const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    devtool: 'inline-source-map',
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
        static: {
            directory: './public'
        },
        historyApiFallback: true,
        port: 8080
    },
    plugins: [
        new DefinePlugin({
            'process.env.API_URL': JSON.stringify('http://fordevs.herokuapp.com/api')
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
})