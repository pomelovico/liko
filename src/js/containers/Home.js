/**
 * Created by Vico on 2016.07.04.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class Home extends React.Component{
    render(){
        return (<div>
            <h1>Liko's Home Page</h1>
            <h3>Hello I'm Liko!</h3>
            <p>this is my site.</p>
            <div>
                <Link to="weather">Weather App</Link>
            </div>
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
            getWeather:weatherActions.getWeather,
            setWeather:weatherActions.setWeather
        }
})(Home);