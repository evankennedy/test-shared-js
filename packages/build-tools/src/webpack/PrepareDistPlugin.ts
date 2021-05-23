import type { Compiler } from 'webpack';
import { dirname } from 'path';
import { prepareDist } from '../core';

interface PrepareDistPluginOptions {}

/**
 * Webpack plugin to prepare the `dist/` directory for publishing, copying over
 * the main `package.json` and building a subpackage `package.json` for each
 * individual subpackage. The second step will likely be unnecessary once
 * Typescript adds support for the package `exports` property.
 *
 * This will pull the list of subpackages from the Webpack config's entries.
 */
export class PrepareDistPlugin {
	options: PrepareDistPluginOptions;

	constructor(options?: PrepareDistPluginOptions) {
		this.options = options || {};
	}

	apply(compiler: Compiler) {
		compiler.hooks.emit.tapAsync(
			{
				name: 'PrepareDistPlugin',
				stage: 1000,
			},
			async (compilation, callback) => {
				try {
					const subpackageDirs = Array.from(compilation.entries.values())
						.map(entry => {
							const { filename } = entry.options;
							return dirname(compilation.getPath(filename!));
						})
						.filter((value, index, arr) => arr.indexOf(value) === index)
						.filter(dir => dir !== '.');

					prepareDist({ subpackageDirs });
				} catch (err) {
					return callback(err);
				}
				callback();
			}
		);
	}
}
