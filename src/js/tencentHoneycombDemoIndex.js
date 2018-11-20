import React from "react";
import VertexCoordinates from "./common/VertexCoordinates";
import GPS from "./common/GPSToAll";
import Linkage from "./common/linkage";
import $ from "jquery";
import axios from "axios";

export default class TencentHoneycombDemoIndex extends React.Component{
    constructor(){
        super();
        this.state={
            searchResult: [],
            clusterData:[]
        }
    }

    //绘制蜂窝热力图
    drawHoneycomb(lat, lng, map, c){
        let points = VertexCoordinates(lat, lng);
        for(let i = 0; i < points.length; i++){
            // let p = GPS.gcj_encrypt(points[i][0], points[i][1]);
            // convertPoints.push(p);
            points[i] = {lat: points[i][0], lon: points[i][1]};
        }

        let path = [
            new window.Qmap.LatLng(parseFloat(points[0].lat), parseFloat(points[0].lon)),
            new window.Qmap.LatLng(parseFloat(points[1].lat), parseFloat(points[1].lon)),
            new window.Qmap.LatLng(parseFloat(points[2].lat), parseFloat(points[2].lon)),
            new window.Qmap.LatLng(parseFloat(points[3].lat), parseFloat(points[3].lon)),
            new window.Qmap.LatLng(parseFloat(points[4].lat), parseFloat(points[4].lon)),
            new window.Qmap.LatLng(parseFloat(points[5].lat), parseFloat(points[5].lon))
        ];

        let color = c ? c:"#f1c6d6";
        //利用腾讯地图接口，绘制热力图
        let polygon = new window.Qmap.Polygon({
            map: map,
            path: path,
            strokeColor:new window.Qmap.Color(241,198,214, 0),//边的颜色
            fillColor: window.Qmap.Color.fromHex(color, 0.6)
            // new window.Qmap.Color(241,198,214, 0.5)//填充颜色
            // window.Qmap.Color.fromHex("#f1c6d6", 0.5)
        });
    }

    candleDrawResultData(resData, map){
        let _this = this;
        let latLons = [];//存储返回基站的经纬度
        let val = [];//存储返回数据的值
        for(let key in resData){
            console.log(key+':'+resData[key]);
            latLons.push(key.split("_"));//将key分解成数组[lat, lng]，放入latLons中
            val.push(resData[key][0]);
        }

        let maxVal = Math.max.apply(null, val);
        let minVal = Math.min.apply(null, val);
        console.log("maxVal============" + maxVal);
        console.log("minVal============" + minVal);
        let interval = (maxVal - minVal)/4;
        let intervalArr = [];
        for(let i = 0; i < 5; i++){
            intervalArr.push(minVal + interval * i);
        }

        for(let i = 0; i < latLons.length; i++){
            let colors = ["#f84604","#ee8226","#f2965e","#fdd495", "#f9e6c8"];
            let c;
            if(intervalArr[0]<=val[i]<intervalArr[1]){
                c = colors[4];
            }
            if(intervalArr[1]<=val[i]<intervalArr[2]){
                c = colors[3];
            }
            if(intervalArr[2]<=val[i]<intervalArr[3]){
                c = colors[2];
            }
            if(intervalArr[3]<=val[i]<intervalArr[4]){
                c = colors[1];
            }
            if(intervalArr[4]<=val[i]<intervalArr[5]){
                c = colors[0];
            }
            // let centerPoint = GPS.gcj_encrypt(latLons[i][1],latLons[i][0]);
            let centerPoint = {lat:latLons[i][1], lon:latLons[i][0]};
            console.log(centerPoint);
            _this.drawHoneycomb(centerPoint.lat, centerPoint.lon, map, c)
        }
    }

    initDrawManager(map){
        let _this = this;
        let drawingManager = new window.Qmap.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: window.Qmap.ControlPosition.TOP_CENTER,
                drawingModes: [
                    // window.Qmap.drawing.OverlayType.MARKER,
                    window.Qmap.drawing.OverlayType.CIRCLE,
                    window.Qmap.drawing.OverlayType.POLYGON,
                    window.Qmap.drawing.OverlayType.RECTANGLE
                ]
            },
            circleOptions: {
                fillColor: new window.Qmap.Color(255, 208, 70, 0.3),
                strokeColor: new window.Qmap.Color(88, 88, 88, 1),
                strokeWeight: 3,
                clickable: false
            }
        });
        window.Qmap.event.addListener(drawingManager, 'overlaycomplete', function(res) {
            //获取到绘制的多边形或者矩形的经纬度坐标数组
            if(res.type=="polygon"){
                let paths=[];
                console.log(res.overlay.getPath());
                let path = res.overlay.getPath().forEach(function(e) {
                    let lat = e.getLat();
                    let lon = e.getLng();
                    console.log(lat, lon);
                    // let p = GPS.gcj_decrypt(lat, lon);
                    // console.log(p);
                    paths.push([lat, lon]);
                });
                console.log(paths);
                axios.post("http://172.16.1.50:5000/get_covered_id", {"polygon": paths}).then((res) => {
                    let resData = res.data.polygon;
                    _this.candleDrawResultData(resData, map);
                })
            }
            if(res.type=="circle"){
                console.log(res.overlay.getCenter());
                console.log(res.overlay.getRadius());
                let center = res.overlay.getCenter();
                let bounds = res.overlay.getBounds();
                axios.post("http://172.16.1.50:5000/get_covered_id", {"cicle": [[center.lat, center.lng],[bounds.lat.maxY,bounds.lat.minY,bounds.lng.maxX, bounds.lng.minX]]}).then((res) => {
                    let resData = res.data.cicle;
                    _this.candleDrawResultData(resData, map);
                })
            }
        })
        drawingManager.setMap(map);
    }

    initSearchService(map){
        let _this = this;
        let searchResultMakers = [];
        let searchService = new window.Qmap.SearchService({
            //设置搜索范围为北京
            location: "北京",
            //设置搜索页码为1
            pageIndex: 1,
            //设置每页的结果数为5
            pageCapacity: 1000,
            //设置展现查询结构到infoDIV上
            // panel: document.getElementById('infoDiv'),
            //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
            autoExtend: true,
            //检索成功的回调函数
            complete: function(results) {
                //设置回调函数参数
                let pois = results.detail.pois;
                let cData = [];
                for (let i = 0, l = pois.length; i < l; i++) {
                    let poi = pois[i];
                    // console.log(poi);
                    cData.push([poi.latLng.lat, poi.latLng.lng]);
                    //扩展边界范围，用来包含搜索到的Poi点
                    // latlngBounds.extend(poi.latLng);
                    let marker = new qq.maps.Marker({
                        map: map,
                        position: poi.latLng
                    });
                    marker.setTitle(i + 1);
                    searchResultMakers.push(marker);
                }
                _this.setState({
                    clusterData:cData
                },()=>{
                    console.log("数据处理完成");
                    _this.initCluster(map);
                })
                //调整地图视野
                // map.fitBounds(latlngBounds);
            },
            //若服务请求失败，则运行以下函数
            error: function() {
                alert("出错了。");
            }
        });
        _this.setState({
            searchService: searchService
        })
        // searchService.search("酒店");
        // searchService.searchInBounds("酒店", new qq.maps.LatLngBounds(map.getBounds.getSouthWest(),map.getBounds.getNorthEast()));
    }

    initGeoCoder(){
        //调用地址解析类
        let geocoder = new window.Qmap.Geocoder({
            complete : function(result){
                console.log(result);
            }
        });
    }

    initCluster(map){
        let markers = new window.Qmap.MVCArray();
        let markerCluster;
        let data = this.state.clusterData;
        for (let i = 0; i < data.length; i++) {
            let latLng = new window.Qmap.LatLng(data[i][0], data[i][1]);
            let decoration = new window.Qmap.MarkerDecoration(i, new window.Qmap.Point(0, -5));
            let marker = new window.Qmap.Marker({
                'position':latLng,
                map:map
            });
            markers.push(marker);
        }

        markerCluster = new window.Qmap.MarkerCluster({
            map:map,
            minimumClusterSize:5, //默认2
            markers:markers,
            zoomOnClick:true, //默认为true
            gridSize:250, //默认60
            averageCenter:true, //默认false
            maxZoom:18, //默认18
        });

        window.Qmap.event.addListener(markerCluster, 'clusterclick', function (evt) {
            let ss =  evt;
        });
    }

    //腾讯地图初始化
    init(){
        let _this = this;
        let map = new window.Qmap.Map(document.getElementById('tencentMap'), {
            center: new window.Qmap.LatLng(39.983701,116.484873),      // 地图的中心地理坐标。
            zoom:16,                                                 // 地图的默认缩放级别。
            scaleControl: true,//启用比例尺
            scaleControlOptions: {
                //设置控件位置相对右下角对齐，向左排列
                position: window.Qmap.ControlPosition.BOTTOM_RIGHT
            }
        });
        let geocoder = new window.Qmap.Geocoder({
            complete : function(result){
                console.log(result);
            }
        });
        // geocoder.getLocation("中国,山东,德州");
        _this.setState({
            map:map,
            geocoder:geocoder
        },()=>{
            //画图工具
            _this.initDrawManager(map);
            //检索服务
            _this.initSearchService(map);

        });

        //底层测试数据，根据数据量的不同，渲染不同颜色的栅格
        let honeycombData = [
            {"id":"116.484873_39.983701","num":541.0},
            {"id":"116.484873_39.986037","num":327.0},
            {"id":"116.487009_39.980197","num":52.0},
            {"id":"116.487009_39.982533","num":140.0},
            {"id":"116.487009_39.984869","num":68.0},
            {"id":"116.489145_39.979028","num":18.0},
            {"id":"116.489145_39.981365","num":27.0},
            {"id":"116.489145_39.983701","num":30.0},
            {"id":"116.489145_39.986037","num":37.0},
            {"id":"116.491281_39.980197","num":94.0},
            {"id":"116.491281_39.982533","num":168.0},
            {"id":"116.491281_39.984869","num":36.0},
            {"id":"116.493417_39.986037","num":148.0},
            {"id":"116.487009_39.987206","num":21.0},
            {"id":"116.491281_39.987206","num":170.0},
            {"id":"116.495553_39.987206","num":98.0},
            {"id":"116.495553_39.984869","num":155.0},
            {"id":"116.493417_39.979028","num":50.0},
            {"id":"116.493417_39.981365","num":8.0},
            {"id":"116.487009_39.97786","num":166.0},
            {"id":"116.491281_39.97786","num":54.0},
            {"id":"116.484873_39.979028","num":876.0},
            {"id":"116.484873_39.981365","num":213.0}];
        let centerPoints=[];
        let sumVal = [];
        let intervalArr = [];
        for(let i = 0; i < honeycombData.length; i++){
            let latAndLon = honeycombData[i].id.split("_");
            centerPoints.push({lon:parseFloat(latAndLon[0]), lat:parseFloat(latAndLon[1])});
            sumVal.push(parseFloat(honeycombData[i].num))
        }
        let maxVal = Math.max.apply(null, sumVal);
        let minVal = Math.min.apply(null, sumVal);
        console.log("maxVal============" + maxVal);
        console.log("minVal============" + minVal);
        let interval = (maxVal - minVal)/15;
        for(let i = 0; i < 15; i++){
            intervalArr.push(minVal + interval * i);
        }
        console.log(intervalArr);

        //遍历“基站”数据，转换成腾讯坐标(GCJ02坐标系)后绘制蜂窝热力图
        for(let i = 0 ; i < centerPoints.length; i++){
            // let colors = ["#ff0000","#ffff00","#00ff00","#0000ff"];
            let colors = ["#f00","#f30","#f60","#f90","#fc0","#ff0","#cf3","#9f6","#6f9","#3fc","#0ff","#0fc","#0f9","#0f6","#0f3","#00f"];
            let color;
            let centerPoint = centerPoints[i];
            if(parseInt(intervalArr[0])<=sumVal[i] && sumVal[i]<parseInt(intervalArr[1])){
                color = colors[14];
            }
            if(intervalArr[1]<=sumVal[i] && sumVal[i]<intervalArr[2]){
                color = colors[13];
            }
            if(intervalArr[2]<=sumVal[i] && sumVal[i]<intervalArr[3]){
                color = colors[12];
            }
            if(intervalArr[3]<=sumVal[i] && sumVal[i]<intervalArr[4]){
                color = colors[11];
            }
            if(intervalArr[4]<=sumVal[i] && sumVal[i]<intervalArr[5]){
                color = colors[10];
            }
            if(intervalArr[5]<=sumVal[i] && sumVal[i]<intervalArr[6]){
                color = colors[9];
            }
            if(intervalArr[6]<=sumVal[i] && sumVal[i]<intervalArr[7]){
                color = colors[8];
            }
            if(intervalArr[7]<=sumVal[i] && sumVal[i]<intervalArr[8]){
                color = colors[7];
            }
            if(intervalArr[8]<=sumVal[i] && sumVal[i]<intervalArr[9]){
                color = colors[6];
            }
            if(intervalArr[9]<=sumVal[i] && sumVal[i]<intervalArr[10]){
                color = colors[5];
            }
            if(intervalArr[10]<=sumVal[i] && sumVal[i]<intervalArr[11]){
                color = colors[4];
            }
            if(intervalArr[11]<=sumVal[i] && sumVal[i]<intervalArr[12]){
                color = colors[3];
            }
            if(intervalArr[12]<=sumVal[i] && sumVal[i]<intervalArr[13]){
                color = colors[2];
            }
            if(intervalArr[13]<=sumVal[i] && sumVal[i]<intervalArr[14]){
                color = colors[1];
            }
            if(intervalArr[14]<=sumVal[i]){
                color = colors[0];
            }
            centerPoint = GPS.gcj_encrypt(centerPoint.lat,centerPoint.lon);
            _this.drawHoneycomb(centerPoint.lat, centerPoint.lon, map, color);

            // window.Qmap.convertor.translate(new qq.maps.LatLng(centerPoint.lat,centerPoint.lon), 1, function(res){
            //     // console.log(res);
            //     centerPoint = res[0];
            //     _this.drawHoneycomb(centerPoint.lat, centerPoint.lng, map)
            // });
        }
    }

    handleLinkageChange(province, city, country){
        console.log(province, city, country);
        let _this = this;
        console.log(this.state.map);
        let geocoder = this.state.geocoder;
        let zoom= 10;
        if(province != "" && city == "" && country == ""){
            console.log("省份");
            geocoder.getLocation("中国," + province);
            // geocoder.getLocation(province);
            geocoder.setComplete((result)=>{
                console.log(result);
                _this.state.map.setOptions({
                    center:result.detail.location,
                    zoom:4
                });
            });
        }
        if(province != "" && city != "" && country == ""){
            console.log("地市");
            geocoder.getLocation("中国," + province + "," + city);
            // geocoder.getLocation(province);
            geocoder.setComplete((result)=>{
                console.log(result);
                _this.state.map.setOptions({
                    center:result.detail.location,
                    zoom:10
                });
            });
        }
        if(province != "" && city != "" && country != ""){
            geocoder.getLocation(province+","+city+","+country);
            console.log("区县");
            geocoder.getLocation("中国," + province + "," + city + "," + country);
            // geocoder.getLocation(province);
            geocoder.setComplete((result)=>{
                console.log(result);
                _this.state.map.setOptions({
                    center:result.detail.location,
                    zoom:12
                });
            });
        }
    }

    componentDidMount(){
        this.init();
    }

    render(){
        return (
            <div style={{width:"100%", height:"100%"}}>
                <div id="searchCondition" style={{width:"100%", height:"10%"}}>
                    <Linkage handleLinkageChange = {this.handleLinkageChange.bind(this)}/>
                </div>
                <div id="tencentMap" style={{width:"100%", height:"90%"}}></div>
            </div>

        )
    }
}