function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "MessageCenter/" + s : s.substring(0, index) + "/MessageCenter/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("MessageCenter");
    this.__widgetId = "MessageCenter";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "type/detail.url";
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
    $.__views.content = Ti.UI.createWebView({
        id: "content"
    });
    $.__views.wrapper.add($.__views.content);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.params = arguments[0];
    Ti.Network.online ? $.params.content && ($.content.url = $.params.content) : $.wrapper.add(Ti.UI.createLabel({
        text: "You must be online to view this message",
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        textAlign: "center"
    }));
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