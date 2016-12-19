/**
 * Created by Leon on 2016/8/26.
 */
/***
 * async_to_sync: asynchronous task to in order.
 * @param paras: para array which must process in order;
 * @param task: asynchronous task function which run several times;
 * @return: onFinish(returns = ture/false array);
 */
function async_in_order(paras,returns,task,onOK,onErr,onFinish){
    var length = paras.length;
    returns = [];
    var index = 0;
    async_in_order_loop(paras,returns,index,task,onOK,onErr,onFinish);
}

function async_in_order_loop(paras,returns,index,task,onOnce,onErr,onFinish){
    if(paras==undefined){
        onErr();
    }
    if(index==paras.length-1){
        task(paras[index],function(para){
            // alert("async_in_order_loop>"+index+" return 1");
            returns.push(true);
            // alert("async_in_order_loop>a>"+returns);
            onOnce(para);
            onFinish(returns);
        },function(para){
            // alert("async_in_order_loop>"+index+" return 0");
            returns.push(false);
            // alert("async_in_order_loop>push false>"+returns);
            // alert("async_in_order_loop>b>"+returns);
            onErr(para);
            onFinish(returns);
        });
    }else{
        task(paras[index],function(para){
            // alert("async_in_order_loop>"+index+" return 1");
            returns.push(true);
            onOnce(para);
            async_in_order_loop(paras,returns,index+1,task,onOnce,onErr,onFinish);
            // alert("async_in_order_loop>c>"+returns);
        },function(para){
            // alert("async_in_order_loop>"+index+" return 0");
            returns.push(false);
            // alert("async_in_order_loop>push false>"+returns);
            onErr(para);
            async_in_order_loop(paras,returns,index+1,task,onOnce,onErr,onFinish);
            // alert("async_in_order_loop>d>"+returns);
        });
    }
}