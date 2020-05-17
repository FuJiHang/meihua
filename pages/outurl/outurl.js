Page({
    data: {
        outurl: ""
    },
    onLoad: function(o) {
        var n = decodeURIComponent(o.url);
        this.setData({
            outurl: n
        });
    },
    onShareAppMessage: function(o) {
        var n = this, t = o.webViewUrl;
        return {
            path: "/pages/outurl/outurl?url=" + encodeURIComponent(t),
            success: function(o) {
                n.setData({
                    outurl: t
                }), wx.showToast({
                    title: "转发成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(o) {}
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});