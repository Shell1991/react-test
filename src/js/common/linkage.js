import React from "react"
import axios from "axios";
import ContainerData from "../file/data"
export default class Linkage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            province: "",
            city: "",
            country: "",
            provinces: [],
            cities: [],
            counties: []
        }
    }

    handleChangeprovince(e) {
        e.preventDefault();
        const data = this.state.data;
        for(var i in data) {
            if(data[i].name == e.target.value) {
                this.setState({
                    cities: data[i].city,
                    counties: data[i].city[0].area,
                    province: e.target.value,
                    city: "",
                    country: ""
                },()=>{
                    this.props.handleLinkageChange(this.state.province , this.state.city , this.state.country);
                })
            }
        }
    }

    handleChangecity(e) {
        e.preventDefault();
        const cities = this.state.cities;
        for(var i in cities) {
            if(cities[i].name == e.target.value) {
                this.setState({
                    counties: cities[i].area,
                    city: e.target.value
                },()=>{
                    this.props.handleLinkageChange(this.state.province , this.state.city , this.state.country);
                })
            }
        }
    }

    handleChangecounty(e) {
        e.preventDefault();
        this.setState({
            country: e.target.value
        },()=>{
            this.props.handleLinkageChange(this.state.province , this.state.city , this.state.country);
        })
    }

    componentDidMount() {
        const provinces = []
        const data = []
        console.log(ContainerData.list);
        ContainerData.list .map(i =>{
            provinces.push(i.name)
            data.push(i)
        })
        this.setState({
            data: data,
            provinces: provinces,
            cities: data[0].city,
            counties: data[0].city[0].area
        })
    }
    render() {
        return(
            <div>
                {
                    this.state.provinces.length!=0
                        ?
                        <p>
                            <select onChange={this.handleChangeprovince.bind(this)}>
                                <option>请选择省</option>
                                {
                                    this.state.provinces.map((i,index) => (
                                        <option value={i} key={index}>{i}</option>
                                    ))
                                }
                            </select>
                            <select onChange={this.handleChangecity.bind(this)}>
                                <option>请选择市</option>
                                {
                                    this.state.cities.map((i,index) => (
                                        <option value={i.name} key={index}>{i.name}</option>
                                    ))
                                }
                            </select>
                            <select onChange={this.handleChangecounty.bind(this)}>
                                <option>请选择区</option>
                                {
                                    this.state.counties.map((i,index) => (
                                        <option value={i} key={index}>{i}</option>
                                    ))
                                }
                            </select>
                        </p>
                        :<p>11111111</p>
                }
                {/*<div>{this.state.province+this.state.city+this.state.country}</div>*/}
            </div>
        )
    }
}


