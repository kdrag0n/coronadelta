<script>
    const site = "CoronaDelta";
    const domain = "coronavirus.app";

    export let title;
    export let description;
    export let slug;
</script>

<svelte:head>
    <title>{title} • {site}</title>
    <meta name="description" content={description}>

    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@corona_delta">
    <meta name="twitter:creator" content="@kdrag0n">
    <meta name="twitter:image" content="http://www.example.com/image.jpg">

    <meta property="og:title" content="{title}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://{domain}/{slug}" />
    <meta property="og:image" content="http://example.com/image.jpg" />
    <meta property="og:description" content="Live insights into fresh statistics for the COVID-19 coronavirus pandemic, complete with interactive charts." />
    <meta property="og:site_name" content="{site}" />
</svelte:head>
