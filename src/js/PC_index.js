import React from "react";
import PCHeader from "./PC_header";
import PCFooter from "./PC_footer";
import PCNewsContainer from "./PC_newscontainer";
import "../css/pc.less";

export default class PCIndex extends React.Component{
    constructor(){
        super();//constructor里为什么用super()
    }

    render(){
        return (
            <div style={{width:"100%", height:"100%"}}>
                <PCHeader/>
                <PCNewsContainer></PCNewsContainer>
                <PCFooter />
            </div>
        )
    }
}