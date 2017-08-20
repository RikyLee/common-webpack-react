const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const extractTextPlugin = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

module.exports = {
    plugins: [
        extractTextPlugin,
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
              screw_ie8: true,
              keep_fnames: true
            },
            compress: {
              screw_ie8: true
            },
            comments: false
          })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },

            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    }
}