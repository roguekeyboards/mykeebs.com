<!--
  Describes how mykeebs is developed, so it has to change when that does.
-->
<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>How AI is used to build mykeebs · mykeebs</title>
	<meta
		name="description"
		content="mykeebs was designed by its developer. An AI wrote the code, under the developer's direction, and every change was reviewed before it shipped."
	/>
</svelte:head>

<article class="doc">
	<h1>How AI is used to build mykeebs</h1>
	<p class="doc-lede">
		mykeebs was designed by its developer, who made every decision in it. An AI wrote the code,
		under the developer's direction, and every change was reviewed before it shipped.
	</p>

	<h2>From the developer</h2>
	<p>
		As a developer with more than 25 years behind the keyboard, I've seen developer tools evolve
		from basic vi to full-featured IDEs. The rapid evolution of AI has many promising and concerning
		implications that should matter to all of us. However, AI's mark on the software development
		community is undeniable: no professional developer can thrive without using it.
	</p>
	<p>
		What separates slop from solid software is real engineering. That's the foundation I built
		mykeebs on. I started with the idea and the data model, then built it up on a solid, scalable
		foundation drawn from years of software architecture experience.
	</p>
	<p>Did AI write the code? Of course. Did it design the architecture? No, that was all me.</p>
	<p class="signoff">— @rogue.serenity</p>

	<h2>What the developer decided</h2>
	<ul>
		<li>
			<strong>What it stores.</strong> Every data model was worked out field by field: keyboards and their
			plates and PCBs, switches, keycap sets and their kits, builds, and profiles. Which fields exist,
			which are required, and which values are allowed.
		</li>
		<li>
			<strong>How it behaves.</strong> The REST API and the MCP tools: every route, request and response,
			how errors are reported, and how lists are paged. The rules too, such as what happens when you delete
			a part a build still uses, and who can see what you paid.
		</li>
		<li>
			<strong>How it's run.</strong> The AWS architecture, sign-in, image storage and delivery, photo
			moderation, and keeping it cheap enough to stay free.
		</li>
		<li>
			<strong>How it looks and reads.</strong> The logo and colours, the websites, and the wording of
			the privacy policy, terms and help pages.
		</li>
	</ul>

	<h2>What the AI did</h2>
	<p>
		Claude Code wrote the code, tests and documentation for every part of mykeebs, the app, this
		site and the API behind them, to the developer's specifications. When what it wrote wasn't what
		was asked for, it was sent back. When it suggested something that hadn't been decided, the
		developer made the call; it didn't.
	</p>

	<h2>How it was checked</h2>
	<p>
		Nothing reaches mykeebs without the developer's review: every change is read and approved before
		it's merged. Every change is also checked automatically: linting, unit tests, and functional
		tests that run the whole system end to end.
	</p>
	<p>
		All of the code is public: <a href="https://github.com/rogueserenity/kbdb">kbdb</a> (the API),
		<a href="https://github.com/rogueserenity/mykeebs-web">mykeebs-web</a> (the app) and
		<a href="https://github.com/rogueserenity/mykeebs.com">mykeebs.com</a> (this site).
	</p>

	<h2>AI in mykeebs itself</h2>
	<p>
		mykeebs doesn't send your collection to an AI model, and nothing you put in mykeebs is used to
		train one.
	</p>
	<p>Two things involve machine learning or AI, and both are covered elsewhere:</p>
	<ul>
		<li>
			Photos you upload are checked automatically by Amazon Rekognition for inappropriate content,
			as described in the <a href={resolve('/privacy')}>privacy policy</a>.
		</li>
		<li>
			If you choose to connect your own AI assistant to mykeebs, that assistant's provider sees
			whatever it reads from your collection. See
			<a href={resolve('/help/mcp')}>using mykeebs with an AI assistant</a>.
		</li>
	</ul>

	<h2>Questions?</h2>
	<p>Email <a href="mailto:support@mykeebs.com">support@mykeebs.com</a>.</p>
</article>

<style>
	.signoff {
		color: var(--text-muted);
		font-style: italic;
	}
</style>
