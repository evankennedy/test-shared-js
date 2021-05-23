import path from 'path';
import { PrepareDistPlugin } from './src/webpack/PrepareDistPlugin';
import type { Configuration } from 'webpack';

const config: Configuration = {
	mode: 'none',
	target: 'node',
	entry: {
		core: { import: './src', filename: 'index.js' },
		webpack: { import: './src/webpack', filename: 'webpack/index.js' },
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: { type: 'umd' },
		globalObject: 'this',
		clean: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [new PrepareDistPlugin()],
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

export default config;
