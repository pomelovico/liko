/**
 * Created by Vico on 2016.07.25.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Input from '../../components/listlite/Input';

class Child extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSync:false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setSync(false);
    }
    edit(value){
        this.props.editSubTask(this.props.child.cid,value);
        this.setSync(true);
    }
    del(){
        this.props.delSubTask({cid:this.props.child.cid});
        this.setSync(true);
    }
    setSync(flag){
        this.setState({isSync:flag});
    }
    render(){
        const {child} = this.props;
        return (<li className="pos-r subtask-item">
            <Input
                defaultClass="ll-input"
                defaultValue={child.content}
                onEnterKeyDown={(value)=>this.edit(value)}
            />
            <div className="pos-a">
                {this.state.isSync ?
                    <button >
                        <i className="icon-spin icon-spinner"></i>
                    </button>
                    : <button onClick={()=>this.del()}>
                        <i className="icon-remove"></i>
                    </button>}
            </div>
        </li>)
    }
}

class TaskChild extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAdd:false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setSync(false);
    }
    setSync(flag){
        this.setState({isAdd:flag});
    }
    editSubTask(cid,value){
        if(value!=''){
            this.props.editSubTask({
                cid:cid,
                content:value
            });
        }
    }
    addSubTask(content){
        if(content){
            this.props.addSubTask({
                pid:this.props.pid,
                content:content
            });
            this.setSync(true);
        }
    }
    render(){
        const child = this.props.childs ||{};
        let temp = [];
        for(let key in child){
            temp.push(<Child
                key={key}
                child={child[key]}
                editSubTask={(cid,value)=>this.editSubTask(cid,value)}
                delSubTask={(data)=>this.props.delSubTask(data)}
            />);
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
                        {this.state.isAdd ?
                            <button >
                                <i className="icon-spin icon-spinner"></i>
                            </button>
                            :
                            <button >
                                <i className="icon-pencil"></i>
                            </button>
                        }
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