import React from "react";
import {Row, Col, Carousel, Tabs} from "antd";
const TabPane = Tabs.TabPane;

import PCNewsBlock from "./pc_news_block";
import PCNewsImageBlock from "./pc_news_image_block";
export default class PCNewsContainer extends React.Component{
    constructor(){
        super()
    }
    render(){
        const settings = {
            speed:500,
            autoplay:true,
            infinite:true
        }
        return (
            <div>
                <Row>
                    <Col span={2} />
                    <Col span={20}>
                        <div className="newsContainer">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" cardTitle="国际头条" width="100%" blockWidth="33.3%" imageWidth="100%" />
                        </div>
                        <div className="tabs">
                            <Tabs>
                                <TabPane tab="头条" key="1">
                                    <PCNewsBlock type="top" count="19" />
                                </TabPane>
                                <TabPane tab="国际" key="2">
                                    <PCNewsBlock type="guoji" count="19" />
                                </TabPane>
                            </Tabs>
                        </div>
                        <div style={{width:"100%", float:"left"}}>
                            <PCNewsImageBlock count={8} type="guonei" cardTitle="国内新闻" width="100%" blockWidth="12.5%" imageWidth="100%" />
                            <PCNewsImageBlock count={16} type="yule" cardTitle="娱乐新闻" width="100%" blockWidth="12.5%" imageWidth="100%" />
                        </div>
                        {/*<PCNewsImageBlock count={8} type="guoji" cardTitle="国际头条" width="100%" blockWidth="12.5%" imageWidth="100%" />*/}
                    </Col>
                    <Col span={2} />
                </Row>
            </div>
        )
    }
}