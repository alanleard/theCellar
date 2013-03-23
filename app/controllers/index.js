var acs = require("acs");

if(acs.checkLogin() =="never"){
    acs.createUser({callback:acs.getDeviceToken(acs.pushSubscribe)});
} else{
    acs.login();
}

$.index.open();
