// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// var acs = require("acs");
Ti.App.addEventListener("resume", function(){
    var messageCenter = Alloy.createWidget("MessageCenter");

    Ti.Network.registerForPushNotifications({
        types:[
            Ti.Network.NOTIFICATION_TYPE_BADGE,
            Ti.Network.NOTIFICATION_TYPE_ALERT,
            Ti.Network.NOTIFICATION_TYPE_SOUND
        ],
        success: function(e) {
    
        },
        error: function(e) {
    
        },
        callback: function(e) {
            var data = e.data;
            var type = (data.type) ? data.type : "text";
            var content = (data.content) ? data.content : data.alert;
    
            messageCenter.createMessage({
                title: data.alert,
                type: type,
                content: content
            });
    
            // Automatically open the detail window with this specific notification
            var detail = Alloy.createWidget("MessageCenter", "type/detail." + type, {
                title: data.alert,
                content: content,
                modal: true
            });
            detail.window.open({ modal: true });
        }
    });
});

// 
// function resumeActions(evt){
    // Titanium.UI.iPhone.setAppBadge(0);
    // var acs = require('acs');
    // acs.getDeviceToken();
    // if(Ti.App.Properties.hasProperty("acs.pushPayload")){
        // var payload = JSON.parse(Ti.App.Properties.getString("acs.pushPayload"));
        // //Open modal window with webview;
        // alert(payload);
        // Ti.App.Properties.removeProperty("acs.pushPayload");
    // }
// }
