var Cloud = require("ti.cloud");

Ti.App.Properties.setString("acs.loggedIn", !1);

module.exports = {
    getWines: function(params) {
        Cloud.Objects.query({
            classname: "wines",
            page: params.page || 1,
            per_page: params.per_page || 10,
            order: "-order",
            where: params.where || {
                active: !0
            }
        }, function(e) {
            params.callback(e);
        });
    },
    updateWine: function(params) {
        Cloud.Objects.update({
            classname: "wines",
            id: params.id,
            fields: params.fields
        }, function(e) {
            params.callback(e);
        });
    },
    checkLogin: function() {
        return Ti.App.Properties.hasProperty("acs.uuid") ? Ti.App.Properties.getString("acs.loggedIn") : "never";
    },
    createUser: function(params) {
        Ti.App.Properties.setString("acs.uuid", Ti.Platform.createUUID());
        Ti.App.Properties.setString("acs.password", Ti.App.Properties.getString("acs.uuid").substring(0, 20));
        Cloud.Users.create({
            username: Ti.App.Properties.getString("acs.uuid"),
            password: Ti.App.Properties.getString("acs.password"),
            password_confirmation: Ti.App.Properties.getString("acs.password")
        }, function(e) {
            if (e.success) {
                params.callback();
                Ti.App.Properties.setString("acs.loggedIn", !0);
            } else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    },
    login: function(params) {
        var username = Ti.App.Properties.getString("acs.uuid"), password = Ti.App.Properties.getString("acs.password");
        params && params.username && (username = params.username);
        params && params.password && (password = params.password);
        Cloud.Users.login({
            login: username,
            password: password
        }, function(e) {
            if (e.success) {
                Ti.App.Properties.setString("acs.loggedIn", !0);
                Ti.API.info("ACS Login: " + JSON.stringify(e));
            }
            params.callback(e);
        });
    },
    logout: function(params) {
        Cloud.Users.logout(function(e) {
            params.callback(e);
            Ti.App.Properties.setString("acs.loggedIn", !1);
            Ti.API.info("ACS Logout: " + JSON.stringify(e));
        });
    },
    pushSubscribe: function(params) {
        var os = "ios";
        Cloud.PushNotifications.subscribe({
            channel: params ? params.channel : "main",
            device_token: Ti.App.Properties.getString("acs.device_token"),
            type: os
        }, function(e) {
            params.callback(e);
            Ti.API.info("ACS Subscribe: " + JSON.stringify(e));
        });
    },
    getDeviceToken: function(callback) {
        Ti.API.info("REGISTERING LOCAL PUSH");
        Titanium.Network.registerForPushNotifications({
            types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
            success: function(e) {
                Ti.App.Properties.setString("acs.device_token", e.deviceToken);
                params.callback(e.deviceToken);
            },
            error: function(e) {
                alert("Error during registration: " + e.error);
            },
            callback: function(e) {
                var alertDialog = Ti.UI.createAlertDialog({
                    title: "Cellar Notification",
                    message: e.data.alert
                });
                alertDialog.show();
            }
        });
    }
};