const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/client.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'client-bundle.js',
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
        exclude: /(src\/static|src\/server)/,
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

