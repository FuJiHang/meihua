var t = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        openId: "",
        PageIndex: 1,
        PageSize: 10,
        SplittinList: null,
        isempty: !0,
        SplittinTotal: "",
        CanDrawSplittin: "",
        NoSettlementSplttin: "",
        DrawSplittinTotal: ""
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.setData({
            PageIndex: 1
        }), t.loadData(t, !1);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.loadData(t, !1);
    },
    onReachBottom: function() {
        var t = this, a = t.data.PageIndex + 1;
        t.setData({
            PageIndex: a
        }), t.loadData(t, !0);
    },
    onShareAppMessage: function() {},
    loadData: function(i, n) {
        wx.showLoading({
            title: "加载中"
        }), a.getOpenId(function(e) {
            wx.request({
                url: a.getUrl("SplittinList"),
                data: {
                    openId: e,
                    pageIndex: i.data.PageIndex,
                    pageSize: i.data.PageSize
                },
                success: function(a) {
                    if (void 0 == a.data.error_response) {
                        var e = a.data.splittin_get_response, l = e.SplittinList;
                        if (n) {
                            var o = i.data.SplittinData;
                            o.push.apply(o, l), i.setData({
                                SplittinList: o,
                                SplittinTotal: i.data.SplittinTotal,
                                CanDrawSplittin: i.data.CanDrawSplittin,
                                NoSettlementSplttin: i.data.NoSettlementSplttin,
                                DrawSplittinTotal: i.data.DrawSplittinTotal
                            });
                        } else {
                            l.Total;
                            i.setData({
                                SplittinList: l,
                                isEmpty: i.data.isempty,
                                SplittinTotal: e.SplittinTotal,
                                CanDrawSplittin: e.CanDrawSplittin,
                                NoSettlementSplttin: e.NoSettlementSplttin,
                                DrawSplittinTotal: e.DrawSplittinTotal
                            });
                        }
                    } else t.showTip(a.data.error_response.errMsg);
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    bindSplittinDraw: function(t) {
        wx.navigateTo({
            url: "../Draw/Draw"
        });
    }
});