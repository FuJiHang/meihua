// pages/qidong/qidong.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: '',
    heigh: '',
    width: "",
    timeout: '',
    StoreId:0,

  },
  getimg() {
    console.log('腹肌')
    var _this = this
    wx.request({
      url: getApp().gethsyurl,
      data: {
        action: "GetStartPicture"
      },
      success: function (res) {
        console.log(res, '22222222222')
        var imgurl = res.data.rows[0].PhotoPath

        wx.downloadFile({
          url: imgurl,
          success: function (res) {
            if (res.statusCode === 200) {
              const fs = wx.getFileSystemManager()
              fs.saveFile({
                tempFilePath: res.tempFilePath,
                success(res) {
                  wx.setStorageSync('image_cache', res.savedFilePath)
                }
              })
            }
          }
        })
        wx.setStorage({
          key: 'qdOverTime',
          data: (new Date().getTime())
        })
        _this.setData({
          imgurl: imgurl
        })
      }
    })
  },
  // gobchome() {
    
  //   wx.switchTab({
  //     url: '/pages/fujihang/fuIndexG/fuIndexG'
  //     // url:'/pages/bchome/bchome'
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */

  daojishi() {
    var timeout = 6;
    var that = this
    var daoshu = setInterval(function () {
      timeout--
      that.setData({
        timeout: timeout
      })
      if (timeout == 1) {
        clearInterval(daoshu)
        that.data.StoreId?wx.switchTab({
          url:'/pages/fujihang/fuStoreDet/fuStoreDet'
        }):wx.switchTab({
          url: '/pages/fujihang/fuIndexG/fuIndexG'
          // url: '/pages/bchome/bchome'
        });
      }
    }, 1000)
  },
  onLoad: function (options) {
    wx.setStorage({
      key: 'friends',
      data: true,
    })
    this.getData()
    let that = this
    this.daojishi()
    const path = wx.getStorageSync('image_cache')
    if (path) {
      wx.getStorage({
        key: 'qdOverTime',
        success: res => {
          let nowTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000
          if (nowTime > res.data) {
            that.getimg()
            return
          }
          that.setData({
            imgurl: path
          })
        },
        fail: () => {
          that.getimg()
        }
      })

    } else {
      this.getimg();
    }

    console.log(options)
    let bbbb = decodeURIComponent(options.scene).split("ReferralId=")[1]
    console.log(bbbb)
    if (bbbb) {
      app.getWxUserInfo(function (f) {
        wx.request({
          url: app.getUrl("QuickLogin"),//
          data: {
            openId: f.openId,//微信返回的用户id
            nickName: f.nikeName,
            unionId: f.unionId,
            headImage: f.headImage,
            encryptedData: f.encryptedData,
            session_key: f.session_key,
            iv: f.iv,
            referralUserId: bbbb,//上级id
          }
        })
      })
    }

    if (options.fOpenId) {
      app.getWxUserInfo(function (f) {
        wx.request({
          url: app.getUrl("QuickLogin"),//
          data: {
            openId: f.openId,//微信返回的用户id
            nickName: f.nikeName,
            unionId: f.unionId,
            headImage: f.headImage,
            encryptedData: f.encryptedData,
            session_key: f.session_key,
            iv: f.iv,
            referralUserId: options.fOpenId,//上级id
            IsShareFromLotteryActivity: 1
          }
        })
      })
    }
    // 


  },


  // 
  // 获取
  getData() {
    let data = this.data, that = this
    wx.getLocation({
      success: function (res) {
        console.log(res,222222222)
        app.fg({
          action: 'Search',
          Latitude: res.latitude,
          Longitude: res.longitude,
          tag: 'store',
          pageindex: 1,
          pagesize: 1,
        }).then(r => {
          console.log(r,'333333333')
          data.StoreId=r.data.Models[0].StoreId
          app.globalData.fuStoreId=r.data.Models[0].StoreId
        })
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '请打开位置信息授权',
          success(res) {
            if (res.confirm) {
              wx.openSetting({})
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
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