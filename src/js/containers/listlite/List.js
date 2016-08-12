/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


/*清单组件*/
class List extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const list = this.props.list;
        return list ? (<div
            onClick = {()=>this.props.getTasks()}
            className="d-flex flex-j-between p-b-ml p-t-ml"
        >
            <div className="ll-list-name">
                <i className="icon-file-alt"></i>&nbsp;&nbsp;{list.list_name}
            </div>
            <span className={list.todo_count? "ll-count_badge":"ll-count_badge none"}>{list.todo_count}</span>
        </div>):null;
    }
}
export default connect(
    (state,ownProps)=>{
        return {
            list:state.listlite.lists[ownProps.list_id]
        };
    })(List);
