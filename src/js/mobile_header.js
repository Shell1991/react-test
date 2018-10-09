import React from "react";

export default class MobileHeader extends React.Component{
    constructor(){
        super();//constructor里为什么用super()
    }

    render(){
        return (
            <header>
                <img src="./src/images/logo.png" alt="logo" />
                <span>ReactNews</span>
            </header>
        )
    }
}