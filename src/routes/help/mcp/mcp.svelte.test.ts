import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import McpGuide from './+page.svelte';

describe('MCP guide', () => {
	it('titles the page', async () => {
		await render(McpGuide);

		await expect
			.element(page.getByRole('heading', { level: 1 }))
			.toHaveTextContent('Using mykeebs with an AI assistant');
		expect(document.title).toBe('Using mykeebs with an AI assistant · mykeebs');
	});

	it("gives prod's MCP server address", async () => {
		await render(McpGuide);

		await expect
			.element(page.getByText('https://api.mykeebs.info/mcp', { exact: true }))
			.toBeVisible();
	});

	it('gives the Claude Code commands against that address', async () => {
		await render(McpGuide);

		await expect
			.element(
				page.getByText('claude mcp add --transport http mykeebs https://api.mykeebs.info/mcp', {
					exact: true
				})
			)
			.toBeVisible();
		await expect
			.element(page.getByText('claude mcp remove mykeebs', { exact: true }))
			.toBeVisible();
	});

	it('offers a copy button on every code block', async () => {
		await render(McpGuide);

		await expect.element(page.getByRole('button', { name: 'Copy' }).first()).toBeVisible();
		expect(page.getByRole('button', { name: 'Copy' }).all()).toHaveLength(
			document.querySelectorAll('pre').length
		);
	});

	it('keeps the image conversion commands intact', async () => {
		await render(McpGuide);

		await expect
			.element(
				page.getByText(
					"vipsthumbnail photo.jpg --size '2560x2560>' -o 'photo.webp[Q=82,keep=none]'",
					{ exact: true }
				)
			)
			.toBeVisible();
	});

	it('links the app', async () => {
		await render(McpGuide);

		await expect
			.element(page.getByRole('link', { name: 'mykeebs app' }).first())
			.toHaveAttribute('href', 'https://mykeebs.info');
	});
});
