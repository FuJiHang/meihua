// pages/myLiving/reportVideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openId: '',
    roomId: 0,
    dataLength: 0,
    PageNum: 1,
    reportList: [], //录播列表
    selectNum: 0,
    isPraise: true,
    IsAttention: 0, //0未关注，1已关注，2本人
    videoUrl: '',
    playCount:0
  },
  videoContext: '',

  // 播放统计
  playVideo: function(e) {
    var _this = this,idx = this.data.selectNum;
    if (_this.data.reportList[idx].playCountFlag == 1) return
    wx.request({
      url: getApp().getUrl('UpdateLiveVideoPlayCount'),
      data: {
        UserId: _this.data.userInfo.RoomCreateUserId,
        RoomId: _this.data.roomId,
        FileId: _this.data.reportList[idx].Id
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        _this.data.reportList[idx].playCountFlag = 1
        _this.setData({
          playCount:res.data.Data
        })
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },

  // 点赞
  giveALike: function() {
    if (this.data.isPraise) return
    var _this = this
    wx.request({
      url: getApp().getUrl('AddLiveLike'),
      data: {
        openId: _this.data.openId,
        roomId: _this.data.roomId,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res)
        if (res.data.Status === 'success') {
          _this.getRoomInfo(_this.data.roomId, _this.data.openId)
          _this.setData({
            isPraise: true
          })
        }
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },

  // 不喜欢
  cancelALike: function() {
    if (!this.data.isPraise) return
    var _this = this
    wx.request({
      url: getApp().getUrl('CancelLiveLike'),
      data: {
        openId: _this.data.openId,
        roomId: _this.data.roomId,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res)
        if (res.data.Status === 'success') {
          _this.getRoomInfo(_this.data.roomId, _this.data.openId)
          _this.setData({
            isPraise: false
          })
        }
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },

  // 选择播放
  selectReport: function(e) {
    var idx = e.currentTarget.dataset.index,
      url;
    url = this.data.reportList[idx].VideoUrl
    this.setData({
      selectNum: idx,
      videoUrl: url
    })
    // this.videoContext = wx.createVideoContext('myVideo')
  },

  // 关注
  onAttention: function(e) {
    var id = e.currentTarget.dataset.id
    var _this = this
    wx.request({
      url: getApp().getUrl('AddAttention'),
      data: {
        openId: _this.data.openId,
        LiveUserId: id,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.Status === 'success') {
          _this.setData({
            IsAttention: 1
          })
        }
        if (res.data.Status === 'fail') {
          wx.showModal({
            title: '警告',
            content: res.data.ErrorMsg,
            showCancel: false
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
  onCanceAttention: function(e) {
    var id = e.currentTarget.dataset.id
    var _this = this
    wx.request({
      url: getApp().getUrl('CancelAttention'),
      data: {
        openId: _this.data.openId,
        LiveUserId: id,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.Status === 'success') {
          _this.setData({
            IsAttention: 0
          })
        }
        if (res.data.Status === 'fail') {
          wx.showModal({
            title: '警告',
            content: res.data.ErrorMsg,
            showCancel: false
          })
        }
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },

  // 获取录播列表
  getRoomReportData: function(id) {
    var _this = this,
      url = '';
    wx.request({
      url: getApp().getUrl('GetLiveRoomReportList'),
      data: {
        roomid: id,
      },
      success: function(res) {
        if (res.data.Status === 'success') {
          if (res.data.Data.TotalRecords != 0) {
            url = res.data.Data.Data[0].VideoUrl
          }
          res.data.Data.Data.forEach(v => {
            v.playCountFlag = 0
          })
          _this.setData({
            reportList: res.data.Data.Data,
            videoUrl: url
          })
          return
        }
        if (res.data.Status === 'fail') {
          wx.showToast({
            title: '数据错误',
            icon: 'none'
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  // 获取录播间信息
  getRoomInfo: function(id, openId) {
    var _this = this,
      IsLike;
    wx.request({
      url: getApp().getUrl('GetLiveRoomInfo'),
      data: {
        roomid: id,
        openId: openId
      },
      success: function(res) {
        if (res.data.Status === 'success') {
          res.data.Data.IsLike === 0 ? IsLike = false : IsLike = true
          _this.setData({
            userInfo: res.data.Data,
            playCount: res.data.Data.TotalPlayCount,
            isPraise: IsLike,
            IsAttention: res.data.Data.IsAttention
          })
          wx.hideLoading()
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var _this = this
    wx.showLoading({
      title: '',
    })
    _this.getRoomReportData(id)
    getApp().getOpenId(function(oId) {
      _this.setData({
        openId: oId,
        roomId: id
      })
      _this.getRoomInfo(id, oId)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo')
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var _this = this,
      id = this.data.roomId;
    return {
      title: _this.data.userInfo.UserName + '的录播',
      path: 'pages/myLiving/reportVideo?id=' + id,
    };
  }
})