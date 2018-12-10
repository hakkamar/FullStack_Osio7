const path = require('path')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3001
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env','@babel/preset-react'],
          plugins: [require('babel-plugin-transform-class-properties')]
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
module.exports = config