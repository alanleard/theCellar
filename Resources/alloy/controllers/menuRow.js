var Alloy = require('alloy'),
	Backbone = Alloy.Backbone,
	_ = Alloy._,
	$model;



function Controller() {
	require('alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
	
	$model = arguments[0] ? arguments[0]['$model'] : null;
	var $ = this;
	var exports = {};
	var __defers = {};
	
	// Generated code that must be executed before all UI and/or
	// controller code. One example is all model and collection 
	// declarations from markup.
	

	// Generated UI code
	$.__views.row = Ti.UI.createTableViewRow(
{backgroundColor:Alloy.CFG.colors.background,left:10,right:10,height:100,id:"row",}
);
$.addTopLevelView($.__views.row);editMenu?$.__views.row.addEventListener('swipe',editMenu):__defers['$.__views.row!swipe!editMenu']=true;$.__views.title = Ti.UI.createTextField(
{color:Alloy.CFG.colors.text.main,left:10,top:5,width:"59%",font:{fontWeight:"bold",fontSize:"15",},horizontalWrap:false,editable:false,id:"title",}
);
$.__views.row.add($.__views.title);
updateMenu?$.__views.title.addEventListener('blur',updateMenu):__defers['$.__views.title!blur!updateMenu']=true;$.__views.winery = Ti.UI.createTextField(
{color:Alloy.CFG.colors.text.main,right:10,top:5,width:"39%",font:{fontStyle:"italic",},textAlign:"right",editable:false,id:"winery",}
);
$.__views.row.add($.__views.winery);
$.__views.bottle_price = Ti.UI.createTextField(
{color:Alloy.CFG.colors.text.main,bottom:5,font:{},editable:false,id:"bottle_price",}
);
$.__views.row.add($.__views.bottle_price);
$.__views.glass_price = Ti.UI.createTextField(
{color:Alloy.CFG.colors.text.main,bottom:5,font:{},editable:false,left:10,id:"glass_price",}
);
$.__views.row.add($.__views.glass_price);
$.__views.batch_price = Ti.UI.createTextField(
{color:Alloy.CFG.colors.text.main,bottom:5,font:{},editable:false,right:10,id:"batch_price",}
);
$.__views.row.add($.__views.batch_price);
$.__views.description = Ti.UI.createTextField(
{color:Alloy.CFG.colors.text.main,top:30,bottom:30,left:10,font:{fontStyle:"italic",},width:"100%",horizontalWrap:true,editable:false,id:"description",}
);
$.__views.row.add($.__views.description);
exports.destroy=function(){};

	// make all IDed elements in $.__views available right on the $ in a 
	// controller's internal code. Externally the IDed elements will
	// be accessed with getView().
	_.extend($, $.__views);

	// Controller code directly from the developer's controller file
	var args=arguments[0]||null;$.row.args=args;$.title.value=args.title;$.winery.value="("+args.winery+")";$.bottle_price.value="bottle $"+args.bottle_price;$.glass_price.value="glass $"+args.glass_price;if(args.batch_price){$.batch_price.value="batch $"+args.batch_price}else if(args.case_price){$.batch_price.value="case $"+args.case_price}$.description.value=args.description;function editMenu(evt){if(Ti.App.Properties.getString("acs.role")=="staff"){alert($.row.args.id);var properties={editable:true,backgroundColor:"#ffffff",color:"#000000"};$.title.applyProperties(properties);$.description.applyProperties(properties);$.winery.applyProperties(properties)}}function updateMenu(params){var acs=require("acs");var props={};props.id=$.row.args.id;props.fields='{"'+params.source.id+'":"'+params.value+'"}';acs.updateWine(props)}

	// Generated code that must be executed after all UI and
	// controller code. One example deferred event handlers whose
	// functions are not defined until after the controller code
	// is executed.
	__defers['$.__views.row!swipe!editMenu'] && $.__views.row.addEventListener('swipe',editMenu);__defers['$.__views.title!blur!updateMenu'] && $.__views.title.addEventListener('blur',updateMenu);

	// Extend the $ instance with all functions and properties 
	// defined on the exports object.
	_.extend($, exports);
}

module.exports = Controller;