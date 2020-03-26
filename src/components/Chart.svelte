<svelte:head>
    <link rel="stylesheet" href="/lib/c3.min.css">
</svelte:head>

<style global>
    .c3-line {
        stroke-width: 2px !important;
    }

    .c3-event-rects, .c3-event-rect {
        cursor: auto !important;
    }

    .c3-grid line {
        stroke: #ccc !important;
    }

    .c3-circles circle:not(._expanded_) {
        display: none !important;
    }
</style>

<script>
    import { onMount, onDestroy } from 'svelte';
    import tailwindTheme from 'tailwindcss/defaultTheme';
    const colors = tailwindTheme.colors;
    const chartColors = ["gray", "red", "orange", "yellow", "green", "blue", "purple", "pink"];

    function formatDate(date) {
        return date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" });
    }

    function getColors() {
        let chColors = [];
        chartColors.forEach(colorName => chColors.push(colors[colorName]["600"]))
        return chColors;
    }

    let container;
    let chart;
    export let width = undefined, height = undefined;
    export let data;
    export let color = {
        pattern: getColors()
    };
    export let axis = {
        x: {
            type: "timeseries",
            tick: {
                format: formatDate,
                culling: {
                    max: 10
                }
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
    export let regions = undefined;
    export let legend = undefined;
    export let tooltip = undefined;
    export let subchart = undefined;
    export let line = undefined;
    export let area = undefined;
    export let bar = undefined;
    export let pie = undefined;
    export let donut = undefined;
    export let gauge = undefined;
    export let spline = undefined;
    export let stanford = undefined;

    function calcTickCount() {
        return Math.floor(window.innerWidth < 768 ? window.innerWidth / 100 : window.innerWidth / 200);
    }

    onMount(async () => {
        const module = await import("c3");
        const c3 = module.default;
        axis.x.tick.culling.max = calcTickCount();
        chart = c3.generate({
            bindto: container,
            color: color,
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
        });
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<div bind:this={container}></div>
