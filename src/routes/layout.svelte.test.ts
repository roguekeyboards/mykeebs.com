import { page, userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import Layout from './+layout.svelte';

const content = createRawSnippet(() => ({ render: () => '<p>Page content</p>' }));

async function renderLayout() {
	await render(Layout, { children: content });
}

describe('root layout', () => {
	it('puts the page content inside the main landmark', async () => {
		await renderLayout();

		await expect.element(page.getByRole('main')).toHaveTextContent('Page content');
	});

	it('offers a skip link as the first stop, and it moves focus to the content', async () => {
		await renderLayout();
		const skip = page.getByRole('link', { name: 'Skip to content' });

		await userEvent.keyboard('{Tab}');
		await expect.element(skip).toHaveFocus();
		await userEvent.keyboard('{Enter}');

		await expect.element(page.getByRole('main')).toHaveFocus();
	});

	it('links the logo home', async () => {
		await renderLayout();

		await expect
			.element(page.getByRole('banner').getByRole('link', { name: 'mykeebs' }))
			.toHaveAttribute('href', '/');
	});

	it('links the prod app from the header and the footer', async () => {
		await renderLayout();

		await expect
			.element(page.getByRole('banner').getByRole('link', { name: 'Open the app' }))
			.toHaveAttribute('href', 'https://mykeebs.info');
		await expect
			.element(page.getByRole('contentinfo').getByRole('link', { name: 'mykeebs app' }))
			.toHaveAttribute('href', 'https://mykeebs.info');
	});

	it('links the legal pages from the footer', async () => {
		await renderLayout();
		const footer = page.getByRole('contentinfo');

		await expect
			.element(footer.getByRole('link', { name: 'Privacy Policy' }))
			.toHaveAttribute('href', '/privacy');
		await expect
			.element(footer.getByRole('link', { name: 'Terms of Service' }))
			.toHaveAttribute('href', '/terms');
	});
});
