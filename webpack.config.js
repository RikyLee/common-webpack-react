const path = require('path');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

const prod = require('./webpack.config.prod.js');

const dev = require('./webpack.config.dev.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


/**
 *     引入 ant design 把这段代码复制到 js 解析的的options 中
 *      plugins: [
                        [
                            "import",
                            {
                                "libraryName": "antd",
                                "libraryDirectory": "lib", // default: lib 
                                "style": true
                            }
                        ]
                    ]
 */


const common = {
    entry: {
        app: './src/index.js'
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                include: [
                    path.resolve(__dirname, 'src') //只解析src目录下面的后缀名为.js 或者.jsx 的文件
                ],
                loader: 'babel-loader', //使用babel-loader 解析
                options: {
                    presets: [
                        [
                            "es2015",
                            {
                                "modules": false
                            }
                        ],
                        "stage-2",
                        "react"
                    ]
                }
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  prefix: 'assets'
                }
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.join(__dirname, "src")
        ],
        extensions: [".js", ".jsx"],  //定义使用到的扩展名，引入的时候可以忽略
    }
}

if (TARGET === 'start') {
    module.exports = merge(common, dev);
}

if (TARGET === 'build') {
    module.exports = merge(common, prod);
}
