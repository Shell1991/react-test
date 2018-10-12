import React from "react";
import {Row, Col, Carousel} from "antd";


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
                    <Col span={20} className="newsContainer">
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg"/></div>
                                <div><img src="./src/images/carousel_2.jpg"/></div>
                                <div><img src="./src/images/carousel_3.jpg"/></div>
                                <div><img src="./src/images/carousel_4.jpg"/></div>
                            </Carousel>
                        </div>
                    </Col>
                    <Col span={2} />
                </Row>
            </div>
        )
    }
}