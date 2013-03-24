var args = arguments[0] || null;
$.row.args = args;

$.title.value = args.title;
$.winery.value = args.winery;
$.bottle_price.value = args.bottle_price;
$.glass_price.value = args.glass_price;
$.case_price.value = args.case_price;
$.description.value = args.description;
$.order.value = args.order;

// if(args.batch_price){
    // $.caseLabel.text = "batch $";
    // $.case_price.value = args.batch_price;
// } else if(args.case_price){
    // $.caseLabel.text = "case $";
// }


function editMenu(evt){
    if(Ti.App.Properties.getString("acs.role") == "staff"){
        if(evt.direction == "left"){
                var properties = {
                    editable: true,
                    backgroundColor:Alloy.CFG.colors.white,
                    color:Alloy.CFG.colors.black
                }
                $.title.applyProperties(properties);
                $.description.applyProperties(properties);
                $.winery.applyProperties(properties);
                $.glass_price.applyProperties(properties);
                $.bottle_price.applyProperties(properties);
                $.case_price.applyProperties(properties);
                $.row.height = 150;
                $.adminContainer.show();
        } else if(evt.direction == "right"){
                $.adminContainer.hide();
                var properties = {
                    editable: false,
                    backgroundColor:Alloy.CFG.colors.background,
                    color:Alloy.CFG.colors.white
                }
                $.title.applyProperties(properties);
                $.description.applyProperties(properties);
                $.winery.applyProperties(properties);
                $.glass_price.applyProperties(properties);
                $.bottle_price.applyProperties(properties);
                $.case_price.applyProperties(properties);
                $.row.height = 110;
        }
    }
}

function updateMenu(){
    if(Ti.App.Properties.getString("acs.role") == "staff"){
        var acs = require("acs");
        var props = {};
        props.id = $.row.args.id;
        //props.fields = '{"'+params.source.id+'":"'+params.value+'"}'
        props.fields = {title:$.title.value,description:$.description.value,winery:$.winery.value,glass_price:$.glass_price.value,bottle_price:$.bottle_price.value,case_price:$.case_price.value, order:$.order.value, active:$.active.status}
        acs.updateWine(props);
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

function setOrder(){
    updateMenu();
}
