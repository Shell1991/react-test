import React from "react";
import {utilCityCenter, DataSet, baiduMapLayer} from "mapv";
export default class BaiduHoneycombDemoIndex extends React.Component{
    constructor(){
        super();
    }

    init() {
        // 百度地图API功能
        var map = new BMap.Map("map", {
            enableMapClick: false
        }); // 创建Map实例
        map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5); // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        map.setMapStyle({
            style: 'midnight'
        });//设置地图样式

        var randomCount = 300;
        var data = [];
        var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];

        // 构造数据
        while (randomCount--) {
            var cityCenter = utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                },
                count: 30 * Math.random()
            });
        }

        var dataSet = new DataSet(data);
        var options = {
            fillStyle: 'rgba(55, 50, 250, 0.8)',
            shadowColor: 'rgba(255, 250, 50, 1)',
            shadowBlur: 20,
            max: 100,
            size: 50,
            label: {
                show: true,
                fillStyle: 'white',
                shadowColor: 'yellow',
                // font: '20px Arial',
                shadowBlur: 10,
            },
            globalAlpha: 0.5,
            gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
            draw: 'honeycomb'
        }
        var mapvLayer = new baiduMapLayer(map, dataSet, options);
    }

    componentDidMount(){
        console.log("did mount");
        this.init();
    }

    render(){
        return (
            <div id="map" style={{width:"100%", height:"100%"}}></div>
        )
    }
}