import React from "react";
import {Card} from "antd";
import {Route, Link} from "react-router-dom";
import axios from "axios";

export default class PCNewsImageBlock extends React.Component{
    constructor(){
        super();
        this.state = {
            news : ''
        }
    }

    componentWillMount(){
        axios.post("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+ this.props.type +"&count="+ this.props.count)
            .then(res=>this.setState({news:res.data}))
    }

    render(){
        const imageStyle={
            display:"block",
            width:this.props.imageWidth
            // height:"90px"
        };
        const h3Style = {
            width: this.props.imageWidth,
            whiteSpace:"nowrap",
            overflow:"hidden",
            textOverflow:"ellipsis"
        }
        const news = this.state.news;
        const newsList = news.length ?
            news.map((newsItem, index) => (
                <div key={index} className="imageBlock" style={{width:this.props.blockWidth}}>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div className="custom-image">
                            <img alt="" style={imageStyle} src={newsItem.thumbnail_pic_s} />
                        </div>
                        <div className="custom-card">
                            <h3 style={h3Style}>{newsItem.title}</h3>
                            <p>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            :
            "未获取到有效新闻！"

        return (
            <Route>
                <div>
                    <Card title={this.props.cardTitle} bordered={true} style={{width:this.props.width}}>
                        {newsList}
                    </Card>
                </div>
            </Route>
        )
    }
}