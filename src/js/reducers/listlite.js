/**
 * Created by Vico on 2016.07.22.
 */
import objectAssign from 'object-assign';
let initialState = {
    date:'2016.07.05',
    temp:'32℃'
};

function listlite(state, action){
    switch(action.type){
        case Common.LIST.INDEX: console.log(action.data);return action.data;
        default: return state
    }
}

export default listlite;