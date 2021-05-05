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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
    new HtmlWebPackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.EnvironmentPlugin({
      APP_ENV: 'dev',
    }),
  ],
}
