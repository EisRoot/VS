//checkbox延迟判断的逻辑
var checkMap=new Map();
var check_box_id=['check_1','check_2','check_3','check_4','check_5','check_6','check_7'];
var slider_attrname_map={'check_1':'出勤率','check_2':'评论数','check_3':'提问数','check_4':'笔记数','check_5':'回答数','check_6':'睡眠时长','check_7':'交流时长'};
var slider_id=['slider1','slider2','slider3','slider4','slider5','slider6','slider7'];
var check_handler=function () {
    var json;
    static_option.series=[];

    //slider
    $('#sliderBox').empty(); //清空子标签
    var i=0;
    checkMap.forEach(function (item, key) {
        if (item){
            $('#sliderBox').append('<div style="width: 300px;height: 30px"></div><div> <input data-role="slider" id="'+slider_id[i++]+'" class="visible" data-value="100" data-hint-mask="'+slider_attrname_map[key]+': $1%" data-hint-position="top"   data-hint-always="true"  data-min="0" data-max="200" style="width: 200px;height: 50px" /></div> ');
        }
    })
    $('#sliderButton').unbind('click').click(function(){
        var slider_value=[];
        var j=0;
        while (j<i){
            slider_value.push($('#'+slider_id[j]).val());
            j++;
        }
        $.post("http://127.0.0.1:3000/plot/adjust",{attrList:str,values:slider_value.toString(),id:'12'},function (data) {
            alert(data);
            // var new_series={
            //     name:'GPA预测值',
            //     symbolSize: 10,
            //     data: data,
            //     type: 'scatter'
            // };
            // GPA_option.series[1]=new_series;
            // GPA_Chart.setOption(GPA_option);
        })
    });

    static_Chart.clear();
    var str='';
    //statics
    checkMap.forEach(function (item, key) {
        if (item){
            str=str+"1";
        } else {
            str=str+"0";
        }
        if (item){
            //statics 试图的变化逻辑
            var newseries={
                name:key,
                type:'line',
                smooth: true,
                encoide:{x: 1, y: 0},
                data:[],
            }
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

    //GPA特征训练post请求

    $.post("http://127.0.0.1:3000/plot/gpa",{attrList:str},function (data) {

       var new_series={
            name:'GPA预测值',
            symbolSize: 10,
            data: data,
            type: 'scatter'
        };
        GPA_option.series[1]=new_series;
        GPA_Chart.setOption(GPA_option);
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

function showclick(type) {
    alert(type);

}