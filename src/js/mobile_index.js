import React from "react";
import MobileHeader from "./mobile_header";
import "../css/mobile.less";

export default class MobileIndex extends React.Component{
    constructor(){
        super();//constructor里为什么用super()
    }

    render(){
        return (
            <div id="mobile-header">
                <MobileHeader/>
            </div>
        )
    }
}