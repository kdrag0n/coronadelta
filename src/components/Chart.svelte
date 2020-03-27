<script>
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js';

    import tailwindTheme from 'tailwindcss/defaultTheme';
    const colors = tailwindTheme.colors;
    const chartColors = ["gray", "red", "orange", "yellow", "green", "blue", "purple", "pink"];

    function getColors() {
        let chColors = [];
        chartColors.forEach(colorName => chColors.push(colors[colorName]["600"]))
        return chColors;
    }

    let canvas;
    let chart;
    export let width = 550, height = 320;
    export let data;
    export let type = "line";

    onMount(async () => {
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;

        chart = new Chart(canvas, {
            type: type,
            data: data,
            options: {
                tooltips: {
                    mode: "index",
                    intersect: false,
                    position: "nearest",
                    bodyFontFamily: "Inter",
                    bodySpacing: 8,
                    titleMarginBottom: 10,
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
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
                            maxRotation: 0
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
                        fontFamily: "Inter",
                        boxWidth: 12 // bound to font size
                    }
                }
            }
        })
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<canvas bind:this={canvas}></canvas>
