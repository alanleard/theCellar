function Controller() {
    function loadWines(params) {
        if (!params) var params = {};
        params.callback = populateMenu;
        acs.getWines(params, populateMenu);
    }
    function populateMenu(data) {
        if (data.success) {
            var rows = [];
            for (var i = 0, l = data.wines.length - 1; l >= i; l--) {
                Ti.API.info("Loading " + data.wines[l].title);
                var row = Alloy.createController("menuRow", data.wines[l]).getView();
                rows.push(row);
            }
            if (Ti.App.Properties.getString("acs.role") == "staff") {
                var row = Alloy.createController("menuRow").getView();
                rows.push(row);
            }
            $.menu.setData(rows);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win2 = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.colors.background,
        navBarHidden: "true",
        layout: "vertical",
        id: "win2"
    });
    $.addTopLevelView($.__views.win2);
    $.__views.header = Alloy.createController("header", {
        id: "header"
    });
    $.__views.header.setParent($.__views.win2);
    $.__views.menu = Ti.UI.createTableView({
        top: 0,
        backgroundColor: Alloy.CFG.colors.background,
        left: 0,
        right: 0,
        id: "menu"
    });
    $.__views.win2.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    acs.checkLogin() ? loadWines() : acs.login({
        callback: loadWines
    });
    $.header.button.show();
    $.header.button.addEventListener("click", function() {
        var params = {};
        Ti.App.Properties.getString("acs.role") == "staff" && (params.where = {
            archive: !1
        });
        loadWines(params);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;