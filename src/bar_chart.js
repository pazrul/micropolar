µ.BarChart = function module() {
    var config = {
        data: null,
        containerSelector: 'body',
        dotRadius: 5,
        fill: 'orange',
        stroke: 'red',
        radialScale: null,
        angularScale: null,
        axisConfig: null
    };
    var dispatch = d3.dispatch('hover');

    function exports() {
        var container = config.containerSelector;
        if (typeof container == 'string') container = d3.select(container);
        container.datum(config.data)
            .each(function(_data, _index) {

                var domain = config.angularScale.domain();
                var angularScale = config.angularScale.copy().domain([domain[0], domain[1] + _data[1][0] - _data[0][0]]);

                var markStyle = {fill: config.fill, stroke: config.stroke};
                var barW = 12;

                var geometryGroup = d3.select(this).classed('bar-chart', true);
                var geometry = geometryGroup.selectAll('rect.mark')
                    .data(_data);
                geometry.enter().append('rect').attr({'class': 'mark'});
                geometry.attr({
                        x: -barW/2,
                        y: config.radialScale(0), 
                        width: barW, 
                        height: function(d, i){ 
                            return config.radialScale(d[1]) - config.radialScale(0); }, 
                        transform: function(d, i){ return 'rotate('+ (config.axisConfig.originTheta - 90 + (angularScale(d[0]))) +')'}
                    })
                .style(markStyle);

        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        µ.util._override(_x, config);
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};
