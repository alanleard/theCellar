var acs = require("acs");
var logoutBtn = $.header.button
logoutBtn.backgroundImage = "logout.png";

if(Ti.App.Properties.getString("username")){
    $.username.value = Ti.App.Properties.getString("username");
}

logoutBtn.addEventListener("click", logout);

function login(){
    Ti.App.Properties.setString("username", $.username.value);
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
        alert("Please try again.");
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
    var confirmDialog = Ti.UI.createAlertDialog({
        title:"Send Broadcast?",
        message:"Are you sure you are ready to send this broadcast?",
        buttonNames:["Send", "Cancel"],
        cancel:1
    });
    
    confirmDialog.show();
    
    confirmDialog.addEventListener("click", function(evt){
        if(evt.index == 0){
             acs.sendBroadcast({
                message:$.message.value,
                badge:$.badge.value,
                type:$.type.value || 'text',
                content:$.content.value || ""
            });
        }
    });
   
    
}
