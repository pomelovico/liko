/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


export default class Task extends React.Component{
    constructor(props){
        super(props);
    }
    showTaskDetail(list_id){
        this.props.showDetail();
        Common.Utils.setCookie('current_list_id',list_id);
    }
    finishTask(e){
        e.stopPropagation();
        let {task_id,done} = this.props.task;
        this.props.finishTask({task_id:task_id,done:Number(done) ? 0 : 1})
    }
    render(){
        const task = this.props.task;
        return (<li className="f14 ll-task-item d-t">
                <div
                    className="d-tc p-b-sm p-t-sm task-content"
                    onClick={()=>{this.showTaskDetail(task.list_id)}}
                >
                        <button onClick={(e)=>{this.finishTask(e)}}>
                            {Number(task.done) ?<i className="icon-check"></i>: <i className="icon-check-empty"></i>}
                        </button>
                        <span>{task.content}</span>
                </div>
                <div className="d-tc p-b-sm p-t-sm task-options">
                        <span className="m-r-sm">{Common.Utils.dateConvert(parseInt(task.due_time))}</span>
                        <button onClick={()=>this.props.Star({task_id:task.task_id,star:Number(task.star) ? 0 : 1})}>
                            {Number(task.star) ? <i className=" icon-star f16"></i> : <i className=" icon-star-empty f16"></i>}
                        </button>
                </div>
        </li>);
    }
}
