/**
 * Created by Vico on 2016.07.04.
 */
import React ,{Component,Pro} from 'react';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {Router, Route, hashHistory,IndexRoute} from 'react-router';

/*使用中间件，增强store，thunkMiddleware可以支持异步action*/
import reducerApp from '../reducers/index';
let createStoreWithMiddleware = function(reducer){
    let temp = applyMiddleware(thunkMiddleware)(createStore);
    return temp(reducer);
};
let store = createStoreWithMiddleware(reducerApp);


import Home from '../containers/Home';
import Weather from '../containers/Weather';

class Root extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Provider store = {store}>
                <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
                    <Route path='/' component={Home} ></Route>
                    <Route path='/weather' component={Weather} ></Route>
                </Router>
            </Provider>
        )
    }
}

export default Root;