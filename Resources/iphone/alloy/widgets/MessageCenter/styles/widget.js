function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "MessageCenter/" + s : s.substring(0, index) + "/MessageCenter/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "TextField",
    style: {
        paddingLeft: 5
    }
}, {
    isApi: true,
    priority: 1000.0004,
    key: "TableView",
    style: {
        editable: true
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "navgroup",
    style: {
        barColor: Alloy.CFG.backgroundColor
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "window",
    style: {
        modal: true,
        backgroundColor: "#fff",
        navBarHidden: true
    }
} ];