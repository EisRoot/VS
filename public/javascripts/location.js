var location_Chart = echarts.init(document.getElementById('location'));
$.get('http://127.0.0.1:3000/gps/map',function (mapjson) {
    echarts.registerMap('dmap', mapjson);
    $.get('http://127.0.0.1:3000/gps', function (date) {
        var data = date["9"];
        var points = [].concat( data.map(function (track) {
            return track.coord.concat([1]);
        }));
        location_Chart.setOption(option = {
            animation: false,
            // bmap: {
            //     center: [-72.2833023, 43.6962928],
            //     zoom: 14,
            //     roam: true
            // },
            geo:{
                map:'dmap',
                roam: true,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis:{
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            visualMap:[ {
                show: false,
                top: 'top',
                min: 1,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['rgba(128,128,255,0.5)', 'rgba(255,128,0,0.5)', 'rgba(255,0,128,0.5)', 'rgba(0,128,64,0.5)', 'rgba(0,128,255,0.5)']
                }
            }, {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 1,
                calculable: true,
                inRange: {
                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                }
            }
            ],
            series: [{
                name: 'Dartmouth Compus',
                type: 'map',
                geoIndex:0,
                map: 'dmap',
                itemStyle:{
                    emphasis:{label:{show:true}}
                },
                // // 文本位置修正
                // textFixed: {
                //     Alaska: [20, -20]
                // },
                data:[
                    {name: '西宿舍区1', value: 1},
                    {name: '西宿舍区2', value: 1},
                    {name: '西宿舍区3', value: 1},
                    {name: '西宿舍区4', value: 1},
                    {name: '东宿舍区1', value: 1},
                    {name: '东宿舍区2', value: 1},
                    {name: '西教学区1', value: 2},
                    {name: '西教学区2', value: 2},
                    {name: '西教学区3', value: 2},
                    {name: '西教学区4', value: 2},
                    {name: '东教学区1', value: 2},
                    {name: '东教学区2', value: 2},
                    {name: '东教学区3', value: 2},
                    {name: '西食堂', value: 3},
                    {name: '南食堂', value: 3},
                    {name: '图书馆', value: 4},
                    {name: '艺术区', value: 5},

                ]
                },{
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: points,
                    pointSize: 5,
                    roam:true,
                    blurSize: 6
                }
            ]
        });
        // 添加百度地图插件
        // var bmap = location_Chart.getModel().getComponent('bmap').getBMap();
        // bmap.addControl(new BMap.MapTypeControl());

    });

})
