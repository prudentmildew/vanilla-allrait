var path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public')
};

module.exports = {
  entry: path.join(PATHS.src, 'index.js'),
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        loader: "babel-loader"
      }
    ]
  }
};
