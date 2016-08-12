/**
 * Created by Vico on 2016.08.05.
 */
export function dateConvert(timespace){
    const current = new Date(),
        todoTime = new Date(timespace);
    let expired = false;
    if (current.getFullYear() == todoTime.getFullYear() &&
        current.getMonth() == todoTime.getMonth() &&
        current.getDate() == todoTime.getDate()){
        return '今天';
    }
    return todoTime.getFullYear()+'-'+(todoTime.getMonth()+1)+'-'+todoTime.getDate();
}

/*cookie*/
export function setCookie(name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ encodeURI(value) + ";expires=" + exp.toGMTString();
}
export function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}