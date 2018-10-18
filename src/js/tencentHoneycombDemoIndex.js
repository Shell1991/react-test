import React from "react";
import GetLatLon from "./common/GetLatLon";

export default class TencentHoneycombDemoIndex extends React.Component{
    constructor(){
        super();
    }

    drawHoneycomb(lat, lon, map){
        let centerPoint = {lon:lon,lat:lat};
        let distance = parseInt(150);
        let g0 = GetLatLon.destinationVincenty({lon:lon, lat:lat}, 30, distance);
        let g1 = GetLatLon.destinationVincenty(centerPoint, 90, distance);
        let g2 = GetLatLon.destinationVincenty(centerPoint, 150, distance);
        let g3 = GetLatLon.destinationVincenty(centerPoint, 210, distance);
        let g4 = GetLatLon.destinationVincenty(centerPoint, 270, distance);
        let g5 = GetLatLon.destinationVincenty(centerPoint, 330, distance);

        let path = [
            new window.Qmap.LatLng(parseFloat(g0.lat), parseFloat(g0.lon)),
            new window.Qmap.LatLng(parseFloat(g1.lat), parseFloat(g1.lon)),
            new window.Qmap.LatLng(parseFloat(g2.lat), parseFloat(g2.lon)),
            new window.Qmap.LatLng(parseFloat(g3.lat), parseFloat(g3.lon)),
            new window.Qmap.LatLng(parseFloat(g4.lat), parseFloat(g4.lon)),
            new window.Qmap.LatLng(parseFloat(g5.lat), parseFloat(g5.lon)),
        ];
        let polygon = new window.Qmap.Polygon({
            map: map,
            path: path,
            strokeColor: new window.Qmap.Color(241,198,214,0.2),
            fillColor: new window.Qmap.Color(241,198,214, 0.5)
            // window.Qmap.Color.fromHex("#FFFFFF", 0.5)
        });
    }

    //腾讯地图初始化
    init(){
        let _this = this;
        let map = new window.Qmap.Map(document.getElementById('tencentMap'), {
            center: new window.Qmap.LatLng(39.92646,116.593807),      // 地图的中心地理坐标。
            zoom:15,                                                 // 地图的默认缩放级别。
            scaleControl: true,//启用比例尺
            scaleControlOptions: {
                //设置控件位置相对右下角对齐，向左排列
                position: window.Qmap.ControlPosition.BOTTOM_RIGHT
            }
        });
        let centerPoints = [
            {lon:116.593807, lat:39.92646},
            {lon:116.593807, lat:39.924124},
            {lon:116.589535, lat:39.924124},
            {lon:116.591671, lat:39.925292},
            {lon:116.598079, lat:39.924124},
            {lon:116.595943, lat:39.922956},
            {lon:116.589535, lat:39.924124}
        ];
        for(let i = 0 ; i < centerPoints.length; i++){
            let centerPoint = centerPoints[i];
            window.Qmap.convertor.translate(new qq.maps.LatLng(centerPoint.lat,centerPoint.lon), 1, function(res){
                console.log(res);
                centerPoint = res[0];
                _this.drawHoneycomb(centerPoint.lat, centerPoint.lng, map)
            });
        }

    }

    componentDidMount(){
        this.init();
    }

    render(){
        return (
            <div id="tencentMap" style={{width:"100%", height:"100%"}}></div>
        )
    }
}