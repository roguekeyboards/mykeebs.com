import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
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

		await expect.element(signIn.first()).toHaveAttribute('href', 'https://mykeebs.info');
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

	it("gives prod's MCP server address to copy", async () => {
		await render(HomePage);

		await expect
			.element(page.getByText('https://api.mykeebs.info/mcp', { exact: true }))
			.toBeVisible();
		await expect.element(page.getByRole('button', { name: 'Copy' })).toBeVisible();
	});

	it('names everything you can track', async () => {
		await render(HomePage);

		for (const part of ['Keyboards', 'Switches', 'Keycap sets', 'Builds']) {
			await expect.element(page.getByRole('heading', { name: part, exact: true })).toBeVisible();
		}
	});

	it('shows the order statuses in order', async () => {
		await render(HomePage);
		const keys = page.getByRole('list').filter({ hasText: 'Planned' }).getByRole('listitem');

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
			.toHaveAttribute('href', 'https://mykeebs.info/discover');
		await expect
			.element(page.getByRole('link', { name: 'How AI is used' }))
			.toHaveAttribute('href', '/about/ai');
	});
});
