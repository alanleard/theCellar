var acs = require('acs');

if(!acs.checkLogin()){
    acs.login({callback:loadWines});
} else{
    loadWines();
}

function loadWines(params){
    if(!params){
         var params = {};
    }
    params.callback = populateMenu;
    acs.getWines(params, populateMenu);
}

function populateMenu(data){
    if(data.success){
        
        var rows = [];
        
        for(var i = 0, l=data.wines.length-1; l>=i; l--){
        //for(var i in data.wines){
            Ti.API.info("Loading "+data.wines[l].title);
            var row = Alloy.createController('menuRow',data.wines[l]).getView();
            
            rows.push(row);
        }
        if(Ti.App.Properties.getString("acs.role") == "staff"){
            var row = Alloy.createController('menuRow').getView();
            rows.push(row);
            
        }
        $.menu.setData(rows);
   }
};

$.header.button.show();

$.header.button.addEventListener("click", function(){
   // $.menu.deleteSection(0);
    //setTimeout(function(){
        var params = {};
        if(Ti.App.Properties.getString("acs.role") == "staff"){
            params.where ={
                archive:false
            };
        }
        
        loadWines(params);
   // },5000)

});
