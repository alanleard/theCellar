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
    priority: 1000.0007,
    key: "Label",
    style: {
        right: 10,
        left: 10,
        top: 10,
        bottom: 10,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "wrapper",
    style: {
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "window",
    style: {
        backgroundColor: "#fff",
        barColor: Alloy.CFG.backgroundColor
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "title",
    style: {
        font: {
            fontSize: 18
        }
    }
}, {
    isId: true,
    priority: 100000.0009,
    key: "content",
    style: {
        font: {
            fontSize: 14
        }
    }
} ];