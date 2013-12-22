function WPATH(s) {
    var index = s.lastIndexOf("/"), path = -1 === index ? "MessageCenter/" + s : s.substring(0, index) + "/MessageCenter/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {};
    $.__views.window = Ti.UI.createWindow({
        id: "window"
    });
    $.addTopLevelView($.__views.window);
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
        animate: !0
    };
    var annotation = Ti.Map.createAnnotation({
        latitude: $.params.content.latitude,
        longitude: $.params.content.longitude,
        title: "Marker",
        subtitle: $.params.title ? $.params.title : $.params.content.title,
        animate: !0,
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

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;