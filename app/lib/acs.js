var Cloud = require("ti.cloud");
Ti.App.Properties.setString("acs.loggedIn", false);
module.exports = {
    getWines: function(params){
        Cloud.Objects.query({
            classname: 'wines',
            page: params.page || 1,
            per_page: params.per_page || 10,
            where: params.where || {
                active: true
            }
        }, function (e) {
            params.callback(e);
            //Ti.API.info("ACS getWines: "+JSON.stringify(e));
        }); 
    },
    updateWine: function(params){
        Cloud.Objects.update({
            classname: 'wines',
            id:params.id,
            fields:params.fields
        }, function (e) {
            params.callback(e);
            //Ti.API.info("ACS getWines: "+JSON.stringify(e));
        }); 
    },
    checkLogin: function(){
        if(!Ti.App.Properties.hasProperty("acs.uuid")){
            return "never"
        } else {
            return Ti.App.Properties.getString("acs.loggedIn");
        }
    },
    createUser: function(params){
        Ti.App.Properties.setString("acs.uuid", Ti.Platform.createUUID());
        Ti.App.Properties.setString("acs.password",Ti.App.Properties.getString("acs.uuid").substring(0, 20));
        Cloud.Users.create({
            username: Ti.App.Properties.getString("acs.uuid"),
            password: Ti.App.Properties.getString("acs.password"),
            password_confirmation: Ti.App.Properties.getString("acs.password")
        }, function (e) {
            if (e.success) {
                // var user = e.users[0];
                params.callback();
                Ti.App.Properties.setString("acs.loggedIn", true);
            } else {
                alert('Error:\\n' +
                    ((e.error && e.message) || JSON.stringify(e)));
            }
        });
    },
    login: function(params){
        var username = Ti.App.Properties.getString("acs.uuid");
        var password = Ti.App.Properties.getString("acs.password");
        if(params && params.username){
            username = params.username;
        }
        
        if(params && params.password){
            password = params.password;
        }
        
        Cloud.Users.login({
            login: username,
            password: password
        }, function (e) {
            if(e.success){
                Ti.App.Properties.setString("acs.loggedIn", true);
                Ti.API.info("ACS Login: "+JSON.stringify(e));
            }
            params.callback(e);
            
        });
        
    },
    logout: function(params){
        
        Cloud.Users.logout(
            function (e) {
                params.callback(e);
                Ti.App.Properties.setString("acs.loggedIn", false);
                Ti.API.info("ACS Logout: "+JSON.stringify(e))
            }
        );
        
    },
    pushSubscribe: function (params){
        if(Ti.Platform.name == "iPhone OS"){
            var os = "ios";
        } else {
            var os = Ti.Platform.name;
        }
        Cloud.PushNotifications.subscribe({
            channel: params?params.channel:"main",
            device_token: Ti.App.Properties.getString("acs.device_token"),
            type: os
        }, function (e) {
            params.callback(e);
            Ti.API.info("ACS Subscribe: "+JSON.stringify(e))
        });

    },
    getDeviceToken: function(callback){
        Ti.API.info("REGISTERING LOCAL PUSH");
        Titanium.Network.registerForPushNotifications({
            types: [
                Titanium.Network.NOTIFICATION_TYPE_BADGE,
                Titanium.Network.NOTIFICATION_TYPE_ALERT,
                Titanium.Network.NOTIFICATION_TYPE_SOUND
            ],
            success:function(e)
            {
                Ti.App.Properties.setString("acs.device_token",e.deviceToken);
                params.callback(e.deviceToken);
            },
            error:function(e)
            {
                alert("Error during registration: "+e.error);
            },
            callback:function(e)
            {
            // called when a push notification is received.
                //alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
                var alertDialog = Ti.UI.createAlertDialog({
                    title:"Cellar Notification",
                    message:e.data.alert
                });
                alertDialog.show();   
            }});
    
    }
}