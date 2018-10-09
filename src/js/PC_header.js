import React from "react";
import {Row, Col, Menu, Icon} from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class PCHeader extends React.Component{
    constructor(){
        super();//constructor里为什么用super()
        this.state = {
            current:"top"
        }
    }

    render(){
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4} className="logo">
                        <img src="./src/images/logo.png" alt="logo" />
                        <span>ReactNews</span>
                    </Col>
                    <Col span={16}>
                        <Menu selectedKeys={[this.state.current]} mode="horizontal" style={{width:"100%"}}>
                            <Menu.Item key="top" style={{width:"12%"}}>
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui" style={{width:"12%"}}>
                                <Icon type="profile" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei" style={{width:"12%"}}>
                                <Icon type="read" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji" style={{width:"12%"}}>
                                <Icon type="project" />国际
                            </Menu.Item>
                            <Menu.Item key="yule" style={{width:"12%"}}>
                                <Icon type="shopping" />娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu" style={{width:"12%"}}>
                                <Icon type="idcard" />体育
                            </Menu.Item>
                            <Menu.Item key="keji" style={{width:"12%"}}>
                                <Icon type="switcher" />科技
                            </Menu.Item>
                            <Menu.Item key="shishang" style={{width:"12%"}}>
                                <Icon type="schedule" />时尚
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}