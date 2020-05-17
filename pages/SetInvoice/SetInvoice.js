require("../../utils/hishop.js");

var e = getApp();

Page({
    data: {
        check: e.getRequestUrl + "/Templates/xcxshop/images/check.png",
        checked: e.getRequestUrl + "/Templates/xcxshop/images/checked.png",
        taxBg: e.getRequestUrl + "/Templates/xcxshop/images/tax-bg.png",
        sel_ordinary: !1,
        sel_electron: !0,
        sel_tax: !0
    },
    sel_ordinary: function(e) {
        this.setData({
            sel_ordinary: !1,
            sel_electron: !0,
            sel_tax: !0
        });
    },
    sel_electron: function(e) {
        this.setData({
            sel_ordinary: !0,
            sel_electron: !1,
            sel_tax: !0
        });
    },
    sel_tax: function(e) {
        this.setData({
            sel_ordinary: !0,
            sel_electron: !0,
            sel_tax: !1
        });
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});