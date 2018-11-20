import React from "react";
import {Button, Form, Icon, Input, message, Modal, Tabs} from "antd";
import {Link, Route} from 'react-router-dom';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class MobileHeader extends React.Component{
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

    setModalVisible(value){
        this.setState({
            modalVisible:value
        })
    }

    handleClick(){
        this.setState({
            modalVisible:true,
            current:"register"
        })
    }

    handleSubmit(e){
        e.preventDefault();//阻止冒泡事件
        var myFetchOptions = {
            method:"get"
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        if(formData.r_confirmPassword === formData.r_password){
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+ this.state.action +"&username="+ formData.userName +"&password="+ formData.password +"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).then(response => {
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
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+ this.state.action +"&username="+ formData.userName +"&password="+ formData.password +"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).then(response => {
            if(response.status == 200){
                message.success("登录成功");
                this.setState({
                    modalVisible: false,
                    hasLogin: true
                });
            }
        })
    }

    setActivePane(key){
        let action = "";
        if(key == "1"){
            action = "login"
        }else if(key == "2"){
            action = "register"
        }
        this.setState({
            action: action,
            activePane: key.toString()
        })
    }

    render(){
        let { getFieldProps } = this.props.form;
        const userShow = this.state.hasLogin
            ?
            <Link to="/usercenter">
                <Icon type="inbox" />
            </Link>
            :
            <Icon type="setting" onClick={this.handleClick.bind(this)} />;
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
            <header className="mobile-header">
                <img src="./src/images/logo.png" alt="logo" onClick={()=>{location.href="#"}} />
                <span onClick={()=>{location.href="#"}}>ReactNews</span>
                <Route>
                    {userShow}
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
            </header>
        )
    }
}
export default MobileHeader = Form.create({})(MobileHeader);