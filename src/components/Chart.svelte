<script>
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js';
    import ChartTooltip from './ChartTooltip.svelte';

    import tailwindTheme from 'tailwindcss/defaultTheme';
    const colors = tailwindTheme.colors;
    const fontPref = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    const logTicks = {
        1: "1",
        10: "10",
        100: "100",
        1000: "1k",
        10000: "10k",
        100000: "100k",
        1000000: "1M",
        10000000: "10M",
        100000000: "100M",
        1000000000: "1B",
        10000000000: "10B"
    };

    export let height = "320px";
    export let data;
    export let type = "line";

    let canvas;
    let chart;
    let tooltip;
    let ttModel = {
        opacity: 0
    };
    let ttX;
    let ttY;

    Chart.defaults.global.defaultFontFamily = fontPref;

    onMount(async () => {
        chart = new Chart(canvas, {
            type: type,
            data: data,
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    enabled: false,
                    mode: "index",
                    intersect: false,
                    position: "nearest",
                    bodySpacing: 8,
                    titleMarginBottom: 10,
                    caretPadding: 10,
                    custom: model => {
                        let rect = canvas.getBoundingClientRect();
                        let x = rect.left + window.pageXOffset + model.x;
                        let y = rect.top + window.pageYOffset + model.y - 42;

                        ttX = x;
                        ttY = y;
                        ttModel = model;
                    }
                },
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize
                scales: {
                    xAxes: [{
                        ticks: {
                            minRotation: 0,
                            maxRotation: 0,
                            autoSkipPadding: 25
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0
                    }
                },
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 12, // bound to font size
                        generateLabels: chart => {
                            let orig = Chart.defaults.global.legend.labels.generateLabels(chart);
                            return orig.map(item => {
                                delete item.lineDash;
                                return item;
                            });
                        }
                    }
                },
                datasets: {
                    line: {
                        fill: false,
                        lineTension: 0,
                        pointRadius: 0,
                        pointHitRadius: 5,
                        pointHoverRadius: 5
                    }
                }
            }
        });
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<div style="position: relative; height: {height};">
    <canvas bind:this={canvas} on:beforeprint={chart.resize()}></canvas>
</div>

<ChartTooltip model={ttModel} x={ttX} y={ttY} />
