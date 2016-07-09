/**
 * Created by Vico on 2016.07.05.
 */
import fetch from 'isomorphic-fetch';
// var fetch = require( 'isomorphic-fetch');

export function fetchPost(url,data){
    return fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }).then(response=>{
        // console.log(response);console.log(response.json())
        return response.json();
    });
}

// fetchPost('http://localhost/apiTest.php');