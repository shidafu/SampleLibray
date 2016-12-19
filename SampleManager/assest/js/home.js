var home_picture_src =[
    "assest/html/doc.files/home.png",
    "assest/html/doc.files/data.png",
    "assest/html/doc.files/architecture.png"
];
var home_picture_index=0;
$(document).ready(function(){
    $("#home_picture").attr("src",home_picture_src[home_picture_index]);
    $("#home_picture").click(function() {
        home_picture_index=home_picture_index+1;
        if(home_picture_index<0) home_picture_index=2;
        if(home_picture_index>2) home_picture_index=0;
        $("#home_picture").attr("src",home_picture_src[home_picture_index]);
    });
});
