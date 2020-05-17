const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.imgUrl,
    dataList:[],
    dzOrZxz:'',
    seach:'',
    page:1,
    finsh:false,
  },


  // 搜索字
  seaChFN(e){
    this.setData({
      seach:e.detail.value
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dzOrZxz:options.dzOrZxz?options.dzOrZxz:''
    })
    let that=this
    if(!app.globalData.GetMembersInfo||!app.globalData.GetMembersInfo.openId){
      app.getOpenId(function(a) {
        app.fg({
          action: 'GetMembersInfo',
          openId: a
        }).then(r => {
          if (r.data.Status == "OK") {
            let dataR = r.data.Data
            dataR.openId = a
            app.setMembersInfo(dataR)
            that.getData()
          } else {
            wx.redirectTo({
              url: "/pages/login/login"
            });
          }
        })
      })
    }else that.getData()
  },

  getDataS(){
    this.setData({
      page:1,
      finsh:false,
      dataList:[],
    })
    this.getData()
  },

  getData(){
    let data=this.data,that=this
    if(data.finsh) return
    app.fl()
    app.fg({
      action:'GetAwardList',
      ActivityId:'19',
      openId:app.globalData.GetMembersInfo.openId,
      IsALL:data.dzOrZxz?true:false,
      SearchText:data.seach,
      PageIndex: data.page,
      PageSize: 10,
    }).then(r=>{
      app.fh() 
      r.data.Models.forEach(c=>{
        c.AwardDate?c.AwardDate=c.AwardDate.slice(0,10):''
        data.dataList.push(c)
      })
      that.setData({
        dataList:data.dataList,
        page:++data.page,
        finsh:r.data.Models.length<10?true:false
      })
    })
  },


  submit(e){
    let ed=e.currentTarget.dataset
    if(ed.st==2) return 
    let data=this.data,that=this
    app.fl()
    app.fg({
      action: 'UserGetActivityPrize',
      Id: ed.id,
      openId:app.globalData.GetMembersInfo.openId,
    }).then(r=>{
      app.fh() 
      if(r.data.Status=='OK'){
        that.setData({
          ['dataList['+ed.index+'].Status']:2
        })
      }
      app.fa(r.data.Message)
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
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})