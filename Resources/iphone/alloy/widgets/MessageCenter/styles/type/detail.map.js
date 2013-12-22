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
} ];