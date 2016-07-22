/**
 * Created by Vico on 2016.07.05.
 */
import * as service from '../services/index';

export function getWeather(data){
    return dispatch=>{
        service.fetchPost('http://121.42.167.30/liko/api/weather/getWeather.php',data)
            .then(res=>{
                console.log(res);
                dispatch({
                    type:Common.WEATHER.GET_WEATHER,
                    data:res['HeWeather data service 3.0'][0]
                });
        })
    }
}
