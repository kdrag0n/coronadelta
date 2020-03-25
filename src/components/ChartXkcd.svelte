<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/britecharts/dist/css/britecharts.min.css" type="text/css" />
</svelte:head>

<script>
    import { onMount, onDestroy } from 'svelte';
	import chartXkcd from 'chart.xkcd';

    let svg;
    let chart;
    export let title, xLabel, yLabel, data, options;

    onMount(async () => {
        chart = new chartXkcd.Line(svg, {
            title: title,
            xLabel: xLabel,
            yLabel: yLabel,
            data: data,
            options: options
        });
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<svg bind:this={svg}></svg>
