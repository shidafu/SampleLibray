/**
 * Created by Leon on 2016/9/7.
 */
function add_zero(temp)
{
    if(temp<10) return "0"+temp;
    else return temp;
}
function delLastDashInPath(fullPath){
    var fullPath2 = fullPath;
    if(fullPath.lastIndexOf('/')== fullPath.length-1 || fullPath.lastIndexOf('\\')== fullPath.length-1){
        fullPath2=fullPath.substring(0,fullPath.length-1);
    }
    fullPath2=fullPath2.replaceAll('\\','/');
    return fullPath2;
}
