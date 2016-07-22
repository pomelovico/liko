/**
 * Created by Vico on 2016.07.05.
 */
import objectAssign from 'object-assign';
let initialState = {
    date:'2016.07.05',
    temp:'32℃'
};

function weather(state, action){
    switch(action.type){
        case Common.WEATHER.GET_WEATHER: return state.lists = action.data;
        default: return state
    }
}

export default weather;