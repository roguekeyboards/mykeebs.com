<script lang="ts">
	let { code, shell = false }: { code: string; shell?: boolean } = $props();

	let label = $state('Copy');
	let reset: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			label = 'Copied';
		} catch {
			label = 'Copy failed';
		}
		clearTimeout(reset);
		reset = setTimeout(() => (label = 'Copy'), 2000);
	}
</script>

<div class="codeblock">
	<pre class:shell><code>{code}</code></pre>
	<button type="button" class="copy" onclick={copy}>{label}</button>
</div>

<style>
	.codeblock {
		position: relative;
		margin: 1rem 0;
	}

	pre {
		font-family: var(--font-display);
		font-size: 0.875rem;
		line-height: 1.5;
		margin: 0;
		padding: 0.75rem 5rem 0.75rem 1rem;
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 6px;
	}

	code {
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	/* The prompt is drawn, not part of the text, so it isn't selected or copied. */
	pre.shell code::before {
		content: '$ ';
		color: var(--text-faint);
		user-select: none;
	}

	.copy {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font: 500 0.75rem var(--font-body);
		color: var(--text-muted);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 0.25rem 0.6rem;
		cursor: pointer;
	}

	.copy:hover {
		color: var(--text);
		background: var(--surface-hover);
		border-color: var(--border-strong);
	}
</style>
