<script>
    import { stores } from "@sapper/app";
    const { page } = stores();

    const site = "CoronaDelta";
    const domain = "coronavirus.app";

    export let title;
    export let description;
    export let path = $page.path;

    if (path[0] !== "/") {
        path = "/" + path;
    }
</script>

<svelte:head>
    <title>{title} • {site}</title>
    <meta name="description" content={description}>

    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://{domain}{path}" />
    <meta property="og:image" content="http://example.com/image.jpg" />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={site} />

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@corona_delta">
    <meta name="twitter:creator" content="@kdrag0n">
    <meta name="twitter:image" content="http://www.example.com/image.jpg">
</svelte:head>
