/**
 * Created by Leon on 2016/9/8.
 */
var project_ok=false;
$(document).ready(function () {
    if(typeof(FileReader)=="undefined")
    {
        alert(">FileReader==undefined(>_<)");
    }
    $("#project_path_input").click();
    //render_project();

    var project_path_inputer=$("#project_path_input");
    $("#project_path_input").attr("nwworkingdir",delLastDashInPath(global_path));
    $("#project_path_input").change(function() {
        if(this.value=="\\" ||this.value=="/"){
            alert("err");
            clear_project();
            return;
        }
        global_path = delLastDashInPath(this.value)+"\\";
        $("#project_path_input").attr("nwworkingdir",delLastDashInPath(global_path));
        $("#project_path_text").attr("value",global_path);
        global_path_load(global_path, function() {
            project_ok=true;
            render_project();
        },function() {
            project_ok=true;
            render_project();
        },function() {
            project_ok=falses;
            // alert("Function>$('#project_path_input').change>global_path_load> onErr(>_<)");
        });
    });

    $("#project_path_text").click(function() {
        // alert("#project_path_text");
        $("#project_path_input").attr("nwworkingdir",delLastDashInPath(global_path));
        $("#project_path_input").click();
    });

    $("#project_author_text").change(function() {
        global_origin.project.author=this.value;
    });

    $("#project_version_text").change(function() {
        global_origin.project.version=this.value;
    });

    $("#project_describe_text").change(function() {
        global_origin.project.describe=this.value;
    });

    $("#project_reset_button").click(function() {
        clear_project();
    });

    $("#project_next_button").click(function() {
        writeOriginFile(global_path+".origin"
            , function() {
                render_project();
                // alert(global_path);
                // window.open('assest/html/origin.html');
                $("#index_body").load("assest/html/origin.html",function(){
                    $.getScript("assest/js/origin.js");
                });
            },function() {
                // alert(">$('#project_save_button').click>writeOriginFile> onErr(>_<)");
            });
    });
});
function render_project(){
    $("#project_path_text").val(global_path);
    $("#project_author_text").val(global_origin.project.author);
    $("#project_version_text").val(global_origin.project.version);
    var d = new Date();
    var years = d.getFullYear();
    var month = add_zero(d.getMonth()+1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds=add_zero(d.getSeconds());
    global_origin.project.date = years+"_"+month+"_"+days+" "+hours+":"+minutes+":"+seconds;
    $("#project_date_text").val(global_origin.project.date);
    $("#project_describe_text").val(global_origin.project.describe);
    if(project_ok){
        $("#project_next_button").attr("disabled",false);
    }else{
        $("#project_next_button").attr("disabled",true);
    }
}
function clear_project(){
    global_path="";
    global_origin.project.author="";
    global_origin.project.version="";
    global_origin.project.date="";
    global_origin.project.describe="";
    global_origin.images=[];
    global_origin.classes=[];
    global_origin.samples=[];
    $("#project_path_input").val("");
    project_ok=false;
    render_project();
}