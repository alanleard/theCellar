var args = arguments[0] || null;
var acs = require("acs");

$.row.args = args?args:null;
$.title.value = args?args.title:"";
$.winery.value = args?args.winery:"";
$.bottle_price.value = args?args.bottle_price:"";
$.glass_price.value = args?args.glass_price:"";
$.case_price.value = args?args.case_price:"";
$.description.value = args?args.description:"Wine Description";
$.order.value = args?args.order:"";
if(args && !args.active){
    $.active.status = false;
    $.active.title = "In-Active";
    $.row.backgroundColor = Alloy.CFG.colors.black;
    
}

if(!args){
    if(Ti.App.Properties.getString("acs.role") == "staff"){
        editMenu({direction:"left"});
    }
}
$.description.addEventListener("focus", function(evt){
    if(evt.value == "Wine Description"){
        evt.value = "";
    }
});

$.description.addEventListener("blur", function(evt){
    if(evt.value == ""){
        evt.value = "Wine Description";
    }
});
function editMenu(evt){
    Ti.API.info("Menu Swipe: "+evt.direction+ " User Role: "+Ti.App.Properties.getString("acs.role"))
    if(Ti.App.Properties.getString("acs.role") == "staff"){
        if(evt.direction == "left"){
                var properties = {
                    editable: true,
                    backgroundColor:Alloy.CFG.colors.white,
                    color:Alloy.CFG.colors.black
                }
                $.title.applyProperties(properties);
                $.description.applyProperties(properties);
                $.description.scrollable = true;
                $.winery.applyProperties(properties);
                $.glass_price.applyProperties(properties);
                $.bottle_price.applyProperties(properties);
                $.case_price.applyProperties(properties);
                $.order.applyProperties(properties);
                $.row.height = 150;
                $.adminContainer.show();
        } else if(evt.direction == "right"){
                $.adminContainer.hide();
                var properties = {
                    editable: false,
                    backgroundColor:null,
                    color:Alloy.CFG.colors.white
                }
                $.title.applyProperties(properties);
                $.description.applyProperties(properties);
                $.description.scrollable = false;
                $.winery.applyProperties(properties);
                $.glass_price.applyProperties(properties);
                $.bottle_price.applyProperties(properties);
                $.case_price.applyProperties(properties);
                $.order.applyProperties(properties);
                $.row.height = 110;
        }
    }
}

function updateMenu(){
    if(Ti.App.Properties.getString("acs.role") == "staff"){
        var props = {};
        props.fields = {title:$.title.value,description:$.description.value,winery:$.winery.value,glass_price:$.glass_price.value,bottle_price:$.bottle_price.value,case_price:$.case_price.value, order:$.order.value, active:$.active.status}
        
        if($.row && !$.row.args || !$.row.args.id){
            props.callback = function(data){
                $.row.args = data;
            }
            acs.createWine(props)
        } else {
            props.id = $.row.args.id;
            // //props.fields = '{"'+params.source.id+'":"'+params.value+'"}'
            // props.fields = {title:$.title.value,description:$.description.value,winery:$.winery.value,glass_price:$.glass_price.value,bottle_price:$.bottle_price.value,case_price:$.case_price.value, order:$.order.value, active:$.active.status}
            acs.updateWine(props);
        }
        
    }
}

function setActive(){
    if($.active.title == "Active"){
        $.active.title = "In-Active"
        $.active.status = false;
        updateMenu();
    } else {
        $.active.title = "Active";
        $.active.status = true;
        updateMenu();
    }
}
