<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/britecharts/dist/css/britecharts.min.css" type="text/css" />
</svelte:head>

<script>
    import { onMount, onDestroy } from 'svelte';
    import { select } from 'd3-selection';

    let chartContainer;
    let brushContainer;
    let chart;
    let chartTooltip;
    export let data;

    function filterData(d0, d1) {
        let data = JSON.parse(JSON.stringify(aTestDataSet().with5Topics().build()));

        data.dataByDate = data.dataByDate.filter(isInRange.bind(null, d0, d1));

        data.dataByTopic = data.dataByTopic.map((topic) => {
            topic.dates = topic.dates.filter(isInRange.bind(null, d0, d1));

            return topic;
        });

        return data;
    }

    onMount(async () => {
        const module = await import("britecharts");
        const britecharts = module.default;
        const container = select(chartContainer);
        chart = britecharts.line();
        chartTooltip = britecharts.tooltip();
        chart
            .tooltipThreshold(600)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customDataEntryClick', chartTooltip.show)
            .on('customTouchMove', chartTooltip.show)
            .on('customMouseOut', chartTooltip.hide);
        container.datum(data).call(chart);

        chartTooltip
            .title("Cases")
            // In order to change the date range on the tooltip title, uncomment this line
            // .dateFormat(chartTooltip.axisTimeCombinations.HOUR .title('Quantity Sold')
            .topicsOrder(data.dataByTopic.map(function(topic) {
                return topic.topic;
            }));
        let tooltipContainer = container.select(".metadata-group .hover-marker");
        tooltipContainer.datum([]).call(chartTooltip);

        let brush = britecharts.brush();
        brush.on('customBrushEnd', function(brushExtent) {
            let format = d3TimeFormat.timeFormat('%m/%d/%Y');

            d3Selection.select('.js-start-date').text(format(brushExtent[0]));
            d3Selection.select('.js-end-date').text(format(brushExtent[1]));
            d3Selection.select('.js-date-range').classed('is-hidden', false);

            // Filter
            d3Selection.selectAll('.js-line-chart-container .line-chart').remove();

            if (brushExtent[0] && brushExtent[1]) {
                createLineChart(colorSchema, filterData(brushExtent[0], brushExtent[1]));
            } else {
                createLineChart(colorSchema, dataset);
            }
        });
    });

    //afterUpdate(() => chart.update(data));

    onDestroy(() => {
        // for GC
        chart = null;
    });
</script>

<div bind:this={chartContainer}></div>
<div bind:this={brushContainer}></div>
