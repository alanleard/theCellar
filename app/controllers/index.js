var acs = require("acs");
Ti.App.Properties.setString("acs.role", null);
if(acs.checkLogin() =="never"){
    acs.createUser({callback:acs.getDeviceToken(acs.pushSubscribe)});
} else{
    acs.login();
}

$.index.open();
