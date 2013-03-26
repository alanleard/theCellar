loadCalendar();

$.header.button.show();

$.header.button.addEventListener("click", loadCalendar);

function loadCalendar(){
    var moment = require('alloy/moment');
    var today = moment().format();
    var url = "https://www.googleapis.com/calendar/v3/calendars/222wine.com_8pq7bb06bf07m4m1n6ju8r39lk%40group.calendar.google.com/events?maxResults=30&orderBy=startTime&singleEvents=true&timeMin="+today+"&fields=items(description%2Cend%2ChtmlLink%2Cid%2Clocation%2Cstart%2Csummary)&key=AIzaSyBiQv5wzzGeYbbDYtppNt6ktCP6b_U3BF0";
    var client = Ti.Network.createHTTPClient({
        tlsVersion:Titanium.Network.TLS_VERSION_1_0,
     // function called when the response data is available
        onload : function(e) {
            var data = JSON.parse(this.responseText).items;
            var rows = [];
            for(var i in data){
                
                var row = Alloy.createController('eventRow', data[i]).getView();

                rows.push(row);
             }
            $.events.data = rows;
        },
        // function called when an error occurs, including a timeout
        onerror : function(e) {
            Ti.API.debug(e.error);
        },
        timeout : 5000  // in milliseconds
    });
    // Prepare the connection.
    client.open("GET", url);
    // Send the request.
    client.send(); 
}

function calendarClick(e){
    if(e.rowData.args){
        var container = Ti.UI.createView();
        var webView = Ti.UI.createWebView({
            top:100,
            bottom:200,
            left:50,
            right:50,
            url:e.rowData.args.htmlLink
        });
        container.add(webView);
        var win = $.events.getParent();
        win.add(container);
        
        container.addEventListener('click', function(){
            win.remove(container);
            container = null;
            
        })
    }
}
