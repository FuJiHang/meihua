// pages/selectTechnician/selectTechnician.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTechnician:{}, // 当前选中
    technician: [{ name: '技师1', id: 0 }, { name: '技师2', id: 0 }, { name: '技师2', id: 0 }, { name: '技师3', id: 0 }, { name: '技师4', id: 0 }, { name: '技师5', id: 0 }, { name: '技师6', id: 0 }]
  },

  // 选择技师
  checkboxChange(e){
    var index = e.detail.value
    this.setData({
      selectTechnician: this.data.technician[index]
    })
  },

  // 预约按钮
  bindSure(){
    if (!this.data.selectTechnician.name) {
      wx.showModal({
        title: '提示',
        content: '请选择技师',
        showCancel:false
      })
      return;
    }
    wx.setStorageSync('selectedTechnician', JSON.stringify(this.data.selectTechnician))
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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