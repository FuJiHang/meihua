var a = require("../../utils/config.js"), t = getApp();

Page({
    data: {
        pageIndex: 0,
        pageSize: 10,
        DrawType: 1,
        DrawTypeList: [],
        CanDrawSplittin: "",
        DeductMinDraw: "",
        DrawIndex: -1,
        DrawMoney: "",
        password: "",
        TabType: 1,
        IsOpenBalance: "",
        DrawList: null,
        isEmpty: !0,
        openId: "",
        nullDraw: t.getRequestUrl + "/Templates/xcxshop/images/null.png",
        LastDrawTime: ""
    },
    onLoad: function(a) {
        var e = this, n = a.TabType;
        e.setData({
            TabType: n
        }), e.loadDrawListData(e, !1), e.GetReferralInfo(), t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl(t.globalData.loginByOpenId),
                data: {
                    openId: a
                },
                success: function(a) {
                    e.GetCheckData(a);
                }
            });
        });
    },
    GetCheckData: function(a) {
        var t = a.data.Data, e = [];
        t.SplittinDraws_CashToBankCard && e.push("提现到银行卡"), t.SplittinDraws_CashToALiPay && e.push("提现到微信"), 
        t.SplittinDraws_CashToWeiXin && e.push("提现到支付宝"), this.setData({
            DrawTypeList: e,
            IsOpenBalance: t.IsOpenBalance
        });
    },
    ShowType: function(t) {
        var e = this;
        wx.showActionSheet({
            itemList: e.data.DrawTypeList,
            success: function(a) {
                if (!a.cancel) {
                    var t = e.data.DrawTypeList[a.tapIndex], n = e.GetDrawTypeId(t);
                    e.setData({
                        DrawIndex: a.tapIndex,
                        Drawtype: n
                    });
                }
            },
            fail: function(t) {
                a.showTip("未开启提现方式", "warning");
            }
        });
    },
    GetDrawTypeId: function(a) {
        return "提现到银行卡" == a ? 1 : "提现到微信" == a ? 2 : "提现到支付宝" == a ? 3 : 4;
    },
    GetReferralInfo: function(a) {
        var e = this;
        t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl("GetReferralInfo"),
                data: {
                    openId: a
                },
                success: function(a) {
                    if (void 0 == a.data.error_response) {
                        var t = a.data.referral_get_response;
                        e.setData({
                            CanDrawSplittin: t.CanDrawSplittin,
                            DeductMinDraw: t.DeductMinDraw,
                            LastDrawTime: t.LastDrawTime
                        });
                    } else wx.showTip(a.data.error_response.sub_msg);
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bingApplyDraw: function(a) {
        this.setData({
            TabType: 1,
            isEmpty: !1
        });
    },
    bingDrawList: function(a) {
        var t = this;
        t.setData({
            pageIndex: 0,
            TabType: 2
        }), t.loadDrawListData(t, !1);
    },
    bindMoneyTap: function(a) {
        var t = a.detail.value;
        this.data.DrawMoney = t;
    },
    bindpasswordTap: function(a) {
        var t = a.detail.value;
        this.data.password = t;
    },
    formSubmit: function(e) {
        var n = this;
        n.data.DrawMoney ? n.data.IsOpenBalance && n.data.password.length < 6 ? wx.showToast({
            title: "请输入交易密码",
            icon: "fail",
            duration: 2e3
        }) : t.getOpenId(function(e) {
            var n = this;
            wx.request({
                url: t.getUrl("SplittinDraw"),
                data: {
                    openId: e,
                    DrawType: n.data.Drawtype,
                    Amount: n.data.DrawMoney
                },
                success: function(t) {
                    void 0 == t.data.error_response ? t.data.response.is_success && wx.showModal({
                        title: "提示",
                        content: t.data.error_response.sub_msg,
                        showCancel: !1,
                        confirmColor: "#ff5722",
                        success: function(a) {
                            loadDrawListData(n, !1), n.setData({
                                TabType: 2
                            });
                        }
                    }) : a.showTip(t.data.error_response.sub_msg);
                },
                complete: function() {}
            });
        }) : wx.showToast({
            title: "请输入提现金额",
            icon: "fail",
            duration: 2e3
        });
    },
    loadDrawListData: function(e, n) {
        wx.showLoading({
            title: "加载中"
        }), t.getOpenId(function(s) {
            wx.request({
                url: t.getUrl("SplittinDrawList"),
                data: {
                    openId: s,
                    pageIndex: e.data.PageIndex,
                    pageSize: e.data.PageSize
                },
                success: function(t) {
                    if (void 0 == t.data.error_response) {
                        var s = t.data.SplittinDraw_get_response.SplittinDraws, r = t.data.SplittinDraw_get_response;
                        if (n) {
                            var i = e.data.DrawList;
                            i.push.apply(i, s), e.setData({
                                DrawList: i
                            });
                        } else {
                            var o = r.RecordCount > 0;
                            e.setData({
                                DrawList: s,
                                isEmpty: o
                            });
                        }
                    } else a.showTip(t.data.error_response.sub_msg);
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    forgetTap: function(a) {
        wx.redirectTo({
            url: "../forgetPassword/forgetPassword"
        });
    },
    goDrawDetail: function(a) {
        var t = a.currentTarget.dataset.requestid;
        wx.navigateTo({
            url: "../DrawDetail/DrawDetail?RequestId=" + t
        });
    }
});