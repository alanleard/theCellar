
var args = arguments[0] || null;

//Ti.API.info(args);

var startTime = moment(args.start.dateTime);
               
$.title.text = startTime.format("dddd, MMMM Do") + " at " + startTime.format("h:mm a");
$.event_details.text = args.summary;
$.row.args = args;

