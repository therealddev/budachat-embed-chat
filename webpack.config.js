const path = require('path');

module.exports = {
  entry: './src/widget.js',
  output: {
    filename: 'widget.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  mode: 'development',
};