<script lang="ts">
	import { resolve } from '$app/paths';
	import { ClipboardList, Globe, Lock, Package, ShoppingBag, Truck, User } from '@lucide/svelte';
	import { APP_URL, DISCOVER_URL } from '#lib/links.js';

	const parts = [
		{ name: 'Keyboards', detail: 'With their plates and PCBs.' },
		{ name: 'Switches', detail: 'How many you have, and where they came from.' },
		{ name: 'Keycap sets', detail: 'With the kits you bought.' },
		{ name: 'Builds', detail: 'Which keyboard, switches and keycaps went together.' }
	];

	const statuses = [
		{ label: 'Planned', icon: ClipboardList },
		{ label: 'Ordered', icon: ShoppingBag },
		{ label: 'Shipped', icon: Truck },
		{ label: 'Delivered', icon: Package }
	];

	const prompts = [
		'Make a build from my Mode Envoy, the Oil Kings and GMK Olivia, and make it public.',
		"Which of my keyboards haven't been delivered yet?",
		'How much have I spent on keycaps this year?',
		'Hide my prices from other people.'
	];

	const audiences = [
		{ label: 'Public', detail: 'Anyone.', icon: Globe, tone: 'var(--visibility-public)' },
		{
			label: 'Signed in',
			detail: 'Anyone with a mykeebs account.',
			icon: User,
			tone: 'var(--visibility-authenticated)'
		},
		{ label: 'Private', detail: 'Just you.', icon: Lock, tone: 'var(--visibility-private)' }
	];
</script>

<svelte:head>
	<title>mykeebs: your keyboard collection, all in one place</title>
	<meta
		name="description"
		content="Track your keyboards, switches, keycap sets and builds, from planned to delivered, in the app or by asking your AI assistant."
	/>
</svelte:head>

<div class="landing">
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero-copy">
			<h1 id="hero-title">Your keyboard collection, all in one place.</h1>
			<p class="hero-lede">
				Track your keyboards, switches, keycap sets and builds, from planned to delivered. Keep it
				up to date in the app, or just ask your AI assistant.
			</p>
			<div class="hero-actions">
				<a href={APP_URL} rel="external" class="btn btn-accent">Sign in or create an account</a>
				<a href={resolve('/help/mcp')} class="btn">Connect your AI assistant</a>
			</div>
			<p class="hero-note">Free. You sign in with Discord.</p>
		</div>

		<figure class="chat">
			<figcaption class="sr-only">
				An example of asking an AI assistant connected to mykeebs to add switches.
			</figcaption>
			<div class="chat-bar" aria-hidden="true">
				<span class="chat-dot"></span>
				mykeebs connected
			</div>
			<p class="chat-user">
				Add my Gateron Oil Kings to mykeebs. I bought 90 of them from KBDfans for $40.
			</p>
			<div class="chat-reply">
				<p>Done. They're in your switches:</p>
				<dl class="chat-item">
					<dt>Switch</dt>
					<dd>Gateron Oil King</dd>
					<dt>Quantity</dt>
					<dd>90</dd>
					<dt>Bought from</dt>
					<dd>KBDfans</dd>
					<dt>Paid</dt>
					<dd>$40.00</dd>
				</dl>
			</div>
		</figure>
	</section>

	<section class="band" aria-labelledby="track-title">
		<h2 id="track-title">What you can track</h2>
		<ul class="parts">
			{#each parts as part (part.name)}
				<li>
					<h3>{part.name}</h3>
					<p>{part.detail}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="band split" aria-labelledby="ask-title">
		<div>
			<h2 id="ask-title">Or just ask</h2>
			<p>
				Connect Claude, or any other assistant that supports MCP, and manage your collection in your
				own words. It can do almost anything the app can, photos included. It acts as you, so it
				only sees and changes what you could.
			</p>
			<p><a href={resolve('/help/mcp')}>Set up your assistant</a></p>
		</div>
		<div>
			<h3 class="prompts-title">Things to ask</h3>
			<ul class="prompts">
				{#each prompts as prompt (prompt)}
					<li>{prompt}</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="band" aria-labelledby="status-title">
		<h2 id="status-title">From planned to delivered</h2>
		<ol class="keys">
			{#each statuses as status (status.label)}
				<li class="key">
					<status.icon class="h-4 w-4" aria-hidden="true" />
					{status.label}
				</li>
			{/each}
		</ol>
		<p class="band-lede">
			Mark each item as it moves along and see what's still on its way. Record what you paid and
			where you bought it, and add photos.
		</p>
	</section>

	<section class="band split" aria-labelledby="visibility-title">
		<div>
			<h2 id="visibility-title">You decide who sees what</h2>
			<p>
				Every keyboard, switch, keycap set and build has its own setting. What you paid stays hidden
				from others unless you choose to show it.
			</p>
		</div>
		<ul class="audiences">
			{#each audiences as audience (audience.label)}
				<li style:--tone={audience.tone}>
					<audience.icon class="h-4 w-4" aria-hidden="true" />
					<span class="audience-label">{audience.label}</span>
					<span class="audience-detail">{audience.detail}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="band" aria-labelledby="discover-title">
		<h2 id="discover-title">See what others are building</h2>
		<p class="band-lede">
			Browse other builders' public collections and builds, and find people in the builder
			directory.
		</p>
		<p><a href={DISCOVER_URL} rel="external">Discover builders</a></p>
	</section>

	<section class="closing" aria-labelledby="closing-title">
		<h2 id="closing-title">Start your collection</h2>
		<p>Free, with no ads and no tracking. Sign in with Discord.</p>
		<a href={APP_URL} rel="external" class="btn btn-accent">Sign in or create an account</a>
		<p class="closing-note">
			An AI wrote the code for mykeebs, under its developer's direction.
			<a href={resolve('/about/ai')}>How AI is used</a>
		</p>
	</section>
</div>

<style>
	.landing {
		max-width: 68rem;
		margin: 0 auto;
		padding: 0 1rem 4rem;
	}

	h1,
	h2,
	h3 {
		font-family: var(--font-display);
		font-weight: 600;
		line-height: 1.2;
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3.25rem);
		letter-spacing: -0.02em;
		max-width: 16ch;
	}

	h2 {
		font-size: 1.375rem;
		margin-bottom: 1rem;
	}

	h3 {
		font-size: 1rem;
	}

	p {
		line-height: 1.6;
	}

	a:not(.btn) {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	a:not(.btn):hover {
		color: var(--accent-strong);
	}

	/* Hero */

	.hero {
		display: grid;
		gap: 3rem;
		align-items: center;
		padding: 4rem 0 3.5rem;
	}

	@media (min-width: 900px) {
		.hero {
			grid-template-columns: 1.1fr 1fr;
			padding: 6rem 0 5rem;
		}
	}

	.hero-lede {
		margin-top: 1.25rem;
		max-width: 34rem;
		font-size: 1.125rem;
		color: var(--text-muted);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.hero-note {
		margin-top: 1.25rem;
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* The example conversation: the page's one picture of what the MCP connection does. */

	.chat {
		margin: 0;
		padding: 1.25rem;
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
	}

	.chat-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 1rem;
		margin-bottom: 1.25rem;
		border-bottom: 1px solid var(--border);
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.chat-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--success);
	}

	.chat-user {
		margin-left: auto;
		max-width: 85%;
		padding: 0.75rem 1rem;
		background: var(--surface-hover);
		border-radius: 0.75rem 0.75rem 0.25rem 0.75rem;
	}

	.chat-reply {
		margin-top: 1.25rem;
		max-width: 90%;
	}

	.chat-item {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.375rem 1.25rem;
		margin-top: 0.75rem;
		padding: 0.875rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 0.375rem;
		font-size: 0.9375rem;
	}

	.chat-item dt {
		color: var(--text-muted);
	}

	.chat-item dd {
		font-family: var(--font-display);
	}

	/* Sections */

	.band {
		padding: 3rem 0;
		border-top: 1px solid var(--border);
	}

	.band-lede {
		max-width: 40rem;
		color: var(--text-muted);
	}

	.band-lede + p {
		margin-top: 1rem;
	}

	.split {
		display: grid;
		gap: 2rem;
	}

	@media (min-width: 900px) {
		.split {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
		}
	}

	.split p + p {
		margin-top: 1rem;
	}

	.split p {
		color: var(--text-muted);
	}

	.parts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
		gap: 1.5rem 2rem;
	}

	.parts li {
		padding-top: 1rem;
		border-top: 2px solid var(--accent);
	}

	.parts p {
		margin-top: 0.375rem;
		color: var(--text-muted);
	}

	.prompts-title {
		margin-bottom: 1rem;
	}

	.prompts {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.prompts li {
		align-self: flex-start;
		padding: 0.625rem 0.875rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem 0.75rem 0.75rem 0.25rem;
	}

	/* Keycaps, drawn like the logo's: a lighter top over a darker lip. */

	.keys {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.key {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem 0.875rem;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--logo-ink);
		background: var(--logo-cream);
		border-radius: 0.5rem;
		box-shadow: inset 0 -5px 0 var(--logo-cream-lip);
	}

	.key:last-child {
		background: var(--logo-amber);
		box-shadow: inset 0 -5px 0 var(--logo-amber-lip);
	}

	.audiences {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.audiences li {
		display: grid;
		grid-template-columns: auto 6rem 1fr;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}

	.audiences li :global(svg),
	.audience-label {
		color: var(--tone);
	}

	.audience-label {
		font-weight: 600;
	}

	.audience-detail {
		color: var(--text-muted);
	}

	/* Closing */

	.closing {
		margin-top: 1rem;
		padding: 3rem 1.5rem;
		text-align: center;
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
	}

	.closing p {
		color: var(--text-muted);
		margin-bottom: 1.5rem;
	}

	.closing .closing-note {
		margin: 1.5rem 0 0;
		font-size: 0.875rem;
	}
</style>
