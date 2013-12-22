var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.App.addEventListener("resume", function() {
    var messageCenter = Alloy.createWidget("MessageCenter");
    Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: function(e) {},
        error: function(e) {},
        callback: function(e) {
            var data = e.data, type = data.type ? data.type : "text", content = data.content ? data.content : data.alert;
            messageCenter.createMessage({
                title: data.alert,
                type: type,
                content: content
            });
            var detail = Alloy.createWidget("MessageCenter", "type/detail." + type, {
                title: data.alert,
                content: content,
                modal: !0
            });
            detail.window.open({
                modal: !0
            });
        }
    });
});

Alloy.createController("index");