<script>
	import NavLink from './NavLink.svelte';
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}
</style>

<nav>
	<ul>
		<NavLink {segment} slug='home' link='.'/>
		<NavLink {segment} slug='about'/>
		<NavLink {segment} slug='blog'/>
	</ul>
</nav>
