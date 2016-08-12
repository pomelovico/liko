/**
 * Created by Vico on 2016.07.05.
 */
import objectAssign from 'object-assign';

function weather(state, action){
    switch(action.type){
        case Common.WEATHER.GET_WEATHER: return action.data;
        default: return state
    }
}

export default weather;