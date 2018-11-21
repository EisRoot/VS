// 基于准备好的dom，初始化echarts实例
var corr_Chart = echarts.init(document.getElementById('corr'));

// 指定图表的配置项和数据
var corr_option = {
    title: {
        text: 'corr'
    },
    tooltip: {},
    legend: {
        data:['corr']
    },
    xAxis: {
        show:false

    },
    yAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
        axisLabel:{
            show:false
        }

    },
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, -20, 36, 10, -10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
corr_Chart.setOption(corr_option);