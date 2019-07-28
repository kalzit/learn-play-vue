const path = require('path');
const webpack = require('webpack');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const fiber = require('fibers');
const dartSass = require('sass');

module.exports = {
  mode: 'development',
  entry: {
    'javascripts/main': './assets-src/ts/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new vueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: dartSass,
              fiber: fiber
            }
          }
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue']
  },
  devtool: 'source-map'
};
