var args = arguments[0] || null;
$.row.args = args;
$.title.value = args.title;
$.title.propName = "title";
$.winery.value = "("+args.winery+")";
$.bottle_price.value = "bottle $"+args.bottle_price;
$.glass_price.value = "glass $"+args.glass_price;
if(args.batch_price){
    $.batch_price.value = "batch $"+args.batch_price;
} else if(args.case_price){
    $.batch_price.value = "case $"+args.case_price;
}

$.description.value = args.description;


function editMenu(evt){
    if(Ti.App.Properties.getString("acs.role") == "staff"){
            alert($.row.args.id);
            var properties = {
                editable: true,
                backgroundColor:"#ffffff",
                color:"#000000"
            }
            $.title.applyProperties(properties);
            $.description.applyProperties(properties);
            $.winery.applyProperties(properties);
    }
    
}

function updateMenu(params){
    var acs = require("acs");
    var props = {};
    props.id = $.row.args.id;
    props.fields = "{'"+params.source.propName+"':'"+params.value+"'}"
    acs.updateWine(props);
}
