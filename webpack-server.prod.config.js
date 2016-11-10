const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/server/index.js'),
  ],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: nodeModules,
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server-bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.css', '.json'],
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: /(src\/static)/,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {
        include: /\.json$/,
        loaders: ["json-loader"],
      },
    ],
  },
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
  ],
};


