function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "MessageCenter/" + s : s.substring(0, index) + "/MessageCenter/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("MessageCenter");
    this.__widgetId = "MessageCenter";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "type/detail.map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.wrapper = Ti.UI.createView({
        id: "wrapper"
    });
    $.__views.window.add($.__views.wrapper);
    var __alloyId1 = [];
    $.__views.map = Ti.Map.createView({
        annotations: __alloyId1,
        ns: Ti.Map,
        id: "map"
    });
    $.__views.wrapper.add($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.params = arguments[0];
    $.map.region = {
        latitude: $.params.content.latitude,
        longitude: $.params.content.longitude,
        latitudeDelta: .1,
        longitudeDelta: .1,
        animate: true
    };
    var annotation = Ti.Map.createAnnotation({
        latitude: $.params.content.latitude,
        longitude: $.params.content.longitude,
        title: "Marker",
        subtitle: $.params.title ? $.params.title : $.params.content.title,
        animate: true,
        rightButton: Ti.UI.iPhone.SystemButton.INFO_LIGHT
    });
    $.map.addAnnotation(annotation);
    $.map.addEventListener("click", function(_event) {
        "rightButton" === _event.clicksource && Ti.UI.createAlertDialog({
            title: $.params.content.latitude + " " + $.params.content.longitude,
            message: $.params.title
        }).show();
    });
    if ($.params.modal) {
        $.window.title = $.params.title || "Notification";
        $.window.rightNavButton = function() {
            var button = Ti.UI.createButton({
                title: "Close"
            });
            button.addEventListener("click", function() {
                $.window.close();
            });
            return button;
        }();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;