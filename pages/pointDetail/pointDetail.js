const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperH: 150, // 轮播组件swiper高度
    pointId: 0, // 商品id
    dataInfo: {}, // 商品详情
    detailImg: [], // 商品图片
    imgUrl: app.imgUrl,//
    costprice: 0,
  },

  // 前往订单支付
  toPointOrder: function () {
    wx.setStorage({
      key: 'confirmList',
      data: JSON.stringify({
        data: [{
          ImageUrl: this.data.dataInfo.ImageUrl,
          Name: this.data.dataInfo.Name,
          NeedPoint: this.data.dataInfo.NeedPoint,
          id: this.data.pointId,
          money: this.data.dataInfo.CostPrice,
          ShippingCost: this.data.dataInfo.ShippingCost
        }]
      })
    })
    wx.navigateTo({
      url: '/pages/pointOrder/pointOrder'
    })
  },

  // 动态渲染图片高度
  onLoadImg: function (e) {
    if (this.data.swiperH !== 150) {
      return
    }
    console.log('设置swiper高度', e)
    var winWid = wx.getSystemInfoSync().windowWidth
    this.data.swiperH = winWid * e.detail.height / e.detail.width
    this.setData({
      swiperH: this.data.swiperH
    })
  },

  // 获取积分商品详情
  getPointInfo: function () {
    var _this = this
    app.fl()
    wx.request({
      url: getApp().gethsyurl + '?action=GetGiftDetail',
      data: {
        giftId: _this.data.pointId,
        // CostPrice : _this.data.costprice,
      },
      success: function (res) {
        app.fh()
        if (res.data.Status == 'OK') {
          var str = res.data.Message.LongDescription
          // str = str.substring(0, str.length - 1)
          var detailImg = str.split(",")
          res.data.Message.ImageUrl = res.data.Message.ImageUrl.split(',')[0]
          console.log(res.data.Message)
          _this.setData({
            dataInfo: res.data.Message,
            detailImg: detailImg
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.GetMembersInfo || !app.globalData.GetMembersInfo.openId) {
      app.getOpenId(function (a) {
        app.fg({
          action: 'GetMembersInfo',
          openId: a
        }).then(r => {
          if (r.data.Status == "OK") {
            let dataR = r.data.Data
            dataR.openId = a
            app.setMembersInfo(dataR)
          } else {
            wx.redirectTo({
              url: "/pages/login/login"
            });
          }
        })
      })
    }
    app.globalData.reId=options.reId||''
    this.setData({
      pointId: options.id,
      costprice: options.costprice,
    })
    this.getPointInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let data=this.data
    return {
      title: data.dataInfo.Name,
      path: '/pages/pointDetail/pointDetail?costprice='+data.costprice+'&id='+data.pointId+"&reId="+app.globalData.GetMembersInfo.UserId,
      imageUrl:data.dataInfo.ImageUrl
    }
  }
})