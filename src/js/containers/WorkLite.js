/**
 * Created by Vico on 2016.07.18.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class WorkLite extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div id="work-lite-app">
            <header>
                <h2>my work lite.</h2>
            </header>
            <ul>
                <li><Link to={this.props.route.path+'/flow'}>Flow</Link></li>
            </ul>
            {this.props.children}
        </div>)
    }
}
export default connect(
    (state)=>{
        return {};
    },(dispatch)=>{
        return {};
    })(WorkLite);