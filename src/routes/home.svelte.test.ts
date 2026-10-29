import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { APP_URL, DISCOVER_URL, MCP_URL } from '#lib/links.js';
import HomePage from './+page.svelte';

describe('landing page', () => {
	it('says what mykeebs is', async () => {
		await render(HomePage);

		await expect
			.element(page.getByRole('heading', { level: 1 }))
			.toHaveTextContent('Your keyboard collection, all in one place.');
		expect(document.title).toBe('mykeebs: your keyboard collection, all in one place');
	});

	it('sends sign-in to the app', async () => {
		await render(HomePage);
		const signIn = page.getByRole('link', { name: 'Sign in or create an account' });

		await expect.element(signIn.first()).toHaveAttribute('href', APP_URL);
		expect(signIn.all()).toHaveLength(2);
	});

	it('leads with connecting an AI assistant', async () => {
		await render(HomePage);

		await expect
			.element(page.getByRole('link', { name: 'Connect your AI assistant' }))
			.toHaveAttribute('href', '/help/mcp');
		await expect
			.element(page.getByRole('link', { name: 'Set up your assistant' }))
			.toHaveAttribute('href', '/help/mcp');
	});

	it('leaves the setup steps to the guide', async () => {
		await render(HomePage);

		await expect.element(page.getByRole('heading', { name: 'Or just ask' })).toBeVisible();
		expect(page.getByText(MCP_URL).all()).toHaveLength(0);
	});

	it('names everything you can track', async () => {
		await render(HomePage);

		for (const part of ['Keyboards', 'Switches', 'Keycap sets', 'Builds']) {
			await expect.element(page.getByRole('heading', { name: part, exact: true })).toBeVisible();
		}
	});

	it('shows the order statuses in order', async () => {
		await render(HomePage);
		const keys = page
			.getByRole('list', { name: 'From planned to delivered' })
			.getByRole('listitem');

		await expect.element(keys.first()).toBeVisible();
		expect(keys.all().map((key) => key.element().textContent?.trim())).toEqual([
			'Planned',
			'Ordered',
			'Shipped',
			'Delivered'
		]);
	});

	it('links Discover in the app and the AI statement', async () => {
		await render(HomePage);

		await expect
			.element(page.getByRole('link', { name: 'Discover builders' }))
			.toHaveAttribute('href', DISCOVER_URL);
		await expect
			.element(page.getByRole('link', { name: 'How AI is used' }))
			.toHaveAttribute('href', '/about/ai');
	});
});
