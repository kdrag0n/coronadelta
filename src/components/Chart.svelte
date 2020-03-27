<script>
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js';
    import ChartTooltip from './ChartTooltip.svelte';

    import tailwindTheme from 'tailwindcss/defaultTheme';
    const colors = tailwindTheme.colors;
    const chartColors = ["gray", "red", "orange", "yellow", "green", "blue", "purple", "pink"];
    const fontPref = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    Chart.defaults.global.defaultFontFamily = fontPref;

    function getColors() {
        let chColors = [];
        chartColors.forEach(colorName => chColors.push(colors[colorName]["600"]))
        return chColors;
    }

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
                    }],
                    yAxes: [{
                        type: "logarithmic",
                        ticks: {
                            callback: (val, idx, vals) => {
                                return val.toLocaleString();
                            }
                        },
                        afterBuildTicks: chartObj => {
                            const ticks = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000];
                            chartObj.ticks.splice(0, chartObj.ticks.length);
                            chartObj.ticks.push(...ticks);
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
                        boxWidth: 12 // bound to font size
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
