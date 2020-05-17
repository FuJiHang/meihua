// pages/myLiving/myLiving.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveInfo: [], //直播信息
    recordInfo: [], //录播信息
    userInfo:{},
    openId: '',
    status: 0,
    otherHead: '', //头像
    LiveUserId: '',
    dataLength: 0,
    PageNum: 1,
  },

  // 打开录播
  toRecord: function (e) {
    wx.navigateTo({
      url: '/pages/myLiving/reportVideo?id=' + e.currentTarget.dataset.id,
    })
  },

  // 关注
  onAttention: function (e) {
    console.log(e)
    return
    var _this = this
    wx.request({
      url: getApp().getUrl('AddAttention'),
      data: {
        openId: _this.data.OpenId,
        LiveUserId: '210',
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res)
        if (res.data.Status === 'success') {
          return
        }
        if (res.data.Status === 'fail') {
          wx.showModal({
            title: '警告',
            content: res.data.ErrorMsg,
          })
        } else {
          wx.showToast({
            title: '关注失败',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: (e) => {
        console.log(e)
        wx.showToast({
          title: '关注失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },

  // tabs切换显示
  selected: function(e) {
    if (e.target.dataset.status == this.data.status) return
    this.data.PageNum = 1
    this.data.liveInfo = []
    this.data.recordInfo = []
    e.target.dataset.status == 0 ? this.getMyLiveRoom() : this.getMyLiveRec()
    this.setData({
      status: e.target.dataset.status
    })
  },


  // 获取用户的直播列表
  getMyLiveRoom: function() {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetLiveRoomList'),
      data: {
        sortby: 'isdefault',
        PageNum: 1,
        PageSize: 10,
        LiveStatus: 0, //0直播，1录播
        LiveUserId: _this.data.LiveUserId
      },
      success: function(res) {
        if (res.data.Status === "success") {
          wx.hideLoading()
          _this.data.dataLength = res.data.Data.Data.length
          _this.data.liveInfo = _this.data.liveInfo.concat(res.data.Data.Data)
          _this.setData({
            liveInfo: _this.data.liveInfo,
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  // 获取用户的录播列表
  getMyLiveRec: function() {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetLiveRoomList'),
      data: {
        sortby: 'isdefault',
        PageNum: 1,
        PageSize: 10,
        LiveStatus: 1, //0直播，1录播
        LiveUserId: _this.data.LiveUserId
      },
      success: function(res) {
        if (res.data.Status === "success") {
          wx.hideLoading()
          _this.data.dataLength = res.data.Data.Data.length
          _this.data.recordInfo = _this.data.recordInfo.concat(res.data.Data.Data)
          _this.setData({
            recordInfo: _this.data.recordInfo,
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  // 获取用户信息
  getUserData: function (id,openId) {
    var _this = this;
    wx.request({
      url: getApp().getUrl('GetLiveMemberInfo'),
      data: {
        UserId: id,
        openId: openId
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.Status === "success") {
          _this.setData({
            userInfo: res.data.Data,
          })
        }
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var _this = this
    wx.showLoading({
      title: '',
    })
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.setData({
      otherHead: options.img,
      LiveUserId: options.id
    })
    getApp().getOpenId(function (oId) {
      _this.setData({
        openId: oId
      })
      _this.getUserData(options.id, oId)
    })
    _this.getMyLiveRoom()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var _this = this
    if (_this.data.dataLength == 10) {
      _this.data.PageNum++
        _this.data.status == 0 ? _this.getMyLiveRoom() : _this.getMyLiveRec()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})