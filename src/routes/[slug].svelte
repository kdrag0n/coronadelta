<PageMeta title={page.title}
          description={page.description} />

<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`${params.slug}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return { page: data };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import PageMeta from "../components/PageMeta.svelte";
    import Article from "../components/Article.svelte";

    export let page;
</script>

<style>
    .content :global(h2), .content :global(h3) {
        font-weight: 500
    }

    .content :global(h2) {
        margin-top: 2em;
        font-size: 1.4em;
    }

    .content :global(pre) {
        background-color: #f9f9f9;
        box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
        padding: 0.5em;
        border-radius: 2px;
        overflow-x: auto;
    }

    .content :global(pre) :global(code) {
        background-color: transparent;
        padding: 0;
    }

    .content :global(img) {
        max-width: 20rem;
        padding: 2rem;
        margin: 0 auto;
        display: block;
    }
</style>

<Article>
    <h1>{page.title}</h1>

    <div class="content">
        {@html page.html}
    </div>
</Article>
