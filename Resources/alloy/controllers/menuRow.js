function Controller() {
    function editMenu(evt) {
        Ti.API.info("Menu Swipe: " + evt.direction + " User Role: " + Ti.App.Properties.getString("acs.role"));
        if (Ti.App.Properties.getString("acs.role") == "staff") if (evt.direction == "left") {
            var properties = {
                editable: !0,
                backgroundColor: Alloy.CFG.colors.white,
                color: Alloy.CFG.colors.black
            };
            $.title.applyProperties(properties);
            $.description.applyProperties(properties);
            $.description.scrollable = !0;
            $.winery.applyProperties(properties);
            $.glass_price.applyProperties(properties);
            $.bottle_price.applyProperties(properties);
            $.case_price.applyProperties(properties);
            $.order.applyProperties(properties);
            $.row.height = 150;
            $.adminContainer.show();
        } else if (evt.direction == "right") {
            $.adminContainer.hide();
            var properties = {
                editable: !1,
                backgroundColor: null,
                color: Alloy.CFG.colors.white
            };
            $.title.applyProperties(properties);
            $.description.applyProperties(properties);
            $.description.scrollable = !1;
            $.winery.applyProperties(properties);
            $.glass_price.applyProperties(properties);
            $.bottle_price.applyProperties(properties);
            $.case_price.applyProperties(properties);
            $.order.applyProperties(properties);
            $.row.height = 110;
        }
    }
    function updateMenu() {
        if (Ti.App.Properties.getString("acs.role") == "staff") {
            var props = {};
            props.fields = {
                title: $.title.value,
                description: $.description.value,
                winery: $.winery.value,
                glass_price: $.glass_price.value,
                bottle_price: $.bottle_price.value,
                case_price: $.case_price.value,
                order: $.order.value,
                active: $.active.status
            };
            if ($.row && !$.row.args || !$.row.args.id) {
                props.callback = function(data) {
                    $.row.args = data;
                };
                acs.createWine(props);
            } else {
                props.id = $.row.args.id;
                acs.updateWine(props);
            }
        }
    }
    function setActive() {
        if ($.active.title == "Active") {
            $.active.title = "In-Active";
            $.active.status = !1;
            updateMenu();
        } else {
            $.active.title = "Active";
            $.active.status = !0;
            updateMenu();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: Alloy.CFG.colors.background,
        left: 10,
        right: 10,
        height: 110,
        selectedBackgroundColor: Alloy.CFG.colors.background,
        backgroundSelectedColor: Alloy.CFG.colors.background,
        className: "menu",
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    editMenu ? $.__views.row.addEventListener("swipe", editMenu) : __defers["$.__views.row!swipe!editMenu"] = !0;
    $.__views.__alloyId8 = Ti.UI.createView({
        id: "__alloyId8"
    });
    $.__views.row.add($.__views.__alloyId8);
    $.__views.title = Ti.UI.createTextField({
        hintText: "Wine Name",
        color: Alloy.CFG.colors.white,
        left: 10,
        top: 5,
        width: "48%",
        font: {
            fontWeight: "bold",
            fontSize: "15"
        },
        horizontalWrap: !1,
        editable: !1,
        bubbleParent: !1,
        id: "title"
    });
    $.__views.__alloyId8.add($.__views.title);
    updateMenu ? $.__views.title.addEventListener("return", updateMenu) : __defers["$.__views.title!return!updateMenu"] = !0;
    updateMenu ? $.__views.title.addEventListener("blur", updateMenu) : __defers["$.__views.title!blur!updateMenu"] = !0;
    $.__views.winery = Ti.UI.createTextField({
        hintText: "Winery",
        color: Alloy.CFG.colors.white,
        right: 10,
        top: 5,
        width: "38%",
        font: {
            fontStyle: "italic"
        },
        textAlign: "right",
        editable: !1,
        paddingRight: 5,
        id: "winery"
    });
    $.__views.__alloyId8.add($.__views.winery);
    updateMenu ? $.__views.winery.addEventListener("return", updateMenu) : __defers["$.__views.winery!return!updateMenu"] = !0;
    updateMenu ? $.__views.winery.addEventListener("blur", updateMenu) : __defers["$.__views.winery!blur!updateMenu"] = !0;
    $.__views.priceContainer = Ti.UI.createView({
        left: 10,
        right: 10,
        top: 80,
        height: 20,
        layout: "horizontal",
        id: "priceContainer"
    });
    $.__views.__alloyId8.add($.__views.priceContainer);
    $.__views.glassContainer = Ti.UI.createView({
        layout: "horizontal",
        width: "33%",
        bottom: 5,
        left: 0,
        id: "glassContainer"
    });
    $.__views.priceContainer.add($.__views.glassContainer);
    $.__views.glassLabel = Ti.UI.createLabel({
        left: 0,
        width: Ti.UI.SIZE,
        font: {
            fontStyle: "italic"
        },
        color: Alloy.CFG.colors.white,
        text: "glass $",
        id: "glassLabel"
    });
    $.__views.glassContainer.add($.__views.glassLabel);
    $.__views.glass_price = Ti.UI.createTextField({
        hintText: "Price",
        color: Alloy.CFG.colors.white,
        font: {},
        editable: !1,
        right: 0,
        textAlign: "left",
        id: "glass_price"
    });
    $.__views.glassContainer.add($.__views.glass_price);
    updateMenu ? $.__views.glass_price.addEventListener("return", updateMenu) : __defers["$.__views.glass_price!return!updateMenu"] = !0;
    updateMenu ? $.__views.glass_price.addEventListener("blur", updateMenu) : __defers["$.__views.glass_price!blur!updateMenu"] = !0;
    $.__views.bottleContainer = Ti.UI.createView({
        layout: "horizontal",
        width: "33%",
        bottom: 5,
        id: "bottleContainer"
    });
    $.__views.priceContainer.add($.__views.bottleContainer);
    $.__views.bottleLabel = Ti.UI.createLabel({
        left: 0,
        width: Ti.UI.SIZE,
        font: {
            fontStyle: "italic"
        },
        color: Alloy.CFG.colors.white,
        text: "bottle $",
        id: "bottleLabel"
    });
    $.__views.bottleContainer.add($.__views.bottleLabel);
    $.__views.bottle_price = Ti.UI.createTextField({
        hintText: "Price",
        color: Alloy.CFG.colors.white,
        font: {},
        editable: !1,
        right: 0,
        textAlign: "left",
        id: "bottle_price"
    });
    $.__views.bottleContainer.add($.__views.bottle_price);
    updateMenu ? $.__views.bottle_price.addEventListener("return", updateMenu) : __defers["$.__views.bottle_price!return!updateMenu"] = !0;
    updateMenu ? $.__views.bottle_price.addEventListener("blur", updateMenu) : __defers["$.__views.bottle_price!blur!updateMenu"] = !0;
    $.__views.caseContainer = Ti.UI.createView({
        layout: "horizontal",
        width: "33%",
        bottom: 5,
        right: 0,
        id: "caseContainer"
    });
    $.__views.priceContainer.add($.__views.caseContainer);
    $.__views.caseLabel = Ti.UI.createLabel({
        left: 0,
        width: Ti.UI.SIZE,
        font: {
            fontStyle: "italic"
        },
        color: Alloy.CFG.colors.white,
        text: "case $",
        id: "caseLabel"
    });
    $.__views.caseContainer.add($.__views.caseLabel);
    $.__views.case_price = Ti.UI.createTextField({
        hintText: "Price",
        color: Alloy.CFG.colors.white,
        font: {},
        editable: !1,
        right: 0,
        textAlign: "left",
        id: "case_price"
    });
    $.__views.caseContainer.add($.__views.case_price);
    updateMenu ? $.__views.case_price.addEventListener("return", updateMenu) : __defers["$.__views.case_price!return!updateMenu"] = !0;
    updateMenu ? $.__views.case_price.addEventListener("blur", updateMenu) : __defers["$.__views.case_price!blur!updateMenu"] = !0;
    $.__views.description = Ti.UI.createTextArea({
        color: Alloy.CFG.colors.white,
        backgroundColor: "transparent",
        hintText: "Wine Description",
        top: 30,
        height: 45,
        left: 10,
        font: {
            fontStyle: "italic"
        },
        right: 10,
        horizontalWrap: !1,
        editable: !1,
        scrollable: !1,
        id: "description"
    });
    $.__views.__alloyId8.add($.__views.description);
    updateMenu ? $.__views.description.addEventListener("return", updateMenu) : __defers["$.__views.description!return!updateMenu"] = !0;
    updateMenu ? $.__views.description.addEventListener("blur", updateMenu) : __defers["$.__views.description!blur!updateMenu"] = !0;
    $.__views.adminContainer = Ti.UI.createView({
        top: 110,
        visible: !1,
        height: 35,
        id: "adminContainer"
    });
    $.__views.__alloyId8.add($.__views.adminContainer);
    $.__views.active = Ti.UI.createButton({
        title: "Active",
        right: 10,
        width: "30%",
        height: 30,
        bottom: 2,
        id: "active"
    });
    $.__views.adminContainer.add($.__views.active);
    setActive ? $.__views.active.addEventListener("click", setActive) : __defers["$.__views.active!click!setActive"] = !0;
    $.__views.order = Ti.UI.createTextField({
        hintText: "order",
        left: 10,
        width: "30%",
        height: 30,
        bottom: 2,
        backgroundColor: Alloy.CFG.colors.white,
        id: "order"
    });
    $.__views.adminContainer.add($.__views.order);
    updateMenu ? $.__views.order.addEventListener("return", updateMenu) : __defers["$.__views.order!return!updateMenu"] = !0;
    updateMenu ? $.__views.order.addEventListener("blur", updateMenu) : __defers["$.__views.order!blur!updateMenu"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || null, acs = require("acs");
    $.row.args = args ? args : null;
    $.title.value = args ? args.title : "";
    $.winery.value = args ? args.winery : "";
    $.bottle_price.value = args ? args.bottle_price : "";
    $.glass_price.value = args ? args.glass_price : "";
    $.case_price.value = args ? args.case_price : "";
    $.description.value = args ? args.description : "Wine Description";
    $.order.value = args ? args.order : "";
    if (args && !args.active) {
        $.active.status = !1;
        $.active.title = "In-Active";
        $.row.backgroundColor = Alloy.CFG.colors.black;
    }
    args || Ti.App.Properties.getString("acs.role") == "staff" && editMenu({
        direction: "left"
    });
    $.description.addEventListener("focus", function(evt) {
        evt.value == "Wine Description" && (evt.value = "");
    });
    $.description.addEventListener("blur", function(evt) {
        evt.value == "" && (evt.value = "Wine Description");
    });
    __defers["$.__views.row!swipe!editMenu"] && $.__views.row.addEventListener("swipe", editMenu);
    __defers["$.__views.title!return!updateMenu"] && $.__views.title.addEventListener("return", updateMenu);
    __defers["$.__views.title!blur!updateMenu"] && $.__views.title.addEventListener("blur", updateMenu);
    __defers["$.__views.winery!return!updateMenu"] && $.__views.winery.addEventListener("return", updateMenu);
    __defers["$.__views.winery!blur!updateMenu"] && $.__views.winery.addEventListener("blur", updateMenu);
    __defers["$.__views.glass_price!return!updateMenu"] && $.__views.glass_price.addEventListener("return", updateMenu);
    __defers["$.__views.glass_price!blur!updateMenu"] && $.__views.glass_price.addEventListener("blur", updateMenu);
    __defers["$.__views.bottle_price!return!updateMenu"] && $.__views.bottle_price.addEventListener("return", updateMenu);
    __defers["$.__views.bottle_price!blur!updateMenu"] && $.__views.bottle_price.addEventListener("blur", updateMenu);
    __defers["$.__views.case_price!return!updateMenu"] && $.__views.case_price.addEventListener("return", updateMenu);
    __defers["$.__views.case_price!blur!updateMenu"] && $.__views.case_price.addEventListener("blur", updateMenu);
    __defers["$.__views.description!return!updateMenu"] && $.__views.description.addEventListener("return", updateMenu);
    __defers["$.__views.description!blur!updateMenu"] && $.__views.description.addEventListener("blur", updateMenu);
    __defers["$.__views.active!click!setActive"] && $.__views.active.addEventListener("click", setActive);
    __defers["$.__views.order!return!updateMenu"] && $.__views.order.addEventListener("return", updateMenu);
    __defers["$.__views.order!blur!updateMenu"] && $.__views.order.addEventListener("blur", updateMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;