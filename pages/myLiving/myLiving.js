// pages/myLiving/myLiving.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    liveInfo: [], //直播信息
    recordInfo: [], //录播信息
    attentionList: [],
    openId: '',
    status: 0,
    dataLength: 0,
    PageNum: 1,
  },

  // 打开录播
  toRecord: function(e) {
    console.log(e)
    var _this = this,id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/myLiving/reportVideo?id=' + id,
    })
  },

  // 开始直播
  startPush: function(e) {
    var index = e.currentTarget.dataset.index,
      _this = this;
    console.log(_this.data.liveInfo[index])
    wx.showModal({
      title: '提示',
      content: '是否开始直播',
      success(res) {
        if (res.confirm) {
          wx.setStorage({
            key: 'pushLiveData',
            data: JSON.stringify(_this.data.liveInfo[index]),
          })
          wx.navigateTo({
            url: '/pages/beginTolive/beginTolive',
          })
          // 开始直播并设置为默认
          if (_this.data.liveInfo[index].IsDefault == 1) return
          wx.request({
            url: getApp().getUrl('UpdateLiveRoomDefaultStatus'),
            data: {
              openid: _this.data.openId,
              roomid: _this.data.liveInfo[index].Id,
              isdefault: 1
            },
            success: function(res) {
              if (res.data.Status === 'success') {
                _this.data.liveInfo = []
                _this.data.PageNum = 1
                _this.getMyLiveRoom(_this.data.openId)
              }
            },
            fail: function(e) {
              console.log(e)
            }
          })
        }
      }
    })
  },

  // 取消关注
  unfollow: function(e) {
    var id = e.currentTarget.dataset.id
    var _this = this
    wx.showModal({
      title: '提示',
      content: '是否取消关注',
      success(res) {
        if (res.confirm) {
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
              console.log(res)
              if (res.data.Status === 'success') {
                _this.data.attentionList = []
                _this.getMyAttentionList()
                _this.getUserData(_this.data.openId)
                return
              }
              if (res.data.Status === 'fail') {
                wx.showModal({
                  title: '警告',
                  content: res.data.ErrorMsg,
                })
              }
            },
            fail: (e) => {
              console.log(e)
            }
          })
        }
      }
    })
  },

  // 创建直播
  toCreateLiving: function() {
    wx.navigateTo({
      url: '/pages/createLiving/createLiving?type=0',
    })
  },

  // tabs切换显示
  selected: function(e) {
    if (e.target.dataset.status == this.data.status) return
    this.data.PageNum = 1
    this.data.liveInfo = []
    this.data.recordInfo = []
    this.data.attentionList = []
    e.target.dataset.status == 0 ? this.getMyLiveRoom(this.data.openId) : e.target.dataset.status == 1 ? this.getMyLiveRec(this.data.openId) : this.getMyAttentionList()
    this.setData({
      status: e.target.dataset.status
    })
  },

  // 设置默认
  bindRadioAddressChange: function(e) {
    console.log(e)
    wx.showLoading({
      title: '',
    })
    var index = e.detail.value,
      _this = this;
    wx.request({
      url: getApp().getUrl('UpdateLiveRoomDefaultStatus'),
      data: {
        openid: _this.data.openId,
        roomid: index,
        isdefault: 1
      },
      success: function(res) {
        if (res.data.Status === 'success') {
          _this.data.liveInfo = []
          _this.data.PageNum = 1
          _this.getMyLiveRoom(_this.data.openId)
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  //编辑直播间
  onEdit: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    wx.setStorage({
      key: "editJsonInfo",
      data: JSON.stringify(this.data.liveInfo[index])
    })
    wx.navigateTo({
      url: '/pages/createLiving/createLiving?type=1',
    })
  },

  // 删除直播间
  onDelete: function(e) {
    wx.showLoading({
      title: '',
    })
    var roomId = e.currentTarget.dataset.id,
      _this = this;
    wx.request({
      url: getApp().getUrl('UpdateLiveRoom'),
      data: {
        openId: _this.data.openId,
        roomId: roomId,
        actiontype: 'delete',
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.Status === "success") {
          _this.data.PageNum = 1
          _this.getUserData(_this.data.openId)
          if (e.currentTarget.dataset.type != 'rec') {
            _this.data.liveInfo = []
            _this.getMyLiveRoom(_this.data.openId)
          } else {
            _this.data.recordInfo = []
            _this.getMyLiveRec(_this.data.openId)
          }
        }
        if (res.data.Status === "fail") {
          wx.showToast({
            title: res.data.ErrorMsg,
            icon: 'none',
            mask: true
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  // 获取用户信息
  getUserData: function(oId) {
    var _this = this;
    wx.request({
      url: getApp().getUrl('GetLiveMemberInfo'),
      data: {
        openId: oId,
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.Status === "success") {
          _this.setData({
            userInfo: res.data.Data,
            openId: oId
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  // 获取我的直播列表
  getMyLiveRoom: function(oId) {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetMyLiveRoomList'),
      data: {
        openId: oId,
        sortby: 'isdefault',
        PageNum: _this.data.PageNum,
        PageSize: 10,
        LiveStatus: 0, //0直播，1录播
      },
      success: function(res) {
        console.log(res.data)
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

  // 获取我的录播列表
  getMyLiveRec: function(oId) {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetMyLiveRoomList'),
      data: {
        openId: oId,
        sortby: 'isdefault',
        PageNum: _this.data.PageNum,
        PageSize: 10,
        LiveStatus: 1, //0直播，1录播
      },
      success: function(res) {
        console.log(res.data)
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

  // 获取我的关注列表
  getMyAttentionList: function() {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetAttentionListByUserId'),
      data: {
        openId: _this.data.openId,
        PageNum: 1,
        PageSize: 10
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.Status === "success") {
          wx.hideLoading()
          _this.data.dataLength = res.data.Data.Data.length
          _this.data.attentionList = _this.data.attentionList.concat(res.data.Data.Data)
          _this.setData({
            attentionList: _this.data.attentionList,
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  // 前往他人主页
  toOtherHomePage: function(e) {
    var id = e.currentTarget.dataset.id,
      name = e.currentTarget.dataset.name,
      img = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '/pages/myLiving/otherLiving?id=' + id + '&name=' + name + '&img=' + img,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var _this = this
    wx.showLoading({
      title: '',
    })
    _this.data.liveInfo = []
    getApp().getOpenId(function(oId) {
      _this.setData({
        openId: oId,
        PageNum: 1
      })
      _this.getUserData(oId)
      _this.getMyLiveRoom(oId)
    })
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
    if (_this.data.dataLength > 2) {
      _this.data.PageNum++
        _this.data.status == 0 ? _this.getMyLiveRoom(_this.data.openId) : _this.data.status == 1 ? _this.getMyLiveRec(_this.data.openId) : _this.getMyAttentionList()
    }
  }
})