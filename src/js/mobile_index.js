import React from "react";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import {Tabs, Carousel} from "antd";
import "../css/mobile.less";
import MobileList from "./mobile_list";

const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component{
    constructor(){
        super();//constructor里为什么用super()
    }

    render(){
        const settings = {
            speed:500,
            autoplay:true,
            infinite:true
        }
        return (
            <div id="mobile">
                <MobileHeader/>
                <Tabs tabPosition="top">
                    <TabPane tab="头条" key="1">
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg"/></div>
                                <div><img src="./src/images/carousel_2.jpg"/></div>
                                <div><img src="./src/images/carousel_3.jpg"/></div>
                                <div><img src="./src/images/carousel_4.jpg"/></div>
                            </Carousel>
                        </div>
                        <MobileList type="top" count="10"/>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList type="shehui" count="10"/>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileList type="guonei" count="10"/>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileList type="guoji" count="10"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileList type="yule" count="10"/>
                    </TabPane>
                    <TabPane tab="体育" key="6">
                        <MobileList type="tiyu" count="10"/>
                    </TabPane>
                    <TabPane tab="科技" key="7">
                        <MobileList type="keji" count="10"/>
                    </TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        )
    }
}