import path from 'path';
import type { Configuration } from 'webpack';
import {
	entrypoints,
	PrepareDistPlugin,
} from '@evankennedy/test-shared-js_build-tools/webpack';

const config: Configuration = {
	mode: 'none',
	entry: entrypoints('.', 'ui'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: { type: 'umd' },
		globalObject: 'this',
		clean: true,
	},
	externals: { react: 'react' },
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
