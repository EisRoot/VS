var GPA_Chart = echarts.init(document.getElementById('course_GPA'));
GPA_option = {
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
    yAxis: {},
    series: {
        symbolSize: 20,
        data: [
            [1, 8.04],
            [2, 6.95],
            [3, 7.58],
            [4, 8.81],
            [5, 8.33],
            [12, 9.96],
            [7, 7.24],
            [8, 4.26],
            [9, 10.84],
            [10, 4.82],
            [13, 5.68]
        ],

        selectedData: [],
        type: 'scatter',
    }
};
GPA_Chart.setOption(GPA_option);
// 点击散点触发热力图更新
GPA_Chart.on('click', function (params) {
    var singleId = params.data[0];
    var points = [];
    points = points.concat(stu_gps_data[singleId.toString()].map(function (track) {
        return track.coord.concat([1]);
    }));
    location_option.series[1].data = points;
    location_Chart.setOption(location_option);
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
    var data = GPA_option.series.data;
    var selectedItems = []; // 选中的项目
    for (var i = 0; i < data.length; i++) {
        if (data[i][1] > selectedCoord[0] && data[i][1] < selectedCoord[1]) {
            selectedItems.push(data[i][0]);
        }
    }
    GPA_option.series.selectedData = selectedItems;
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