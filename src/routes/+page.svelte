<script lang="ts">
	import { APP_URL } from '#lib/links.js';
</script>

<svelte:head>
	<title>mykeebs</title>
	<meta
		name="description"
		content="Track your keyboards, switches, keycap sets and builds, and browse other builders' collections."
	/>
</svelte:head>

<!-- A placeholder until the landing page (#2) replaces it. -->
<section class="mx-auto max-w-2xl px-4 py-16">
	<h1 class="font-[family-name:var(--font-display)] text-3xl font-semibold">mykeebs</h1>
	<p class="mt-4 text-[var(--text-muted)]">
		Track your keyboards, switches, keycap sets and builds, and browse other builders' collections.
	</p>
	<p class="mt-8">
		<a href={APP_URL} rel="external" class="btn btn-accent">Open the app</a>
	</p>
</section>
