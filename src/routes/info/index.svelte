<PageMeta title="All about the coronavirus"
          description="All about the COVID-19 coronavirus pandemic — learn about common misconceptions, prevention, and more."
          slug="" />

<script context="module">
    export function preload({ params, query }) {
        return this.fetch("info.json").then(r => r.json()).then(pages => {
            return { pages };
        });
    }
</script>

<script>
    import PageMeta from "../../components/PageMeta.svelte";

    export let pages;
</script>

<style>
    ul {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
</style>

<h1>Recent pages</h1>

<ul>
    {#each pages as page}
        <!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
        <li><a rel='prefetch' href='info/{page.slug}'>{page.title}</a></li>
    {/each}
</ul>
