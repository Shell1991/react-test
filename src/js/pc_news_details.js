import React from "react";
import {Row, Col, BackTop} from "antd";
import axios from "axios";
import PCHeader from "./PC_header";
import PCFooter from "./PC_footer";
import PCNewsImageBlock from "./pc_news_image_block";
import CommonComments from "./common_comments";
export default class PCNewsDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            newsItem:{}
        }
    };

    componentDidMount(){
        axios.get("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey)
            .then((res)=>{
            console.log(res);
                this.setState({
                    newsItem:res.data
                });
                document.title = res.data.title +"——React News";
            })
    };

    createMarkup(){
        return {__html:this.state.newsItem.pagecontent};
    };

    render(){
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={20} type="top" cardTitle="相关新闻" width="90%" blockWidth="50%" imageWidth="100%" />
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <CommonComments uniquekey = {this.props.match.params.uniquekey} />
                <PCFooter></PCFooter>
                <BackTop />
            </div>
        )
    }
}