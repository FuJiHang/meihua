const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idCard: [{
      name: '技师',
      img: 'https://bcdj.9oasd.com/images/teach01.png',
    },
    {
      name: '店主',
      img: 'https://bcdj.9oasd.com/images/shop01.png',
    },
    {
      name: '执行',
      img: 'https://bcdj.9oasd.com/images/team01.png',
    },
    {
      name: '渠道代理商',
      img: 'https://bcdj.9oasd.com/images/daili.png',
    },
    ],
    zxtdzShow:false,//执行者团队长
    zxtdzList:['执行者','执行团队长'],

    GetMembersInfo:{},
  },

  // 执行者或者团队长
  zxtdzFN(e){
    let index=e.currentTarget.dataset.index
    let data=this.data.GetMembersInfo
    
    if(index==0){
      if(data.ExcutorId){
        wx.navigateTo({
          url: '/pages/fujihang/fuMy/fuMy?id=' + 4
        })
      }
      else app.fa('您还不是执行者')
    }

    if(index==1){
      if(data.thid&&!data.THisFrozen){
        wx.navigateTo({
          url: '/pages/fujihang/fuMy/fuMy?id=' + 2
        })
      }else app.fa('您还不是执行团队长')
    }
    this.setData({
      zxtdzShow:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCheck()
  },


  // 
  // getCheck(){
  //   let data=this.data,that=this
  //   app.fl()
  //   app.fg({
  //     action:'CheckAgreement',
  //     openId:123,
  //     Type:0,
  //   }).then(r=>{
  //     app.fh() 
  //     if(r.data.Status=='OK'){
        
  //     }
  //     console.log(r) 
  //   })
  // },

  registerFormSubmit: function (e) {
    app.fg({
      action:'SaveFormId',
      openId:app.globalData.GetMembersInfo.openId,
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      formId:e.detail.formId
    })

  }, 

  // 身份入口
  toFNF(e) {
    let id = e.target.dataset.index
    let indexData = app.globalData.GetMembersInfo
    let that = this
    app.getOpenId(function(a) {
      app.fl()
      app.fg({
        action: 'GetMembersInfo',
        openId: a
      }).then(r => {
        app.fh()
        if (r.data.Status == "OK") {
          let dataR = r.data.Data
          dataR.openId = a
          app.setMembersInfo(dataR)
          that.setData({
            GetMembersInfo: dataR
          })
        
          
          switch (id) {
            case 0:
              if (!dataR.tcid||dataR.TCisFrozen ) return app.fa("您还不是技师！")
              break;
            case 1:
         
              if(dataR.Remark=='Pay') return that.payFN()
              if (!dataR.stid) {
                return app.fa("您还不是店主！")
              }
              if(!dataR.SignContract ){
                setTimeout(()=>{
                 wx.navigateTo({
                   url:'/pages/fujihang/fuSignContract/fuSignContract'
                 })
                },1450)
                app.fa('您还没签署合同！')
                return
              }
              break;
            // case 2:
            //   if (!dataR.thid) return app.fa("您还不是执行团队长！")
            //   break;
            case 3:
              if (!dataR.bsid) return app.fa("您还不是渠道代理商！")
              break;
          }
          if(id==2){
            that.setData({
              zxtdzShow:true
            })
            return
          }
          wx.navigateTo({
            url: '/pages/fujihang/fuMy/fuMy?id=' + id
          })

        } else {
          wx.redirectTo({
            url: "/pages/login/login"
          });
        }
      })
    })
    
  },

  payFN(){
    let data = this.data, that = this
    app.fg({
      action: "PaySincerityGold",
      openId: app.globalData.GetMembersInfo.openId,
    }).then(b => {
      app.fh()
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

            app.fa('支付成功！')
            setTimeout(() => {
              wx.navigateTo({
                url: "/pages/mine/mine"
              })
            }, 1450)

          } else {
            app.fh()
            app.fa('支付失败！')
          }
        }, fail(res) {
          app.fh()
          app.fa('支付失败！')
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