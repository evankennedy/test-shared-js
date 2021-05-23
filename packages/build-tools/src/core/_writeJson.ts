import fs from 'fs';
import { resolve, dirname } from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

/**
 * Internal helper to write a JSON object to a file, ensuring the parent
 * directories exist already.
 */
export async function writeJson(json: object, ...pathSegments: string[]) {
	const filename = resolve(...pathSegments);
	await mkdir(dirname(filename), { recursive: true });
	await writeFile(filename, JSON.stringify(json, null, '\t'));
}
