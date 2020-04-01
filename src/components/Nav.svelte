<script>
    import NavLink from "./NavLink.svelte";
    export let segment;
</script>

<style>
    nav {
        border-bottom: 1px solid theme("colors.orange.200");
        font-weight: 300;
        padding: 0 1em;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: "";
        display: block;
        clear: both;
    }
</style>

<nav>
    <ul>
        <NavLink {segment} slug="charts" link="."/>
        <NavLink {segment} slug="map"/>
        <NavLink {segment} slug="numbers"/>
        <NavLink {segment} slug="info"/>
        <NavLink {segment} slug="about"/>
    </ul>
</nav>
