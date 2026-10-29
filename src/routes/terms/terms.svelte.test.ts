import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TermsPage from './+page.svelte';

describe('Terms of Service page', () => {
	it('titles the page', async () => {
		await render(TermsPage);

		await expect
			.element(page.getByRole('heading', { level: 1 }))
			.toHaveTextContent('Terms of Service');
		expect(document.title).toBe('Terms of Service · mykeebs');
	});

	it('shows when it was last updated', async () => {
		await render(TermsPage);

		await expect.element(page.getByText(/^Last updated: /)).toBeVisible();
	});

	it('covers this site and the app as well as the API and MCP', async () => {
		await render(TermsPage);

		const intro = page.getByText(/^These terms cover/);

		await expect.element(intro).toBeVisible();
		for (const part of ['(mykeebs.com)', '(mykeebs.info)', 'API', 'MCP']) {
			expect(intro.element().textContent).toContain(part);
		}
	});

	it("links Discord's terms and guidelines", async () => {
		await render(TermsPage);

		await expect
			.element(page.getByRole('link', { name: 'Terms of Service' }))
			.toHaveAttribute('href', 'https://discord.com/terms');
		await expect
			.element(page.getByRole('link', { name: 'Community Guidelines' }))
			.toHaveAttribute('href', 'https://discord.com/guidelines');
	});
});
