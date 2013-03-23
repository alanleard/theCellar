function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.header = Ti.UI.createView({
        backgroundColor: Alloy.CFG.colors.background,
        height: 62,
        id: "header"
    });
    $.addTopLevelView($.__views.header);
    $.__views.logo = Ti.UI.createLabel({
        font: Alloy.CFG.fonts.title,
        top: 10,
        left: 10,
        color: Alloy.CFG.colors.text.main,
        text: "theCellar",
        id: "logo"
    });
    $.__views.header.add($.__views.logo);
    $.__views.underline = Ti.UI.createView({
        height: 1,
        width: "fill",
        top: 60,
        left: 0,
        backgroundColor: Alloy.CFG.colors.text.main,
        id: "underline"
    });
    $.__views.header.add($.__views.underline);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;