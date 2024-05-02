<script lang="ts">
	import { base } from '$app/paths';
	import { version_details } from 'geometrix';
	import appPackage from '../../package.json';

	const detailed_versions = version_details(appPackage);
</script>

<h1>Welcome to desi51-ui</h1>
<h6>
	Showcasing the usage of the framework
	<a href="https://github.com/charlyoleg2/parametrix">parametrix</a>.
</h6>
<nav>
	<a href="{base}/">index: list of designs</a>
</nav>
<main>
	<slot />
</main>
<footer>
	<article>
		<a href="https://github.com/charlyoleg2/parame51">desi51-ui</a>, an example of usage of
		<a href="https://www.npmjs.com/package/geometrix">geometrix</a> and
		<a href="https://www.npmjs.com/package/geomui">geomui</a>.
	</article>
	<article>
		<h3>Desi51-ui version</h3>
		<code>
			{#each detailed_versions as dversion}
				{dversion}<br />
			{/each}
		</code>
	</article>
</footer>

<style lang="scss">
	:global(body) {
		font-family: 'Helvetica', 'Arial', 'Verdana';
		margin: 0;
		background-color: DarkCyan;
	}
	h1 {
		color: aquamarine;
		margin: 1rem;
		margin-bottom: 0.2rem;
	}
	h6 {
		margin: 1rem;
		margin-top: 0.2rem;
	}
	nav {
		margin: 1rem;
	}
	nav > a {
		display: inline-block;
		color: black;
		background-color: GhostWhite;
		text-decoration: none;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
		border-style: solid;
		border-width: 0.2rem;
		border-radius: 0.6rem;
		border-color: Brown;
		margin-top: 0.1rem;
		margin-left: 0.1rem;
	}
	nav > a:hover {
		background-color: yellow;
	}
	main {
		background-color: GhostWhite;
		min-height: 70vh;
		padding-top: 2rem;
		padding-bottom: 3rem;
	}
	footer {
		margin: 1rem;
		margin-top: 5rem;
		margin-bottom: 5rem;
	}
</style>
