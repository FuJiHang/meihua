const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgUrl:app.imgUrl,
    Identity:[
      {
        name:'店家',
        text:'描述的小文字',
        img:app.imgUrl+'role_icon_01.png',
        post:'ST',
      },
      {
        name:'技师',
        text:'描述的小文字',
        img:app.imgUrl+'role_icon_02.png',
        post:'TC',
      },
      {
        name:'执行团队长',
        text:'描述的小文字',
        img:app.imgUrl+'role_icon_03.png',
        post:'TH',
      },
      {
        name:'渠道',
        text:'描述的小文字',
        img:app.imgUrl+'role_icon_04.png',
        post:'BS',
      },
    
    ],//身份选择
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          } else {
            wx.redirectTo({
              url: "/pages/login/login"
            });
          }
        })
      })
    } 




  },
  toFN(e){
    let data=app.globalData.GetMembersInfo
    if(!data.IdentityCard||!data.RealName){
      app.fa("请先完善个人信息")
      setTimeout(() => {
        if(!data.CellPhoneVerification){
          wx.navigateTo({
            url:'/pages/fujihang/fuVerificatCode/fuVerificatCode?ws=all'
          })
        }else{
          wx.navigateTo({
            url:'/pages/PersonalInformationMember/PersonalInformationMember?ws=true'
          })
        }
        
      }, 1400);
      return
    }
    if(!data.CellPhoneVerification){
      app.fa("请先完善个人信息")
      setTimeout(() => {
        wx.navigateTo({
          url:'/pages/fujihang/fuVerificatCode/fuVerificatCode'
        })
      },1450)
      return
    }
    let index=e.currentTarget.dataset.index
    app.fl()
    app.fg({
      action:'IsRole',
      openid:app.globalData.GetMembersInfo.openId,
      Type:this.data.Identity[index].post
    }).then(r=>{
      app.fh()
      if(r.data.Status=="OK"){
        wx.navigateTo({
          url: "/pages/fujihang/fuApplicaMate/fuApplicaMate?id="+index
        });
      }else app.fa(r.data.Message)
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
    
    console.log()
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