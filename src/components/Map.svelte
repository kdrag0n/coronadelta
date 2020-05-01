<svelte:head>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<script>
    import { onMount, onDestroy } from "svelte";
    import { mapboxToken } from "../../secrets.json";

    export let map;
    export let data;

    let container;
    let mounted = false;
    let Plotly;

    $: _data = [{
        type: "choroplethmapbox",
        geojson: `maps/${map}.geo.json`,
        ...data
    }];
    let layout = {
        mapbox: {
            style: "light"
        },
        margin: {
            t: 0,
            b: 0
        }
    };
    let config = {
        mapboxAccessToken: mapboxToken,
        displaylogo: false,
        responsive: true
    };

    onMount(async () => {
        Plotly = (await import("../plotly.js")).default;
        Plotly.newPlot(container, _data, layout, config);
        mounted = true;
    });

    $: if (mounted) {
        Plotly.react(container, _data, layout, config);
        console.log("upd");
    }

    onDestroy(() => {
        if (mounted) {
            mounted = false;
            Plotly.purge(container);
            Plotly = null;
        }
    });
</script>

<div bind:this={container}></div>
