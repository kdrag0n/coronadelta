<PageMeta title="All about the coronavirus"
          description="All about the COVID-19 coronavirus pandemic — learn about common misconceptions, prevention, and more." />

<script context="module">
    export function preload({ params, query }) {
        return this.fetch("info.json").then(r => r.json()).then(pages => {
            return { pages };
        });
    }
</script>

<script>
    import PageMeta from "../components/PageMeta.svelte";

    export let pages;
</script>

<style>
    ul {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
</style>

<h1>Information pages</h1>

<ul>
    {#each pages as page}
        <li><a rel="prefetch" href="{page.slug}">{page.title}</a></li>
    {/each}
</ul>
