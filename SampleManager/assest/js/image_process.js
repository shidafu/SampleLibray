/**
 * Created by Leon on 2016/9/28.
 */
//Nodejs fileCopy
var copyImageSync = function (src, dst) {
    // alert(src);
    // alert(dst);
    var fs = require('fs');
    try {
        if(src!=dst){
            fs.createReadStream(src).pipe(fs.createWriteStream(dst));
        }
        // if(!fs.existsSync(dst)){
        //     if(!fs.existsSync(dst)){
        //         if(!fs.existsSync(dst)){
        //             if(!fs.existsSync(dst)){
        //                 alert(">copyImageSync> "+dst+" do not exist(>_<)");
        //                 return false;
        //             }
        //             return true;
        //         }
        //         return true;
        //     }
        //     return true;
        // }
        return true;
    } catch (e) {
        return false;
    }
};

var getBase64ImageSync = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL
};

var getBase64ImageRectSync = function(img,left,top,width,height) {
    var canvas = document.createElement("canvas");
    left=Math.max(left,0);
    top=Math.max(top,0);
    width=Math.max(width,2);
    height=Math.max(height,2);
    left=Math.min(left,img.width-2);
    top=Math.min(top,img.height-2);
    width=Math.min(width,img.width);
    height=Math.min(height,img.height);
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, left,top, width, height, 0,0, width, height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL
};

// 把image 转换为 canvas对象
function convertImageToCanvas(image) {
    // 创建canvas DOM元素，并设置其宽高和图片一样
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
    canvas.getContext("2d").drawImage(image, 0, 0);

    return canvas;
}

// 从 canvas 提取图片 image
function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png");
    return image;
}

var readBase64Image = function(filePath, onRead, onError) {
    var fs = require('fs');
    if(!fs.existsSync(filePath)){
        alert(">readBase64Image> File: "+ filePath+ "do not exist(>_<)");
        onError();
    }
    var img =document.createElement('img');
    img.onload=function(){
        var base64data = getBase64ImageSync(img);
        var md5data = $.md5(base64data);
        onRead(img.width,img.height,base64data,md5data);
    };
    img.src=filePath;
};

var writeBaseImageSync = function(base64data,filePath) {
    try {
        var fs = require('fs');
        var base64data_filter = base64data.replace("data:image/png;base64", "");
        var dataBuffer = new Buffer(base64data_filter, 'base64');
        fs.writeFileSync(filePath,dataBuffer);
        return true;
    } catch (e) {
        return false;
    }
};
var writeBaseImage = function(base64data,filePath,onWrite,onError) {
    try {
        var fs = require('fs');
        var base64data_filter = base64data.replace("data:image/png;base64", "");
        var dataBuffer = new Buffer(base64data_filter, 'base64');
        fs.writeFileSync(filePath,dataBuffer,onWrite);
    } catch (e) {
        onError();
    }
};