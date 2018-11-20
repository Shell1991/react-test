import React from "react";
import {Row, Col, BackTop} from "antd";
import axios from "axios";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import CommonComments from "./common_comments";

export default class MobileNewsDetails extends React.Component{
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
                <MobileHeader />
                <Row>
                    <Col span={24} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>
                </Row>
                <CommonComments uniquekey = {this.props.match.params.uniquekey} />
                <MobileFooter />
                <BackTop />
            </div>
        )
    }
}