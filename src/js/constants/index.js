/**
 * Created by Vico on 2016.07.05.
 */
import * as city from './cityName';
import * as Utils from './utils';

let cityName = city.cityName,
    cityNameWithPinyin = city.cityNameWithPinyin;

/*清单常量*/
const LIST = {
    INDEX:"INDEX",
    SET_CURRENT_LIST:"SET_CURRENT_LIST",

    FETCHING:"FETCHING",
    FETCH_TASKS:"FETCH_TASKS",
    
    TASK_TODO:"TASK_TODO",
    TASK_DONE:"TASK_DONE",
    
    /*清单*/
    CREATE_LIST:"CREATE_LIST",
    EDIT_LIST:"EDIT_LIST",
    DEL_LIST:'DEL_LIST',
    
    /*任务*/
    ADD_TASK:"ADD_TASK",
    EDIT_TASK:"EDIT_TASK",
    DEL_TASK:"DEL_TASK",
    FINISH_TASK:"FINISH_TASK",
    
    /*子任务*/
    EDIT_SUB_TASK:"EDIT_SUB_TASK",
    ADD_SUB_TASK:"ADD_SUB_TASK",
    DEL_SUB_TASK:"DEL_SUB_TASK"

};
/*天气常量*/
const WEATHER = {
    GET_WEATHER:"GET_WEATHER"
};

export  {
    Utils,
    cityName,
    cityNameWithPinyin,
    LIST,
    WEATHER
}