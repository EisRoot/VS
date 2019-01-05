//checkbox延迟判断的逻辑
var checkMap=new Map();
var check_box_id=['stu_total_sleep','stu_total_conversation','check_3','check_4'];
var check_handler=function () {
    var json;
    static_option.series=[];
    static_Chart.clear();

    checkMap.forEach(function (item, key) {
        if (item){
            //statics 试图的变化逻辑
            var newseries={
                name:key,
                type:'line',
                smooth: true,
                encoide:{x: 1, y: 0},
                data:[],
            };
            $.get('http://127.0.0.1:3000/json/'+key+'.json',function (data) {

                echarts.util.each(data, function (dataItem) {

                    newseries.data.push([dataItem[0],dataItem[1]]);
                });
                // newseries.data.sort(function (a, b) {
                //     return a[1]<b[1]
                // })
                static_option.series.push(newseries);
                static_Chart.setOption(static_option);

            });

        }
    })

};
var check_time_set
function checkclick(names) {
    check_box_id.forEach(function (value) {
        checkMap.set(value,document.getElementById(value).checked);
    });
    clearTimeout(check_time_set);
    check_time_set=setTimeout(check_handler,1000);
}