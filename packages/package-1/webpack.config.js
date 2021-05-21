const path = require('path');
const { CleanPlugin } = require('webpack');

/** @type {import('webpack').Configuration} */
module.exports = {
	mode: 'none',
	entry: {
		index: './src',
		'ui/index': './src/ui',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		library: { type: 'umd' },
		globalObject: 'this',
	},
	externals: { react: 'react' },
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [new CleanPlugin()],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				include: /src/,
			},
		],
	},
};
