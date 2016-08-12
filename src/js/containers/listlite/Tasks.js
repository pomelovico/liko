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
            collapseDoneTasks:false/*显示完成的任务，默认不显示*/
        }
    }
    componentWillReceiveProps(nextProps){
        this.closeTaskDetail();
            this.setState({
                collapseDoneTasks:this.props.current_list==nextProps.current_list
            });
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
        }
        this.setState({
            collapseDoneTasks:true
        });
    }
    hiddenDoneTasks(){
        this.setState({
            collapseDoneTasks:false
        });
    }
    /*根据类型渲染task列表*/
    buildTasks(type){
        const tasks = this.props.tasks || [];
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
        return (<ul>{temp}</ul>)
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
                {this.buildTasks(0)}
                {this.state.collapseDoneTasks ?
                    <div>
                        <hr/>
                        {this.buildTasks(1)}
                        <button onClick={()=>this.hiddenDoneTasks()}>
                            hidden done tasks
                        </button>
                    </div> :
                    <div>
                        <button onClick={()=>this.showDoneTasks()}>
                            show done tasks
                        </button>
                    </div>
                }
            </div>
            <TaskDetail {...taskDetailProps} />
        </div>)
    }
}
export default connect(
    (state)=>{
        let current_list=state.listlite.user.current_list,
            lists = state.listlite.lists;
        return {
            hasFetchDone:lists[current_list] ? lists[current_list].hasFetchDone : false,
            tasks:lists[current_list] ? lists[current_list].tasks :  [],
            list_name:lists[current_list] ? lists[current_list].list_name:'',
            current_list:current_list
        };
    },(dispatch)=>{
        let listliteActions = bindActionCreators(Action.listlite,dispatch);
        return {
            addTask:listliteActions.addTask,
            finishTask:listliteActions.editTask,
            starTask:listliteActions.editTask,
            getTasksDone:listliteActions.getTasksDone,
            editTask:listliteActions.editTask,
            delTask:listliteActions.delTask
        };
    })(Tasks);