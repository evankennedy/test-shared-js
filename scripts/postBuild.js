const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * Prepares the dist directory after building. This will copy the package.json
 * removing irrelevant properties and create a directory-scoped package.json for
 * each individual directory passed in.
 * @param  {...string} dirnames
 */
async function postBuild(...dirnames) {
	const packageJson = JSON.parse(
		await readFile(resolve('package.json'), 'utf-8')
	);
	delete packageJson.private;
	delete packageJson.scripts;

	await writeFile(
		resolve('dist/package.json'),
		JSON.stringify(packageJson, null, '\t')
	);
	dirnames.map(async dirname => {
		await writeFile(
			resolve(`dist/${dirname}/package.json`),
			JSON.stringify(
				{
					name: `${packageJson.name}/${dirname}`,
					main: './index.js',
					types: './index.js',
					sideEffects: false,
				},
				null,
				'\t'
			)
		);
	});
}

postBuild(...process.argv.slice(2));
