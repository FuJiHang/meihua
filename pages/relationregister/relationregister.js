var e = require("../../utils/config.js"), a = getApp();

Page({
    data: {},
    onLoad: function(e) {
        this.setData({
            NikeName: a.globalData.wxUserInfo.nikeName
        });
    },
    InputValue: function(e) {
        var a = e.currentTarget.dataset.key;
        this.data[a] = e.detail.value;
    },
    SaveAccount: function() {
        var s = this, t = a.globalData.wxUserInfo, n = this.data;
        !n.UserName || n.UserName.length <= 0 ? e.showTip("输入用户名", "tips") : !n.Password || n.Password.length <= 0 ? e.showTip("输入密码", "tips") : a.getOpenId(function(o) {
            wx.request({
                url: a.getUrl("BindUser"),
                data: {
                    openId: o,
                    nickName: s.data.UserName,
                    headImage: t.headImage,
                    UserName: n.UserName,
                    Password: n.Password,
                    EncryptedData: t.encryptedData,
                    Session_Key: t.session_key,
                    IV: t.iv
                },
                success: function(s) {
                    void 0 == s.data.error_response ? "OK" == s.data.Status ? (a.setUserInfo(s.data.Data), 
                    wx.switchTab({
                        url: "../usehome/usehome"
                    })) : e.showTip(s.data.response.sub_msg, "warning") : e.showTip(s.data.error_response.sub_msg);
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        this.setData({
            UserName: a.getLocalwxUserInfo().nikeName
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});