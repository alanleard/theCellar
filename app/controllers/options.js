var acs = require("acs");

function login(){
    $.password.blur();
    $.username.blur();
    if(!acs.checkLogin()){
        acs.login({username:$.username.value,password:$.password.value,callback:loginAlert});
    } else{
        acs.logout(acs.login({username:$.username.value,password:$.password.value,callback:loginAlert}));
    }
    
}

function logout(){
    acs.logout({callback:logoutAlert});
}

function loginAlert(e){
    if(e.success){
        $.username.hide();
        $.password.hide();
        $.login.hide();
        $.logout.show();
        acs.pushSubscribe();
        Ti.App.Properties.setString("acs.role", e.users[0].role);
    } else {
        alert("Please try again.")
    }
};

function logoutAlert(e){
    if(e.success){
        $.logout.hide();
        $.username.show();
        $.password.show();
        $.login.show();
        Ti.App.Properties.setString("acs.role", null);
    } else {
        alert("Please try again.")
    }
};