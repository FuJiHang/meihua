var t = getApp();

Page({
  data: {
    OrderInfo: null,
    LogisticsData: null,
    SendGifts: null,
    OrderId: 0,
    Suppliers: null
  },
  onLoad: function(t) {
    this.setData({
      OrderId: t.orderid
    });
  },
  goToProductDetail: function(t) {
    var a = this,
      e = t.currentTarget.dataset.productid;
    a.data.OrderInfo.CountDownId > 0 ? wx.navigateTo({
      url: "../countdowndetail/countdowndetail?id=" + a.data.OrderInfo.CountDownId
    }) : wx.navigateTo({
      url: "../productdetail/productdetail?id=" + e
    });
  },
  orderPay: function(a) {
    var e = a.currentTarget.dataset.orderid;
    t.orderPay(e, 0, !1);
  },
  orderFinish: function(a) {
    var e = a.currentTarget.dataset.orderid;
    t.getOpenId(function(a) {
      wx.request({
        url: t.getUrl("FinishOrder"),
        data: {
          openId: a,
          orderId: e
        },
        success: function(t) {
          "OK" == t.data.Status ? wx.showModal({
            title: "提示",
            content: "确认收货成功！",
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateTo({
                url: "../orderlist/orderlist?status=0"
              });
            }
          }) : "NOUser" == t.data.Message ? wx.navigateTo({
            url: "/pages/login/login"
          }) : wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateTo({
                url: "../orderlist/orderlist?status=0"
              });
            }
          });
        }
      });
    });
  },
  onReady: function() {},
  onShow: function() {
    var a = this,
      e = a.data.OrderId;
    // 获取订单详细
    t.getOpenId(function(n) {
      wx.request({
        url: t.getUrl("GetOrderDetail"),
        data: {
          openId: n,
          orderId: e
        },
        success: function(t) {
          if ("OK" == t.data.Status) {
            var e = t.data.Data,
              n = "";
            "" != e.LogisticsData && (n = e.LogisticsData == '暂时没有此快递单号的信息' ? e.LogisticsData : JSON.parse(e.LogisticsData));
            var r = "";
            for (var o in e.Gifts) r.length > 0 && (r += ","), r += e.Gifts[o].GiftName + "×" + e.Gifts[o].Quantity;
            a.setData({
              OrderInfo: e,
              SendGifts: r,
              LogisticsData: n,
              Suppliers: e.Suppliers
            });
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
        }
      });
    });
  },
  onHide: function() {},
  onUnload: function() {}
});