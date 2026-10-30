import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('the site fonts', () => {
	const css = readFileSync('src/routes/layout.css', 'utf8');

	it('come from the brand package', () => {
		expect(css).toContain("@import '@roguekeyboards/mykeebs-brand/fonts.css';");
	});

	it('are not declared by the site itself', () => {
		expect(css).not.toContain('@font-face');
	});
});
