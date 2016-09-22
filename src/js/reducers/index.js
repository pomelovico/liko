/**
 * Created by Vico on 2016.07.04.
 */
import weather from './weather';
import listlite from './listlite';


let initialState = {
    weather:{
        date:'2016.07.05',
        temp:'32℃'
    },
    listlite:{
        lists:{},
        user:{
            default_list:1469068864,
            current_list:1469068864,
            isFetchingTasks:true
        }
    }
};

export default function App(state = initialState,action){
    return {
        weather: weather(state.weather,action),
        listlite: listlite(state.listlite,action)
    };
}