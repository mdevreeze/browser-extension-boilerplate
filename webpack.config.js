const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    options: path.resolve(__dirname, 'src/app/options.js'),
    popup: path.resolve(__dirname, 'src/app/popup.js'),
    main: path.resolve(__dirname, 'src/app/main.js')
  },

  output: {
    path: path.resolve(__dirname, 'extension/dist'),
    filename: '[name].js'
  },
  optimization: {
    moduleIds: "named"
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css'],
    alias: {
      utils: path.resolve(__dirname, 'src/app/utils'),
      images: path.resolve(__dirname, 'src/images'),
      styles: path.resolve(__dirname, 'src/styles')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/views/options.html'),
      filename: 'options.html',
      chunks: ['options'],
      inject: true,
      minify: {}
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/views/popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      inject: true,
      minify: {}
    }),

    new MiniCssExtractPlugin({ filename: '[name].css' }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devtool: 'eval-cheap-module-source-map'
}
