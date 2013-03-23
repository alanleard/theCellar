function Controller() {
    function loadCalendar() {
        var moment = require("alloy/moment"), today = moment().format(), url = "https://www.googleapis.com/calendar/v3/calendars/222wine.com_8pq7bb06bf07m4m1n6ju8r39lk%40group.calendar.google.com/events?maxResults=30&orderBy=startTime&singleEvents=true&timeMin=" + today + "&fields=items(description%2Cend%2ChtmlLink%2Cid%2Clocation%2Cstart%2Csummary)&key=AIzaSyBiQv5wzzGeYbbDYtppNt6ktCP6b_U3BF0", client = Ti.Network.createHTTPClient({
            tlsVersion: Titanium.Network.TLS_VERSION_1_0,
            onload: function(e) {
                var data = JSON.parse(this.responseText).items, rows = [];
                for (var i in data) {
                    var row = Alloy.createController("eventRow", data[i]).getView();
                    rows.push(row);
                }
                $.events.data = rows;
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5000
        });
        client.open("GET", url);
        client.send();
    }
    function calendarClick(e) {
        if (e.rowData.args) {
            var container = Ti.UI.createView(), webView = Ti.UI.createWebView({
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
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.__alloyId0 = Ti.UI.createSearchBar({
        barColor: Alloy.CFG.colors.black,
        id: "__alloyId0"
    });
    $.__views.events = Ti.UI.createTableView({
        top: 0,
        backgroundColor: Alloy.CFG.colors.background,
        left: 0,
        right: 0,
        filterAttribute: "args",
        search: $.__views.__alloyId0,
        id: "events"
    });
    $.addTopLevelView($.__views.events);
    calendarClick ? $.__views.events.addEventListener("click", calendarClick) : __defers["$.__views.events!click!calendarClick"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    loadCalendar();
    __defers["$.__views.events!click!calendarClick"] && $.__views.events.addEventListener("click", calendarClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;