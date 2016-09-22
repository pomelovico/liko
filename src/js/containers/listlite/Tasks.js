/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Task from './Task';
import AddTask from './AddTask';
import TaskDetail from './TaskDetail';


class Tasks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditingTask:null,
            collapseDoneTasks:true,/*显示完成的任务，默认不显示*/
            isFetchDoneTasks:false/*是否在异步请求未完成任务*/
        }
    }
    componentWillReceiveProps(nextProps){
        /*将自动显示默认清单列表的任务，所以当默认清单渲染完成后，停止异步请求*/
        if(!this.props.list_name&&nextProps.list_name){
            this.props.setFetchTasksStatus(false);
        }
        nextProps.tasks.length == 0 || this.props.setFetchTasksStatus(false);
        /*切换清单时，关闭已完成任务清单*/
        if(this.props.current_list!=nextProps.current_list){
            this.hiddenDoneTasks();
        }else{/*在当前清单中时，未完成面板的展开与折叠只根据新收到的tasks和btn控制*/
            if(this.props.hasFetchDone!=nextProps.hasFetchDone){
                this.setState({
                    collapseDoneTasks:false
                });
            }
            if(nextProps.hasFetchDone){
                this.setState({isFetchDoneTasks:false});
            }
        }
        this.closeTaskDetail();
    }
    closeTaskDetail(){
        this.setState({
            isEditingTask:null
        });
    }
    showDoneTasks(){
        /*第一次显示完成任务时需要请求数据，之后不再请求*/
        if(!this.props.hasFetchDone){
            this.props.getTasksDone({list_id:this.props.current_list});
            this.setState({
                isFetchDoneTasks:true
            });
        }else{
            this.setState({
                collapseDoneTasks:false
            });
        }
    }
    hiddenDoneTasks(){
        this.setState({
            collapseDoneTasks:true
        });
    }
    /*根据类型渲染task列表*/
    buildTasks(type){
        const tasks = this.props.tasks || {};
        let temp = [];
        for(let key in tasks){
            /*未完成的任务*/
            if(Number(tasks[key].done==type)){
                temp.unshift(<Task
                    key={key}
                    task={tasks[key]}
                    finishTask={(data)=>this.props.finishTask(data)}
                    Star={(data)=>this.props.starTask(data)}
                    showDetail={()=>this.setState({isEditingTask:tasks[key]})}
                />)
            }
        }
        return type ?
            (<ul>{temp.length ? temp : null}</ul>) :
            (<ul>{temp}</ul>)
    }
    render(){
        const taskDetailProps = {
            task:this.state.isEditingTask,
            list_name:this.props.list_name,
            editTask:this.props.editTask,
            delTask:this.props.delTask,
            collapseDetail:()=>{this.closeTaskDetail()}
        };
        return (<div 
                id="listlite-content" 
                className={this.state.isEditingTask?"panel p-ml active":"panel p-ml"}
            >
            <div>
                <AddTask />
                <div className={this.props.isFetchingTasks?"loading active":'loading'}>
                    <i className={`icon-spinner ${this.props.isFetchingTasks ? 'icon-spin':''}`}></i>
                </div>
                {this.buildTasks(0)}
                {this.state.collapseDoneTasks ?
                    <div>
                        {this.state.isFetchDoneTasks
                            ? <i className="icon-spinner icon-spin" ></i> :
                            <a className="f12 cur-p m-t-sm d-ib"
                               onClick={()=>this.showDoneTasks()}>
                                显示已完成任务
                            </a>
                        }
                    </div>
                     :
                    <div>
                        <hr className="m-t-sm"/>
                        {this.buildTasks(1)}
                        <a
                            className="f12 cur-p m-t-sm d-ib"
                            onClick={()=>this.hiddenDoneTasks()}>
                            隐藏已完成任务
                        </a>
                    </div>
                }
            </div>
            <TaskDetail {...taskDetailProps} />
        </div>)
    }
}
Tasks.defaultProps = {
  list_name:''
};
export default connect(
    (state)=>{
        let current_list=state.listlite.user.current_list,
            lists = state.listlite.lists;
        return {
            hasFetchDone:lists[current_list] ? lists[current_list].hasFetchDone : false,
            tasks:lists[current_list] ? lists[current_list].tasks :  {},
            list_name:lists[current_list] ? lists[current_list].list_name:'',
            current_list:current_list,
            isFetchingTasks:state.listlite.user.isFetchingTasks
        };
    },(dispatch)=>{
        let listliteActions = bindActionCreators(Action.listlite,dispatch);
        return {
            addTask:listliteActions.addTask,
            finishTask:listliteActions.editTask,
            starTask:listliteActions.editTask,
            getTasksDone:listliteActions.getTasksDone,
            editTask:listliteActions.editTask,
            delTask:listliteActions.delTask,
            setFetchTasksStatus:listliteActions.setFetchTasksStatus
        };
    })(Tasks);