function Controller() {
    function login() {
        Ti.App.Properties.setString("username", $.username.value);
        $.password.blur();
        $.username.blur();
        acs.checkLogin() ? acs.logout(acs.login({
            username: $.username.value,
            password: $.password.value,
            callback: loginAlert
        })) : acs.login({
            username: $.username.value,
            password: $.password.value,
            callback: loginAlert
        });
    }
    function logout() {
        acs.logout({
            callback: logoutAlert
        });
    }
    function loginAlert(e) {
        if (e.success) {
            $.loginView.hide();
            logoutBtn.show();
            acs.pushSubscribe();
            "staff" == Ti.App.Properties.getString("acs.role") && $.notifyView.show();
        } else alert("Please try again.");
    }
    function logoutAlert(e) {
        if (e.success) {
            logoutBtn.hide();
            $.notifyView.hide();
            $.loginView.show();
            Ti.App.Properties.setString("acs.role", null);
        } else alert("Please try again.");
    }
    function sendBroadcast() {
        var confirmDialog = Ti.UI.createAlertDialog({
            title: "Send Broadcast?",
            message: "Are you sure you are ready to send this broadcast?",
            buttonNames: [ "Send", "Cancel" ],
            cancel: 1
        });
        confirmDialog.show();
        confirmDialog.addEventListener("click", function(evt) {
            0 == evt.index && acs.sendBroadcast({
                message: $.message.value,
                badge: $.badge.value,
                type: $.type.value || "text",
                content: $.content.value || ""
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "options";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win3 = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.colors.background,
        navBarHidden: "true",
        layout: "vertical",
        id: "win3"
    });
    $.__views.win3 && $.addTopLevelView($.__views.win3);
    $.__views.header = Alloy.createController("header", {
        id: "header",
        __parentSymbol: $.__views.win3
    });
    $.__views.header.setParent($.__views.win3);
    $.__views.__alloyId10 = Ti.UI.createView({
        id: "__alloyId10"
    });
    $.__views.win3.add($.__views.__alloyId10);
    $.__views.loginView = Ti.UI.createView({
        layout: "vertical",
        id: "loginView"
    });
    $.__views.__alloyId10.add($.__views.loginView);
    $.__views.username = Ti.UI.createTextField({
        paddingLeft: 10,
        top: 10,
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        hintText: "Username",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "username"
    });
    $.__views.loginView.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        paddingLeft: 10,
        top: 10,
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        hintText: "Password",
        passwordMask: true,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "password"
    });
    $.__views.loginView.add($.__views.password);
    login ? $.__views.password.addEventListener("return", login) : __defers["$.__views.password!return!login"] = true;
    $.__views.login = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 200,
        title: "Login",
        id: "login"
    });
    $.__views.loginView.add($.__views.login);
    login ? $.__views.login.addEventListener("click", login) : __defers["$.__views.login!click!login"] = true;
    $.__views.notifyView = Ti.UI.createView({
        layout: "vertical",
        visible: false,
        id: "notifyView"
    });
    $.__views.__alloyId10.add($.__views.notifyView);
    $.__views.message = Ti.UI.createTextField({
        paddingLeft: 10,
        top: 10,
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        hintText: "Broadcast a Message",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
        id: "message"
    });
    $.__views.notifyView.add($.__views.message);
    $.__views.content = Ti.UI.createTextField({
        paddingLeft: 10,
        top: 10,
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        hintText: "Message Content",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
        id: "content"
    });
    $.__views.notifyView.add($.__views.content);
    $.__views.type = Ti.UI.createTextField({
        paddingLeft: 10,
        top: 10,
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        hintText: "Message Type ('url','text','map')",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
        id: "type"
    });
    $.__views.notifyView.add($.__views.type);
    $.__views.badge = Ti.UI.createTextField({
        paddingLeft: 10,
        top: 10,
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        hintText: "App Badge Number?",
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        id: "badge"
    });
    $.__views.notifyView.add($.__views.badge);
    $.__views.send = Ti.UI.createButton({
        top: 10,
        title: "Send Broadcast",
        id: "send"
    });
    $.__views.notifyView.add($.__views.send);
    sendBroadcast ? $.__views.send.addEventListener("click", sendBroadcast) : __defers["$.__views.send!click!sendBroadcast"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    var logoutBtn = $.header.button;
    logoutBtn.backgroundImage = "logout.png";
    Ti.App.Properties.getString("username") && ($.username.value = Ti.App.Properties.getString("username"));
    logoutBtn.addEventListener("click", logout);
    __defers["$.__views.password!return!login"] && $.__views.password.addEventListener("return", login);
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    __defers["$.__views.send!click!sendBroadcast"] && $.__views.send.addEventListener("click", sendBroadcast);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;