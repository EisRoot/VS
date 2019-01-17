//checkbox延迟判断的逻辑
var checkMap=new Map();
var check_box_id=['check_1','check_2','check_3','check_4','check_5','check_6','check_7'];
var slider_attrname_map={'check_1':'出勤率','check_2':'评论数','check_3':'提问数','check_4':'笔记数','check_5':'回答数','check_6':'睡眠时长','check_7':'交流时长'};
var slider_id=['slider1','slider2','slider3','slider4','slider5','slider6','slider7'];
var check_handler=function () {
    var json;

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
        $.post(s_path+"/plot/adjust",{attrList:str,values:slider_value.toString(),id:singleId},function (data) {
            
            // var new_series={
            //     name:'GPA预测值',
            //     symbolSize: 10,
            //     data: data,
            //     type: 'scatter'
            // };
            GPA_option.series[1].data.forEach(function (dataItem) {
                if (dataItem[0]==singleId){
                    dataItem[1]=data;
                }
            });
            GPA_Chart.setOption(GPA_option);
        })
    });

    var str='';
    //statics
    checkMap.forEach(function (item, key) {
        if (item){
            str=str+"1";
        } else {
            str=str+"0";
        }



    })

    //GPA特征训练post请求

    $.post(s_path+"/plot/gpa",{attrList:str},function (data) {

       var new_series={
            name:'GPA预测值',
            symbolSize: 15,
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
function getShowData1(path) {

    $.get(s_path + "/json/" + path, function (data) {
        //statics 试图的变化逻辑
        var total=0.0;
        var day=0;
        var datas=[]
        echarts.util.each(data, function (dataItem) {
            if (dataItem[1]>day){
                datas.push([day, total]);
                day=dataItem[1];
                total=0.0;
            }
            total=total+dataItem[2];
        });
        // newseries.data.sort(function (a, b) {
        //     return a[1]<b[1]
        // })
        static_option.series[0].name=path;
        static_option.series[0].data=datas;
        static_Chart.setOption(static_option);

    });
}
function getShowData2(path) {
    $.get(s_path+'/piazza', function (piazza) {
        statics2_option.series[0].data = piazza[path];
        static2_Chart.setOption(statics2_option);
    });
}
//显示按钮click
function showclick(type) {
    switch (type) {
        case 'check_1':
            getShowData2('days online');
            break;
        case 'check_2':
            getShowData2('views');
            break;
        case 'check_3':
            getShowData2('questions');
             break;
        case 'check_4':
            getShowData2('notes');
            break;
        case 'check_5':
            getShowData2('answers');
            break;
        case 'check_6':
            getShowData1('stu_day_sleep.json');
        break;
        case 'check_7':
            getShowData1('stu_day_conversation.json');
        break;
    }

}
getShowData2('days online');
getShowData1('stu_day_sleep.json');