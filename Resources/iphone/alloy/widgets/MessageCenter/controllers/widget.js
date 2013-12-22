function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "MessageCenter/" + s : s.substring(0, index) + "/MessageCenter/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("MessageCenter");
    this.__widgetId = "MessageCenter";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        modal: true,
        backgroundColor: "#fff",
        navBarHidden: true,
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.screenWindow = Ti.UI.createWindow({
        id: "screenWindow",
        title: "Messages"
    });
    $.__views.closeButton = Ti.UI.createButton({
        title: "Close",
        id: "closeButton"
    });
    $.__views.screenWindow.leftNavButton = $.__views.closeButton;
    $.__views.messageList = Ti.UI.createTableView({
        editable: true,
        id: "messageList"
    });
    $.__views.screenWindow.add($.__views.messageList);
    $.__views.navgroup = Ti.UI.iPhone.createNavigationGroup({
        barColor: Alloy.CFG.backgroundColor,
        window: $.__views.screenWindow,
        id: "navgroup"
    });
    $.__views.window.add($.__views.navgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.params = arguments[0];
    $.createMessage = function(_data) {
        var messages = Ti.App.Properties.getList("MESSAGE_CENTER_WIDGET_DATA") || [];
        messages.push(_data);
        Ti.App.Properties.setList("MESSAGE_CENTER_WIDGET_DATA", messages);
    };
    $.getMessages = function() {
        return Ti.App.Properties.getList("MESSAGE_CENTER_WIDGET_DATA") || [];
    };
    $.getMessage = function(_index) {
        var messages = Ti.App.Properties.getList("MESSAGE_CENTER_WIDGET_DATA");
        return messages[_index];
    };
    $.removeMessage = function(_index) {
        var messages = $.getMessages();
        messages.splice(_index, 1);
        Ti.App.Properties.setList("MESSAGE_CENTER_WIDGET_DATA", messages);
    };
    $.open = function() {
        var data = $.getMessages();
        var rows = [];
        if (data.length > 0) data.forEach(function(_message) {
            var row = Ti.UI.createTableViewRow({
                title: _message.title || _message.content,
                type: _message.type,
                font: {
                    fontSize: 14
                },
                color: "#222",
                hasChild: true,
                height: 50
            });
            rows.push(row);
        }); else {
            var row = Ti.UI.createTableViewRow({
                title: "You have no messages",
                font: {
                    fontSize: 14
                },
                color: "#222",
                height: 50
            });
            rows.push(row);
        }
        $.messageList.setData(rows);
        $.window.open();
    };
    $.close = function() {
        $.window.close();
    };
    $.handleRowClick = function(_event) {
        var index = _event.index;
        var type = _event.row.type;
        if (null !== index && type) {
            var detail = Alloy.createWidget("MessageCenter", "type/detail." + type, $.getMessage(index));
            $.navgroup.open(detail.window);
        }
    };
    $.closeButton.addEventListener("click", $.close);
    $.messageList.addEventListener("click", $.handleRowClick);
    $.messageList.addEventListener("delete", function(_event) {
        $.removeMessage(_event.index);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;