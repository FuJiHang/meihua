const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: [
      {
        name: "1. 本次的活动，您店铺的总业绩是多少？",
        val: "",
        tip: '业绩',
      },
      {
        name: "2. 本次活动结束后，您邀约人数有多少呢？",
        val: "",
        tip: '人数',
      },
      {
        name: "3. 本次美婲百城大计团队的服务您还满意吗？",
        val: "",
        tip: '满意度',
      },
    ],
    postList2: [
      {
        name: "服务",
        val: "",
      },
      {
        name: "形象",
        val: "",
      },
      {
        name: "技术",
        val: "",
      },
    ],
    tishen: '',
    choose: 0,
    id: 0,
    dataInfo: '',
  },

  chooseFN(e) {
    if(this.data.dataInfo) return
    this.setData({
      choose: e.currentTarget.dataset.index
    })
  },

  inputFN(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },

  sumbitFN() {
    let data = this.data, that = this, post = []
    data.postList.forEach(s => {
      post.push({
        [s.tip]: s.val
      })
    })
    data.postList2.forEach(s => {
      post.push({
        [s.name]: s.val
      })
    })
    post.push({
      改进: data.tishen
    })
    post.push({
      知道佣金奖励: data.choose ? '否' : '是'
    })
    app.fl()
    app.fg({
      action: "UpLoadQuestionnaire",
      openId: app.globalData.GetMembersInfo.openId,
      Id: data.id,
      JSON: JSON.stringify(post)
    }).then(r => {
      app.fh()
      if (r.data.Status != 'NO') {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1450)

      }
      app.fa(r.data.Message)
      console.log(r)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id || ''
    let dataInfo = options.data ? JSON.parse(options.data) : ""
    let data = this.data, that = this
    data.postList.forEach((s, si) => {
      dataInfo.forEach((c, ci) => {
        for (let j in c) {
          ci == si ? s.val = c[j] : ''
        }
      })
    })
    data.postList2.forEach((s, si) => {
      si += 3
      dataInfo.forEach((c, ci) => {
        for (let j in c) {
          ci == si ? s.val = c[j] : ''
        }
      })
    })
    data.tishen=dataInfo[6].改进
    data.choose=dataInfo[7].知道佣金奖励=="是"?0:1
    this.setData({
      dataInfo: dataInfo,
      postList:data.postList,
      postList2:data.postList2,
      tishen:data.tishen,
      choose:data.choose

    })

    console.log(this.data.dataInfo);

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