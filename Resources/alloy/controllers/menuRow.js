function Controller() {
    function editMenu(evt) {
        if (Ti.App.Properties.getString("acs.role") == "staff") {
            alert($.row.args.id);
            var properties = {
                editable: !0,
                backgroundColor: "#ffffff",
                color: "#000000"
            };
            $.title.applyProperties(properties);
            $.description.applyProperties(properties);
            $.winery.applyProperties(properties);
        }
    }
    function updateMenu(params) {
        var acs = require("acs"), props = {};
        props.id = $.row.args.id;
        props.fields = "{'" + params.source.propName + "':'" + params.value + "'}";
        Ti.API.info(params.fields);
        acs.updateWine(props);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: Alloy.CFG.colors.background,
        left: 10,
        right: 10,
        height: 100,
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    editMenu ? $.__views.row.addEventListener("swipe", editMenu) : __defers["$.__views.row!swipe!editMenu"] = !0;
    $.__views.title = Ti.UI.createTextField({
        color: Alloy.CFG.colors.text.main,
        left: 10,
        top: 5,
        width: "59%",
        font: {
            fontWeight: "bold",
            fontSize: "15"
        },
        horizontalWrap: !1,
        editable: !1,
        id: "title"
    });
    $.__views.row.add($.__views.title);
    updateMenu ? $.__views.title.addEventListener("blur", updateMenu) : __defers["$.__views.title!blur!updateMenu"] = !0;
    $.__views.winery = Ti.UI.createTextField({
        color: Alloy.CFG.colors.text.main,
        right: 10,
        top: 5,
        width: "39%",
        font: {
            fontStyle: "italic"
        },
        textAlign: "right",
        editable: !1,
        id: "winery"
    });
    $.__views.row.add($.__views.winery);
    $.__views.bottle_price = Ti.UI.createTextField({
        color: Alloy.CFG.colors.text.main,
        bottom: 5,
        font: {},
        editable: !1,
        id: "bottle_price"
    });
    $.__views.row.add($.__views.bottle_price);
    $.__views.glass_price = Ti.UI.createTextField({
        color: Alloy.CFG.colors.text.main,
        bottom: 5,
        font: {},
        editable: !1,
        left: 10,
        id: "glass_price"
    });
    $.__views.row.add($.__views.glass_price);
    $.__views.batch_price = Ti.UI.createTextField({
        color: Alloy.CFG.colors.text.main,
        bottom: 5,
        font: {},
        editable: !1,
        right: 10,
        id: "batch_price"
    });
    $.__views.row.add($.__views.batch_price);
    $.__views.description = Ti.UI.createTextField({
        color: Alloy.CFG.colors.text.main,
        top: 30,
        bottom: 30,
        left: 10,
        font: {
            fontStyle: "italic"
        },
        width: "100%",
        horizontalWrap: !0,
        editable: !1,
        id: "description"
    });
    $.__views.row.add($.__views.description);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || null;
    $.row.args = args;
    $.title.value = args.title;
    $.title.propName = "title";
    $.winery.value = "(" + args.winery + ")";
    $.bottle_price.value = "bottle $" + args.bottle_price;
    $.glass_price.value = "glass $" + args.glass_price;
    args.batch_price ? $.batch_price.value = "batch $" + args.batch_price : args.case_price && ($.batch_price.value = "case $" + args.case_price);
    $.description.value = args.description;
    __defers["$.__views.row!swipe!editMenu"] && $.__views.row.addEventListener("swipe", editMenu);
    __defers["$.__views.title!blur!updateMenu"] && $.__views.title.addEventListener("blur", updateMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;