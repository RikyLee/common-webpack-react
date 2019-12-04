const path = require('path');
const merge = require('webpack-merge');
const prod = require('./webpack.config.prod.js');
const dev = require('./webpack.config.dev.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: {
    app: ['./src/index.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.js|jsx$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ["@babel/env", {
            "targets": {
              "browsers": "last 2 chrome versions"
            }
          }],
          ["@babel/preset-react"]
        ]
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: path.posix.join('assets', 'img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('assets', 'media/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('assets', 'fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(common, prod);
} else {
  module.exports = merge(common, dev);
}
