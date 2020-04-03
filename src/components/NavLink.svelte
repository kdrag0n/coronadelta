<script>
    export let segment;
    export let slug;
    export let link = slug;
    export let linkSlug = link === slug ? slug : undefined;
</script>

<style>
    li {
        display: block;
        float: left;
        margin: 0;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
        font-weight: 700;
    }

    [aria-current]::after {
        position: absolute;
        content: "";
        width: calc(100% - 1em);
        height: 2px;
        @apply bg-orange-500;
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
</style>

<li>
    <a rel=prefetch aria-current={segment === linkSlug ? "page" : undefined} href={link}>{slug}</a>
</li>
