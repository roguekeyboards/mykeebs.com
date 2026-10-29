import { page } from 'vitest/browser';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import CodeBlock from './CodeBlock.svelte';

afterEach(() => {
	vi.restoreAllMocks();
	vi.useRealTimers();
});

describe('CodeBlock', () => {
	it('shows the code', async () => {
		await render(CodeBlock, { code: 'claude mcp remove mykeebs' });

		await expect.element(page.getByText('claude mcp remove mykeebs')).toBeVisible();
	});

	it("copies the code without a shell block's prompt", async () => {
		const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
		await render(CodeBlock, { code: 'claude mcp remove mykeebs', shell: true });

		await page.getByRole('button', { name: 'Copy' }).click();

		expect(writeText).toHaveBeenCalledWith('claude mcp remove mykeebs');
		await expect.element(page.getByRole('button', { name: 'Copied' })).toBeVisible();
	});

	it('says so when copying fails', async () => {
		vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'));
		await render(CodeBlock, { code: 'x' });

		await page.getByRole('button', { name: 'Copy' }).click();

		await expect.element(page.getByRole('button', { name: 'Copy failed' })).toBeVisible();
	});

	it('goes back to Copy after a moment', async () => {
		vi.useFakeTimers();
		vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
		await render(CodeBlock, { code: 'x' });

		await page.getByRole('button', { name: 'Copy' }).click();
		await expect.element(page.getByRole('button', { name: 'Copied' })).toBeVisible();
		await vi.advanceTimersByTimeAsync(2000);

		await expect.element(page.getByRole('button', { name: 'Copy' })).toBeVisible();
	});
});
