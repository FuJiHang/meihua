// pages/shopApplyFor/shopApplyFor.js
Page({

  /**
   * 页面的初始数据
   */
  getimg(){
    wx.chooseImage({
      success: function(res) {
        console.log(res.tempFilePaths[0])
      },
    })
  },
  data: {
    sFromData:[
      {
        title:'门店名称',
        placeholder:'请输入门店名称',
        val:''
      }, {
        title: '所在区域',
        placeholder: '请选择所在区域',
        val: ''
      }, {
        title: '营业时间',
        placeholder: '请选择营业时间',
        val: ''
      }
    ]

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