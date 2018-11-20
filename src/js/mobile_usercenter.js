import React from "react";
import {Col, Row, Tabs, Card, Upload, Icon, Modal} from "antd";
import MobileFooter from "./mobile_footer";
import MobileHeader from "./mobile_header";
const TabPane = Tabs.TabPane;
import axios from "axios";

export default class MobileUsercenter extends React.Component {
    constructor(){
        super();
        this.state = {
            userCollection:'',
            userComments:'',
            previewImage:'',
            previewVisible:false
        }
    }

    componentDidMount(){
        axios.get("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId)
            .then((res)=>{
                this.setState({
                    userCollection:res.data
                })
            });

        axios.get("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId)
            .then((res)=>{
                this.setState({
                    userComments:res.data
                })
            });
    };

    render() {

        const {userCollection,userComments} = this.state;
        const userCollectionList = userCollection.length ?
            userCollection.map((collection, index)=>(
                <Card key={index} title={collection.uniquekey} extra={<a href={`/#/details/${collection.uniquekey}`}>查看</a>}>
                    <p>{collection.Title}</p>
                </Card>
            ))
            :
            "您还没有收藏任何新闻！";
        const userCommentsList = userComments.length ?
            userComments.map((comment, index)=>(
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 `} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "您还没有评论过任何新闻！";
        const uploadProps = {
            action:"http://newsapi.ququjiankong.com/handler.ashx",
            headers:{
                "Access-Control-Allow-Origin":"*"
            },
            listType:"picture-card",
            defaultFieldList:[
                {
                    uid:-1,
                    name:"xxx.png",
                    state:"done",
                    url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview:(file)=>{
                this.setState({
                    previewImage:file.url,
                    previewVisible:true
                })
            }
        };

        return (
            <div style={{"position":"relative"}}>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <Row>
                                    <Col span={24}>
                                        {userCollectionList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <Row>
                                    <Col span={24}>
                                        {userCommentsList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...uploadProps}>
                                        <div>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传头像</div>
                                        </div>
                                    </Upload>
                                    <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="预览" src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter/>
            </div>
        )
    }
}