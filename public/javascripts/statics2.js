var static2_Chart = echarts.init(document.getElementById('statics2'));
statics2_option = {
    xAxis: {
        type: 'category',
        data: ['u00', 'u01', 'u02', 'u03', 'u04', 'u05', 'u07', 'u08', 'u09', 'u10', 'u12', 'u13', 'u14', 'u15', 'u16', 'u17', 'u18', 'u19', 'u20', 'u22', 'u23', 'u24', 'u25', 'u27', 'u30', 'u31', 'u32', 'u33', 'u34', 'u35', 'u36', 'u39', 'u41', 'u42', 'u43', 'u44', 'u45', 'u46', 'u47', 'u49', 'u50', 'u51', 'u52', 'u53', 'u54', 'u56', 'u57', 'u58', 'u59']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [1,2,3,4,5,5],
        type: 'bar'
    }]
};
$.get('http://127.0.0.1:3000/piazza', function (piazza) {
    statics2_option.series[0].data = piazza['views'];
    static2_Chart.setOption(statics2_option);
});
