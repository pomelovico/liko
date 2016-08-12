/**
 * Created by Vico on 2016.07.25.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Input from '../../components/listlite/Input';

class TaskChild extends React.Component{
    constructor(props){
        super(props);
    }
    /*componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }*/
    editSubTask(cid,value){
        if(value!=''){
            this.props.editSubTask({
                cid:cid,
                content:value
            })
        }
    }
    addSubTask(content){
        if(content){
            this.props.addSubTask({
                pid:this.props.pid,
                content:content
            })
        }
    }
    render(){
        const child = this.props.childs ||{};
        let temp = [];
        for(let key in child){
            temp.push(<li key={key}className="pos-r subtask-item">
                    <Input
                        defaultClass="ll-input"
                        defaultValue={child[key].content}
                        onEnterKeyDown={(value)=>this.editSubTask(child[key].cid,value)}
                    />
                    <div className="pos-a">
                        <button onClick={()=>{this.props.delSubTask({cid:child[key].cid})}}>
                            <i className="icon-remove"></i>
                        </button>
                    </div>
            </li>)
        }
        return (<div className="f12">
            <h5>子任务</h5>
            <ul>
                {temp}
                <li className="pos-r subtask-item">
                    <Input
                        placeholder="添加子任务"
                        defaultClass="ll-input"
                        onEnterKeyDown={(content)=>this.addSubTask(content)}
                        onKeyDownClearField={true}
                    />
                    <div className="pos-a">
                    </div>
                </li>
            </ul>

        </div>)
    }
 }
export default connect(
    (state,ownProps)=>{
        return {
            childs:state.listlite.lists[Common.Utils.getCookie('current_list_id')].tasks[ownProps.pid]._child
        }
    },
    dispatch=>{
        let listliteActions = bindActionCreators(Action.listlite,dispatch);
        return {
            editSubTask:listliteActions.editSubTask,
            addSubTask:listliteActions.addSubTask,
            delSubTask:listliteActions.delSubTask
        }
    }
)(TaskChild);