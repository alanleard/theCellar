var Cloud = require("ti.cloud");
Ti.App.Properties.setString("acs.loggedIn", false);
module.exports = {
    getWines: function(params, callback){
        if(!params){
            var params = {};
        }
        Ti.API.info("Getting Wines...");
        
        Cloud.Objects.query({
            classname: 'wines',
            page: params.page || 1,
            per_page: params.per_page || 10,
            order:'-order',
            where: params.where?params.where:{
                active: true,
                archive:false
            }
        }, function (e) {
           // if(params.callback){
                if(callback){callback(e);}
            //    }
            Ti.API.info("ACS getWines: "+JSON.stringify(e));
        }); 
    },
    updateWine: function(params){
        if(params){
            Cloud.Objects.update({
                classname: 'wines',
                id:params.id,
                fields:params.fields
            }, function (e) {
                Ti.API.info("ACS getWines: "+JSON.stringify(e));
                params.callback && params.callback(e);
                
            }); 
         }
    },
    createWine: function(params){
        if(params){
            params.fields.archive=false;
            Cloud.Objects.create({
                classname: 'wines',
                fields:params.fields
            }, function (e) {
                params.callback && params.callback(e.wines[0]);
                //Ti.API.info("ACS getWines: "+JSON.stringify(e));
            });
        }
    },
    checkLogin: function(){
        if(!Ti.App.Properties.hasProperty("acs.uuid")){
            return "never";
        } else {
            return Ti.App.Properties.getString("acs.loggedIn");
        }
    },
    createUser: function(params){
        if(!params){
            var params = {};
        }
        Ti.App.Properties.setString("acs.uuid", Ti.Platform.createUUID());
        Ti.App.Properties.setString("acs.password",Ti.App.Properties.getString("acs.uuid").substring(0, 20));
        Cloud.Users.create({
            username: Ti.App.Properties.getString("acs.uuid"),
            password: Ti.App.Properties.getString("acs.password"),
            password_confirmation: Ti.App.Properties.getString("acs.password")
        }, function (e) {
            if (e.success) {
                // var user = e.users[0];
                params.callback && params.callback(e);
                Ti.App.Properties.setString("acs.loggedIn", true);
            } else {
                alert('Error:\\n' +
                    ((e.error && e.message) || JSON.stringify(e)));
            }
        });
    },
    login: function(params){
        if(!params){
            var params = {};
        }
        var username = Ti.App.Properties.getString("acs.uuid");
        var password = Ti.App.Properties.getString("acs.password");
        if(params.username){
            username = params.username;
        }
        
        if(params.password){
            password = params.password;
        }
        
        Cloud.Users.login({
            login: username,
            password: password
        }, function (e) {
            if(e.success){
                Ti.App.Properties.setString("acs.loggedIn", true);
                Ti.App.Properties.setString("acs.role", e.users[0].role);
                Ti.API.info("ACS Login: "+JSON.stringify(e));
            }
            params.callback && params.callback(e);
            
        });
        
    },
    logout: function(params){
        if(!params){
            var params = {};
        }
        
        Cloud.Users.logout(
            function (e) {
                params.callback && params.callback(e);
                Ti.App.Properties.setString("acs.loggedIn", false);
                Ti.App.Properties.setString("acs.role", null);
                Ti.API.info("ACS Logout: "+JSON.stringify(e));
            }
        );
        
    },
    sendBroadcast: function(params){
        if(params){
            Cloud.PushNotifications.notify({
                channel: 'main',
                payload: {
                    alert:params.message,
                    badge:params.badge || 0,
                    sound: "default",
                    content:params.content ||null,
                    type:params.type || "text"}
                
            }, function (e) {
                if (e.success) {
                    alert('Broadcast Sent!');
                    
                } else {
                    alert('Error:\\n' +
                        ((e.error && e.message) || JSON.stringify(e)));
                }
            });
        }
    },
    pushSubscribe: function (params){
        if(Ti.App.Properties.getString("acs.loggedIn")){
            if(!params){
                var params = {};
            }
            if(Ti.Platform.name == "iPhone OS"){
                var os = "ios";
            } else {
                var os = Ti.Platform.name;
            }
            Cloud.PushNotifications.subscribe({
                channel: "test",
                device_token: Ti.App.Properties.getString("acs.device_token"),
                type: os
            }, function (e) {
                params.callback && params.callback(e);
                Ti.API.info("ACS Subscribe: "+JSON.stringify(e));
            });
        }
    },
    getDeviceToken: function(params){
        
        Ti.API.info("REGISTERING LOCAL PUSH");
        Titanium.Network.registerForPushNotifications({
            types: [
                Titanium.Network.NOTIFICATION_TYPE_BADGE,
                Titanium.Network.NOTIFICATION_TYPE_ALERT,
                Titanium.Network.NOTIFICATION_TYPE_SOUND
            ],
            success:function(e)
            {
               if(params.type != 'resume'){
                   if(e && e.deviceToken){
                        Ti.App.Properties.setString("acs.device_token",e.deviceToken);
                        if(params._callback){params._callback(e.deviceToken);}
                    }
                }
                
            },
            error:function(e)
            {
                alert("Error during registration: "+e.error);
            },
            callback:function(e)
            {
            // called when a push notification is received.
                //alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
                if(e.data.payload){
                    Ti.App.Properties.setString("acs.pushPayload", e.data.payload);
                }
                var alertDialog = Ti.UI.createAlertDialog({
                    title:"Cellar Notification",
                    message:e.data.alert
                });
                alertDialog.show();   

            }});
    
    }
};