const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const srcPath = path.join(__dirname, '../src')
const rootPath = path.join(__dirname, '../')

module.exports = {
  context: rootPath,
  entry: path.resolve(srcPath, 'index.js'),
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    modules: [srcPath, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader',
      },
    ],
  },
  devtool: false,
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new webpack.SourceMapDevToolPlugin({}),
  ],
}
