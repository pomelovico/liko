/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';

export default class Task extends React.Component{
    constructor(props){
        super(props);
    }
    dateConvert(time){
        const current = new Date(),
              todoTime = new Date(time);
        let expired = false;
        if (current.getFullYear() == todoTime.getFullYear() &&
            current.getMonth() == todoTime.getMonth() &&
            current.getDate() == todoTime.getDate()){
            return '今天';
        }else if(time > Date.parse(current)){

        }else{

        }
        return todoTime.getFullYear()+'.'+(todoTime.getMonth()+1)+'.'+todoTime.getDate();
    }

    render(){
        const task = this.props.task;
        return (<li className="f14">
            <div className="d-flex flex-j-between">
                <p onClick={()=>{this.props.showDetail()}}>{task.content}</p>
                <p>{this.dateConvert(parseInt(task.due_time))}</p>
                <p>{task.done==1 ? 'finished' : 'todo' }</p>
                <p>{parseInt(task.star) ? 'star' : 'none star' }</p>
            </div>
        </li>);
    }
}