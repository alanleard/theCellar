var acs = require("acs");
var logoutBtn = $.header.button
logoutBtn.backgroundImage = "logout.png";

logoutBtn.addEventListener("click", logout);



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
        $.loginView.hide();
        logoutBtn.show();
        acs.pushSubscribe();
        if(Ti.App.Properties.getString("acs.role")=="staff"){
            $.notifyView.show();
        }
        
    } else {
        alert("Please try again.")
    }
};

function logoutAlert(e){
    if(e.success){
        logoutBtn.hide();
        $.notifyView.hide();
        $.loginView.show();
        Ti.App.Properties.setString("acs.role", null);
    } else {
        alert("Please try again.")
    }
};

function sendBroadcast(evt){
    acs.sendBroadcast({
        message:$.message.value,
        badge:$.badge.value,
        payload:null
    })
}
