<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} · mykeebs</title>
</svelte:head>

<section class="mx-auto max-w-2xl px-4 py-16">
	<h1 class="font-[family-name:var(--font-display)] text-3xl font-semibold">
		{page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="mt-4 text-[var(--text-muted)]">
		{page.status === 404 ? "There's no page at this address." : page.error?.message}
	</p>
	<p class="mt-8"><a href={resolve('/')} class="btn">Go home</a></p>
</section>
