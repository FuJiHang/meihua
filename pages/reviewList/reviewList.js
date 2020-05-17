// pages/reviewList/reviewList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    page:[
      {
        title:'待审核',
        val:'daishenhe'
      },
      {
        title: '已审核',
        val: 'yishenhe'
      },
      {
        title: '已拒绝',
        val: 'yijujue'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onChange(event) {
    console.log(event.detail.title)
    wx.showToast({
      title: `${event.detail.title}`,
      icon: 'none'
    });
  },
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