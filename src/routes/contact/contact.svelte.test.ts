import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ContactPage from './+page.svelte';

describe('Contact page', () => {
	it('gives the support address as a mail link', async () => {
		await render(ContactPage);

		await expect
			.element(page.getByRole('link', { name: 'support@mykeebs.com' }))
			.toHaveAttribute('href', 'mailto:support@mykeebs.com');
	});

	it("links this site's MCP guide and privacy policy", async () => {
		await render(ContactPage);

		await expect
			.element(page.getByRole('link', { name: 'guide to using mykeebs with AI' }))
			.toHaveAttribute('href', '/help/mcp');
		await expect
			.element(page.getByRole('link', { name: 'privacy policy' }))
			.toHaveAttribute('href', '/privacy');
	});

	it("points account deletion at the app's profile settings", async () => {
		await render(ContactPage);

		await expect
			.element(page.getByRole('link', { name: 'profile settings' }))
			.toHaveAttribute('href', 'https://mykeebs.info/profile/edit');
	});

	it('covers each reason to get in touch', async () => {
		await render(ContactPage);

		for (const heading of [
			'Something missing from a list',
			'Problems and ideas',
			'AI assistants',
			'Your account and data'
		]) {
			await expect.element(page.getByRole('heading', { name: heading })).toBeVisible();
		}
	});

	it('titles the page', async () => {
		await render(ContactPage);

		await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent('Contact');
		expect(document.title).toBe('Contact · mykeebs');
	});
});
