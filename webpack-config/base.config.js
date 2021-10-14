const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const srcPath = path.join(__dirname, '../src')
const rootPath = path.join(__dirname, '../')

const isProductionMode = ['production', 'staging'].includes(process.env.APP_ENV)

module.exports = {
  context: rootPath,
  entry: path.resolve(srcPath, 'index.js'),
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'app-[contenthash].js',
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
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|j?g|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // in bytes
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|otf|woff(2)?)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  devtool: false,
  plugins: [
    new FaviconsWebpackPlugin('./src/assets/icons/favicon.png'),
    new HtmlWebPackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new webpack.SourceMapDevToolPlugin({}),
  ],
}
