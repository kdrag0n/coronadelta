<script>
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js';
    import ChartTooltip from './ChartTooltip.svelte';

    const fontPref = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    const logTicks = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11];

    function prettyTick(val, idx, vals) {
        if (val < 1000)
            return val.toLocaleString();

        if (val < 1e6)
            return Math.floor(val / 1000) + "k";

        if (val < 1e9)
            return Math.floor(val / 1e6) + "M";

        if (val < 1e12)
            return Math.floor(val / 1e9) + "B";

        return val.toLocaleString();
    }
    window.prettyTick = prettyTick;

    const linearAxis = {
        type: "linear",
        ticks: {
            callback: prettyTick
        }
    };

    const logAxis = {
        type: "logarithmic",
        ticks: {
            callback: prettyTick
        },
        afterBuildTicks: chartObj => {
            const ticks = logTicks;
            chartObj.ticks.splice(0, chartObj.ticks.length);
            chartObj.ticks.push(...ticks);
        }
    };

    export let type = "line";
    export let height = "320px";

    export let data;
    export let log = false;

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
                    }],
                    yAxes: [log ? logAxis : linearAxis]
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

    $: if (chart !== undefined) {
        chart.options.scales.yAxes[0] = log ? logAxis : linearAxis;
        chart.data = data;
        chart.update();
    }

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<div style="position: relative; height: {height};">
    <canvas bind:this={canvas} on:beforeprint={chart.resize()}></canvas>
</div>

<ChartTooltip model={ttModel} x={ttX} y={ttY} />
