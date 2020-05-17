var e = require("../../utils/config.js"), t = getApp();

Page({
    data: {
        TypeIndex: -1,
        TypeList: [ "手机找回密码", "邮箱找回密码" ],
        CodeType: 1,
        isHidePage1: !1,
        NeedValidate: 0,
        Phone: "",
        Email: "",
        imgCode: ""
    },
    onLoad: function(e) {
        this.setData({
            VerifyCode: t.getRequestUrl + "/VerifyCodeImage.aspx?openid=" + t.globalData.openId
        });
    },
    ShowType: function(e) {
        var t = this;
        wx.showActionSheet({
            itemList: t.data.TypeList,
            success: function(e) {
                e.cancel || ("邮箱找回密码" == t.data.TypeList[e.tapIndex] && (t.data.CodeType = 2), t.setData({
                    TypeIndex: e.tapIndex,
                    CodeType: t.data.CodeType
                }));
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    bindReset: function(e) {
        var t = this;
        t.setData({
            currentPage: "page2"
        }), setTimeout(function() {
            t.setData({
                showPage2: !0,
                isHidePage1: !0
            });
        }, 500);
    },
    InputValue: function(e) {
        var t = e.currentTarget.dataset.key;
        this.data[t] = e.detail.value;
    },
    bindImgCode: function(e) {
        this.setData({
            VerifyCode: t.getRequestUrl + "/VerifyCodeImage.aspx?openid=" + t.globalData.openId + "&&d=" + new Date()
        });
    },
    bindSendTelCode: function(a) {
        var o = this;
        t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl("SendFindPasswordCode"),
                data: {
                    openId: a,
                    CodeType: o.data.CodeType
                },
                success: function(t) {
                    void 0 == t.data.error_response ? "OK" == t.data.Status && e.showTip("success", t.data.Message) : e.showTip(t.data.error_response.sub_msg);
                },
                complete: function() {}
            });
        });
    },
    bindSendEmailCode: function(a) {
        var o = this;
        t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl("SendEmailVerifyCode"),
                data: {
                    openId: a,
                    Email: o.data.CodeType,
                    NeedValidate: 1
                },
                success: function(t) {
                    void 0 == t.data.error_response ? "OK" == t.data.Status && e.showTip("success", t.data.Message) : e.showTip(t.data.error_response.sub_msg);
                },
                complete: function() {}
            });
        });
    },
    bindPhoneBtn: function(a) {
        var o = this;
        parseInt(o.data.TypeIndex) < 0 ? wx.showModal({
            title: "提示",
            content: "请选择重置密码方式",
            showCancel: !1,
            confirmColor: "#ff5722"
        }) : t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl("ResetTradePassword"),
                data: {
                    openId: a,
                    CodeType: o.data.CodeType,
                    VerifyCode: o.data.ImageCode,
                    Password: o.data.Password,
                    RePassword: o.data.RePassword
                },
                success: function(t) {
                    void 0 == t.data.error_response ? "OK" == t.data.Status && e.showTip("success", t.data.Message) : e.showTip(t.data.error_response.sub_msg);
                },
                complete: function() {}
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