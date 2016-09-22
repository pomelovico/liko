/**
 * Created by Vico on 2016.07.22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/*清单组件*/
// import List from '../../components/listlite/List';
import List from './List';
import ListPanel from './ListPanel';


/*清单列表组件*/
class Lists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditingList:false,
            isFetchingOnce:true
        }
    }
    componentWillMount(){
        this.props.listInitialize(
            {owner:1}
        );
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.isFetchingTasks){
            this.setState({
                isFetchingOnce:false
            });
        }
        this.setState({
            isEditingList:false
        });
    }
    getTasks(id){
        if(!this.props.lists[id].hasFetched){
            this.props.getTaskTodo({list_id:id});
            this.props.setFetchTasksStatus(true);
        }
        this.props.setCurrentList(id);
    }
    render(){
        const {lists,default_list,current_list} = this.props;
        let temp = [];
        for(let i in lists){
            if(lists[i].list_id != default_list){
                temp.push(<li
                    key={i}
                    className={lists[i].list_id == current_list ? "ll-list-item active":"ll-list-item"}
                >
                    <List 
                        list_id={lists[i].list_id}
                        getTasks={()=>this.getTasks(lists[i].list_id)}
                    />
                    <span 
                        onClick={()=>this.setState({isEditingList:lists[i].list_id})}
                        className="ll-list-edit"
                    >
                        <i className=" icon-pencil"></i>
                    </span>
                </li>)
            }
        }
        /*清单列表*/
        return (<div id="listlite-sider-bar" className="panel p-ml">
            <div className={this.state.isFetchingOnce?"loading active":'loading'}>
                <i className={`icon-spinner ${this.state.isFetchingOnce ? 'icon-spin':''}`}></i>
            </div>
            <div className={default_list == current_list ? "ll-list-default active":"ll-list-default"}>
                <List
                    list_id={default_list}
                    getTasks={()=>this.getTasks(default_list)}
                />
            </div>
             <hr/>
            <ul>{temp}</ul>
            <div
                className="p-t-ml cur-p"
                style={{color:"#1fb6ec"}}
                onClick={()=>this.setState({isEditingList:-1})}
            >
                <i className=" icon-plus"></i>&nbsp;&nbsp;创建清单
            </div>

            {/*清单编辑面板*/}
            <ListPanel
                list_id={this.state.isEditingList}
                update={new Date()}
            />
        </div>)
    }
}
export default connect(
    (state)=>{
        return {
            lists:state.listlite.lists,
            default_list:state.listlite.user.default_list,
            current_list:state.listlite.user.current_list
        };
    },(dispatch)=>{
        let listliteActions = bindActionCreators(Action.listlite,dispatch);
        return {
            listInitialize:listliteActions.listInitialize,
            setCurrentList:listliteActions.setCurrentList,
            getTaskTodo:listliteActions.getTaskTodo,
            setFetchTasksStatus:listliteActions.setFetchTasksStatus
        };
    })(Lists);