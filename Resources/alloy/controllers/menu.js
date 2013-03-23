function Controller() {
    function loadWines() {
        acs.getWines({
            callback: function(data) {
                if (data.success) {
                    var rows = [];
                    for (var i in data.wines) {
                        var row = Alloy.createController("menuRow", data.wines[i]).getView();
                        rows.push(row);
                    }
                    $.menu.setData(rows);
                }
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.__alloyId11 = Ti.UI.createSearchBar({
        barColor: Alloy.CFG.colors.black,
        id: "__alloyId11"
    });
    $.__views.menu = Ti.UI.createTableView({
        top: 0,
        backgroundColor: Alloy.CFG.colors.background,
        left: 0,
        right: 0,
        filterAttribute: "searchable",
        searchHidden: !0,
        search: $.__views.__alloyId11,
        id: "menu"
    });
    $.addTopLevelView($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    acs.checkLogin() ? loadWines() : acs.login({
        callback: loadWines
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;