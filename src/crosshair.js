import Chart from 'chart.js';

const helpers = Chart.helpers;

var defaultOptions = {
    line: {
        color: '#F66',
        width: 1,
        dashPattern: []
    }
};

var crosshairPlugin = {
    id: 'crosshair',

    afterInit: function(chart) {

        if (chart.config.options.scales.xAxes.length == 0) {
            return
        }


        var xScaleType = chart.config.options.scales.xAxes[0].type

        if (xScaleType !== 'linear' && xScaleType !== 'time' && xScaleType !== 'category') {
            return;
        }

        if (chart.options.plugins.crosshair === undefined) {
            chart.options.plugins.crosshair = defaultOptions;
        }

        chart.crosshair = {
            enabled: false,
            x: null
        };
    },

    getOption: function(chart, category, name) {
        return helpers.getValueOrDefault(chart.options.plugins.crosshair[category] ? chart.options.plugins.crosshair[category][name] : undefined, defaultOptions[category][name]);
    },

    getXScale: function(chart) {
        return chart.data.datasets.length ? chart.scales[chart.getDatasetMeta(0).xAxisID] : null;
    },
    getYScale: function(chart) {
        return chart.scales[chart.getDatasetMeta(0).yAxisID];
    },

    afterEvent: function(chart, e) {

        if (chart.config.options.scales.xAxes.length == 0) {
            return
        }


        var xScaleType = chart.config.options.scales.xAxes[0].type

        if (xScaleType !== 'linear' && xScaleType !== 'time' && xScaleType !== 'category') {
            return;
        }

        var xScale = this.getXScale(chart);


        if (!xScale) {
            return;
        }

        chart.crosshair.enabled = (e.type !== 'mouseout' && (e.x > xScale.getPixelForValue(xScale.min) && e.x < xScale.getPixelForValue(xScale.max)));

        if (!chart.crosshair.enabled) {
            return true;
        }

        chart.crosshair.x = e.x;


        chart.draw();

    },

    afterDraw: function(chart) {

        if (!chart.crosshair.enabled) {
            return;
        }

        this.drawTraceLine(chart);

        return true;
    },

    drawTraceLine: function(chart) {

        var yScale = this.getYScale(chart);

        var lineWidth = this.getOption(chart, 'line', 'width');
        var color = this.getOption(chart, 'line', 'color');
        var dashPattern = this.getOption(chart, 'line', 'dashPattern');

        var lineX = chart.crosshair.x;

        chart.ctx.beginPath();
        chart.ctx.setLineDash(dashPattern);
        chart.ctx.moveTo(lineX, yScale.getPixelForValue(yScale.max));
        chart.ctx.lineWidth = lineWidth;
        chart.ctx.strokeStyle = color;
        chart.ctx.lineTo(lineX, yScale.getPixelForValue(yScale.min));
        chart.ctx.stroke();
        chart.ctx.setLineDash([]);

    },
};

Chart.plugins.register(crosshairPlugin);
