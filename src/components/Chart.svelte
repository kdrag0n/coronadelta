<svelte:head>
    <link rel="stylesheet" href="/c3.min.css">
</svelte:head>

<style>
    :global(.c3-line) {
        stroke-width: 2px !important;
    }

    :global(.c3-event-rects) {
        cursor: auto !important;
    }
</style>

<script>
    import { onMount, onDestroy } from 'svelte';

    let container;
    let chart;
    export let data;

    onMount(async () => {
        const module = await import("c3");
        const c3 = module.default;
        chart = c3.generate({
            bindto: container,
            data: data,
            axis: {
                x: {
                    type: "timeseries"
                }
            },
            point: {
                r: 1,
                focus: {
                    expand: {
                        r: 5
                    }
                }
            },
            zoom: {
                enabled: true,
                type: "scroll",
                rescale: true
            }
        })
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<div bind:this={container}></div>
