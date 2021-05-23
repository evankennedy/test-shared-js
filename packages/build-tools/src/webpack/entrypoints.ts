import type { Configuration } from 'webpack';
import { resolve } from 'path';

export function entrypoints(...paths: string[]): Configuration['entry'] {
	return paths.reduce(
		(obj, path) => ({
			...obj,
			[path]: {
				import: resolve('src', path),
				filename: resolve(path, 'index.js').replace(resolve('.') + '/', ''),
			},
		}),
		{}
	);
}
