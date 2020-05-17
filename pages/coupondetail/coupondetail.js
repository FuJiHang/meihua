var e = require("../../utils/config.js"), t = getApp();

Page({
    data: {
        CouponName: "",
        Price: 0,
        LimitText: "",
        CanUseProducts: "",
        CouponsDate: "",
        CouponId: "",
        coupimg: t.getRequestUrl + "/Templates/xcxshop/images/coupdetail-back.jpg",
        coupimgLine: t.getRequestUrl + "/Templates/xcxshop/images/coup-line.jpg"
    },
    onLoad: function(o) {
        var a = this, n = o.CouponId;
        a.setData({
            CouponId: n
        });
        a = this;
        t.getOpenId(function(o) {
            var s = {
                openId: o,
                couponId: n
            };
            e.httpGet(t.getUrl(t.globalData.loadCouponDetails), s, a.getCouponsData);
        });
    },
    getCouponsData: function(e) {
        var t = this;
        if ("NOUser" == e.Message) wx.navigateTo({
            url: "/pages/login/login"
        }); else if ("OK" == e.Status) {
            var o = e.Data, a = o.StartTime.substring(0, 10).replace("-", "."), n = o.ClosingTime.substring(0, 10).replace("-", "."), s = "";
            s = o.CanUseProducts && o.CanUseProducts > 0 ? "部分商品可用" : "全场通用";
            var i = "";
            i = o.OrderUseLimit > 0 ? "订单满" + o.OrderUseLimit.toFixed(2) + "元可用" : "订单金额无限制", 
            t.setData({
                CouponName: o.CouponName,
                Price: o.Price,
                LimitText: i,
                CanUseProducts: s,
                CouponsDate: a + "~" + n,
                CouponId: o.CouponId
            });
        } else wx.showModal({
            title: "提示",
            content: result.data.Message,
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    GetCoupon: function() {
        var e = this.data.CouponId;
        "" == e || parseInt(e) <= 0 ? wx.showModal({
            title: "提示",
            content: "领取的优惠券不存在",
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        }) : t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("UserGetCoupon"),
                data: {
                    openId: o,
                    couponId: e
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1
                    }) : "NO" == e.data.Status && ("NOUser" == e.data.Message ? wx.navigateTo({
                        url: "/pages/login/login"
                    }) : (that.setData({
                        backShow: "none",
                        couponShow: "none"
                    }), wx.showToast({
                        title: e.data.Message,
                        image: "../../images/warning.png"
                    })));
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
    onShareAppMessage: function() {}
});