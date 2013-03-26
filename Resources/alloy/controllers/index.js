function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId3 = Alloy.createController("events", {
        id: "__alloyId3"
    });
    $.__views.__alloyId2 = Ti.UI.createTab({
        window: $.__views.__alloyId3.getViewEx({
            recurse: !0
        }),
        title: "Events",
        icon: "KS_nav_ui.png",
        id: "__alloyId2"
    });
    $.__views.index.addTab($.__views.__alloyId2);
    $.__views.__alloyId5 = Alloy.createController("menu", {
        id: "__alloyId5"
    });
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.__alloyId5.getViewEx({
            recurse: !0
        }),
        title: "Menu",
        icon: "KS_nav_ui.png",
        id: "__alloyId4"
    });
    $.__views.index.addTab($.__views.__alloyId4);
    $.__views.__alloyId7 = Alloy.createController("options", {
        id: "__alloyId7"
    });
    $.__views.__alloyId6 = Ti.UI.createTab({
        window: $.__views.__alloyId7.getViewEx({
            recurse: !0
        }),
        title: "Options",
        icon: "KS_nav_ui.png",
        id: "__alloyId6"
    });
    $.__views.index.addTab($.__views.__alloyId6);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    Ti.App.Properties.setString("acs.role", null);
    acs.checkLogin() == "never" ? acs.createUser({
        callback: acs.getDeviceToken(acs.pushSubscribe)
    }) : acs.login();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;