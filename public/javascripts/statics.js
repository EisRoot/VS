var static_Chart = echarts.init(document.getElementById('statics'));
var arr6 = Array.from({length:70}, (v,k) => k);
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
        data:arr6,
        axisLabel: {
            show:false
        },
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
    // visualMap: {
    //     show: false,
    //     dimension: 0,
    //     pieces: [{
    //         lte: 6,
    //         color: 'green'
    //     }, {
    //         gt: 6,
    //         lte: 8,
    //         color: 'red'
    //     }, {
    //         gt: 8,
    //         lte: 14,
    //         color: 'green'
    //     }, {
    //         gt: 14,
    //         lte: 17,
    //         color: 'red'
    //     }, {
    //         gt: 17,
    //         color: 'green'
    //     }]
    // },
    series: [

    ]
};

// var aa={'attr_id':'asdsa'};
// $.post(s_path+'/plot4/x",aa,function (data) {
//
// })
