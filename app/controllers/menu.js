var acs = require('acs');

if(!acs.checkLogin()){
    acs.login({callback:loadWines});
} else{
    loadWines();
}


function loadWines(){
    acs.getWines({callback:function(data){
    if(data.success){
        var rows = [];
        for(var i in data.wines){
            
            var row = Alloy.createController('menuRow',data.wines[i]).getView();
            
            rows.push(row);
        }
        $.menu.setData(rows);
   }
    }});
};


