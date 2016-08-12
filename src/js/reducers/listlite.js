/**
 * Created by Vico on 2016.07.22.
 */
import objectAssign from 'object-assign';


function list(state,action){
    let data = action.data;
    switch(action.type){
        case Common.LIST.EDIT_LIST:
            return objectAssign({}, state, data);
        case Common.LIST.DEL_LIST:
        default: return state;

    }
}
function lists(state,action){
    let temp = objectAssign({}, state),
        data = action.data;
    switch(action.type){
        /*初始清单列表*/
        case Common.LIST.INDEX: return data;

        case Common.LIST.FETCHING:
            if(temp[action.list_id]){
                temp[action.list_id].isFetching=true;
            }
            return temp;

        /*创建,编辑，删除一个清单*/
        case Common.LIST.CREATE_LIST:
            temp[data.list_id] = data;
            return temp;
        case Common.LIST.EDIT_LIST:
            temp[data.list_id] = list(temp[data.list_id],action);
            return temp;
        case Common.LIST.DEL_LIST:
            delete temp[data.list_id];
            return temp;

        case Common.LIST.TASK_TODO:
            temp[data.list_id] = objectAssign(
                {},
                temp[data.list_id],
                {
                    tasks: objectAssign({},temp[data.list_id].tasks,action.data.tasks),
                    hasFetched:true
                }
            );
            return temp;
        case Common.LIST.TASK_DONE:
            temp[data.list_id] = objectAssign(
                {},
                temp[data.list_id],
                {
                    tasks: objectAssign({},temp[data.list_id].tasks,action.data.tasks),
                    hasFetchDone:true
                }
            );
            return temp;

        case Common.LIST.ADD_TASK:
        case Common.LIST.DEL_TASK:
        case Common.LIST.EDIT_TASK:
            temp[data.list_id].tasks =  tasks(temp[data.list_id].tasks , action);
            var c = 0;
            for(let k in temp[data.list_id].tasks){
                Number(temp[data.list_id].tasks[k]['done']) || c++ ;
            }
            temp[data.list_id].todo_count = c;
            return temp;

        case Common.LIST.ADD_SUB_TASK:
        case Common.LIST.DEL_SUB_TASK:
        case Common.LIST.EDIT_SUB_TASK:
            var task = temp[Common.Utils.getCookie('current_list_id')].tasks[data.pid];
            task['_child'] =  subTasks(task['_child'] , action);
            return temp;

        default: return state;
    }

}
function tasks(state,action){
    let temp = objectAssign({}, state),
        data = action.data;
    switch(action.type){
        /*未完成的任务*/
        case Common.LIST.ADD_TASK:
            temp[data.task_id] = data;
            return temp;
        case Common.LIST.DEL_TASK:
            delete temp[data.task_id];
            return temp;
        case Common.LIST.EDIT_TASK:
            temp[data.task_id] = objectAssign({}, temp[data.task_id] , data);
            return temp;
        default: return state;
    }
}
function subTasks(state,action){
    let temp = objectAssign({},state),
        data = action.data;
    switch(action.type){
        case Common.LIST.EDIT_SUB_TASK:
            temp[data.cid.toString()].content = data.content;
            return temp;
        case Common.LIST.DEL_SUB_TASK:
            delete temp[data.cid.toString()];
            return temp;
        case Common.LIST.ADD_SUB_TASK:
            temp[data.cid.toString()] = data;
            return temp;
        default:return state;
    }
}
function user(state,action){
    let temp = objectAssign({}, state),
        data = action.data;
    switch(action.type){
        /*设置当前清单*/
        case Common.LIST.SET_CURRENT_LIST:
            temp.current_list = parseInt(data);
            return temp;
        /*删除一个清单*/
        case Common.LIST.DEL_LIST:
            temp.current_list = temp.default_list;
            return temp;
        /*创建一个清单*/
        case Common.LIST.CREATE_LIST:
            temp.current_list = parseInt(data.list_id);
            return temp;
        default: return state;
    }
}

export default function listlite(state, action){
    let temp = objectAssign({},state);
    for(let k in temp.lists){
        temp.lists[k].isFetching = false;
    }
    return {
        lists:lists(temp.lists, action),
        user:user(temp.user, action)
    }
}