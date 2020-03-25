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
    export let width, height;
    export let data;
    export let axis = {
        x: {
            type: "timeseries",
            tick: {
                format: formatDate
            }
        }
    };
    export let point = {
        r: 1,
        focus: {
            expand: {
                r: 5
            }
        }
    };
    export let zoom = {
        enabled: true,
        type: "scroll",
        rescale: true
    };
    export let grid = {
        x: {
            show: true
        },
        y: {
            show: true
        }
    };
    export let regions;
    export let legend;
    export let tooltip;
    export let subchart;
    export let line;
    export let area;
    export let bar;
    export let pie;
    export let donut;
    export let gauge;
    export let spline;
    export let stanford;

    onMount(async () => {
        const module = await import("c3");
        const c3 = module.default;
        chart = c3.generate({
            bindto: container,
            size: {
                width: width,
                height: height
            },
            data: data,
            axis: axis,
            point: point,
            zoom: zoom,
            grid: grid,
            regions: regions,
            legend: legend,
            tooltip: tooltip,
            subchart: subchart,
            line: line,
            area: area,
            bar: bar,
            pie: pie,
            donut: donut,
            gauge: gauge,
            spline: spline,
            stanford: stanford
        })
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<div bind:this={container}></div>
