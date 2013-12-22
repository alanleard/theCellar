var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.App.addEventListener("resume", function() {
    var messageCenter = Alloy.createWidget("MessageCenter");
    Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: function() {},
        error: function() {},
        callback: function(e) {
            var data = e.data;
            var type = data.type ? data.type : "text";
            var content = data.content ? data.content : data.alert;
            messageCenter.createMessage({
                title: data.alert,
                type: type,
                content: content
            });
            var detail = Alloy.createWidget("MessageCenter", "type/detail." + type, {
                title: data.alert,
                content: content,
                modal: true
            });
            detail.window.open({
                modal: true
            });
        }
    });
});

Alloy.createController("index");