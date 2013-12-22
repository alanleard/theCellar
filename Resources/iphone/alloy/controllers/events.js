function Controller() {
    function loadCalendar() {
        var moment = require("alloy/moment");
        var today = moment().format();
        var url = "https://www.googleapis.com/calendar/v3/calendars/222wine.com_8pq7bb06bf07m4m1n6ju8r39lk%40group.calendar.google.com/events?maxResults=30&orderBy=startTime&singleEvents=true&timeMin=" + today + "&fields=items(description%2Cend%2ChtmlLink%2Cid%2Clocation%2Cstart%2Csummary)&key=AIzaSyBiQv5wzzGeYbbDYtppNt6ktCP6b_U3BF0";
        var client = Ti.Network.createHTTPClient({
            tlsVersion: Titanium.Network.TLS_VERSION_1_0,
            onload: function() {
                var data = JSON.parse(this.responseText).items;
                var rows = [];
                for (var i in data) {
                    var row = Alloy.createController("eventRow", data[i]).getView();
                    rows.push(row);
                }
                $.events.data = rows;
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function calendarClick(e) {
        if (e.rowData.args) {
            var container = Ti.UI.createView();
            var webView = Ti.UI.createWebView({
                top: 100,
                bottom: 200,
                left: 50,
                right: 50,
                url: e.rowData.args.htmlLink
            });
            container.add(webView);
            var win = $.events.getParent();
            win.add(container);
            container.addEventListener("click", function() {
                win.remove(container);
                container = null;
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win1 = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.colors.background,
        navBarHidden: "true",
        layout: "vertical",
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    $.__views.header = Alloy.createController("header", {
        id: "header",
        __parentSymbol: $.__views.win1
    });
    $.__views.header.setParent($.__views.win1);
    $.__views.__alloyId2 = Ti.UI.createSearchBar({
        barColor: Alloy.CFG.colors.black,
        id: "__alloyId2"
    });
    $.__views.events = Ti.UI.createTableView({
        top: 0,
        backgroundColor: Alloy.CFG.colors.background,
        left: 0,
        right: 0,
        filterAttribute: "args",
        searchHidden: true,
        search: $.__views.__alloyId2,
        id: "events"
    });
    $.__views.win1.add($.__views.events);
    calendarClick ? $.__views.events.addEventListener("click", calendarClick) : __defers["$.__views.events!click!calendarClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    loadCalendar();
    $.header.button.show();
    $.header.button.addEventListener("click", loadCalendar);
    __defers["$.__views.events!click!calendarClick"] && $.__views.events.addEventListener("click", calendarClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;