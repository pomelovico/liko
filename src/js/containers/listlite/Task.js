/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


export default class Task extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isCheck:false,
            isStar:false
        };
    }
    isSync(key){
        this.setState({
            [key]:true
        });
    }
    componentWillReceiveProps(nextProps){
        if(Number(this.props.task.star) != Number(nextProps.task.star)){
            this.setState({
                isStar: false
            });
        }
    }
    showTaskDetail(list_id){
        this.props.showDetail();
        Common.Utils.setCookie('current_list_id',list_id);
    }
    checkTask(e){
        this.isSync('isCheck');
        e.stopPropagation();
        let {task_id,done} = this.props.task;
        this.props.finishTask({task_id:task_id,done:Number(done) ? 0 : 1})
    }
    checkStar(id,star){
        this.isSync('isStar');
        this.props.Star({task_id:id,star:Number(star) ? 0 : 1});
    }
    render(){
        const task = this.props.task;
        return (<li className={Number(task.done) ? "f14 ll-task-item d-t done" : "f14 ll-task-item d-t"}>
                <div
                    className="d-tc p-b-sm p-t-sm task-content"
                    onClick={()=>{this.showTaskDetail(task.list_id)}}
                >
                    <div className="d-ib w20 text-a-l">
                        {this.state.isCheck ?
                        <button className="p-l-none"><i className="icon-spin icon icon-spinner"></i></button> :
                        <button className="p-l-none" onClick={(e)=>{this.checkTask(e)}}>
                            {Number(task.done) ?<i className="icon-check"></i>: <i className="icon-check-empty"></i>}
                        </button>
                        }
                    </div>
                    <span>{task.content}</span>
                </div>
                <div className="d-tc p-b-sm p-t-sm task-options">
                    <span className="m-r-sm">{Common.Utils.dateConvert(parseInt(task.due_time))}</span>
                    <div className="d-ib w20 text-a-r">
                        {this.state.isStar ?
                            <button ><i className="icon-spin icon icon-spinner"></i></button> :
                            <button onClick={()=>this.checkStar(task.task_id,task.star)}>
                                {Number(task.star) ? <i className=" icon-star"></i> : <i className=" icon-star-empty"></i>}
                            </button>
                        }
                    </div>
                </div>
        </li>);
    }
}
