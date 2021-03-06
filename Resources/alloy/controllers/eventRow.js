function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: Alloy.CFG.colors.background,
        height: 60,
        className: "event",
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.title = Ti.UI.createLabel({
        color: Alloy.CFG.colors.text.main,
        left: 10,
        top: 10,
        font: {
            fontWeight: "bold"
        },
        id: "title"
    });
    $.__views.row.add($.__views.title);
    $.__views.event_details = Ti.UI.createLabel({
        color: Alloy.CFG.colors.text.main,
        left: 10,
        bottom: 10,
        font: {
            fontStyle: "italic"
        },
        id: "event_details"
    });
    $.__views.row.add($.__views.event_details);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || null, startTime = moment(args.start.dateTime);
    $.title.text = startTime.format("dddd, MMMM Do") + " at " + startTime.format("h:mm a");
    $.event_details.text = args.summary;
    $.row.args = args;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;