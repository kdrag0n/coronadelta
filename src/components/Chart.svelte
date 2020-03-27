<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import Chart from 'chart.js';

    import tailwindTheme from 'tailwindcss/defaultTheme';
    const colors = tailwindTheme.colors;
    const chartColors = ["gray", "red", "orange", "yellow", "green", "blue", "purple", "pink"];

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
    let _chartCanvas;

    onMount(async () => {
        chart = new Chart(canvas, {
            type: type,
            data: data,
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    enabled: true,
                    mode: "index",
                    intersect: false,
                    position: "nearest",
                    bodyFontFamily: "Inter",
                    bodySpacing: 8,
                    titleMarginBottom: 10,
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10,
                    custom: model => {
                        //_chartCanvas = this._chart.canvas;
                        //ttModel = model;
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
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{
                        type: "logarithmic",
                        ticks: {
                            callback: (val, idx, vals) => {
                                return val.toString();
                            }
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
        });
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<style>
    .tooltip {
        opacity: 1;
        position: absolute;
        background: rgba(26, 32, 44, .9);
        color: white;
        border-radius: 6px;
        -webkit-transition: all .1s ease;
        transition: all .1s ease;
        pointer-events: none;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
    }

    .labelColor {
        border-width: 2px;
    }
</style>

<div style="position: relative; height: {height};">
    <canvas bind:this={canvas} on:beforeprint={chart.resize()}></canvas>
</div>

{#if ttModel.opacity !== 0}
    <div class="tooltip" bind:this={tooltip} transition:fade="{{ duration: 100 }}"
         style="left: {canvas.offsetTop + ttModel.caretX}px;
                top: {canvas.offsetLeft + ttModel.caretY}px;
                padding: {ttModel.yPadding}px {ttModel.xPadding}px">
        {#if ttModel.body}
            <table>
                <thead>
                    {#each (ttModel.title || []) as line}
                        <tr><th>
                            {line}
                        </th></tr>
                    {/each}
                </thead>

                <tbody>
                    {#each ttModel.body as item, i}
                        <tr><td>
                            <span class="labelColor"
                                  style="background-color: {ttModel.labelColors[i].backgroundColor};
                                         border-color: {ttModel.labelColors[i].borderColor}">
                            </span>
                            &nbsp;{item.lines}
                        </td></tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
{/if}
