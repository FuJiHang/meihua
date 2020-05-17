var e = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        PhoneText: "获取验证码",
        IsSend: !1
    },
    onLoad: function(e) {
        this.setData({
            UserName: a.globalData.wxUserInfo.nikeName,
            VcodeUrl: a.getRequestUrl + "/VerifyCodeImage.aspx?openid=" + a.globalData.wxUserInfo.openId
        });
    },
    ChangeCode: function() {
        this.setData({
            VcodeUrl: a.getRequestUrl + "/VerifyCodeImage.aspx?openid=" + a.globalData.wxUserInfo.openId + "&&d=" + new Date()
        });
    },
    InputValue: function(e) {
        var a = e.currentTarget.dataset.key;
        this.data[a] = e.detail.value;
    },
    GetPhoneCode: function() {
        var o = this, n = this.data;
        o.data.IsSend || (n.PhoneCell && e.checkPhone(n.PhoneCell) ? !n.ImageCode || n.ImageCode.length <= 0 ? e.showTip("输入图形验证码", "tips") : wx.request({
            url: a.getUrl("SendVerifyCode"),
            data: {
                Phone: n.PhoneCell,
                imgCode: n.ImageCode,
                IsValidPhone: !0,
                OpenId: a.globalData.wxUserInfo.openId
            },
            success: function(a) {
                if (void 0 == a.data.error_response) if ("OK" == a.data.Status) {
                    e.showTip("验证码发送成功", "success");
                    var n = 60, t = setInterval(function() {
                        n > 0 ? (n--, o.setData({
                            PhoneText: n + "s后可重发",
                            IsSend: !0
                        })) : (o.setData({
                            PhoneText: "重新发送",
                            IsSend: !1
                        }), clearInterval(t));
                    }, 1e3);
                } else e.showTip(a.data.Message, "warning"); else e.showTip(a.data.error_response.sub_msg);
            }
        }) : e.showTip("手机号格式不对", "tips"));
    },
    ShowPhoneText: function() {},
    Savephone: function() {
        var o = this, n = a.globalData.wxUserInfo, t = this.data;
        e.checkPhone(t.PhoneCell) ? !t.PhoneCode || t.PhoneCode.length <= 0 ? e.showTip("输入手机验证码", "tips") : !t.Password || t.Password.length <= 0 ? e.showTip("请设置密码", "tips") : a.getOpenId(function(s) {
            wx.request({
                url: a.getUrl("CellPhoneRegister"),
                data: {
                    openId: s,
                    nickName: o.data.UserName,
                    headImage: n.headImage,
                    ReferralUserId: 0,
                    CellPhone: t.PhoneCell,
                    VerifyCode: t.PhoneCode,
                    Password: t.Password,
                    EncryptedData: n.encryptedData,
                    Session_Key: n.session_key,
                    IV: n.iv
                },
                success: function(o) {
                    void 0 == o.data.error_response ? "OK" == o.data.Status ? (a.setUserInfo(o.data.Data), 
                    wx.switchTab({
                        url: "../usehome/usehome"
                    })) : e.showTip(o.data.Message, "warning") : e.showTip(o.data.error_response.sub_msg);
                }
            });
        }) : e.showTip("手机号格式不对", "tips");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});