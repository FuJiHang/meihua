
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    page: 1,
    finsh: false,
    StoreId: 0,
    personData: [
      {
        name: '姓名：',
        val: '',
        post: 'RealName',
      },
      {
        name: '手机号：',
        val: '',
        post: 'CellPhone',
      },
    ],
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.StoreId = options.StoreId ? options.StoreId : ''
  },


  buyList() {
    let that = this, data = this.data
    if (data.finish) return
    app.fl()
    app.fg({
      action: 'LoadSiteCoupon',
      openId: app.globalData.GetMembersInfo.openId,
      // openId: 'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      pageIndex: data.page,
      type: 0,
      Role: 1,
      obtainWay: 0,
      pageSize: 10,
    }).then(r => {
      app.fh()
      if (r.data.Status == "OK") {
        if (!r.data.Data.length) finish = true
        else {
          r.data.Data.forEach(c => {
            data.dataList.push(c)
          })
        }
        that.setData({
          dataList: data.dataList,
          page: ++data.page,
          finsh: r.data.Data.length < 10
        })

      } else {
        app.fa('获取失败！')
      }
    })
  },


  chooseFN(e) {
    let cId = e.currentTarget.dataset.data
    let data = this.data, that = this
    // 购买

    wx.showModal({
      title: '确定要购买',
      content: cId.CouponName,
      success(res) {
        if (res.confirm) {

          if (!data.personData[0].val
            || !data.personData[1].val
          ) {
            that.setData({
              show: true,
              cIdData: cId
            })
            return
          }
          that.setData({
            cIdData: cId
          })
          that.payOrder()
        }
      }
    })
  },

  // 
  changeInput(e) {

    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value,
    })
  },


  // 
  payOrder() {
    let data = this.data, that = this
    if (!(/^1[3|4|5|6|7|8][0-9|9]\d{4,8}$/.test(data.personData[1].val))) return app.fa('手机号码不正确！')
    app.fl("正在购买...")
    app.fg({
      action: 'UserGetCoupon',
      openid: app.globalData.GetMembersInfo.openId,
      shopType: 2,
      couponId: data.cIdData.CouponId,
      StoreId: data.StoreId,
    }).then(b => {
      if (b.data.Status != 'OK') {
        app.fh()
        app.fa(b.data.Message)
        return
      }
      let pay = b.data.Data
      wx.requestPayment({
        timeStamp: pay.timeStamp,
        nonceStr: pay.nonceStr,
        package: "prepay_id=" + pay.prepayId,
        signType: 'MD5',
        paySign: pay.sign,
        success(res) {
          app.fh()
          if (res.errMsg == "requestPayment:ok") {

            app.fg({
              action: 'BuyerPaid',
              shopType: 2,
              payId: pay.PayId,
              couponId: data.cIdData.CouponId,
              openId: app.globalData.GetMembersInfo.openId,
            })
            app.fg({
              action: 'UpdateInformationMember',
              CellPhone: data.personData[1].val,
              RealName: data.personData[0].val,
              openId: app.globalData.GetMembersInfo.openId,
            })
            app.fa('购买成功！')
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1450)

          } else {
            app.fh()
            app.fa('购买失败！')
          }
        }, fail(res) {
          app.fh()
          app.fa('购买失败！')
        }
      })
    })
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
    let that = this, data = this.data
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
            that.buyList()
            wx.getStorage({
              key: 'personData',
              success(res) {
                for (let i = 0; i < data.personData.length; i++) {
                  data.personData[i].val = res.data[data.personData[i].post] ? res.data[data.personData[i].post] : app.globalData.GetMembersInfo[data.personData[i].post]
                }
                that.setData({
                  personData: data.personData
                })
              }, fail(res) {
                for (let i = 0; i < data.personData.length; i++) {
                  data.personData[i].val = app.globalData.GetMembersInfo[data.personData[i].post]
                }
                that.setData({
                  personData: data.personData
                })
              }
            })
          } else {
            wx.redirectTo({
              url: "/pages/login/login"
            });
          }
        })
      })
    } else {
      that.buyList()
      wx.getStorage({
        key: 'personData',
        success(res) {
          for (let i = 0; i < data.personData.length; i++) {
            data.personData[i].val = res.data[data.personData[i].post] ? res.data[data.personData[i].post] : app.globalData.GetMembersInfo[data.personData[i].post]
          }
          that.setData({
            personData: data.personData
          })
        }, fail(res) {
          for (let i = 0; i < data.personData.length; i++) {
            data.personData[i].val = app.globalData.GetMembersInfo[data.personData[i].post]
          }
          that.setData({
            personData: data.personData
          })
        }
      })
    }
  },


  // 
  onCloseP() {
    this.setData({
      show: false,
    })
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
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})