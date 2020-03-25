<svelte:head>
    <link rel="stylesheet" href="https://uicdn.toast.com/tui.chart/latest/tui-chart.min.css">
</svelte:head>

<script>
    import { onMount, onDestroy } from 'svelte';

    let container;
    let chart;
    export let data, options;

    onMount(async () => {
        const module = await import("tui-chart");
        const tui = module.default;
        chart = tui.lineChart(container, data, options);
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<div bind:this={container}></div>
