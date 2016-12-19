function popMenu(menuid,itemstrs,onSelect){
    var gui = require('nw.gui');
    var menu = new gui.Menu();
    
    
    var styleStr = 'display:block; position:absolute;left:' +
        100 + 'px;top:' + 100 + 'px;';
    var appendStr=
        "<ul id= '" + menuid + "'>";
    for(var i in itemstrs){
        appendStr=appendStr+"<li>"+itemstrs[i]+"</li>";
    }
    appendStr=appendStr+"</ul>";
    var menuDiv=document.createElement('div');
    menuDiv.id='menuDiv';
    menuDiv.style.display='block';
    menuDiv.style.left='100px';
    menuDiv.style.top='100px';
    menuDiv.style.width='100px';
    menuDiv.style.height='100px';
    document.body.appendChild(menuDiv);
    alert(appendStr);
}
// style='"+ styleStr + "'