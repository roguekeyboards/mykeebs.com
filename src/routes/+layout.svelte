<script lang="ts">
	import { resolve } from '$app/paths';
	import { ExternalLink } from '@lucide/svelte';
	import './layout.css';
	import favicon from '@rogueserenity/mykeebs-brand/favicon.svg';
	import faviconIco from '@rogueserenity/mykeebs-brand/favicon.ico';
	import appleTouchIcon from '@rogueserenity/mykeebs-brand/apple-touch-icon.png';
	import logo from '@rogueserenity/mykeebs-brand/logo-horizontal-on-dark.svg';
	import mark from '@rogueserenity/mykeebs-brand/mark-on-dark.svg';
	import { APP_URL } from '#lib/links.js';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={faviconIco} sizes="32x32" />
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={appleTouchIcon} />
</svelte:head>
<a href="#main" class="skip-link">Skip to content</a>
<header class="site-header">
	<a href={resolve('/')} class="site-brand">
		<img src={mark} alt="mykeebs" class="sm:hidden" />
		<img src={logo} alt="mykeebs" class="hidden sm:block" />
	</a>
	<a href={APP_URL} rel="external" class="btn btn-accent">
		Open the app
		<ExternalLink class="h-4 w-4" aria-hidden="true" />
	</a>
</header>
<main id="main" tabindex="-1">
	{@render children()}
</main>
<footer class="site-footer">
	<a href={resolve('/')}>Home</a>
	<a href={resolve('/help/mcp')}>Use with AI Assistants</a>
	<a href={resolve('/privacy')}>Privacy Policy</a>
	<a href={resolve('/terms')}>Terms of Service</a>
	<a href={APP_URL} rel="external">mykeebs app</a>
</footer>
