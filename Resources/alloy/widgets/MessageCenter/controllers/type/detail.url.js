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

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;