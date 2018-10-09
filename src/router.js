import React from "react";
import { HashRouter, Router, Route, Switch} from "react-router-dom";
// import createHistory from "history/createHashHistory";     //锚点模式history
import "antd/dist/antd.css";
import PCIndex from "./js/PC_index";
import MobileIndex from "./js/mobile_index";
import MediaQuery from "react-responsive";
// const history = createHistory();

export default class Root extends React.Component{
    render(){
        return (
            <div>
                <MediaQuery query="(min-device-width:1224px)">
                    <PCIndex/>
                </MediaQuery>
                <MediaQuery query="(max-device-width:1224px)">
                    <MobileIndex/>
                </MediaQuery>
            </div>
        )
    }
}