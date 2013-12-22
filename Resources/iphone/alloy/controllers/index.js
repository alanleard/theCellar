function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId3 = [];
    $.__views.__alloyId5 = Alloy.createController("events", {
        id: "__alloyId5"
    });
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.__alloyId5.getViewEx({
            recurse: true
        }),
        title: "Events",
        icon: "KS_nav_ui.png",
        id: "__alloyId4"
    });
    __alloyId3.push($.__views.__alloyId4);
    $.__views.__alloyId7 = Alloy.createController("menu", {
        id: "__alloyId7"
    });
    $.__views.__alloyId6 = Ti.UI.createTab({
        window: $.__views.__alloyId7.getViewEx({
            recurse: true
        }),
        title: "Menu",
        icon: "KS_nav_ui.png",
        id: "__alloyId6"
    });
    __alloyId3.push($.__views.__alloyId6);
    $.__views.__alloyId9 = Alloy.createController("options", {
        id: "__alloyId9"
    });
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9.getViewEx({
            recurse: true
        }),
        title: "Options",
        icon: "KS_nav_ui.png",
        id: "__alloyId8"
    });
    __alloyId3.push($.__views.__alloyId8);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId3,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    Ti.App.Properties.setString("acs.role", null);
    "never" == acs.checkLogin() ? acs.createUser({
        callback: acs.getDeviceToken(acs.pushSubscribe)
    }) : acs.login();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;