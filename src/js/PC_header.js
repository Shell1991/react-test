import React from "react";
import {Button, Col, Form, Icon, Input, Menu, message, Modal, Row, Tabs} from "antd";
import {Link, Route} from 'react-router-dom';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component{
    constructor(){
        super();//constructor里为什么用super()
        this.state = {
            current:"top",
            modalVisible:false,
            action:"login",
            hasLogin:false,
            userNickName:"",
            userid:0,
            activePane:"1"
        }
    }

    componentWillMount(){
        if(localStorage.userId != ""){
            this.setState({
                hasLogin: true,
                userNickName: localStorage.userNickName,
                userId: localStorage.userId
            })
        }
    }

    setModalVisible(value){
        this.setState({
            modalVisible:value
        })
    }

    handleClick(e){
        if(e.key == "register"){
            this.setState({
                modalVisible:true,
                current:"register"
            })
        }else {
            this.setState({
                current:e.key
            })
        }
    }

    handleSubmit(e){
        e.preventDefault();//阻止冒泡事件
        var myFetchOptions = {
            method:"get"
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        if(formData.r_confirmPassword === formData.r_password){
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="
                + this.state.action
                +"&username="+ formData.userName
                +"&password="+ formData.password
                +"&r_userName="+formData.r_userName
                +"&r_password="+formData.r_password
                +"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
            .then(response => {
                if(response.status == 200){
                    message.success("注册成功，请重新登录...");
                    this.setState({
                        activePane:"1"
                    });
                }
            })
        }
    }

    handleLogin(e){
        e.preventDefault();//阻止冒泡事件
        var myFetchOptions = {
            method:"get"
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="
            + this.state.action
            +"&username="+ formData.userName
            +"&password="+ formData.password
            +"&r_userName="+formData.r_userName
            +"&r_password="+formData.r_password
            +"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
            .then(response => {
                if(response.status == 200) {
                    return response.json();
                }
            }).then(data => {
                console.log(data);
                message.success("登录成功!");
                this.setState({
                    modalVisible: false,
                    hasLogin: true,
                    userNickName:data.NickUserName
                });
                localStorage.userNickName = data.NickUserName;
                localStorage.userId = data.UserId;
            });
    }

    setActivePane(key){
        let action = "";
        if(key == "1"){
            action = "login"
        }else if(key == "2"){
            action = "register";
        }
        this.setState({
            action: action,
            activePane: key.toString()
        })
    }
    handleLogout(e){
        e.preventDefault();
        localStorage.userNickName = "";
        localStorage.userId = "";
        this.setState({
            hasLogin: false
        },()=>{
            message.info("成功退出，请重新登录...");
        })
    }

    render(){
        let { getFieldProps } = this.props.form;
        const userShow = this.state.hasLogin
            ?
            <Menu.Item key="logout" className="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_black" to="/usercenter">
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button" onClick={this.handleLogout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" className="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <header className="pc-header">
                <Row>
                    <Col span={2}></Col>
                    <Col span={4} className="logo">
                        <img src="./src/images/logo.png" alt="logo" />
                        <span>ReactNews</span>
                    </Col>
                    <Col span={16}>
                        <Route>
                            <Menu selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)} mode="horizontal" style={{width:"100%"}}>
                                <Menu.Item key="top" style={{width:"8%"}}>
                                    <Icon type="appstore"/>头条
                                </Menu.Item>
                                <Menu.Item key="shehui" style={{width:"9%"}}>
                                    <Icon type="profile"/>社会
                                </Menu.Item>
                                <Menu.Item key="guonei" style={{width:"9%"}}>
                                    <Icon type="read"/>国内
                                </Menu.Item>
                                <Menu.Item key="guoji" style={{width:"9%"}}>
                                    <Icon type="project"/>国际
                                </Menu.Item>
                                <Menu.Item key="yule" style={{width:"9%"}}>
                                    <Icon type="shopping"/>娱乐
                                </Menu.Item>
                                <Menu.Item key="tiyu" style={{width:"9%"}}>
                                    <Icon type="idcard"/>体育
                                </Menu.Item>
                                <Menu.Item key="keji" style={{width:"9%"}}>
                                    <Icon type="switcher"/>科技
                                </Menu.Item>
                                <Menu.Item key="shishang" style={{width:"9%"}}>
                                    <Icon type="schedule"/>时尚
                                </Menu.Item>
                                {userShow}
                            </Menu>
                        </Route>
                        <Modal title="用户中心" wrapClassName="vertical-center-modal"
                               visible={this.state.modalVisible}
                               onCancel={()=>{this.setModalVisible(false)}}
                               footer={null}>
                            <Tabs type="card" activeKey={this.state.activePane} onTabClick={this.setActivePane.bind(this)}>
                                <TabPane tab="登录" key="1">
                                    <Form layout="horizontal" onSubmit={this.handleLogin.bind(this)}>
                                        <FormItem {...formItemLayout} label="账户">
                                            <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                                        </FormItem>
                                        <FormItem {...formItemLayout}  label="密码">
                                            <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                                        </FormItem>
                                        <Button type="primary" htmlType="submit" style={{width:"20%", marginLeft:"40%"}}>登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem {...formItemLayout} label="账户">
                                            <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                        </FormItem>
                                        <FormItem {...formItemLayout}  label="密码">
                                            <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                        </FormItem>
                                        <FormItem {...formItemLayout}  label="确认密码">
                                            <Input type="password" placeholder="请确认您的密码" {...getFieldProps('r_confirmPassword')}/>
                                        </FormItem>
                                        <Button type="primary" htmlType="submit" style={{width:"20%", marginLeft:"40%"}}>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>

                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}
export default PCHeader = Form.create({})(PCHeader);