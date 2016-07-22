/**
 * Created by Vico on 2016.07.05.
 */
import fetch from 'isomorphic-fetch';
// var fetch = require( 'isomorphic-fetch');

let baseUrl = "http://121.42.167.30/liko/api/";
// let baseUrl = "http://localhost/api/";

export function fetchPost(url,data){
    return fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }).then(response=>{
        return response.json();
    });
}

import $ from 'jquery';
export function sendAjax(url,data,callback){
    $.ajax({
        url:url,
        data:data,
        type:'post',
        dataType:'json',
        success:function(data){
            callback({
                status:1,
                data:data
            });
        },
        error:function(err){
            callback({
                err:err,
                status:0
            });
        }
    });
}
