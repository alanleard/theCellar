function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.win1 = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.colors.background,
        navBarHidden: "true",
        layout: "vertical",
        title: "Events",
        id: "win1"
    });
    $.__views.__alloyId3 = Alloy.createController("header", {
        id: "__alloyId3"
    });
    $.__views.__alloyId3.setParent($.__views.win1);
    $.__views.__alloyId4 = Alloy.createController("events", {
        id: "__alloyId4"
    });
    $.__views.__alloyId4.setParent($.__views.win1);
    $.__views.__alloyId2 = Ti.UI.createTab({
        window: $.__views.win1,
        title: "Events",
        icon: "KS_nav_ui.png",
        id: "__alloyId2"
    });
    $.__views.index.addTab($.__views.__alloyId2);
    $.__views.win2 = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.colors.background,
        navBarHidden: "true",
        layout: "vertical",
        title: "Menu",
        id: "win2"
    });
    $.__views.__alloyId6 = Alloy.createController("header", {
        id: "__alloyId6"
    });
    $.__views.__alloyId6.setParent($.__views.win2);
    $.__views.__alloyId7 = Alloy.createController("menu", {
        id: "__alloyId7"
    });
    $.__views.__alloyId7.setParent($.__views.win2);
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.win2,
        title: "Menu",
        icon: "KS_nav_ui.png",
        id: "__alloyId5"
    });
    $.__views.index.addTab($.__views.__alloyId5);
    $.__views.win3 = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.colors.background,
        navBarHidden: "true",
        layout: "vertical",
        title: "Options",
        id: "win3"
    });
    $.__views.__alloyId9 = Alloy.createController("header", {
        id: "__alloyId9"
    });
    $.__views.__alloyId9.setParent($.__views.win3);
    $.__views.__alloyId10 = Alloy.createController("options", {
        id: "__alloyId10"
    });
    $.__views.__alloyId10.setParent($.__views.win3);
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.win3,
        title: "Options",
        icon: "KS_nav_ui.png",
        id: "__alloyId8"
    });
    $.__views.index.addTab($.__views.__alloyId8);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    acs.checkLogin() == "never" ? acs.createUser({
        callback: acs.getDeviceToken(acs.pushSubscribe)
    }) : acs.login();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;