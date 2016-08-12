/**
 * Created by Vico on 2016.07.07.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CurrentWeather from '../components/weather/CurrentWeather';
import HourForecasts from '../components/weather/HourForecasts';
import DailyForecasts from '../components/weather/DailyForecasts';



class MatchCities extends React.Component{
    handleClick(v){
        // console.log(v);
        this.props.setCity(v);
    }
    render(){
        const {cities} = this.props;
        let temp = [];
        cities.map((v,k)=>{
            temp.push(
                <li
                    className="item-match-city"
                    key={k}
                    onClick = {()=>this.handleClick(v)}
                >
                    {v}
                </li>
            )
        });

        return cities.length > 0 ? (<ul className="match-cities pos-a f14">{temp}</ul>) : null;
    }
}

class Search extends　React.Component{
    constructor(props){
        super(props);
        this.state = {
            matchCities:[]
        };
    }
    componentDidMount(){
        let search = this.refs.search,
            body = document.getElementsByTagName('body');
        search.addEventListener('keydown',(e)=>{
            if(e.keyCode == 13){
                let pattern = new RegExp(search.value),
                    cities = Common.cityNameWithPinyin,
                    len = cities.length;
                for(let i = 0; i<len;i++){
                    if(pattern.test(cities[i].c) || pattern.test(cities[i].p)){
                        this.setCity(cities[i].c);
                        break;
                    }
                }
            }
        });
        body[0].addEventListener('click',(e)=>{
            if(e.target.className != 'item-match-city' && e.target.className != 'search'){
                search.value = '';
                this.setState({matchCities:[]});
            }
        });
    }
    /*搜索城市，显示与输入匹配的城市*/
    searchCity(){
        let pattern = new RegExp(this.refs.search.value),
            cities = [];
        if(this.refs.search.value){
            Common.cityNameWithPinyin.map((v,k)=>{
                if(pattern.test(v.c) || pattern.test(v.p) ){
                    cities.push(v.c);
                }
            });
        }else{
            cities = ["成都","杭州","上海","武汉","青岛","北京"];
        }
        this.setState({matchCities:cities.length > 15 ? cities.slice(0,15) : cities});
    }
    /*设置城市*/
    setCity(city){
        this.refs.search.value = '';
        this.setState({matchCities:[]});
        this.props.getWeather({city:city});
    }
    render(){
        return(<div className="pos-r">
            <input
                className="search"
                ref='search'
                onChange={()=>this.searchCity()}
                onFocus={()=>{this.searchCity()}}
                type="text"
                placeholder="搜索城市"/>
            <MatchCities
                cities = {this.state.matchCities}
                setCity = {(city)=>this.setCity(city)}
            />
        </div>)
    }
}

class Weather extends React.Component{
    componentWillMount(){
        this.props.getWeather({city:"成都"});
    }
    render(){
        const {weather} = this.props;
        return (<div id="weather-app">
            <div className="panel header float-none m-b-xxl">
                <div className="content d-flex">
                    <h4>Weather</h4>
                    <Search getWeather={(city)=>this.props.getWeather(city)}  />
                </div>
            </div>
                {weather.hasOwnProperty('basic') ? <div className="content">
                    <CurrentWeather now={weather.now} basic={weather.basic} />
                    <HourForecasts hourForecast={weather.hourly_forecast} />
                    <DailyForecasts dailyForecast={weather.daily_forecast} />
                </div> : <p className="content text-a-c">获取数据中...</p>}
        </div>)
    }
}

export default connect(
    state=>{
        return {
            weather:state.weather
        }
    },dispatch=>{
        let weatherActions = bindActionCreators(Action.weather, dispatch);
        return {
            getWeather:weatherActions.getWeather
        }
    })(Weather);