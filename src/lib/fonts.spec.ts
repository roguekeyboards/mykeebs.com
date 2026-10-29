import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// kbdb's sign-in page hard-codes these URLs, so a file under /fonts/v1/ must never change once
// shipped. Changed or added fonts go under /fonts/v2/, with kbdb updated to match.
const v1: Record<string, string> = {
	'inter-latin-400.woff2': '8909904ab6c872eb994093482a88a28eca2cd95912d7b6fecd72103b0dc07edc',
	'inter-latin-500.woff2': 'f3779f1efccc4bdcdf9c0a02ab95bf6bd092ed09c48c08cedc725889edd1d19f',
	'inter-latin-600.woff2': 'f9a06e79cd3a2a20951c0f0e28f66dd0e6d3fda73911d640a2125c8fcb78f21a',
	'jetbrains-mono-latin-400.woff2':
		'14425ba9c695763c1547f48a206b7aa60350a33ae23de09f0407877f3fcd89eb',
	'jetbrains-mono-latin-500.woff2':
		'cb182feeed4d798ff6961d3c79f7026279448fca0676438aaecb21f3fc39553a',
	'jetbrains-mono-latin-600.woff2':
		'400c6bfda18d5d14acad1c15d6dcb9f8e13c015e7286317e0b9a482539bef147',
	'jetbrains-mono-latin-700.woff2':
		'd0d4e818808f2a0ba39b2b09d1989366f63494e295f003c7ef436697378507e8'
};

const dir = 'static/fonts/v1';

describe('/fonts/v1', () => {
	it.each(Object.entries(v1))('serves %s unchanged', (name, sha256) => {
		const file = readFileSync(`${dir}/${name}`);

		expect(file.subarray(0, 4).toString('latin1')).toBe('wOF2');
		expect(createHash('sha256').update(file).digest('hex')).toBe(sha256);
	});

	it('serves no fonts beyond those', () => {
		const fonts = readdirSync(dir).filter((name) => name.endsWith('.woff2'));

		expect(fonts.sort()).toEqual(Object.keys(v1).sort());
	});

	it('ships the fonts with their licences', () => {
		for (const family of ['inter', 'jetbrains-mono']) {
			expect(readFileSync(`${dir}/${family}-OFL.txt`, 'utf8')).toContain('SIL Open Font License');
		}
	});
});

describe('the site', () => {
	const css = readFileSync('src/routes/layout.css', 'utf8');
	const urls = [...css.matchAll(/url\('(\/fonts\/[^']+)'\)/g)].map(([, url]) => url);

	it('loads every font it declares from /fonts', () => {
		expect(urls).toHaveLength(Object.keys(v1).length);
		for (const url of urls) expect(existsSync(`static${url}`), url).toBe(true);
	});
});
