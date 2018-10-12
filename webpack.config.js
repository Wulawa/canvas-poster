const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js',
    libraryTarget: 'umd',
  },
   module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      }]
  },
};

module.exports = config;