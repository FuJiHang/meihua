var t = getApp();

Page({
    data: {
        isEmpty: !0,
        Status: 0,
        OrderList: null,
        AllActive: "active",
        WaitPayActive: "",
        WaitSendActive: "",
        WaitReceiveActive: "",
        WaitReviewActive: "",
        PageIndex: 1,
        PageSize: 100,
        // nullOrder: t.getRequestUrl + "/Templates/xcxshop/images/nullOrder.png"
      nullOrder:'https://hmeshop-1256233971.cos.ap-guangzhou.myqcloud.com/wxapp/images/pic-kong.png' //缺省图
    },
    onLoad: function(t) {
        var e = t.status;
        "" != t.status && void 0 != t.status || (e = 0), this.setData({
            Status: e
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.setData({
            PageIndex: 1,
            OrderList: []
        }), t.loadData(t.data.Status, t, !1);
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this, e = t.data.PageIndex + 1;
        t.setData({
            PageIndex: e
        }), t.loadData(t.data.Status, t, !0);
    },
    closeOrder: function(e) {
        var a = this, i = e.target.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定要取消订单吗？",
            success: function(e) {
                e.confirm && t.getOpenId(function(e) {
                    wx.request({
                        url: t.getUrl("CloseOrder"),
                        data: {
                            openId: e,
                            orderId: i
                        },
                        success: function(t) {
                            "OK" == t.data.Status ? wx.showModal({
                                title: "提示",
                                content: t.data.Message,
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.navigateTo({
                                        url: "../orderlist/orderlist?status=" + a.data.Status
                                    });
                                }
                            }) : "NOUser" == t.data.Message ? wx.navigateTo({
                                url: "/pages/login/login"
                            }) : wx.showModal({
                                title: "提示",
                                content: t.data.Message,
                                showCancel: !1
                            });
                        }
                    });
                });
            }
        });
    },
    orderPay: function(e) {
        var a = this, i = e.currentTarget.dataset.orderid;
        t.orderPay(i, a.data.Status, !0);
    },
    orderFinish: function(e) {
        var a = this, i = e.currentTarget.dataset.orderid;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("FinishOrder"),
                data: {
                    openId: e,
                    orderId: i
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: "确认收货成功！",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateTo({
                                url: "../orderlist/orderlist?status=" + a.data.Status
                            });
                        }
                    }) : "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "/pages/login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1
                    });
                }
            });
        });
    },
    toproduct: function(t) {
        wx.switchTab({
            url: "../productcategory/productcategory"
        });
    },
    onTabClick: function(t) {
        var e = this, a = t.currentTarget.dataset.status;
        e.setData({
            PageIndex: 1
        }), e.loadData(a, e, !1);
    },
    showLogistics: function(e) {
        var a = e.currentTarget.dataset.orderid;
        e.currentTarget.dataset.isshowdadalogistics ? wx.navigateTo({
            url: "../outurl/outurl?url=" + encodeURIComponent(t.getRequestUrl + "/AppDepot/OrderLogistics?orderid=" + a)
        }) : wx.navigateTo({
            url: "../logistics/logistics?orderid=" + a
        });
    },
    showReview: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../comment/comment?id=" + e
        });
    },
    goToOrderDetail: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../orderdetails/orderdetails?orderid=" + e
        });
    },
    RefundOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.money;
        wx.navigateTo({
            url: "../ApplyRefund/ApplyRefund?orderid=" + e + "&&m=" + a
        });
    },
    ReturnsOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.skuId, i = t.currentTarget.dataset.skuname, r = t.currentTarget.dataset.num, n = t.currentTarget.dataset.money;
        wx.navigateTo({
            url: "../ApplyReturns/ApplyReturns?orderid=" + e + "&&skuId=" + a + "&&pro=" + i + "&&num=" + r + "&&m=" + n
        });
    },
    loadData: function(e, a, i) {
        wx.showLoading({
            title: "加载中"
        }), this.pageActive(e, a), t.getOpenId(function(r) {
            wx.request({
                url: t.getUrl("OrderList"),
                data: {
                    openId: r,
                    status: e,
                    pageIndex: a.data.PageIndex,
                    pageSize: a.data.PageSize
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var r = t.data.Data;
                        if (i) {
                            var n = a.data.OrderList;
                            n.push.apply(n, r), a.setData({
                                OrderList: n
                            });
                        } else {
                            var s = r.length > 0;
                            a.setData({
                                Status: e,
                                OrderList: r,
                                isEmpty: s
                            });
                        }
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "/pages/login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    pageActive: function(t, e) {
        0 == t ? e.setData({
            AllActive: "active",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: "",
            WaitReviewActive: ""
        }) : 1 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "active",
            WaitSendActive: "",
            WaitReceiveActive: "",
            WaitReviewActive: ""
        }) : 2 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "active",
            WaitReceiveActive: "",
            WaitReviewActive: ""
        }) : 3 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: "active",
            WaitReviewActive: ""
        }) : 21 == t && e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: "",
            WaitReviewActive: "active"
        });
    }
});