/**
 * Created by Vico on 2016.07.22.
 */
import * as service from '../services/index';

let localDomain = 'http://localhost/';

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

/*export function listInitialize(url,data){
    return dispatch=>{
        service.fetchPost(
            'http://localhost/php/thinkphp/home/list/index',
            data).then(res=>{
            console.log(res);
        })
    }
}*/
