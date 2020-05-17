const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#myCanvasT').boundingClientRect()
    query.exec(function (res) {
      that.createCanT(res[0].width, res[0].height)
    })
  },
// 保存图片
saveImg() {
  wx.showLoading({
    title: '正在保存',
    icon: 'none'
  })
  let _this = this

  wx.canvasToTempFilePath({
    canvasId: 'myCanvasT',
    success(res) {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(data) {
          wx.showToast({
            title: '已保存到相册',
            icon: 'success',
            duration: 2000
          })
        },
        fail(err) {

          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {

            this.getAuthorityAgain();
          } else if (err.errMsg != "saveImageToPhotosAlbum:fail cancel") {
            wx.showToast({
              title: '请截屏保存分享',
              icon: 'success',
              duration: 2000
            })
          }
        },
        complete(res) {
          var timer = setTimeout(() => {
            wx.hideLoading();
            clearTimeout(timer)
          }, 1500)
          console.log(res);
        }
      })
    },
    fail(e) {
      setTimeout(() => {
        _this.saveImg()
      }, 1500)

    }
  }, _this)









},

  createCanT(rpxw, rpxh) {
    let that = this, z = rpxw / 275
    const ctx = wx.createCanvasContext('myCanvasT', that)


    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, rpxw, rpxh)
    ctx.setTextAlign('center')

    ctx.setFontSize(16 * z)
    ctx.setFillStyle('#FB1F4F')
    ctx.fillText('邀请码：41120'+app.globalData.GetMembersInfo.UserId,137.5 *z, 34 * z)
    ctx.setFontSize(14 * z)
    ctx.setFillStyle('#333')
    ctx.fillText('申请门店或者申请渠道的时候必填',137.5 *z, 54 * z)
    ctx.setFontSize(16* z)
    ctx.setTextAlign('center')
    ctx.fillText('长按二维码识别小程序',137.5 *z, 350 * z)
    this.getImgPath(this.data.imgUrl+'xiaochengxu.jpg').then((res) => {
      ctx.drawImage(res.path, 16*z, 80 * z, rpxw-32*z, 230 * z);
      ctx.draw(true);

    }) 
    ctx.draw();
  },
    // 获取图片临时路径
    getImgPath(img) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: img,
          success(res) {
            resolve(res)
          },
          fail(e) {
            reject(e)
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