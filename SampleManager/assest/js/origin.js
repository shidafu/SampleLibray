/**
 * Created by Leon on 2016/8/23.
 */
var project_ok=true;
var win_max = false;
var win_hide_nav_detail = "111";

var origin_path = global_path;
var origin_sampling = false;
var img_ratio = 1.0;
// var image_showed = 0;
var smp_w = 32;
var smp_h = 32;
var img_x = 0;
var img_y = 0;
var smp_c = 0;
$(document).ready(function(){
    // alert(global_path);
    var gui = require('nw.gui');
    var win = gui.Window.get();
    const win_x_dft = win.x;
    const win_y_dft = win.y;
    const win_w_dft = win.width;
    const win_h_dft = win.height;

    var menu_path_inputer=$("#menu_path_input");
    $("#menu_path_input").attr("nwworkingdir",delLastDashInPath(global_path));
    $("#menu_path_input").change(function() {
        if(this.value=="\\" ||this.value=="/"){
            alert("Invalid path(>_<)");
            clear_project();
            return;
        }
        global_path = delLastDashInPath(this.value)+"/";
        $("#menu_path_input").attr("nwworkingdir",delLastDashInPath(global_path));
        $("#menu_path_input").attr("value",global_path);
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
    $("#menu_open").click(function(){
        $("#menu_path_input").attr("nwworkingdir",delLastDashInPath(global_path));
        $("#menu_path_input").click();
    });
    $("#menu_save").click(function(){
        writeOriginFile(global_path+".origin"
            , function() {
                alert("Project saved(^_^)");
                render_project();
            },function() {
                //alert(">$('#project_save_button').click>writeOriginFile> onErr(>_<)");
            });
    });

    $("#menu_show_hide_nav").click(function(){
        switch (win_hide_nav_detail){
            case "111":
                $("#body_nav").removeClass("nav_container_111");
                $("#body_nav").addClass("nav_container_011");
                $("#body_section").removeClass("section_container_111");
                $("#body_section").addClass("section_container_011");
                $("#body_detail").removeClass("detail_container_111");
                $("#body_detail").addClass("detail_container_011");
                win_hide_nav_detail = "011";
                break;
            case "011":
                $("#body_nav").removeClass("nav_container_011");
                $("#body_nav").addClass("nav_container_111");
                $("#body_section").removeClass("section_container_011");
                $("#body_section").addClass("section_container_111");
                $("#body_detail").removeClass("detail_container_011");
                $("#body_detail").addClass("detail_container_111");
                win_hide_nav_detail = "111";
                break;
            case "110":
                $("#body_nav").removeClass("nav_container_110");
                $("#body_nav").addClass("nav_container_010");
                $("#body_section").removeClass("section_container_110");
                $("#body_section").addClass("section_container_010");
                $("#body_detail").removeClass("detail_container_110");
                $("#body_detail").addClass("detail_container_010");
                win_hide_nav_detail = "010";
                break;
            case "010":
                $("#body_nav").removeClass("nav_container_010");
                $("#body_nav").addClass("nav_container_110");
                $("#body_section").removeClass("section_container_010");
                $("#body_section").addClass("section_container_110");
                $("#body_detail").removeClass("detail_container_010");
                $("#body_detail").addClass("detail_container_110");
                win_hide_nav_detail = "110";
                break;
            default:
                break;
        }
    });
    $("#menu_show_hide_detail").click(function(){
        switch (win_hide_nav_detail){
            case "111":
                $("#body_nav").removeClass("nav_container_111");
                $("#body_nav").addClass("nav_container_110");
                $("#body_section").removeClass("section_container_111");
                $("#body_section").addClass("section_container_110");
                $("#body_detail").removeClass("detail_container_111");
                $("#body_detail").addClass("detail_container_110");
                win_hide_nav_detail = "110";
                break;
            case "110":
                $("#body_nav").removeClass("nav_container_110");
                $("#body_nav").addClass("nav_container_111");
                $("#body_section").removeClass("section_container_110");
                $("#body_section").addClass("section_container_111");
                $("#body_detail").removeClass("detail_container_110");
                $("#body_detail").addClass("detail_container_111");
                win_hide_nav_detail = "111";
                break;
            case "011":
                $("#body_nav").removeClass("nav_container_011");
                $("#body_nav").addClass("nav_container_010");
                $("#body_section").removeClass("section_container_011");
                $("#body_section").addClass("section_container_010");
                $("#body_detail").removeClass("detail_container_011");
                $("#body_detail").addClass("detail_container_010");
                win_hide_nav_detail = "010";
                break;
            case "010":
                $("#body_nav").removeClass("nav_container_010");
                $("#body_nav").addClass("nav_container_011");
                $("#body_section").removeClass("section_container_010");
                $("#body_section").addClass("section_container_011");
                $("#body_detail").removeClass("detail_container_010");
                $("#body_detail").addClass("detail_container_011");
                win_hide_nav_detail = "011";
                break;
            default:
                break;
        }
    });


    var out_path=global_path;
    var menu_path_outputer=$("#menu_path_output");
    $("#menu_path_output").attr("nwworkingdir",delLastDashInPath(global_path));
    $("#menu_path_output").change(function() {
        if(global_origin.samples.length<1){
            alert("No sample exist(?_?)");
            return;
        }
        if(this.value=="\\" ||this.value=="/"){
            alert("Invalid path(>_<)");
            clear_project();
            return;
        }
        out_path = delLastDashInPath(this.value)+"/";
        $("#menu_path_output").attr("nwworkingdir",delLastDashInPath(out_path));
        $("#menu_path_output").attr("value",out_path);

        var alert_busy_obj = undefined;
        alert_busy_obj =alert_busy('assest/html/alert_busy.html');
        writeSampleFiles(out_path, function() {
            if(alert_busy_obj!=undefined){
                alert_busy_close(alert_busy_obj);
            }
        });
    });
    $("#menu_out").click(function(){
        $("#menu_path_output").attr("nwworkingdir",delLastDashInPath(out_path));
        $("#menu_path_output").click();
    });

    $("#menu_exit").click(function(){
        win.close();
    });
    $("#menu_max").click(function(){
        if(!win_max){
            win.maximize();
            win_max=true;
            win_min=false;
        }else{
            win.restore();
            win_max=false;
            win_min=false;
        }
    });
    $("#menu_min").click(function(){
        win.minimize();
    });

    // render_body_nav_img_list(0,function(){
    //     // clear_body_section_view();
    //     $("#body_nav_img_list").change();
    //     // var nav_list =document.getElementById("body_nav_img_list");
    //     // var selectAll=false;
    //     // for (var item_index in nav_list.options){
    //     //     if(nav_list.options[item_index].text==undefined){
    //     //         continue;
    //     //     }
    //     //     if (nav_list.options[item_index].selected || selectAll){
    //     //         if(nav_list.options[item_index].value!="root"){
    //     //             // alert(nav_list.options[item_index].text);
    //     //             render_body_section_view(
    //     //                 global_path+ global_origin.images[nav_list.options[item_index].value].name,
    //     //                 img_ratio
    //     //             );
    //     //         }else{
    //     //             selectAll=true;
    //     //         }
    //     //     }
    //     // }
    // });
    // // prevent default behavior from changing page on dropped file
    // window.ondragover = function(e) { e.preventDefault(); return false };
    // // NOTE: ondrop events WILL NOT WORK if you do not "preventDefault" in the ondragover event!!
    // window.ondrop = function(e) { e.preventDefault(); return false };
    // var holder = document.getElementById('body_nav_control');
    // holder.ondrop = function (e) {
    //     e.preventDefault();
    //
    //     var file = e.dataTransfer.files[0],
    //         reader = new FileReader();
    //     reader.onload = function (event) {
    //         console.log(event.target);
    //     };
    //     console.log(file);
    //     reader.readAsDataURL(file);
    //
    //     return false;
    // };

    var read_img_inputer = document.querySelector("#read_img_input");
    $("#read_img_input").attr("nwworkingdir",delLastDashInPath(origin_path));
    $("#read_img_input").change(function() {
        // var origin_name,origin_ext;
        // [origin_path,origin_name,origin_ext]=sapratePath(this.value);
        // if(origin_ext.toUpperCase()!=".BMP"
        //     && origin_ext.toUpperCase()!=".JPG"
        //     && origin_ext.toUpperCase()!=".PNG"){
        //     alert(">$('#origin_read_input').change> Invalid project file type(>_<)");
        //     return;
        // }
        // //read file code here:
        // addImage(origin_path+origin_name+origin_ext,function(index){
        //     render_body_nav_img_list(-1,function(){
        //         $("#body_nav_img_list").change();
        //     });
        // },function(){
        //     //alert(">$('#origin_read_input').change>addImage> "+ origin_path + origin_name+origin_ext +" error(>_<)");
        // });
        var fileList = this.files;
        var filePathList = [];
        for(var i=0;i<fileList.length;i++){
            filePathList.push(fileList[i].path);
        }
        //Asynchronous task to synchronous:
        // for(var i=0;i<fileList.length;i++){
        //     var origin_name,origin_ext;
        //     [origin_path,origin_name,origin_ext]=sapratePath(fileList[i].path);
        //     if(origin_ext.toUpperCase()!=".BMP"
        //         && origin_ext.toUpperCase()!=".JPG"
        //         && origin_ext.toUpperCase()!=".PNG"){
        //         alert(">$('#origin_read_input').change> Invalid project file type(>_<)");
        //         continue;
        //     }
        //     //read file code here:
        //     addImage(origin_path+origin_name+origin_ext,function(index){
        //         render_body_nav_img_list(index+1,function(){
        //             clear_body_section_view();
        //             render_body_section_view(
        //                 global_path+global_origin.images[index].name,
        //                 index,img_ratio
        //             );
        //         });
        //     },function(){
        //         //alert(">$('#origin_read_input').change>addImage> "+ origin_path + origin_name+origin_ext +" error(>_<)");
        //     });
        // }
        //Synchronous:
        var alert_busy_obj = undefined;
        if(filePathList.length>1){
            // alert("Adding image files, please waite(+_-)");
            var alert_busy_obj =alert_busy('assest/html/alert_busy.html');
        }
        var returns=[];
        async_in_order(filePathList,returns,addImage,function(){
        },function(){
        },function(returns){
            // alert(returns);
            var added=0;
            for(var i in returns){
                if(returns[i]==true){
                    added=added+1;
                }
            }
            if(alert_busy_obj!=undefined){
                alert_busy_close(alert_busy_obj);
            }
            // alert(added);
            // render_body_nav_img_list(-2,function(){
            //     alert("Added:"+added+"in:");
            //     for(var i=global_origin.images.length-added;i<global_origin.images.length;i++){
            //         $("#body_nav_img_list").options[i+1].selected=true;
            //     }
            //     $("#body_nav_img_list").change();
            // });

            render_body_nav_img_list(-1,function(){
                // var nav_list =document.getElementById("body_nav_img_list");
                // for(var i=global_origin.images.length-added; i<global_origin.images.length; i++){
                //     nav_list.options[i+1].selected=true;
                // }
                $("#body_nav_img_list").change();
            });
        });
    });
    $("#add_img_button").click(function() {
        $("#read_img_input").attr("nwworkingdir",delLastDashInPath(origin_path));
        // alert(">$('#origin_nav_add_button').click>");
        read_img_inputer.click();
    });
    $("#del_img_button").click(function() {
        if(!confirm("Confirm delete these image(?_?)")){
            return;
        }
        var fileIndexList = [];
        var nav_list =document.getElementById("body_nav_img_list");
        var selectNum=0;
        for (var item_index in nav_list.options){
            if(nav_list.options[item_index].text == undefined
                ||nav_list.options[item_index].text == ""){
                continue;
            }
            if (nav_list.options[item_index].selected){
                if(nav_list.options[item_index].value!="root"){
                    fileIndexList.push(nav_list.options[item_index].value);
                }
            }
        }
        var returns=[];
        var alert_busy_obj = undefined;
        if(fileIndexList.length>1){
            // alert("Deleting image files, please waite(+_-)");
            var alert_busy_obj =alert_busy('assest/html/alert_busy.html');
        }
        async_in_order(fileIndexList,returns,delImage,function(){
            },function(){
            },function(returns){
                if(alert_busy_obj!=undefined){
                    alert_busy_close(alert_busy_obj);
                }
                render_body_nav_img_list(-1,function(){
                    $("#body_nav_img_list").change();
            });
        });


        // document.getElementById("project_read_input").=project_name;
        // project_read_inputer.click();
        // var nav_list =document.getElementById("body_nav_img_list");
        // var selectNum=0;
        // for (var item_index in nav_list.options){
        //     if(nav_list.options[item_index].text == undefined
        //         ||nav_list.options[item_index].text == ""){
        //         continue;
        //     }
        //     if (nav_list.options[item_index].selected){
        //         if(nav_list.options[item_index].value!="root"){
        //             delImage(nav_list.options[item_index].value,function(){
        //                 render_body_nav_img_list(-2,function(){
        //                     $("#body_nav_img_list").change();
        //                 });
        //             },function(){
        //
        //             });
        //         }
        //     }
        // }
        // delImage();
    });
    $("#body_nav_img_list").change(function() {
        // alert("body_nav_img_list>change");
        clear_body_section_view();
        var nav_list =document.getElementById("body_nav_img_list");
        var selectAll=false;
        var selectNum=0;
        for (var item_index in nav_list.options){
            if(nav_list.options[item_index].text == undefined
                ||nav_list.options[item_index].text == ""){
                continue;
            }
            if (nav_list.options[item_index].selected || selectAll){
                if(nav_list.options[item_index].value!="root"){
                    selectNum = selectNum+1;
                }else{
                    selectAll = false;
                }
            }
        }
        for (var item_index in nav_list.options){
            if(nav_list.options[item_index].text == undefined
                ||nav_list.options[item_index].text == ""){
                continue;
            }
            if (nav_list.options[item_index].selected || selectAll){
                if(nav_list.options[item_index].value!="root"){
                    // alert(global_path+global_origin.images[nav_list.options[item_index].value].name);
                    render_body_section_view_from_global(
                        parseInt(nav_list.options[item_index].value),////////
                        // global_path+global_origin.images[nav_list.options[item_index].value].name,
                        img_ratio,selectNum>1,function(){
                            // alert(image_showed+" "+current_image_index);
                            if(selectNum==1){
                                render_body_detail_smp(-1,function(){
                                    render_body_section_view_smp();
                                });
                            }else{
                                clear_body_detail_smp();
                            }
                        });
                    // alert(global_path+global_origin.images[nav_list.options[item_index].value].name);
                    // render_body_detail_smp();
                }else{
                    selectAll=true;
                }
            }
        }
   });

    render_body_nav_img_list(-1,function(){
        $("#body_nav_img_list").change();
    });

    $("#img_ratio").change(function() {
        var ratio_list =document.getElementById("img_ratio");
        img_ratio = ratio_list.value;
        // alert(img_ratio);
        $("#body_nav_img_list").change();
    });

    var img_x_ctrl = document.getElementById("img_x");
    $("#img_x").attr("value",img_x);
    $("#img_x").change(function() {
        img_x = img_x_ctrl.value;
    });

    var img_y_ctrl = document.getElementById("img_y");
    $("#img_y").attr("value",img_y);
    $("#img_y").change(function() {
        img_y = img_y_ctrl.value;
    });

    var smp_w_ctrl = document.getElementById("smp_w");
    $("#smp_w").attr("value",smp_w);
    $("#smp_w").change(function() {
        smp_w = smp_w_ctrl.value;
    });

    var smp_h_ctrl = document.getElementById("smp_h");
    $("#smp_h").attr("value",smp_h);
    $("#smp_h").change(function() {
        smp_h = smp_h_ctrl.value;
    });

    var smp_c_ctrl  = document.getElementById("body_detail_smp_list");
    render_body_detail_smp(-1,function(){});
    $("#body_detail_smp_list").change(function() {
        // alert(smp_c_ctrl.value);
        if(smp_c_ctrl.value=="all"){
            current_class_index=-1;
            for(var i in current_samples_showed){
                current_samples_showed[i]=1;
            }
            render_body_section_view_smp();
        }else if(smp_c_ctrl.value.substr(0,6)=="class_"){
            var class_index_slc=parseInt(smp_c_ctrl.value.substr(6,smp_c_ctrl.value.length-6));
            if(class_index_slc>=0&& class_index_slc<global_origin.classes.length){
                current_class_index=class_index_slc;
                for(var i in current_samples_showed){
                    if(current_samples[i].class-1==current_class_index){
                        current_samples_showed[i]=1;

                    }else{
                        current_samples_showed[i]=0;
                    }
                }
                render_body_section_view_smp();
            }
            // smp_c = global_origin.classes.length;
        }else{
            var smp_index_slc=parseInt(smp_c_ctrl.value);
            if(smp_index_slc>=0&& smp_index_slc<current_samples.length){
                var class_index_slc=current_samples[smp_index_slc].class-1;
                if(class_index_slc>=0&& class_index_slc<global_origin.classes.length){
                    current_class_index=class_index_slc;
                    for(var i in current_samples_showed){
                        if(i==smp_index_slc){
                            current_samples_showed[i]=1;

                        }else{
                            current_samples_showed[i]=0;
                        }
                    }
                    // alert(current_class_index);
                    render_body_section_view_smp();
                }
            }
            // smp_c = smp_c_ctrl.value;
        }
    });
    var smp_c_ctrl_menu = new gui.Menu();
    smp_c_ctrl_menu.append(new gui.MenuItem({ label: 'Delete',click: function(){
        if(confirm("Confirm delete sample(?_?)")){
            alert(smp_c_ctrl.value);
            if(smp_c_ctrl.value=="all"){
                current_class_index=-1;
                for(var i in current_samples_showed){
                    current_samples_showed[i]=1;
                }
                render_body_section_view_smp();
            }else if(smp_c_ctrl.value.substr(0,6)=="class_"){
                var class_index_slc=parseInt(smp_c_ctrl.value.substr(6,smp_c_ctrl.value.length-6));
                if(class_index_slc>=0&& class_index_slc<global_origin.classes.length){
                    current_class_index=class_index_slc;
                    for(var i in current_samples_showed){
                        if(current_samples[i].class-1==current_class_index){
                            current_samples_showed[i]=1;

                        }else{
                            current_samples_showed[i]=0;
                        }
                    }
                    render_body_section_view_smp();
                }
                // smp_c = global_origin.classes.length;
            }else{
                var smp_index_slc=parseInt(smp_c_ctrl.value);
                if(smp_index_slc>=0&& smp_index_slc<current_samples.length){
                    var class_index_slc=current_samples[smp_index_slc].class-1;
                    if(class_index_slc>=0&& class_index_slc<global_origin.classes.length){
                        current_class_index=class_index_slc;
                        for(var i in current_samples_showed){
                            if(i==smp_index_slc){
                                current_samples_showed[i]=1;

                            }else{
                                current_samples_showed[i]=0;
                            }
                        }
                        // alert(current_class_index);
                        render_body_section_view_smp();
                    }
                }
                // smp_c = smp_c_ctrl.value;
            }
        }
    }}));
    smp_c_ctrl_menu.append(new gui.MenuItem({ label: 'New class',click: function(){
        addClass();
        render_body_detail_smp(-1,function(){
            render_body_section_view_smp();
        });
    }}));
    $('#body_detail_smp_list').mousedown(function(e){
        if(3 == e.which){
            e.preventDefault();
            smp_c_ctrl_menu.popup(e.pageX,e.pageY);
            return false;
        }else if(1 == e.which){
        }
    });
    // $("#origin_section_sample_button").click(function() {
    //     alert("$('#origin_section_sample_button')>click>");
    //     console.log("$('#origin_section_sample_button')>click>");
    //     // document.getElementById("project_read_input").=project_name;
    //     origin_sampling=~origin_sampling;
    //     if(origin_sampling){
    //         alert("origin_sampling");
    //         $("#origin_section_sample_button").attr("value","In Sampling");
    //     }else{
    //         $("#origin_section_sample_button").attr("value","Add Sample");
    //     }
    // });
});

function clear_project(){
//            global_path="";
//            global_origin.project.author="";
//            global_origin.project.version="";
//            global_origin.project.date="";
//            global_origin.project.describe="";
//            global_origin.images=[];
//            global_origin.classes=[];
//            global_origin.samples=[];
//            $("#project_path_input").val("");
//            project_ok=false;
//            render_project();
}
function render_project(){
//            $("#project_path_text").val(global_path);
//            $("#project_author_text").val(global_origin.project.author);
//            $("#project_version_text").val(global_origin.project.version);
//            var d = new Date();
//            var years = d.getFullYear();
//            var month = add_zero(d.getMonth()+1);
//            var days = add_zero(d.getDate());
//            var hours = add_zero(d.getHours());
//            var minutes = add_zero(d.getMinutes());
//            var seconds=add_zero(d.getSeconds());
//            global_origin.project.date = years+"_"+month+"_"+days+" "+hours+":"+minutes+":"+seconds;
//            $("#project_date_text").val(global_origin.project.date);
//            $("#project_describe_text").val(global_origin.project.describe);
//            if(project_ok){
//                $("#project_next_button").attr("disabled",false);
//            }else{
//                $("#project_next_button").attr("disabled",true);
//            }
    render_body_nav_img_list(-1,function(){
        $("#body_nav_img_list").change();
    });
}

function clear_body_section_view() {
    var body_section_view_ctrl=document.getElementById("body_section_view");
    body_section_view_ctrl.innerHTML = "";
    current_image_index=-1;
    image_showed=0;
}
function render_body_section_view_from_global(imageIndex,ratio,multimode,onrender) {
    // alert(">render_body_section_view_from_global>");
    if(imageIndex<0 || imageIndex>=global_origin.images.length){
        alert(">render_body_section_view_from_global> error imageIndex(>_<)");
        return;
    }
    var imageFullPath = global_path + global_origin.images[imageIndex].name;
    if(ratio==undefined) ratio=1.0;
    if(multimode==false){
        var body_section_view_ctrl=document.getElementById("body_section_view");
        body_section_view_ctrl.innerHTML = "";
        var appendStr=
            "<p class=\"myNoBorder\">" +
            "<canvas id=image_layer" +" tabindex='0' alt='Image:'"+
            " name='body_section_view_canvas' class='myCanvas myNoBorder'" +
            " style='position:absolute; left:0; top:0; z-index:0;'></canvas>" +
            "<canvas id=mask_layer" +" tabindex='0' alt='Image:'"+
            " name='body_section_view_canvas' class='myCanvas myNoBorder'"+
            " style='position:absolute; left:0; top:0; z-index:1;'></canvas>" +
            "<canvas id=mouse_layer" +" tabindex='0' alt='Image:'"+
            " name='body_section_view_canvas' class='myCanvas myNoBorder'"+
            " style='position:absolute; left:0; top:0; z-index:2;'></canvas>";
        $("#body_section_view").append(appendStr);
        var obj_image_canvas=document.getElementById("image_layer");
        var obj_mask_canvas=document.getElementById("mask_layer");
        var obj_mouse_canvas=document.getElementById("mouse_layer");
        var cxt_canvas=obj_image_canvas.getContext("2d");
        var img=new Image();
        img.onload=function(){
            obj_image_canvas.width = img.width*ratio;
            obj_image_canvas.height = img.height*ratio;
            cxt_canvas.drawImage(img,0,0,img.width*ratio,img.height*ratio);
            //add sample tools
            $("#img_width").attr("value",img.width);
            $("#img_height").attr("value",img.height);

            $(".smp_tools").show();
            $("#mask_layer").show();
            $("#mouse_layer").show();
            obj_mouse_canvas.width = img.width*ratio;
            obj_mouse_canvas.height = img.height*ratio;
            obj_mouse_canvas.onmousemove=function(e){
                if(current_class_index<0 || current_class_index>= global_origin.classes.length){
                    return;
                }
                var x = e.pageX;
                var y = e.pageY;
                // var canvas = e.target;
                var loc = getPointOnCanvas(obj_mouse_canvas, x, y);
                $("#img_x").attr("value",loc.x);
                $("#img_y").attr("value",loc.y);
                img_x = loc.x;
                img_y = loc.y;
                var drawcolor="255,0,0";
                if(current_class_index<render_body_detail_smp_color.length){
                    drawcolor=render_body_detail_smp_color[current_class_index];
                }
                claerSampleOnCanvas(obj_mouse_canvas);
                drawSampleOnCanvas(obj_mouse_canvas,smp_w, smp_h, img_x, img_y,drawcolor);
            };
            obj_mask_canvas.width = img.width*ratio;
            obj_mask_canvas.height = img.height*ratio;
            obj_mouse_canvas.onclick=function(e){
                if(current_class_index<0 || current_class_index>= global_origin.classes.length){
                    return;
                }
                var x = e.pageX;
                var y = e.pageY;
                // var canvas = e.target;
                var loc = getPointOnCanvas(obj_mask_canvas, x, y);
                $("#img_x").attr("value",loc.x);
                $("#img_y").attr("value",loc.y);
                img_x = loc.x;
                img_y = loc.y;
                // var drawcolor="255,0,0";
                // if(current_class_index>=0 && current_class_index<global_origin.classes.length){
                //     if(current_class_index<render_body_detail_smp_color.length){
                //         drawcolor=render_body_detail_smp_color[current_class_index];
                //     }
                // }
                // drawSampleOnCanvas(obj_mask_canvas,smp_w, smp_h, img_x, img_y,false,drawcolor);,
                addSample(current_image_index,smp_w, smp_h, img_x, img_y, current_class_index);
                render_body_detail_smp(-1,function(){
                    // alert("addSample>render_body_detail_smp");
                    render_body_section_view_smp();
                });
            };
            // alert("render_body_section_view_from_global"+(imageIndex+1));
            current_image_index=imageIndex;
            image_showed=image_showed+1;
            // alert(image_showed+" "+current_image_index);
            onrender();
        };
        img.src=imageFullPath;
    }else{
        var appendStr=
            "<p class=\"myNoBorder\">" +
            "<canvas id=image_"+ imageFullPath +" tabindex='0' alt='Image:'"+
            " name='body_section_view_canvas' class='myCanvas myNoBorder'></canvas>";
        $("#body_section_view").append(appendStr);
        var obj_image_canvas=document.getElementById("image_"+imageFullPath);
        var cxt_canvas=obj_image_canvas.getContext("2d");
        var img=new Image();
        img.onload=function(){
            // alert("onload"+imageFullPath);
            obj_image_canvas.width = img.width*ratio;
            obj_image_canvas.height = img.height*ratio;
            cxt_canvas.drawImage(img,0,0,img.width*ratio,img.height*ratio);
            //add sample tools
            $("#img_width").attr("value",img.width);
            $("#img_height").attr("value",img.height);

            $(".smp_tools").show();
            current_image_index=-1;
            image_showed=image_showed+1;
            // alert(image_showed+" "+current_image_index);
            onrender();
        };
        img.src=imageFullPath;
    }
}

/***
 * render_body_nav_img_list
 * @param selected == 0 select all, -1 select last,1 to item_num select one , other select none
 */
function clear_body_nav_img_list(){
    var obj_origin_nav_list=document.getElementById("body_nav_img_list");
    obj_origin_nav_list.innerHTML = "";
    image_showed=0;
    current_image_index = -1;
    current_class_index = -1;
    current_samples = [];
    current_samples_index=[];
    current_samples_showed = [];
}
function render_body_nav_img_list(selected,onRendered) {
    var obj_origin_nav_list=document.getElementById("body_nav_img_list");
    obj_origin_nav_list.innerHTML = "";
    image_showed=0;
    current_image_index = -1;
    current_class_index = -1;
    current_samples = [];
    current_samples_index=[];
    current_samples_showed = [];
    var obj_origin_nav_option = document.createElement("OPTION");
    obj_origin_nav_option.value = "root";
    obj_origin_nav_option.text= "┬"+global_path+".origion";
    if(selected==0){
        obj_origin_nav_option.selected=true;
    }
    obj_origin_nav_list.options.add(obj_origin_nav_option);
    var item_num=global_origin.images.length;
    for (var item_index=0; item_index<item_num; item_index++)
    {
        var obj_origin_nav_option = document.createElement("OPTION");
        obj_origin_nav_option.value = item_index.toString();
        obj_origin_nav_option.selected=false;
        if(item_index==item_num-1){
            if(global_origin.images[item_index] == undefined){
                obj_origin_nav_option.text= "└"+ "deleted";
                continue;
            }else{
                obj_origin_nav_option.text= "└"+ global_origin.images[item_index].name;
            }
            if(selected==-1){
                obj_origin_nav_option.selected=true;
            }
        }else{
            if(global_origin.images[item_index] == undefined){
                obj_origin_nav_option.text= "├"+ "deleted";
                continue;
            }else{
                obj_origin_nav_option.text= "├"+ global_origin.images[item_index].name;
            }
        }
        if(selected==item_index+1){
            obj_origin_nav_option.selected=true;
        }
        // alert(obj_origin_nav_option.selected);
        obj_origin_nav_list.options.add(obj_origin_nav_option);
    }
    onRendered();
}

function clear_body_detail_smp() {
    var body_detail_smp_list_ctrl=document.getElementById("body_detail_smp_list");
    body_detail_smp_list_ctrl.innerHTML = "";
    current_class_index=-1;
    current_samples=[];
    current_samples_index=[];
    current_samples_showed=[];
}
/***
 * render_body_detail_smp
 * @param selected == 0 select all, -1 select last,1 to item_num select one , other select none
 */
var render_body_detail_smp_color=["255,0,0","0,255,0","0,0,255",
    "0,255,255","255,255,0","255,0,255","0,0,0","255,255,255",
    "153,51,0","255,153,200","191,191,0","191,0,191","0,127,0",
    "0,191,191","20,43,140","218,179,255","255,215,0","222,125,0",
    "0,114,189","217,83,25","237,177,32","126,47,142","119,172,48",
    "77,190,238","162,20,47","173,235,255"];
function render_body_detail_smp(selectedvar,onRendered) {
    // alert(image_showed+" "+current_image_index);
    if(image_showed!=1 || current_image_index<0
        || current_image_index>=global_origin.images.length){
        return;
    }
    get_current_samples(current_image_index,-1,function(){
        var obj_render_body_detail_smp=document.getElementById("body_detail_smp_list");
        obj_render_body_detail_smp.innerHTML = "";
        var obj_render_body_detail_smp_option = document.createElement("OPTION");
        obj_render_body_detail_smp_option.color="rgb("+drawcolor+")";
        obj_render_body_detail_smp_option.value = "all";
        if(selectedvar==obj_render_body_detail_smp_option.value){
            obj_render_body_detail_smp_option.selected=true;
        }else{
            obj_render_body_detail_smp_option.selected=false;
        }
        obj_render_body_detail_smp_option.text= "All";
        obj_render_body_detail_smp.options.add(obj_render_body_detail_smp_option);
        var class_num=global_origin.classes.length;
        var sample_index_start=0;
        for (var class_index=0; class_index<class_num; class_index++)
        {
            var drawcolor="0,0,0";
            if(class_index<render_body_detail_smp_color.length){
                drawcolor=render_body_detail_smp_color[class_index];
            }
            var obj_render_body_detail_smp_option = document.createElement("OPTION");
            obj_render_body_detail_smp_option.color="rgb("+drawcolor+")";
            obj_render_body_detail_smp_option.value = "class_"+class_index;
            if(selectedvar==obj_render_body_detail_smp_option.value){
                obj_render_body_detail_smp_option.selected=true;
            }else{
                obj_render_body_detail_smp_option.selected=false;
            }
            obj_render_body_detail_smp_option.text= "┬"+global_origin.classes[class_index];
            obj_render_body_detail_smp.options.add(obj_render_body_detail_smp_option);
            for (var sample_index=sample_index_start; sample_index<current_samples.length; sample_index++){
                var obj_render_body_detail_smp_option = document.createElement("OPTION");
                obj_render_body_detail_smp_option.color="rgb("+drawcolor+")";
                if(current_samples[sample_index].class==class_index+1){
                    obj_render_body_detail_smp_option.value = sample_index.toString();
                    if(selectedvar==obj_render_body_detail_smp_option.value){
                        obj_render_body_detail_smp_option.selected=true;
                    }else{
                        obj_render_body_detail_smp_option.selected=false;
                    }
                    if(sample_index+1 == current_samples.length){
                        obj_render_body_detail_smp_option.text= "└"+current_samples[sample_index].locate;
                    }else{
                        if(current_samples[sample_index+1].class!=class_index+1){
                            obj_render_body_detail_smp_option.text= "└"+current_samples[sample_index].locate;
                        }else{
                            obj_render_body_detail_smp_option.text= "├"+current_samples[sample_index].locate;
                        }
                    }
                    obj_render_body_detail_smp.options.add(obj_render_body_detail_smp_option);
                }else{
                    sample_index_start=sample_index;
                    if(current_samples[sample_index].class>class_index+1){
                        break;
                    }
                }
            }
        }
        onRendered();
    });
}

function render_body_section_view_smp(onRendered) {
    if(image_showed!=1 || current_image_index<0
        || current_image_index>=global_origin.images.length){
        return;
    }
    // alert(current_class_index);
    var obj_mask=document.getElementById("mask_layer");
    claerSampleOnCanvas(obj_mask);
    for(var i=0;i<current_samples.length;i++){
        if(current_samples_showed[i]!=undefined){
            if(current_samples_showed[i]==1){
                var drawcolor="0,0,0";
                if(current_samples[i].class>0
                    && current_samples[i].class<=global_origin.classes.length){
                    if(current_class_index<render_body_detail_smp_color.length){
                        drawcolor=render_body_detail_smp_color[current_samples[i].class-1];
                    }
                }
                drawSampleOnCanvas(obj_mask,current_samples[i].locate[0],current_samples[i].locate[1],
                    current_samples[i].locate[2],current_samples[i].locate[3],drawcolor);
            }
        }
    }
    onRendered();
}

function getPointOnCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: (1.0/img_ratio)*(x - bbox.left * (canvas.width  / bbox.width)),
        y: (1.0/img_ratio)*(y - bbox.top  * (canvas.height / bbox.height))
    };
}

function claerSampleOnCanvas(canvas) {
    var context = canvas.getContext("2d");
    var bbox = canvas.getBoundingClientRect();
    context.clearRect(0,0,bbox.width,bbox.height);
}
function drawSampleOnCanvas(canvas,w, h, x, y, drawcolor) {
    if (drawcolor==undefined) drawcolor="255,0,0";
    var bbox = canvas.getBoundingClientRect();
    var w_draw=w*img_ratio;
    var h_draw=h*img_ratio;
    var x_draw=x*img_ratio;
    var y_draw=y*img_ratio;
    var context = canvas.getContext("2d");
    // context.clear();
    // if(preclear) context.clearRect(0,0,bbox.width,bbox.height);preclear,
    context.fillStyle = "rgba("+drawcolor+",0.2)";
    context.strokeStyle = "rgba("+drawcolor+",1.0)";
    // alert(context.strokeStyle);
    // context.strokeWidth=0.1;
    context.fillRect(x_draw, y_draw , w_draw, h_draw);
    context.strokeRect(x_draw, y_draw , w_draw, h_draw);
}