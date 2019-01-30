const path = require('path');

module.exports = {
  entry: ['./src/MiniElement'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MiniElement',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  externals: {
    react: {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'prop-types': {
      root: 'PropTypes',
      amd: 'prop-types',
      commonjs: 'prop-types',
      commonjs2: 'prop-types'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  }
};
