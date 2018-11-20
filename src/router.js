import React from "react";
import { HashRouter,BrowserRouter, Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createHashHistory";     //锚点模式history
import "antd/dist/antd.css";
import PCIndex from "./js/PC_index";
import MobileIndex from "./js/mobile_index";
import MediaQuery from "react-responsive";
const history = createHistory();
import BaiduHoneycombDemoIndex from "./js/baiduHoneycombDemoIndex";
import TencentHoneycombDemoIndex from "./js/tencentHoneycombDemoIndex";
import PCNewsDetails from "./js/pc_news_details";
import MobileNewsDetails from "./js/mobile_news_details";
import PCUsercenter from "./js/pc_usercenter";
import MobileUsercenter from "./js/mobile_usercenter";

export default class Root extends React.Component{
    render(){
        return (
            <div style={{width:"100%", height:"100%"}}>
                <MediaQuery query="(min-device-width:1224px)">
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={PCIndex} />
                            <Route path="/details/:uniquekey" component={PCNewsDetails} />
                            <Route path="/usercenter" component={PCUsercenter} />
                        </Switch>
                    </Router>
                    {/*<PCIndex/>*/}
                    {/*<HashRouter>*/}
                        {/*<Switch>*/}
                            {/*<Route path="/home" component={PCIndex}></Route>*/}
                            {/*<Route path="/baiduHoneycombDemoIndex" component={BaiduHoneycombDemoIndex}></Route>*/}
                            {/*<Route path="/tencentHoneycombDemoIndex" component={TencentHoneycombDemoIndex}/>*/}
                            {/*/!*<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>*!/*/}
                            {/*/!*<Route path="/usercenter" component={PCUserCenter}></Route>*!/*/}
                        {/*</Switch>*/}
                    {/*</HashRouter>*/}
                </MediaQuery>
                <MediaQuery query="(max-device-width:1224px)">
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={MobileIndex} />
                            <Route path="/details/:uniquekey" component={MobileNewsDetails} />
                            <Route path="/usercenter" component={MobileUsercenter} />
                        </Switch>
                    </Router>
                </MediaQuery>
            </div>
        )
    }
}