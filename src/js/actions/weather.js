/**
 * Created by Vico on 2016.07.05.
 */
import * as service from '../services/index';

export function getWeather(data){
    return dispatch=>{
        service.fetchPost('http://localhost/API/weather/getWeather.php',data)
            .then(res=>{
                console.log(res);
                dispatch({
                    type:'GET_WEATHER',
                    data:res['HeWeather data service 3.0'][0]
                });
        })
    }
}

export function setWeather (){
    return {
        type:'SET_WEATHER',
        data:'you are trying to refresh the info of weather'
    }
}
