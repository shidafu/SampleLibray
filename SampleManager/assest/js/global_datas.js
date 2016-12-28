/**
 * Created by Leon on 2016/8/22.
 */
//just for app, do not save
var global_path="";
var out_path="";
//save and read to/from the only ".origin" file
const global_origin_default = {
    "project": {
        "author": "",
        "version": "",
        "date": "",
        "describe": ""
    },
    "images": [
        // {"name":"001.bmp","size":[480,270],"md5":"ef26e0248abfa51b319f6bdbf8faf000"}
    ],
    "classes": [
        // "Mountain","Sun"
    ],
    "samples": [
        // { "image": 1, "locate": [8,8,3,7], "class": 1}
    ]
};
var global_origin = {
    "project": {
        "author": "",
        "version": "",
        "date": "",
        "describe": ""
    },
    "images": [
        // {"name":"001.bmp","size":[480,270],"md5":"ef26e0248abfa51b319f6bdbf8faf000"}
    ],
    "classes": [
        // "Mountain","Sun"
    ],
    "samples": [
        // { "image": 1, "locate": [8,8,3,7], "class": 1}
    ]
};
var image_showed=0;
var current_image_index = -1;
var current_class_index = -1;
var current_samples = [
// { "origin": 1, "locate": [8,8,3,7], "class": 1}
];
var current_samples_index = [
    //0,1,0,1
];
var current_samples_showed = [
    //0,1,0,1
];
var get_current_samples = function(image_index,class_index,onGet){
    current_image_index = image_index;
    current_class_index = class_index;
    current_samples=[];
    current_samples_index=[];
    current_samples_showed=[];
    image_index=image_index+1;
    class_index=class_index+1;
    if(image_index==0){
        if(class_index==0){
            current_samples=jsonsql.query("select * from global_origin.samples"+
                " order by class,image asc",global_origin);
            current_samples_index=jsonsql.query("select @ from global_origin.samples"+
                " order by class,image asc",global_origin);
        }else{
            current_samples=jsonsql.query("select * from global_origin.samples"+
                " where (class== "+class_index+") order by class,image asc",global_origin);
            current_samples_index=jsonsql.query("select @ from global_origin.samples"+
                " where (class== "+class_index+") order by class,image asc",global_origin);
        }
    }else{
        if(class_index==0){
            current_samples=jsonsql.query("select * from global_origin.samples"+
                " where (image== "+image_index+") order by class,image asc",global_origin);
            current_samples_index=jsonsql.query("select @ from global_origin.samples"+
                " where (image== "+image_index+") order by class,image asc",global_origin);
        }else{
            current_samples=jsonsql.query("select * from global_origin.samples"+
                " where (class== "+class_index+",image== "+image_index+") order by class,image asc",global_origin);
            current_samples_index=jsonsql.query("select @ from global_origin.samples"+
                " where (class== "+class_index+",image== "+image_index+") order by class,image asc",global_origin);
        }
    }
    // alert(current_samples_index);
    for(var i=0;i<current_samples.length;i++){
        current_samples_showed.push(1);
    }
    onGet();
    // for(var i in global_origin.samples){
    //     if(image_index==global_origin.samples[i].image || image_index==-1){
    //         if(class_index==global_origin.samples[i].class || class_index==-1){
    //             current_samples.push(global_origin.samples[i]);
    //         }
    //     }
    // }
};

var global_path_load = function(fullpath, onLoad, onNew, onErr){
    var fs = require('fs');
    try {
        if(fs.existsSync(fullpath+".origin")){
            //parse file as json string
            readOriginFile(fullpath+".origin",onLoad,onErr);
        }else{
            alert(">global_path_load> file "+ fullpath + ".origin do not exists, one will be created(^_^)");
            //creat file use default json string
            newOriginFile(fullpath+".origin",onNew,onErr);
        }
    } catch (e) {
        alert(">global_path_load> file "+ fullpath + ".origin catch a error(>_<)");
        onErr();
    }
};

var global_path_save = function(fullpath, onSave, onErr){
    writeOriginFile(fullpath+".origin",onSave,onErr);
};

var readOriginFile = function(path,onRead,onErr){
    var fs = require('fs');
    fs.readFile(path,function(err,data){
        if(err) throw onErr();
        var jsonObj = JSON.parse(data);
        try {
            global_origin.project=jsonObj["project"];
            global_origin.images=jsonObj["images"];
            global_origin.classes=jsonObj["classes"];
            global_origin.samples=jsonObj["samples"];
            onRead();
        } catch (e) {
            alert(">readOriginFile> file "+ path + " catch a error(>_<)");
            onErr();
        }
    });
};

var writeOriginFile = function(path,onWrite,onErr){
    var fs = require('fs');
    fs.writeFile(path,JSON.stringify(global_origin),function(err){
        if(err){
            alert(">writeOriginFile> file "+ path + " catch a error(>_<)");
            throw onErr();
        }
        onWrite();
    });
};

var newOriginFile = function(path,onWrite,onErr){
    var fs = require('fs');
    fs.writeFile(path,JSON.stringify(global_origin_default),function(err){
        if(err){
            alert(">writeOriginFile> file "+ path + " catch a error(>_<)");
            throw onErr();
        }
        onWrite();
    });
};


var addImage = function(filePath, onAdded, onError) {
    // alert("addImage");
    var file_name, file_ext,file_path;
    [file_path,file_name,file_ext]=sapratePath(filePath);
    if(file_ext.toUpperCase()!=".BMP"
        && file_ext.toUpperCase()!=".JPG"
        && file_ext.toUpperCase()!=".PNG"){
        alert(">addImage> Invalid project file type(>_<)");
        onError();
    }
    readBase64Image(filePath,function(width, height, base64data, md5data){
        // alert("readBase64Image");
        //find same file in project dir
        var length=global_origin.images.length;
        var d = new Date();
        var years = d.getFullYear();
        var month = add_zero(d.getMonth()+1);
        var days = add_zero(d.getDate());
        var hours = add_zero(d.getHours());
        var minutes = add_zero(d.getMinutes());
        var seconds=add_zero(d.getSeconds());
        var milliseconds=add_zero(d.getMilliseconds());
        var timeStr = years+"_"+month+"_"+days+"_"+hours+"_"+minutes+"_"+seconds+"_"+milliseconds;
        var dst_filename=file_name;
        for(var index=0;index<length;index++){
            if(global_origin.images[index] == undefined){
                continue;
            }
            if(md5data==global_origin.images[index].md5){
                alert(">addImage> File data in: "+ dst_filename+file_ext+ " already exist as: " + global_origin.images[index].name +"(-_-!)");
                onError(index);
                return;
            }
            if(dst_filename+file_ext==global_origin.images[index].name){//replace file name as md5data to avoid name replicate.
                // alert(">addImage> File name: "+ file_name+file_ext+ " already exist, rename as: " + file_name+"_1"+file_ext +"(-_-!)");
                dst_filename=file_name+"_"+timeStr;
                continue;
            }
        }
        //write new file into project dir
        if(copyImageSync(file_path+file_name+file_ext, global_path+dst_filename+file_ext)){
            var item={"name":dst_filename+file_ext,"size":[width,height],"md5":md5data};
            var length=global_origin.images.push(item);
            onAdded(length-1);
        } else {
            alert(">copyImageSync> error(>_<)");
            onError();
        }
    },onError);
};

/***
 * delImage not complete
 * just delImage info and replaced by undefined, do not shift array
 */
var delImage = function(fileIndex, onDeled, onError) {
    if(fileIndex<0 || fileIndex>=global_origin.images.length){
        alert(">delImage> fileIndex overrang(>_<)");
        onError();
        return;
    }
    if(global_origin.images[fileIndex]!=undefined){
        var samples_todel_index=jsonsql.query("select @ from global_origin.samples"+
            " where (image== "+fileIndex+") order by class,image asc",global_origin);

        for(var i=0;i<samples_todel_index.length;i++){
            global_origin.samples[samples_todel_index[i]]=undefined;
        }
        var file_name_ext,file_path;
        file_path=global_path;
        file_name_ext=global_origin.images[fileIndex].name;
        var fs = require('fs');
        try {
            fs.unlink(file_path+file_name_ext,function(){
                delete global_origin.images[fileIndex];
                onDeled(fileIndex);
            });
        } catch (e) {
            onError();
        }
    }
    onDeled(fileIndex);
};

var addClass = function(c_name) {
    if(c_name==undefined){
        c_name=window.prompt("Input new class name:");
    }
    global_origin.classes.push(c_name);
    return global_origin.classes.length;
};

var delClass = function(c_name) {
    var initLen=global_origin.classes.length;
    if (initLen==0) return false;
    global_origin.classes.remove(c_name);
    if(initLen-global_origin.classes.length==1){
        return false;
    }else{
        return true;
    }
};

var addSample = function(smp_index,w,h,x,y,class_index) {
    if(smp_index<0 ||smp_index>=global_origin.images.length) return false;
    if(class_index<0 ||class_index>global_origin.classes.length) return false;
    if(class_index==global_origin.classes.length){
        addClass();
    }
    var smp_index_1=smp_index+1;
    // alert(smp_index+1);
    var newSample={"image": smp_index_1,"locate": [w,h,x,y],"class": class_index+1};
    // alert(JSON.stringify(newSample));
    global_origin.samples.push(newSample);
    // alert(JSON.stringify(global_origin.samples));
};

var delSample = function(index) {
    if(index<0 ||index>global_origin.images.length) return false;
    global_origin.samples.remove();
    alert(JSON.stringify(global_origin.samples));
};

var sapratePath = function(fullPath){
    if(fullPath!=''){
        fullPath=fullPath.replace(/\\/,'/');
        var path="";
        var name="";
        var ext="";
        var pos1 = fullPath.lastIndexOf('/');
        var pos2 = fullPath.lastIndexOf('\\');
        var pos  = Math.max(pos1, pos2);
        if( pos<0 ){
            name =fullPath;
        }
        else{
            path=fullPath.substring(0,pos+1);
            name=fullPath.substring(pos+1);
        }
        var pos3 = name.lastIndexOf('.');
        if( pos3<0 ){}
        else{
            ext=name.substring(pos3);
            name=name.substring(0,pos3);
        }
        return [path,name,ext];
    }
};

var writeSampleFile = function(sampleIndex,onWrite,onErr){
    // if(sampleIndex<0 || sampleIndex>=global_origin.samples.length || out_path==''){
    //     onErr();
    //     return false;
    // }
    // if(global_origin.samples[sampleIndex]==undefined){
    //     onErr();
    //     return false;
    // }
    // if(global_origin.images[global_origin.samples[sampleIndex].image-1]==undefined){
    //     onErr();
    //     return false;
    // }
    var sampleIndex=parseInt(sampleIndex);
    var fs = require('fs');
    var image_filename=global_path+global_origin.images[global_origin.samples[sampleIndex].image-1].name;
    image_filename=image_filename.replace(/\\/,'/');
    if(!fs.existsSync(image_filename)){
        alert(">writeSampleFile> image:"+image_filename+" do not exist(?_?)");
        onErr();
        return false;
    }
    var dstFullPath = out_path;
    if(out_path.lastIndexOf('/')== out_path.length-1 || out_path.lastIndexOf('\\')== out_path.length-1){
        dstFullPath=out_path.substring(0,out_path.length-1)+'\\';
    }
    out_path=out_path.replace(/\\/,'/');
    dstFullPath=dstFullPath.replace(/\\/,'/');
    var sampleIndex_1=sampleIndex+1;
    var sample_filename=dstFullPath+global_origin.classes[global_origin.samples[sampleIndex].class-1]+
        '/'+ sampleIndex_1+'_in_'+global_origin.images[global_origin.samples[sampleIndex].image-1].name;
    // alert(sample_filename);
    if(fs.existsSync(sample_filename)) {
        onWrite();
        return true;
    }else{
        var m_img=new Image();
        m_img.onload=function(){
            var base64data = getBase64ImageRectSync(m_img,
                global_origin.samples[sampleIndex].locate[2],global_origin.samples[sampleIndex].locate[3],
                global_origin.samples[sampleIndex].locate[0],global_origin.samples[sampleIndex].locate[1]);
            writeBaseImageSync(base64data,sample_filename);
            // alert(">writeSampleFile>sample_filename="+sample_filename+",locate="+global_origin.samples[sampleIndex].locate);
            onWrite();
            return true;
        };
        m_img.src=image_filename;
    }
};
var writeSampleFiles = function(fullPath,onFinish){
    if(fullPath.lastIndexOf('/')== fullPath.length-1 || fullPath.lastIndexOf('\\')== fullPath.length-1){
        out_path=fullPath.substring(0,fullPath.length-1)+'/';
    }
    out_path=out_path.replace(/\\/,'/');
    if(global_origin.samples.length==0 || out_path==''){
        onFinish();
        return 0;
    }
    var fs = require('fs');
    for(var class_index=0;class_index<global_origin.classes.length;class_index++){
        if(global_origin.classes[class_index]==undefined) continue;
        if(!fs.existsSync(out_path+global_origin.classes[class_index])){
            fs.mkdirSync(out_path+global_origin.classes[class_index]);
        }
    }
    var sample_indexs=[];
    for (var i in global_origin.samples){
        if(global_origin.samples[i]!=undefined){
            if(global_origin.images[global_origin.samples[i].image-1]!=undefined){
                sample_indexs.push(i);
            }
        }
    }
    var returns=[];
    async_in_order(sample_indexs,returns,writeSampleFile,function(){
    },function(){
    },onFinish);
    return returns;
};