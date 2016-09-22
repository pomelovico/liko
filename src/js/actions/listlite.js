/**
 * Created by Vico on 2016.07.22.
 */
import * as service from '../services/index';

let localDomain = 'http://localhost/php/thinkphp/';
// let localDomain = 'http://121.42.167.30/liko/api/';
const url_restful = {
    index:'home/list/index',
    gettasktodo:'home/list/list_task_todo',
    gettaskdone:'home/list/list_task_done',
    addlist:'home/ListType/add',
    editlist:'home/ListType/edit',
    dellist:'home/ListType/del',
    addtask:'home/task/add',
    edittask:'home/task/edit',
    deltask:'home/task/del',
    editchild:'home/task/edit_child',
    addchild:'home/task/add_child',
    delchild:'home/task/del_child'
}
const url_common = {
    index:'?m=Home&c=list&a=index',
    gettasktodo:'?m=home&c=list&a=list_task_todo',
    gettaskdone:'?m=home&c=list&a=list_task_done',
    addlist:'?m=home&c=ListType&a=add',
    editlist:'?m=home&c=ListType&a=edit',
    dellist:'?m=home&c=ListType&a=del',
    addtask:'?m=home&c=task&a=add',
    edittask:'?m=home&c=task&a=edit',
    deltask:'?m=home&c=task&a=del',
    editchild:'?m=home&c=task&a=edit_child',
    addchild:'?m=home&c=task&a=add_child',
    delchild:'?m=home&c=task&a=del_child'
}
const url = url_common;
// const url = url_restful;
/*初始化，获取清单列表*/
export function listInitialize(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.index}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.INDEX,
                        data:res.data
                    });
                }
            }
        );
    }
}


export function setCurrentList(data){
    return {
        type:Common.LIST.SET_CURRENT_LIST,
        data:data
    }
}
/*获取指定清单里的未完成任务*/
export function getTaskTodo(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.gettasktodo}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.TASK_TODO,
                        data:res.data
                    });
                }
            }
        );
    }
}
/*获取指定清单里的未完成任务*/
export function getTasksDone(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.gettaskdone}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.TASK_DONE,
                        data:res.data
                    });
                }
            }
        );
    }
}
/*创建一个清单*/
export function addList(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.addlist}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.CREATE_LIST,
                        data:res.data
                    });
                }
            }
        );
    }
}
/*编辑一个清单*/
export function editList(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.editlist}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.EDIT_LIST,
                        data:res.data
                    });
                }
            }
        );
    }
}
/*删除一个清单*/
export function delList(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.dellist}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.DEL_LIST,
                        data:res.data
                    });
                }
            }
        );
    }
}
/*创建一个任务*/
export function addTask(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.addtask}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.ADD_TASK,
                        data:res.data
                    });
                }
            }
        );
    }
}

/*编辑一个任务*/
export function editTask(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.edittask}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.EDIT_TASK,
                        data:res.data
                    });
                }
            }
        );
    }
}

/*删除一个任务*/
export function delTask(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.deltask}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.DEL_TASK,
                        data:res.data
                    });
                }
            }
        );
    }
}

/*编辑一个子任务*/
export function editSubTask(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.editchild}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.EDIT_SUB_TASK,
                        data:res.data
                    });
                }
            }
        );
    }
}
export function addSubTask(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.addchild}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.ADD_SUB_TASK,
                        data:res.data
                    });
                }
            }
        );
    }
}
export function delSubTask(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}${url.delchild}`,
            data,
            function(res){
                if(res.status){
                    dispatch({
                        type:Common.LIST.DEL_SUB_TASK,
                        data:res.data
                    });
                }
            }
        );
    }
}

export function Fetching(list_id){
    return {
        type:Common.LIST.FETCHING,
        data:list_id
    }
}
export function setFetchTasksStatus(flag){
    return {
        type:Common.LIST.FETCH_TASKS,
        data:flag
    }
}

/*export function listInitialize(url,data){
    return dispatch=>{
        service.fetchPost(
            'http://localhost/php/home/list/index',
            data).then(res=>{
            console.log(res);
        })
    }
}*/
