function Controller() {
    function editMenu(evt) {
        Ti.API.info("Menu Swipe: " + evt.direction + " User Role: " + Ti.App.Properties.getString("acs.role"));
        "staff" == Ti.App.Properties.getString("acs.role") && ($.adminContainer.visible ? $.adminContainer.visible && $.container.animate({
            opacity: 0,
            duration: 100
        }, function() {
            $.adminContainer.hide();
            var properties = {
                editable: false,
                backgroundColor: null,
                color: Alloy.CFG.colors.white,
                borderWidth: 0
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
            setTimeout(function() {
                $.container.animate({
                    opacity: 1,
                    duration: 250
                });
            }, 250);
        }) : $.container.animate({
            opacity: 0,
            duration: 100
        }, function() {
            var properties = {
                editable: true,
                backgroundColor: Alloy.CFG.colors.white,
                color: Alloy.CFG.colors.black,
                borderWidth: 1
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
            setTimeout(function() {
                $.container.animate({
                    opacity: 1,
                    duration: 250
                });
            }, 250);
        }));
    }
    function updateMenu(e) {
        if ("staff" == Ti.App.Properties.getString("acs.role")) {
            if (e && e.source && "bottle_price" == e.source.id) {
                $.glass_price.value = 29 > $.bottle_price.value ? Math.round($.bottle_price.value / 3) : Math.round($.bottle_price.value / 3.5);
                $.case_price.value = 12 * $.bottle_price.value;
            }
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
        if ("Set Active" == $.active.title) {
            $.active.title = "Set In-Active";
            $.active.status = true;
            updateMenu();
        } else {
            $.active.title = "Set Active";
            $.active.status = false;
            updateMenu();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menuRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
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
    $.__views.row && $.addTopLevelView($.__views.row);
    editMenu ? $.__views.row.addEventListener("swipe", editMenu) : __defers["$.__views.row!swipe!editMenu"] = true;
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.row.add($.__views.container);
    $.__views.title = Ti.UI.createTextField({
        paddingLeft: 2,
        hintText: "Wine Name",
        color: Alloy.CFG.colors.text.main,
        left: 10,
        top: 5,
        width: "48%",
        font: {
            fontWeight: "bold",
            fontSize: "15"
        },
        horizontalWrap: false,
        editable: false,
        bubbleParent: false,
        borderColor: Alloy.CFG.colors.black,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
        borderWidth: 0,
        id: "title"
    });
    $.__views.container.add($.__views.title);
    updateMenu ? $.__views.title.addEventListener("return", updateMenu) : __defers["$.__views.title!return!updateMenu"] = true;
    updateMenu ? $.__views.title.addEventListener("blur", updateMenu) : __defers["$.__views.title!blur!updateMenu"] = true;
    $.__views.winery = Ti.UI.createTextField({
        paddingLeft: 2,
        hintText: "Winery",
        color: Alloy.CFG.colors.text.main,
        right: 10,
        top: 5,
        width: "38%",
        font: {
            fontStyle: "italic"
        },
        textAlign: "right",
        editable: false,
        paddingRight: 5,
        borderColor: Alloy.CFG.colors.black,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
        borderWidth: 0,
        id: "winery"
    });
    $.__views.container.add($.__views.winery);
    updateMenu ? $.__views.winery.addEventListener("return", updateMenu) : __defers["$.__views.winery!return!updateMenu"] = true;
    updateMenu ? $.__views.winery.addEventListener("blur", updateMenu) : __defers["$.__views.winery!blur!updateMenu"] = true;
    $.__views.priceContainer = Ti.UI.createView({
        left: 10,
        right: 10,
        top: 80,
        height: 20,
        layout: "horizontal",
        id: "priceContainer"
    });
    $.__views.container.add($.__views.priceContainer);
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
        color: Alloy.CFG.colors.text.main,
        text: "glass $",
        id: "glassLabel"
    });
    $.__views.glassContainer.add($.__views.glassLabel);
    $.__views.glass_price = Ti.UI.createTextField({
        paddingLeft: 2,
        hintText: "Price  ",
        color: Alloy.CFG.colors.text.main,
        font: {},
        editable: false,
        right: 0,
        textAlign: "left",
        borderColor: Alloy.CFG.colors.black,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        borderWidth: 0,
        id: "glass_price"
    });
    $.__views.glassContainer.add($.__views.glass_price);
    updateMenu ? $.__views.glass_price.addEventListener("return", updateMenu) : __defers["$.__views.glass_price!return!updateMenu"] = true;
    updateMenu ? $.__views.glass_price.addEventListener("blur", updateMenu) : __defers["$.__views.glass_price!blur!updateMenu"] = true;
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
        color: Alloy.CFG.colors.text.main,
        text: "bottle $",
        id: "bottleLabel"
    });
    $.__views.bottleContainer.add($.__views.bottleLabel);
    $.__views.bottle_price = Ti.UI.createTextField({
        paddingLeft: 2,
        hintText: "Price  ",
        color: Alloy.CFG.colors.text.main,
        font: {},
        editable: false,
        right: 0,
        textAlign: "left",
        borderColor: Alloy.CFG.colors.black,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        borderWidth: 0,
        id: "bottle_price"
    });
    $.__views.bottleContainer.add($.__views.bottle_price);
    updateMenu ? $.__views.bottle_price.addEventListener("return", updateMenu) : __defers["$.__views.bottle_price!return!updateMenu"] = true;
    updateMenu ? $.__views.bottle_price.addEventListener("blur", updateMenu) : __defers["$.__views.bottle_price!blur!updateMenu"] = true;
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
        color: Alloy.CFG.colors.text.main,
        text: "case $",
        id: "caseLabel"
    });
    $.__views.caseContainer.add($.__views.caseLabel);
    $.__views.case_price = Ti.UI.createTextField({
        paddingLeft: 2,
        hintText: "Price  ",
        color: Alloy.CFG.colors.text.main,
        font: {},
        editable: false,
        right: 0,
        textAlign: "left",
        borderColor: Alloy.CFG.colors.black,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        borderWidth: 0,
        id: "case_price"
    });
    $.__views.caseContainer.add($.__views.case_price);
    updateMenu ? $.__views.case_price.addEventListener("return", updateMenu) : __defers["$.__views.case_price!return!updateMenu"] = true;
    updateMenu ? $.__views.case_price.addEventListener("blur", updateMenu) : __defers["$.__views.case_price!blur!updateMenu"] = true;
    $.__views.description = Ti.UI.createTextArea({
        color: Alloy.CFG.colors.text.main,
        backgroundColor: "transparent",
        hintText: "Wine Description",
        top: 30,
        height: 45,
        left: 10,
        font: {
            fontStyle: "italic"
        },
        right: 10,
        horizontalWrap: false,
        editable: false,
        scrollable: false,
        borderColor: Alloy.CFG.colors.black,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
        borderWidth: 0,
        paddingLeft: 2,
        id: "description"
    });
    $.__views.container.add($.__views.description);
    updateMenu ? $.__views.description.addEventListener("return", updateMenu) : __defers["$.__views.description!return!updateMenu"] = true;
    updateMenu ? $.__views.description.addEventListener("blur", updateMenu) : __defers["$.__views.description!blur!updateMenu"] = true;
    $.__views.adminContainer = Ti.UI.createView({
        top: 110,
        visible: false,
        height: 35,
        id: "adminContainer"
    });
    $.__views.container.add($.__views.adminContainer);
    $.__views.active = Ti.UI.createButton({
        title: "Set Active",
        right: 10,
        width: "35%",
        height: 25,
        bottom: 2,
        id: "active"
    });
    $.__views.adminContainer.add($.__views.active);
    setActive ? $.__views.active.addEventListener("click", setActive) : __defers["$.__views.active!click!setActive"] = true;
    $.__views.order = Ti.UI.createTextField({
        paddingLeft: 5,
        hintText: "order",
        left: 10,
        width: "30%",
        height: 30,
        bottom: 2,
        backgroundColor: Alloy.CFG.colors.text.main,
        borderColor: Alloy.CFG.colors.black,
        id: "order"
    });
    $.__views.adminContainer.add($.__views.order);
    updateMenu ? $.__views.order.addEventListener("return", updateMenu) : __defers["$.__views.order!return!updateMenu"] = true;
    updateMenu ? $.__views.order.addEventListener("blur", updateMenu) : __defers["$.__views.order!blur!updateMenu"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || null;
    var acs = require("acs");
    $.row.args = args ? args : null;
    $.title.value = args ? args.title : "";
    $.winery.value = args ? args.winery : "";
    $.bottle_price.value = args ? args.bottle_price : "";
    $.glass_price.value = args ? args.glass_price : "";
    $.case_price.value = args ? args.case_price : "";
    $.description.value = args ? args.description : "Wine Description";
    $.order.value = args ? args.order : "";
    if (args && !args.active) {
        $.active.status = false;
        $.active.title = "Set Active";
        $.row.backgroundColor = Alloy.CFG.colors.black;
    } else if (args && args.active) if (false == args.active) {
        $.active.status = false;
        $.active.title = "Set Active";
        $.row.backgroundColor = Alloy.CFG.colors.black;
    } else {
        $.active.status = true;
        $.active.title = "Set In-Active";
    }
    args || "staff" == Ti.App.Properties.getString("acs.role") && editMenu({
        direction: "left"
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

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;