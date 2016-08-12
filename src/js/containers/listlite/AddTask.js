/**
 * Created by Vico on 2016.07.25.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Input from '../../components/listlite/Input';

import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';

export class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            due_time:Date.parse(new Date()),
            content:''
        };
    }
    setDueTime(ds, obj){
        this.setState({
            due_time:obj.dateMoment.unix()*1000
        });
    }
/*    componentWillReceiveProps(nextProps){
     console.log(nextProps);
     }*/
/*    shouldComponentUpdate(nextProps,nextState){
        return this.props.current_list != nextProps.current_list ||
            this.props.isFetching!=nextProps.isFetching;
    }*/
    addTask(){
        if(this.state.content){
            this.props.addTask({
                content:this.state.content,
                list_id:this.props.current_list,
                due_time:this.state.due_time,
                star:0,
                done:0,
                create_time:Date.parse(new Date())
            });
            this.props.Fetching(this.props.current_list);
        }
    }
    render(){
        /*今日时间戳*/
        const todayStamp = (new Date().getTime()/1000000).toFixed(0) * 1000000;
        return(<div>
            <div className="ll-add-task d-t">
                <div className="task-content d-tc">
                    <Input
                        placeholder="添加任务"
                        defaultID="ll-addTask-input"
                        onInputFieldChange={(content)=>this.setState({content:content})}
                        onEnterKeyDown={(content)=>{this.addTask(content)}}
                        onKeyDownClearField={true}
                        collapseOnDateClick={false}
                    />
                </div>
                <div className="task-date d-tc">
                    <DateField
                        minDate={new Date()}
                        dateFormat="YYYY-MM-DD"
                        defaultValue={new Date(todayStamp)}
                        onChange={(ds, {dateMoment, ts})=>this.setDueTime(ds, {dateMoment, ts})}
                    />
                </div>
                <div className="d-tc" onClick={()=>this.addTask()}>
                    <div className="task-add-btn">
                        <i className={this.props.isFetching ? "icon-spinner icon-spin": "icon-ok"}></i>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default connect(
    (state)=>{
        let cur_l = state.listlite.user.current_list,
            lists = state.listlite.lists;
        return {
            current_list:cur_l,
            isFetching:lists[cur_l] ? lists[cur_l].isFetching : false
        }
    },
    (dispatch)=>{
        let listLiteActions = bindActionCreators(Action.listlite,dispatch);
        return {
            addTask:listLiteActions.addTask,
            Fetching:listLiteActions.Fetching
        }
    })(AddTask);