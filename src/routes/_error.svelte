<PageMeta title="Error {status}"
          description="Something went wrong." />

<script>
    import PageMeta from "../components/PageMeta.svelte";

    const dev = process.env.NODE_ENV === "development";

    export let status;
    export let error;
</script>

<style>
    h1, p {
        margin: 0 auto;
    }

    h1 {
        font-size: 2.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    p {
        margin: 1em auto;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>

<h1>Error {status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
    <pre>{error.stack}</pre>
{/if}
