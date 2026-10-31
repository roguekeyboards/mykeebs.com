import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AiStatement from './+page.svelte';

describe('AI statement', () => {
	it('titles the page', async () => {
		await render(AiStatement);

		await expect
			.element(page.getByRole('heading', { level: 1 }))
			.toHaveTextContent('How AI is used to build mykeebs');
		expect(document.title).toBe('How AI is used to build mykeebs · mykeebs');
	});

	it("carries the developer's signed note", async () => {
		await render(AiStatement);

		await expect.element(page.getByRole('heading', { name: 'From the developer' })).toBeVisible();
		await expect.element(page.getByText('— @rogue.serenity')).toBeVisible();
	});

	it('links the code for every part of mykeebs', async () => {
		await render(AiStatement);

		for (const repo of ['mykeebs-api', 'mykeebs-web', 'mykeebs.com']) {
			await expect
				.element(page.getByRole('link', { name: repo, exact: true }))
				.toHaveAttribute('href', `https://github.com/roguekeyboards/${repo}`);
		}
	});

	it('links the privacy policy and MCP guide on this site', async () => {
		await render(AiStatement);

		await expect
			.element(page.getByRole('link', { name: 'privacy policy' }))
			.toHaveAttribute('href', '/privacy');
		await expect
			.element(page.getByRole('link', { name: 'using mykeebs with an AI assistant' }))
			.toHaveAttribute('href', '/help/mcp');
	});
});
