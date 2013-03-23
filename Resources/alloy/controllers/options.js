function Controller() {
    function login() {
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
            $.username.hide();
            $.password.hide();
            $.login.hide();
            $.logout.show();
            acs.pushSubscribe();
            Ti.App.Properties.setString("acs.role", e.users[0].role);
        } else alert("Please try again.");
    }
    function logoutAlert(e) {
        if (e.success) {
            $.logout.hide();
            $.username.show();
            $.password.show();
            $.login.show();
            Ti.App.Properties.setString("acs.role", null);
        } else alert("Please try again.");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.options = Ti.UI.createView({
        id: "options"
    });
    $.addTopLevelView($.__views.options);
    $.__views.username = Ti.UI.createTextField({
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        paddingLeft: 10,
        top: 10,
        hintText: "Username",
        id: "username"
    });
    $.__views.options.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        height: 40,
        width: 280,
        borderColor: Alloy.CFG.colors.black,
        backgroundColor: Alloy.CFG.colors.white,
        color: Alloy.CFG.colors.black,
        paddingLeft: 10,
        top: 70,
        hintText: "Password",
        passwordMask: !0,
        id: "password"
    });
    $.__views.options.add($.__views.password);
    login ? $.__views.password.addEventListener("return", login) : __defers["$.__views.password!return!login"] = !0;
    $.__views.login = Ti.UI.createButton({
        top: 140,
        height: 40,
        width: 200,
        title: "Login",
        id: "login"
    });
    $.__views.options.add($.__views.login);
    login ? $.__views.login.addEventListener("click", login) : __defers["$.__views.login!click!login"] = !0;
    $.__views.logout = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 200,
        visible: !1,
        title: "Logout",
        id: "logout"
    });
    $.__views.options.add($.__views.logout);
    logout ? $.__views.logout.addEventListener("click", logout) : __defers["$.__views.logout!click!logout"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    __defers["$.__views.password!return!login"] && $.__views.password.addEventListener("return", login);
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;