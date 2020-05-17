const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: {},
    imgUrl: app.imgUrl,
    verificationcode: 0,
    allPrice: 0,
    couponId: {
      id: 0,
      pic: 0,
    },//优惠券
    payMode: {
      show: false,
      mode: 0
    },//支付方式，==0?微信:支付宝
    payList: [
      'wxzf.png',
      'zfbzf.png',
    ],
    showCou: false,
    bbbb:'',
  },

  // 打开关闭选择支付方式
  openPay() {
    this.setData({
      ["payMode.show"]: true,
    })
  },
  onCloseP() {
    this.setData({
      ["payMode.show"]: false,
    })
  },
  // 选择支付方式
  chooseFN(e) {
    let payMode = {
      mode: e.currentTarget.dataset.index,
      show: false,
    }
    this.setData({
      payMode: payMode
    })
    console.log(e)
  },
  // 选择优惠券
  coupon() {
    let that = this

    wx.navigateTo({
      url: '/pages/fujihang/fuCoupon/fuCoupon?price=' + that.data.orderData.OrderTotal
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this, dataF = this.data


    wx.setStorage({
      key: "couponId",
      data: {
        id: 0,
        pic: 0,
      },
    })

    // return
    let dddd = decodeURIComponent(options.scene)
    console.log(dddd)
    // dddd="verificationcode=295273401"
    // 核销订单
    // if(true){
    if (dddd.indexOf("verificationcode") != -1) {
      console.log(dddd)
      let verificationcode = dddd.split("verificationcode=")[1]
      console.log(verificationcode)
      // let verificationcode=15761300


      // let url2=dddd.split("OrderId=")[1]
      // let orderId=url2.split("&prepayId=")[0]
      // let prepayId=url2.split("&prepayId=")[1].split("&nonceStr=")[0]
      // let nonceStr=url2.split("&prepayId=")[1].split("&nonceStr=")[1].split("&timeStamp")[0]
      // let timeStamp=url2.split("&prepayId=")[1].split("&nonceStr=")[1].split("&timeStamp=")[1].split("&sign=")[0]
      // let sign=url2.split("&prepayId=")[1].split("&nonceStr=")[1].split("&timeStamp=")[1].split("&sign=")[1]
      // console.log(orderId)
      // console.log(prepayId)
      // console.log(nonceStr)
      // console.log(timeStamp)
      // console.log(sign)

      // 1 尾款

      app.fl()
      app.fg({
        action: 'GetOrderDetail',
        verificationcode: verificationcode,

      }).then(d => {
        app.fh()

        that.setData({
          verificationcode: verificationcode,
          orderData: d.data.Data,
          allPrice: d.data.Data.OrderTotal,
        })

      })

      console.log(this.data.verificationcode + 'sssssssss')
      return
    }

    // 绑定身份
    // app.fa(options.scene)
    // app.fa(decodeURIComponent(options.scene))
    this.setData({
      bbbb: decodeURIComponent(options.scene).split("type=")[1]
    })
    // this.data.bbbb = decodeURIComponent(options.scene).split("type=")[1]
    





    // app.fg({

    // }).then(r=>{
    //   console.log(r)
    // })
  },

  // 绑定上下级
  bdSXJ() {
    let bbbb=this.data.bbbb
    let cccc=bbbb.split("&Id=")
    app.getWxUserInfo(function (f) {
      app.fl('正在綁定身份...')
      app.fg({
        action: 'GetMembersInfo',
        openId: f.openId
      }).then(r => {
        console.log("22222222")
        console.log(r)
        console.log("22222222")
        if (r.data.Status == "OK") {
          let dataR = r.data.Data
          dataR.openId = f.openId
          app.setMembersInfo(dataR)
          app.fg({
            action: 'BindRole',
            openId: f.openId,
            id: cccc[1],
            type: cccc[0]
          }).then(c => {
            console.log("333333333")
            console.log(c)
            console.log("333333333")
            app.fh()
            if (c.data.Status == "OK") app.fa('綁定成功！即將前往首頁')
            else app.fa(c.data.Message)
            setTimeout(() => {
              wx.reLaunch({
                // url:"/pages/bchome/bchome"
                url: app.globalData.fuStoreId ? '/pages/fujihang/fuStoreDet/fuStoreDet' : '/pages/fujihang/fuIndexG/fuIndexG',

              })
            }, 1500)
          })
        } else {
          app.fh()
          app.fa("获取个人信息失败！即將前往首頁")
          setTimeout(() => {
            wx.reLaunch({
              // url:"/pages/bchome/bchome"
              url: app.globalData.fuStoreId ? '/pages/fujihang/fuStoreDet/fuStoreDet' : '/pages/fujihang/fuIndexG/fuIndexG',

            })
          }, 3000)
        }
      })
    })

  },



  payFN() {
    let dataF = this.data, that = this
    app.getWxUserInfo(function (f) {
      console.log(f.openId)
      if (dataF.couponId.id == 0) {
        that.payOKFN(f)
      } else {
        wx.showModal({
          title: '提示',
          content: '确认支付之后不允许修改电子券信息',
          success(res) {
            if (res.confirm) {
              that.payOKFN(f)
            }
          }
        })
      }
    })
  },


  payOKFN(f) {
    let dataF = this.data, that = this
    console.log("=======")
    app.fl('正在支付...')
    app.fg({
      //action:'GetPayParamDeposit',
      action: 'GetPayParam',
      openId: f.openId,
      orderid: dataF.orderData.OrderId,
      ClaimCode: dataF.couponId.id ? dataF.couponId.id : '',
      PaymentType: dataF.payMode.mode == 1 ? 'alipay' : 'wx',
      verificationcode: dataF.verificationcode
    }).then(p => {
      console.log(p)
      if (p.data.Status == "OK") {
        if (dataF.payMode.mode == 1) {
          app.fh()
          wx.navigateTo({
            url: '/pages/fujihang/fuAlipay/fuAlipay?url=' + p.data.Message + '&oId=' + f.openId + "&bc=1"
          })
          return
        }
        var pay = p.data.Data
        if (pay.NeedPay == "False") {
          that.updataOrder(f)
          return
        }
        wx.requestPayment({
          timeStamp: pay.timeStamp,
          nonceStr: pay.nonceStr,
          package: "prepay_id=" + pay.prepayId,
          signType: 'MD5',
          paySign: pay.sign,
          success(res) {
            console.log(res)
            if (res.errMsg == "requestPayment:ok") {
              app.fh()
              app.fa("支付完成!")
              setTimeout(() => {
                that.updataOrder(f)
              }, 1050)
            }
          },
          fail(res) {
            app.fh()
            app.fa("支付失败,请重试！")
          }
        })
      } else {
        app.fh()
        app.fa(p.data.Message)
      }
    })
  },


  updataOrder(f) {
    let dataF = this.data

    app.fl("正在核销...")
    app.fg({
      action: 'ConfirmVerificationCode',
      verificationcode: dataF.verificationcode,
      openId: f.openId,
      lastpay: 1,
    }).then(r => {
      app.fh()
      console.log(r)
      if (r.data.Status == "OK") {
        setTimeout(() => {
          wx.reLaunch({
            // url: "/pages/bchome/bchome"
            url: app.globalData.fuStoreId ? '/pages/fujihang/fuStoreDet/fuStoreDet' : '/pages/fujihang/fuIndexG/fuIndexG',

          });
        }, 1450)
      }
      app.fa(r.data.Message)
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
    let that = this
    wx.getStorage({
      key: 'couponId',
      success: r => {
        that.setData({
          couponId: r.data,
          allPrice: that.data.orderData.OrderTotal - r.data.pic > 0 ? (that.data.orderData.OrderTotal * 100 - r.data.pic * 100) / 100 : 0
        })

      }
    })
  },

  // 优惠券
  couponOP() {
    this.setData({
      showCou: true,
    })
  },
  onCloseCou() {
    this.setData({
      showCou: false,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})