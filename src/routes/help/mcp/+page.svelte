<!--
  Describes what mykeebs-api's MCP tools can do, so it has to change when they do.
-->
<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import { APP_URL, MCP_URL } from '#lib/links.js';
</script>

<svelte:head>
	<title>Using mykeebs with an AI assistant · mykeebs</title>
	<meta
		name="description"
		content="Connect Claude, or any other assistant that supports MCP, to your mykeebs collection."
	/>
</svelte:head>

<article class="doc">
	<h1>Using mykeebs with an AI assistant</h1>
	<p class="doc-lede">
		Connect Claude, or any other assistant that supports MCP, to your mykeebs collection and manage
		it by just asking.
	</p>

	<h2>What it does</h2>
	<p>
		mykeebs has an MCP server. MCP (Model Context Protocol) is a standard way for an AI assistant to
		use outside services. Once connected, your assistant can do almost anything the
		<a href={APP_URL} rel="external">mykeebs app</a> can:
	</p>
	<ul>
		<li>
			Add, change and remove keyboards (with their plates and PCBs), switches, keycap sets (with
			their kits) and builds.
		</li>
		<li>Add and remove photos.</li>
		<li>Set up and edit your profile: username, bio, links, avatar and price preferences.</li>
		<li>Look through other people's public collections and the profile directory.</li>
	</ul>
	<p>
		It acts as you: it can see and change only what you could, and other people see only what you've
		made visible to them.
	</p>

	<h2>What you need</h2>
	<ul>
		<li>A Discord account. You sign in to mykeebs with Discord.</li>
		<li>
			An AI assistant that can connect to a remote MCP server, such as Claude (on the web, desktop
			or mobile) or Claude Code.
		</li>
	</ul>
	<p>The mykeebs MCP server address is:</p>
	<CodeBlock code={MCP_URL} />

	<h2>Setting it up</h2>

	<h3>Claude (web, desktop and mobile)</h3>
	<ol>
		<li>Open <strong>Settings</strong>, then <strong>Connectors</strong>.</li>
		<li>Choose <strong>Add custom connector</strong>.</li>
		<li>
			Name it <code>mykeebs</code> and paste the server address above as its URL. Leave the advanced settings
			empty.
		</li>
		<li>Choose <strong>Connect</strong> and sign in (see below).</li>
	</ol>
	<p>Connectors you add on the web also show up in the desktop and mobile apps.</p>

	<h3>Claude Code</h3>
	<p>Run:</p>
	<CodeBlock code="claude mcp add --transport http mykeebs {MCP_URL}" shell />
	<p>
		Then start Claude Code, type <code>/mcp</code>, pick <strong>mykeebs</strong> and choose
		<strong>Authenticate</strong>.
	</p>

	<h3>Other assistants</h3>
	<p>
		Add a remote MCP server with the address above. It uses the Streamable HTTP transport and signs
		you in with OAuth, and your assistant registers itself automatically, so you don't need a client
		ID or an API key. If your assistant asks for one anyway, it can't connect to mykeebs yet.
	</p>

	<h2>Signing in</h2>
	<p>
		When you connect, your assistant opens a mykeebs sign-in page in your browser. Sign in with
		Discord, then allow the assistant to access your mykeebs account. Then you're sent back to your
		assistant, ready to go.
	</p>
	<p>
		New to mykeebs? Signing in creates your account. Then ask your assistant to create your profile
		and pick a username, or set it up in the <a href={APP_URL} rel="external">mykeebs app</a>.
	</p>

	<h2>Things to try</h2>
	<ul>
		<li>"Add my Gateron Oil Kings to mykeebs. I bought 90 of them from KBDfans for $40."</li>
		<li>"Make a build from my Mode Envoy, the Oil Kings and GMK Olivia, and make it public."</li>
		<li>"Which of my keyboards haven't been delivered yet?"</li>
		<li>"How much have I spent on keycaps this year?"</li>
		<li>"Show me the public builds in jane's collection."</li>
		<li>"Hide my prices from other people."</li>
	</ul>
	<p>
		Some fields only take values from a fixed list, such as vendors, switch types and keyboard
		sizes. Your assistant can look these up, so you can just describe things in your own words. If
		something you need is missing from a list, let us know at
		<a href="mailto:support@mykeebs.com">support@mykeebs.com</a>.
	</p>

	<h2>Good to know</h2>
	<p>
		<strong>Who can see what.</strong> Each keyboard, switch, keycap set and build is public (anyone),
		visible to signed-in mykeebs users only, or private (just you). Prices you paid are shown to others
		only if your profile allows it.
	</p>
	<p>
		<strong>Photos.</strong> Give your assistant a photo, or a link to one, and it uploads it for you.
		Every photo is checked automatically, and only you can see it until it passes. A keyboard or build
		can have up to 10 photos; a switch, keycap kit and profile have one each.
	</p>
	<p>
		Photos must be WebP, at most 2560 pixels on their longest side and at most 1.5 MB. If yours
		isn't, your assistant converts it first, which needs one of these tools on your computer (it may
		offer to install one). You can also run them yourself:
	</p>
	<ul class="tools">
		<li>
			<a href="https://www.libvips.org/install.html">libvips</a>: fast, and reads iPhone HEIC
			photos.
			<CodeBlock
				code="vipsthumbnail photo.jpg --size '2560x2560>' -o 'photo.webp[Q=82,keep=none]'"
				shell
			/>
		</li>
		<li>
			<a href="https://imagemagick.org/script/download.php">ImageMagick</a>: widely available.
			<CodeBlock
				code="magick photo.jpg -auto-orient -resize '2560x2560>' -quality 82 -strip photo.webp"
				shell
			/>
		</li>
	</ul>
	<p>
		<strong>Deleting.</strong> Your assistant can delete things, including your whole account, and deleted
		items can't be brought back. If a build still uses a keyboard, switch or keycap set, deleting it fails
		unless you also delete the builds that use it. Most assistants ask before using a tool; read what
		it's about to do before you allow anything that deletes.
	</p>
	<p>
		<strong>Mistakes.</strong> AI assistants can misread what you meant. Check what was saved, especially
		prices and dates.
	</p>

	<h2>Disconnecting</h2>
	<p>
		Remove the connector in your assistant's settings. This stops your assistant using your account;
		your collection stays on mykeebs. In Claude Code, run:
	</p>
	<CodeBlock code="claude mcp remove mykeebs" shell />

	<h2>Need help?</h2>
	<p>Email <a href="mailto:support@mykeebs.com">support@mykeebs.com</a>.</p>
</article>

<style>
	.tools li {
		margin-bottom: 1rem;
	}
</style>
