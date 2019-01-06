var GPA_Chart = echarts.init(document.getElementById('course_GPA'))
GPA_option = {
    xAxis: {},
    yAxis: {
    },
    series: [{
        name:'GPA实际值',
        symbolSize: 10,
        data: [
        ],
        type: 'scatter'
    }]
};
$.get("http://127.0.0.1:3000/json/stu_grades.json",function (data) {


    GPA_option.series[0].data=data;
    GPA_Chart.setOption(GPA_option);
})
