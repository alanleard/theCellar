var Cloud = require("ti.cloud");

Ti.App.Properties.setString("acs.loggedIn", !1);

module.exports = {
    getWines: function(params, callback) {
        if (!params) var params = {};
        Ti.API.info("Getting Wines...");
        Cloud.Objects.query({
            classname: "wines",
            page: params.page || 1,
            per_page: params.per_page || 10,
            order: "-order",
            where: params.where ? params.where : {
                active: !0,
                archive: !1
            }
        }, function(e) {
            callback && callback(e);
            Ti.API.info("ACS getWines: " + JSON.stringify(e));
        });
    },
    updateWine: function(params) {
        params && Cloud.Objects.update({
            classname: "wines",
            id: params.id,
            fields: params.fields
        }, function(e) {
            params.callback(e);
        });
    },
    createWine: function(params) {
        if (params) {
            params.fields.archive = !1;
            Cloud.Objects.create({
                classname: "wines",
                fields: params.fields
            }, function(e) {
                params.callback(e.wines[0]);
            });
        }
    },
    checkLogin: function() {
        return Ti.App.Properties.hasProperty("acs.uuid") ? Ti.App.Properties.getString("acs.loggedIn") : "never";
    },
    createUser: function(params) {
        if (!params) var params = {};
        Ti.App.Properties.setString("acs.uuid", Ti.Platform.createUUID());
        Ti.App.Properties.setString("acs.password", Ti.App.Properties.getString("acs.uuid").substring(0, 20));
        Cloud.Users.create({
            username: Ti.App.Properties.getString("acs.uuid"),
            password: Ti.App.Properties.getString("acs.password"),
            password_confirmation: Ti.App.Properties.getString("acs.password")
        }, function(e) {
            if (e.success) {
                params.callback && params.callback(e);
                Ti.App.Properties.setString("acs.loggedIn", !0);
            } else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    },
    login: function(params) {
        if (!params) var params = {};
        var username = Ti.App.Properties.getString("acs.uuid"), password = Ti.App.Properties.getString("acs.password");
        params.username && (username = params.username);
        params.password && (password = params.password);
        Cloud.Users.login({
            login: username,
            password: password
        }, function(e) {
            if (e.success) {
                Ti.App.Properties.setString("acs.loggedIn", !0);
                Ti.App.Properties.setString("acs.role", e.users[0].role);
                Ti.API.info("ACS Login: " + JSON.stringify(e));
            }
            params.callback && params.callback(e);
        });
    },
    logout: function(params) {
        if (!params) var params = {};
        Cloud.Users.logout(function(e) {
            params.callback && params.callback(e);
            Ti.App.Properties.setString("acs.loggedIn", !1);
            Ti.API.info("ACS Logout: " + JSON.stringify(e));
        });
    },
    sendBroadcast: function(params) {
        params && Cloud.PushNotifications.notify({
            channel: "main",
            payload: {
                alert: params.message,
                badge: params.badge || 0,
                payload: params.payload || null
            }
        }, function(e) {
            e.success ? alert("Success") : alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    },
    pushSubscribe: function(params) {
        if (!params) var params = {};
        var os = "ios";
        Cloud.PushNotifications.subscribe({
            channel: "main",
            device_token: Ti.App.Properties.getString("acs.device_token"),
            type: os
        }, function(e) {
            params.callback && params.callback(e);
            Ti.API.info("ACS Subscribe: " + JSON.stringify(e));
        });
    },
    getDeviceToken: function(callback) {
        Ti.API.info("REGISTERING LOCAL PUSH");
        Titanium.Network.registerForPushNotifications({
            types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
            success: function(e) {
                Ti.App.Properties.setString("acs.device_token", e.deviceToken);
                callback(e.deviceToken);
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