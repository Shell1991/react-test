import React from "react";
import {Row, Col, Form, Card, Input, Button, notification} from "antd";
import axios from "axios";
const FormItem = Form.Item;
const {TextArea} = Input;

class CommonComments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments:''
        }
    };

    handleSubmit(){
        let formData = this.props.form.getFieldsValue();
        console.log(formData);
        axios.get("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.remark)
            .then(
                (res)=>{
                    if(res.data == true){
                        this.componentDidMount();
                    }else{
                        alert("提交失败！");
                    }
                }
            )
    };

    componentDidMount(){
        axios.get("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey)
            .then((res)=>{
                console.log(res);
                this.setState({
                    comments: res.data
                })
            })
    }

    handleUserCollection(){
        axios.get("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey)
            .then((res)=>{
                if(res.data == true){
                    notification["success"]({
                        message: 'React News',
                        description: '收藏成功！'
                    })
                }else{
                    notification["error"]({
                        message:"React News",
                        description:"网络出错!"
                    })
                }
            })
    }

    render(){
        let {getFieldProps} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length?
            comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "还没有任何相关评论！";
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem>
                                <TextArea type="textarea" placeholder="随便说点什么吧" {...getFieldProps('remark')}/>
                            </FormItem>
                            <div style={{textAlign:"center"}}>
                                <Button type="primary" htmlType="submit">提交评论</Button>
                                &nbsp;&nbsp;
                                <Button type="primary" htmlType="button" onClick={this.handleUserCollection.bind(this)}>收藏此篇</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CommonComments = Form.create({})(CommonComments);