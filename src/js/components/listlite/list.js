/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';

export default class List extends React.Component{
    constructor(props){
        super(props);
    }
    /*获取当前清单内的任务*/
    getTasks(){
        this.props.setCurrentList(this.props.list.list_id);
        this.props.getTaskTodo({
            list_id:this.props.list.list_id
        });
    }
    render(){
        const list = this.props.list;
        return (
            <div
                className="d-flex flex-j-between"
                onClick = {()=>this.getTasks()}
            >
                <p>{list.list_name}</p>
                <p>{list.todo_count}</p>
            </div>
        );
    }
}