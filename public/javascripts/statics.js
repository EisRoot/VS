var static_Chart = echarts.init(document.getElementById('statics'))
static_option = {


    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {},
    xAxis:  {
        type: 'category',
        data:[]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show:false
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: 'green'
        }, {
            gt: 6,
            lte: 8,
            color: 'red'
        }, {
            gt: 8,
            lte: 14,
            color: 'green'
        }, {
            gt: 14,
            lte: 17,
            color: 'red'
        }, {
            gt: 17,
            color: 'green'
        }]
    },
    series: [
        {
            name:'用电量',
            type:'line',
            smooth: true,
            encoide:{x: 1, y: 0},
            data:[],
            markArea: {
                data: [ [{
                    name: '早高峰',
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }], [{
                    name: '晚高峰',
                    xAxis: '17:30'
                }, {
                    xAxis: '21:15'
                }] ]
            }
        }
    ]
};
$.get("http://127.0.0.1:3000/plot4",function (data) {
    echarts.util.each(data, function (dataItem) {
        static_option.xAxis.data.push(dataItem[0]);
        static_option.series[0].data.push(dataItem[1]);
    });
    static_Chart.setOption(static_option);
})
