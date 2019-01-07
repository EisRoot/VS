var GPA_Chart = echarts.init(document.getElementById('course_GPA'));
var singleId;
var selectedIds = [];
GPA_option = {
    legend: {
        data: ['GPA实际值',  'GPA预测值']
    },
    brush: {
        xAxisIndex: 0,
        brushLink: 0,
        outOfBrush: {
            colorAlpha: 0.1
        }
    },
    toolbox: {
        feature: {
            brush: {
                type: ['lineY', 'clear']
            }
        }
    },
    xAxis: {},
    yAxis: {
        min : 'dataMin'
    },
    series: [{
        name:'GPA实际值',
        symbolSize: 15,
        data: [
        ],
        type: 'scatter'
    }]
};

GPA_Chart.setOption(GPA_option);
// 点击散点触发热力图更新
GPA_Chart.on('click', function (params) {
    singleId = params.data[0].toString();
    $('#stu_id').html('学生：'+singleId);
    var points = [];
    console.log(singleId);
    points = points.concat(stu_gps_data[singleId].map(function (track) {
        return track.coord.concat([1]);
    }));
    location_option.series[1].data = points;
    location_Chart.setOption(location_option);
    //取消高亮其他点
    GPA_Chart.dispatchAction({
        type: 'downplay',
        seriesIndex : [0,1]
    });
    //高亮显示点击点
    GPA_Chart.dispatchAction({
        type: 'highlight',
        dataIndex : params.dataIndex
    });
    static2_Chart.dispatchAction({
        type: 'downplay',
        seriesIndex : [0,1]
    });
    static2_Chart.dispatchAction({
        type: 'highlight',
        dataIndex : params.dataIndex
    });
});
// 刷选散点，更新热力图
GPA_Chart.on('brushSelected', function (params) {
    var mainSeries = params.batch[0].areas;
    var selectedCoord = [];//选中区域的横纵标
    for (var i = 0; i < mainSeries.length; i++) {
        if (mainSeries[i].coordRange && mainSeries[i].coordRange.length > 0) {
            for (var j = 0; j < mainSeries[i].coordRange.length; j++) {
                selectedCoord.push(mainSeries[i].coordRange[j]);
            }
        }
    }
    var data = GPA_option.series[1].data;
    var selectedItems = []; // 选中的项目
    for (var i = 0; i < data.length; i++) {
        if (data[i][1] > selectedCoord[0] && data[i][1] < selectedCoord[1]) {
            selectedItems.push(data[i][0]);
        }
    }
    selectedIds = selectedItems;
    //location的更新逻辑
    var points = [];
    for (var i = 0; i < selectedItems.length; i++) {
        var c = selectedItems[i].toString();
        if (stu_gps_data[c] != null) {
            points = points.concat(stu_gps_data[c].map(function (track) {
                return track.coord.concat([1]);
            }));
        }
    }
    location_option.series[1].data = points;
    location_Chart.setOption(location_option);
});
$.get(s_path+"/json/stu_grades.json",function (data) {


    GPA_option.series[0].data=data;
    GPA_Chart.setOption(GPA_option);
})
