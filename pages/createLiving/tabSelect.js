// pages/createLiving/tabSelect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortList: [],
    selectSortItem:{},
    dataLength: 0,
    PageNum: 1
  },

  //清除
  cleanItem:function(){
    wx.setStorageSync('selectItem', {})
    wx.navigateBack({})
  },

  // 获取分类
  getLiveSortList: function () {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetRoomTypeList'),
      data: {
        PageNum: _this.data.PageNum,
        PageSize: 10,
        type:0
      },
      success: function (res) {
        console.log('分类', res.data)
        if (res.data.Status === "success") {
          _this.data.dataLength = res.data.Data.length
          _this.data.sortList = _this.data.sortList.concat(res.data.Data)
          _this.setData({
            sortList: _this.data.sortList,
          })
        }
      },
      fail: function (e) {
        console.log(e)
        wx.hideLoading()
      }
    })
  },

  // 选择分类
  toSelectSort:function(e){
    console.log(e.currentTarget.dataset)
    var index = e.currentTarget.dataset.index
    console.log(this.data.sortList[index])
    wx.setStorageSync('selectItem', this.data.sortList[index])
    wx.navigateBack({})
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
    this.getLiveSortList()
    if (wx.getStorageSync("selectItem")) {
      this.setData({
        selectSortItem: wx.getStorageSync("selectItem")
      })
    }
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
      _this.getLiveSortList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})