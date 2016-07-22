/**
 * Created by Vico on 2016.07.18.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Flow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div id="flow">
            this is flow;
        </div>)
    }
}
export default connect(
    (props)=>{
        return {};
    },(dispatch)=>{
        return {};
    })(Flow);