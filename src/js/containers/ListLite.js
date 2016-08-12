/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Lists from './listlite/Lists';
import Tasks from './listlite/Tasks';

class ListLite extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        document.getElementsByTagName('title')[0].innerHTML = 'Lite List';
    }
    render(){
        return (<div id="listlite-app" className="">
            <div id="bg" ></div>
            <header className="ll-header-bar">
                <h1>My Lite List.<i className="icon-file-text-alt"></i></h1>
            </header>
            <Lists />
            <Tasks />
        </div>)
    }
}

export default connect(
    (state)=>{
        return {
        };
    },(dispatch)=>{
        return {
        };
    })(ListLite);