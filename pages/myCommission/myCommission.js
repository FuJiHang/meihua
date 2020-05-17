
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.imgUrl,//
    type:0,//身份
    page:1,
    finsh:false,//是否完成
    dataInfor:{},//内容
    dataList:[],//列表内容
    load:false,
    seach:'',
  },

   // 搜索字
   seaChFN(e){
    this.setData({
      seach:e.detail.value
    })
  },
  submitComT(){
    this.setData({
      dataList:[],
      dataInfor:{},
      page:1,
      finsh:false,
      load:false
    })
    this.getDataR()
  },

  getDataR(){
    let data=this.data
    if(data.finsh||data.load) return;
    this.setData({
      load:true
    })
    app.fl()
    app.fg({
      action:'SplittinList',
      openId:app.globalData.GetMembersInfo.openId,
      pageIndex:data.page,
      pageSize:10,
      TradeType:data.type,
      seach:data.seach
    }).then(r=>{
      app.fh()
      if(r.errMsg=="request:ok"){
        
        data.dataInfor=r.data.splittin_get_response
        for(let i=0;i<data.dataInfor.SplittinList.length;i++){
          data.dataList.push(data.dataInfor.SplittinList[i])
        }
        if(data.dataInfor.SplittinList.length<10){
          data.finsh=true
        }
        data.page++
        this.setData({
          dataList:data.dataList,
          dataInfor:data.dataInfor,
          page:data.page,
          finsh:data.finsh,
          load:false
        })
      }
      else app.fa('获取信息失败！')
    })
  },

  toFN:function(e){
    if (!app.globalData.GetMembersInfo.CellPhoneVerification) {
      app.fa('您还没绑定手机，即将前往！')
      wx.navigateTo({
        url:'/pages/fujihang/fuVerificatCode/fuVerificatCode'
      })
      return
    }
    wx.navigateTo({
      url: "/pages/fujihang/fuWithdrawal/fuWithdrawal"
    });
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data=this.data,that=this
    data.type=options.type
    this.setData({
      type:data.type
    })
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
            that.getDataR()
          } else {
            wx.redirectTo({
              url: "/pages/login/login"
            });
          }
        })
      })
    }else {
      that.getDataR()
    } 
    
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