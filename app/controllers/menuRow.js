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
    $.active.title = "Set Active";
    $.row.backgroundColor = Alloy.CFG.colors.black;
    
} else if (args && args.active){
    if(args.active == false){
        $.active.status = false;
        $.active.title = "Set Active";
        $.row.backgroundColor = Alloy.CFG.colors.black;
    } else {
        $.active.status = true;
        $.active.title = "Set In-Active";
        
    }
}

if(!args){
    if(Ti.App.Properties.getString("acs.role") == "staff"){
        editMenu({direction:"left"});
    }
}


function editMenu(evt){
    Ti.API.info("Menu Swipe: "+evt.direction+ " User Role: "+Ti.App.Properties.getString("acs.role"));
    if(Ti.App.Properties.getString("acs.role") == "staff"){

            if(!$.adminContainer.visible){
                    $.container.animate({opacity:0.0, duration:100}, function(){
                        var properties = {
                            editable: true,
                            backgroundColor:Alloy.CFG.colors.white,
                            color:Alloy.CFG.colors.black,
                            borderWidth:1
                        };
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
                        setTimeout(function(){
                            $.container.animate({opacity:1.0, duration:250});
                        },250);
                    });
            } else if($.adminContainer.visible){
                    $.container.animate({opacity:0.0, duration:100}, function(){
                        $.adminContainer.hide();
                        var properties = {
                            editable: false,
                            backgroundColor:null,
                            color:Alloy.CFG.colors.white,
                            borderWidth:0
                        };
                        $.title.applyProperties(properties);
                        $.description.applyProperties(properties);
                        $.description.scrollable = false;
                        $.winery.applyProperties(properties);
                        $.glass_price.applyProperties(properties);
                        $.bottle_price.applyProperties(properties);
                        $.case_price.applyProperties(properties);
                        $.order.applyProperties(properties);
                        $.row.height = 110;
                        setTimeout(function(){
                            $.container.animate({opacity:1.0, duration:250});
                        },250);
                    });
            }
    }
}

function updateMenu(e){
    if(Ti.App.Properties.getString("acs.role") == "staff"){
        if(e && e.source && e.source.id == "bottle_price"){
            if($.bottle_price.value<29){
                $.glass_price.value = Math.round($.bottle_price.value/3);
            } else {
                $.glass_price.value = Math.round($.bottle_price.value/3.5);
            }
            
           
            $.case_price.value = $.bottle_price.value*12;
        }
        var props = {};
        props.fields = {title:$.title.value,description:$.description.value,winery:$.winery.value,glass_price:$.glass_price.value,bottle_price:$.bottle_price.value,case_price:$.case_price.value, order:$.order.value, active:$.active.status};        
        if($.row && !$.row.args || !$.row.args.id){
            props.callback = function(data){
                $.row.args = data;
            };
            acs.createWine(props);
        } else {
            props.id = $.row.args.id;
            // //props.fields = '{"'+params.source.id+'":"'+params.value+'"}'
            // props.fields = {title:$.title.value,description:$.description.value,winery:$.winery.value,glass_price:$.glass_price.value,bottle_price:$.bottle_price.value,case_price:$.case_price.value, order:$.order.value, active:$.active.status}
            acs.updateWine(props);
        }
        
    }
}


function setActive(){
    if($.active.title == "Set Active"){
        $.active.title = "Set In-Active";
        $.active.status = true;
        updateMenu();
    } else {
        $.active.title = "Set Active";
        $.active.status = false;
        updateMenu();
    }
}
