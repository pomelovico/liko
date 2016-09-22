/**
 * Created by Vico on 2016.07.25.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TaskChild from './TaskChild';
import Input from '../../components/listlite/Input';

import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';

class TaskDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content:props.task?props.task.content:'',
            due_time:props.task?props.task.due_time:'',
            isEdit:false,
            isDel:false,
            expanded:false
        }
    }
    isSync(key){
        this.setState({
            [key]:true
        });
    }
    componentDidMount(){
        let addTaskInput = document.getElementById('ll-addTask-input');
        setTimeout(()=>{
            addTaskInput.addEventListener('focus',e=>this.props.collapseDetail());
        },0)
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            content:nextProps.task?nextProps.task.content:'',
            due_time:nextProps.task?nextProps.task.due_time:'',
            expanded:nextProps.task ? true: false,
            isEdit:false,
            isDel:false
        });
    }
    editTaskContent(){
        if(this.state.content!=this.props.task.content || this.state.due_time!=this.props.task.due_time){
            this.props.editTask({
                content:this.state.content,
                due_time:this.state.due_time,
                task_id:this.props.task.task_id
            });
            this.isSync('isEdit');
        }else{
            this.props.collapseDetail();
        }
    }
    deleteTask(id){
        this.props.delTask({task_id:id});
        this.isSync('isDel');
    }
    setDueTime(timeStamp){
        this.setState({
            due_time:timeStamp
        })
    }
    render(){
        const task = this.props.task || {};

        return this.state.hidden ? null : (<div className={this.state.expanded?"ll-taskdetail-panel active":"ll-taskdetail-panel"}>
            <h3 style={{fontWeight:'300'}}>清单——{this.props.list_name}</h3>
            <div className="pos-r task-content">
                <Input
                    defaultClass="ll-input"
                    defaultValue={task.content}
                    onInputFieldChange={(content)=>this.setState({content:content})}
                />
                <div className="pos-a">
                    <DateField
                        minDate={new Date()}
                        dateFormat="YYYY-MM-DD"
                        defaultValue={new Date(parseInt(task.due_time))}
                        onChange={(ds, obj)=>this.setDueTime(obj.dateMoment.unix()*1000)}
                    />
                </div>
            </div>
            {task.task_id?<TaskChild pid={task.task_id} />:null}
            <p>
                <button
                    onClick={()=>this.deleteTask(task.task_id)}
                ><i className={this.state.isDel?"icon-spinner icon-spin":"icon-trash"}></i></button>
                <button
                    onClick={()=>this.editTaskContent()}
                ><i className={this.state.isEdit?"icon-spinner icon-spin":"icon-ok"}></i></button>
                <button
                    onClick={()=>this.props.collapseDetail()}
                    style={{ position: 'absolute',top: '8px',right: '12px'}}
                ><i className="icon-remove"></i></button>
            </p>
        </div>)
    }
}
TaskDetail.defaultProps = {
    list_name:'',
    task:{}
};
export default TaskDetail