<script lang="ts">
	import { resolve } from '$app/paths';
	import { PROFILE_SETTINGS_URL, SUPPORT_EMAIL } from '#lib/links.js';
</script>

<svelte:head>
	<title>Contact · mykeebs</title>
	<meta name="description" content="How to get in touch about mykeebs." />
</svelte:head>

<article class="doc">
	<h1>Contact</h1>
	<p class="doc-lede">
		Email <a href="mailto:{SUPPORT_EMAIL}">{SUPPORT_EMAIL}</a> about anything to do with mykeebs.
	</p>

	<h2>Something missing from a list</h2>
	<p>
		Vendors, switch types, keyboard sizes and other fields only take values from a fixed list. Tell
		us what's missing.
	</p>

	<h2>Problems and ideas</h2>
	<p>
		Report a bug, ask a question or suggest a feature. For a bug, say what you were doing and which
		browser or device you were on.
	</p>

	<h2>AI assistants</h2>
	<p>
		To connect Claude or another assistant to your collection, see the
		<a href={resolve('/help/mcp')}>guide to using mykeebs with AI</a>.
	</p>

	<h2>Your account and data</h2>
	<p>
		You can delete your whole account yourself from your
		<a href={PROFILE_SETTINGS_URL} rel="external">profile settings</a> in the app. For anything else
		about your data, email us from the address on your Discord account so we can match it to your
		mykeebs account. The <a href={resolve('/privacy')}>privacy policy</a> lists what you can ask for.
	</p>
</article>
