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
            if ("staff" == Ti.App.Properties.getString("acs.role")) {
                var row = Alloy.createController("menuRow").getView();
                rows.push(row);
            }
            $.menu.setData(rows);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win2 = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.colors.background,
        navBarHidden: "true",
        layout: "vertical",
        id: "win2"
    });
    $.__views.win2 && $.addTopLevelView($.__views.win2);
    $.__views.header = Alloy.createController("header", {
        id: "header",
        __parentSymbol: $.__views.win2
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
        "staff" == Ti.App.Properties.getString("acs.role") && (params.where = {
            archive: false
        });
        loadWines(params);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;