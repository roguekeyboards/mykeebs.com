import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import PrivacyPage from './+page.svelte';

describe('Privacy Policy page', () => {
	it('titles the page', async () => {
		await render(PrivacyPage);

		await expect
			.element(page.getByRole('heading', { level: 1 }))
			.toHaveTextContent('Privacy Policy');
		expect(document.title).toBe('Privacy Policy · mykeebs');
	});

	it('shows when it was last updated', async () => {
		await render(PrivacyPage);

		await expect.element(page.getByText(/^Last updated: /)).toBeVisible();
	});

	it('covers this site and the app as well as the API and MCP', async () => {
		await render(PrivacyPage);

		const intro = page.getByText(/^mykeebs is a place/);

		await expect.element(intro).toBeVisible();
		for (const part of ['(mykeebs.com)', '(mykeebs.info)', 'API', 'MCP']) {
			expect(intro.element().textContent).toContain(part);
		}
	});

	it('names every processor, with Cloudflare hosting both sites', async () => {
		await render(PrivacyPage);
		const processors = page.getByRole('heading', { name: 'Who else handles your data' });
		await expect.element(processors).toBeVisible();

		for (const name of ['Amazon Web Services', 'Stytch', 'Cloudflare', 'Discord']) {
			await expect
				.element(page.getByRole('listitem').filter({ hasText: new RegExp(`^${name}:`) }))
				.toBeVisible();
		}
		expect(
			page
				.getByRole('listitem')
				.filter({ hasText: /^Cloudflare:/ })
				.element().textContent
		).toContain('mykeebs.com and mykeebs.info');
	});

	it('gives the support address as a mail link', async () => {
		await render(PrivacyPage);

		await expect
			.element(page.getByRole('link', { name: 'support@mykeebs.com' }).first())
			.toHaveAttribute('href', 'mailto:support@mykeebs.com');
	});
});
