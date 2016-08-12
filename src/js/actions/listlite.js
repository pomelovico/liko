/**
 * Created by Vico on 2016.07.22.
 */
import * as service from '../services/index';

let localDomain = 'http://localhost/';

/*初始化，获取清单列表*/
export function listInitialize(data){
    return dispatch=>{
        service.sendAjax(
            `${localDomain}php/thinkphp/home/list/index`,
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
            `${localDomain}php/thinkphp/home/list/list_task_todo`,
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
            `${localDomain}php/thinkphp/home/list/list_task_done`,
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
            `${localDomain}php/thinkphp/home/ListType/add`,
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
            `${localDomain}php/thinkphp/home/ListType/edit`,
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
            `${localDomain}php/thinkphp/home/ListType/del`,
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
            `${localDomain}php/thinkphp/home/task/add`,
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
            `${localDomain}php/thinkphp/home/task/edit`,
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
            `${localDomain}php/thinkphp/home/task/del`,
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
            `${localDomain}php/thinkphp/home/task/edit_child`,
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
            `${localDomain}php/thinkphp/home/task/add_child`,
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
            `${localDomain}php/thinkphp/home/task/del_child`,
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
        list_id:list_id
    }
}

/*export function listInitialize(url,data){
    return dispatch=>{
        service.fetchPost(
            'http://localhost/php/thinkphp/home/list/index',
            data).then(res=>{
            console.log(res);
        })
    }
}*/
