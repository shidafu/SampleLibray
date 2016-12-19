/**
 * Created by Leon on 2016/8/19.
 */
// var code_file = "assest/output/default.json";

$(document).ready(function(){
    var str = JSON.stringify(global_origin, null, 2);
    var str_fmt=replaceTextToDiv(str);
    // alert(str);
    $("#code_section_inside").html("");
    $("#code_section_inside").html(str_fmt);
    // if(project_str!=""){
    //     var str = JSON.stringify(global_origin);
    //     project_str_fmt=replaceTextToDiv(project_str);
    //     // alert(project_str_fmt);
    //     $("#code_section_inside").html("");
    //     $("#code_section_inside").html(project_str_fmt);
    // }
    // if(typeof(FileReader)=="undefined")
    // {
    //     alert("FileReader==undefined");
    // }
    // else
    // {
    //     readText(project_path + project_name);
    // }
});
function readText(fileName) {
    htmlobj=$.ajax({url:code_file,async:false});
    var config_info=htmlobj.responseText;
    config_info=replaceTextToDiv(config_info);
    $("#code_section_inside").html(config_info);
}
function readJson(fileName) {
    htmlobj=$.ajax({url:code_file,async:false});
    var config_info=htmlobj.responseText;
    var config =JSON.parse(config_info);
}
function replaceTextToDiv(strIn){
    var regRet1=new RegExp("\n","g");
    var regRet2=new RegExp("\r\n","g");
    var regNop=new RegExp(" ","g");
    var srtOut = strIn.replace(regRet1,"<br>");//<br>
    var srtOut = srtOut.replace(regRet2,"<br>");//<br>
    srtOut = srtOut.replace(regNop,"&nbsp");
    return srtOut;
}
function replaceDivToText(str){
    var reg=new RegExp("<br>","g");
    var reg1=new RegExp("<p>","g");

    str = str.replace(reg,"\r\n");
    str = str.replace(reg1," ");

    return str;
}