const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src/client.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'src/static/js'),
    filename: 'bundle.js',
    publicPath: '/webpack/',
  },
  resolve: {
    extensions: ['', '.js', '.css', '.json'],
    modulesDirectories: ['node_modules'],
    unsafeCache: true,
  },
  module: {
    /*preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: /(src\/static)/,
      },
    ],*/
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
	  new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('dev')
			}
		})
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),*/
  ],
  devtool: 'source-map',
};
