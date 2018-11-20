import React from "react";
import {Card} from "antd";
import {Route, Link} from "react-router-dom";
import axios from "axios";

export default class PCNewsBlock extends React.Component{
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
        const news = this.state.news;
        console.log(news);
        const newsList = news.length ?
            news.map((newsItem, index) => (
                <li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target="_black">{newsItem.title}</Link>
                </li>
            ))
            :
            "未获取到有效新闻！"

        return (
            <Route>
                <div className="topNewsList">
                    <Card>
                        <ul>
                            {newsList}
                        </ul>
                    </Card>
                </div>
            </Route>
        )
    }
}