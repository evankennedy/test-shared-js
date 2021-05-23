import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { writeJson } from './_writeJson';

const readFile = promisify(fs.readFile);

interface PrepareDistOptions {
	subpackageDirs: string[];
}

/**
 * Prepare the `dist/` directory for publishing, copying over the main
 * `package.json` and building a subpackage `package.json` for each individual
 * subpackage. The second step will likely be unnecessary once Typescript adds
 * support for the package `exports` property.
 *
 * Once files have been written to the `dist/` directory, this can be called to
 * get the proper package files in place. A good time to call this may be in the
 * "postbuild" NPM script.
 */
export async function prepareDist(options: PrepareDistOptions) {
	const packageJson = JSON.parse(
		await readFile(resolve('package.json'), 'utf-8')
	);
	delete packageJson.private;
	delete packageJson.scripts;

	await writeJson(packageJson, 'dist/package.json');

	for (const dir of options.subpackageDirs) {
		await writeJson(
			{
				name: `${packageJson.name}/${dir}`,
				types: './index.d.ts',
			},
			'dist',
			dir,
			'package.json'
		);
	}
}
