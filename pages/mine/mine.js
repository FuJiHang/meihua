// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Qcode: false, //二维码弹窗
    imgUrl: app.imgUrl,
    GetMembersInfo: {}, //用户信息
    myQcode:'',//我的二维码
    idCard: [{
        name: '技师',
        img: 'https://bcdj.9oasd.com/images/teach01.png',
      },
      {
        name: '店主',
        img: 'https://bcdj.9oasd.com/images/shop01.png',
      },
      {
        name: '执行',
        img: 'https://bcdj.9oasd.com/images/team01.png',
      },
      {
        name: '渠道代理商',
        img: 'https://bcdj.9oasd.com/images/daili.png',
      },
    ],
    zxtdzShow:false,//执行者团队长
    zxtdzList:['执行者','执行团队长'],
    navBar: [{
      name: '首页',
      img:'sySy.png?2',
      to:app.globalData.fuStoreId?'/pages/fujihang/fuStoreDet/fuStoreDet':'/pages/fujihang/fuIndexG/fuIndexG',
    },
    {
      name: '商城',
      img: 'sySc.png',
      to:'/pages/fujihang/fuBeaStore/fuBeaStore',
    },
    {
      img: 'syAdd.png?2',
      to:'/fuPackageA/fuRelease/fuRelease'

    },
    {
      name: '我的预约',
      img:'syYy.png?2',
      to:'/pages/technician/technician',
    },
    {
      name: '我的',
      img:"syMy.png?2",
      to:'/pages/mine/mine',
    },
  ], //导航条
  xz:4,
  yq_pt_cj_qd:[
    {
      img:app.imgUrl+'friend051.png',
      name:'邀请好友',
      url:'',
    },
    {
      img:app.imgUrl+'tuan051.png',
      name:'拼团',
      url:'/fuPackageA/fuMyPuzzle/fuMyPuzzle'
    },
    {
      img:app.imgUrl+'draw051.png',
      name:'抽奖',
      url:'/fuPackageA/fuPrizeList/fuPrizeList',
    },
    {
      img:app.imgUrl+'signIn051.png',
      name:'签到有礼',
      url:'',
    },
  ]
  },

  toMH(){
    wx.navigateTo({
      url:'/fuPackageA/fuFunChoose/fuFunChoose'
    })
  },
  // 跳转页面
  toFNavc(e){

    wx.switchTab({
      url: e.currentTarget.dataset.to
    });
    wx.navigateTo({
      url: e.currentTarget.dataset.to
    });
  },

  // 
  yqptFN(e){
    let c=e.currentTarget.dataset
    switch (c.index) {
      case 0:
        this.QcodeFN()
      break;
      case 3:
        this.qiandao()
      break;
      default:
        wx.navigateTo({
          url:c.url
        })
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideTabBar({})
    this.setData({
      ['navBar[0].to']:app.globalData.fuStoreId?'/pages/fujihang/fuStoreDet/fuStoreDet':'/pages/fujihang/fuIndexG/fuIndexG',
    })
    app.fg({
      action:'GetOrderIdByVerificationCode',
      verificationcode:195153837,
    }).then(v=>{
      console.log(v)
    })


    // app.fg({
    //   action:'GetShopExtension',
    //   openId:"oKpzE5KafB-Ctptnm6T6pVQeZXZs",
    //   Path:'/pages/fujihang/bchome/bchome',
    // }).then(r=>{
    //   console.log(r)
    //   if(r.data.Status=="OK"){
    //     let datar=r.data.data[0]
    //     console.log( datar)
    //   }else app.fa("获取二维码失败")
    // })

  },

  // 个人信息编辑
  toEditInfo: function(e) {
    wx.navigateTo({
      url: '/pages/PersonalInformationMember/PersonalInformationMember'
    })
  },

  getuserstart() { //判断用户是否在线


  },
  //二维码弹窗
  QcodeFN(){
    let that=this
    app.fl()
    app.fg({
      action:"GetShopExtension",
      openId:app.globalData.GetMembersInfo.openId,
      Path:app.globalData.GetMembersInfo.StoreId?('pages/fujihang/fuStoreDet/fuStoreDet?storeid='+app.globalData.GetMembersInfo.StoreId+'&Referral='+app.globalData.GetMembersInfo.UserId):'',
    }).then(r=>{
      app.fh()
      if(r.data.Status=="OK"){
        that.setData({
          Qcode:true,
          myQcode:r.data.data[0].MiniProgramCard
        })
      }else app.fa(r.data.Message)
    })
  },
  exitImgFN(){
    this.setData({
      Qcode:false
    })
  },
  // 保存二维码
  saveImgFN(){
    let url=this.data.myQcode.replace('http:','https:')
    wx.downloadFile({
      url:url,     //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode ==200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              app.fa('保存图片成功！')
            },
            fail(res){
              wx.showModal({
                title: '提示',
                content: '请打开相册授权',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting({})
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              
            }
          })
        }
      }
    })
  },

  // 跳转页面
  toFN(e) {
    var type = e.currentTarget.dataset.type
    if (type == 'info') return
    wx.navigateTo({
      url: e.currentTarget.dataset.to
    })
  },
  // 身份入口
  toFNF(e) {
    let id = e.target.dataset.index
    let indexData = app.globalData.GetMembersInfo
    let that = this
    app.getOpenId(function(a) {
      app.fl()
      app.fg({
        action: 'GetMembersInfo',
        openId: a
      }).then(r => {
        app.fh()
        if (r.data.Status == "OK") {
          let dataR = r.data.Data
          dataR.openId = a
          app.setMembersInfo(dataR)
          that.setData({
            GetMembersInfo: dataR
          })
          switch (id) {
            case 0:
              if (!dataR.tcid) return app.fa("您还不是技师！")
              break;
            case 1:
              if (!dataR.stid) return app.fa("您还不是店主！")
              break;
            // case 2:
            //   if (!dataR.thid) return app.fa("您还不是执行团队长！")
            //   break;
            case 3:
              if (!dataR.bsid) return app.fa("您还不是渠道代理商！")
              break;
          }
          console.log(id)
          if(id==2){
            that.setData({
              zxtdzShow:true
            })
            return
          }
          wx.navigateTo({
            url: '/pages/fujihang/fuMy/fuMy?id=' + id
          })
        } else {
          wx.redirectTo({
            url: "/pages/login/login"
          });
        }
      })
    })
    
  },

  // 签到
  qiandao(){
    let that=this
    app.fl()
    app.fg({
      action:'SignIn',
      openId:app.globalData.GetMembersInfo.openId,
    }).then(r=>{
      app.fh()
      if(r.data.Status=="OK") that.referUser()
      app.fa(r.data.Message)

    })
  },

  // 执行者或者团队长
  zxtdzFN(e){
    let index=e.currentTarget.dataset.index
    let data=this.data.GetMembersInfo
    
    if(index==0){
      if(data.ExcutorId){
        wx.navigateTo({
          url: '/pages/fujihang/fuMy/fuMy?id=' + 4
        })
      }
      else app.fa('您还不是执行者')
    }

    if(index==1){
      if(data.thid){
        wx.navigateTo({
          url: '/pages/fujihang/fuMy/fuMy?id=' + 2
        })
      }else app.fa('您还不是执行团队长')
    }
    this.setData({
      zxtdzShow:false
    })
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
    this.referUser()

    wx.removeStorage({
      key:'upgrade'
    })
  },

  // 获取个人信息
  referUser(){
    let that = this
    app.getOpenId(function(a) {
      app.fg({
        action: 'GetMembersInfo',
        openId: a
      }).then(r => {
        if (r.data.Status == "OK") {
          let dataR = r.data.Data
          dataR.openId = a
          app.setMembersInfo(dataR)
          that.setData({
            GetMembersInfo: dataR
          })
        } else {
          wx.redirectTo({
            url: "/pages/login/login"
          });
        }
      })
    })
  },

  // 绑定手机
  toFNPhone(){
    if(app.globalData.GetMembersInfo.CellPhoneVerification) return app.fa('您已经绑定手机号！')
    wx.navigateTo({
      url:'/pages/fujihang/fuVerificatCode/fuVerificatCode'
    })
  },
  toFNColl(){
    wx.navigateTo({
      url:'/pages/fujihang/fuCollect/fuCollect'
    })
  },

  toFNXin(e){
    wx.navigateTo({
      url:e.currentTarget.dataset.url
    })
  },
  
  onCloseP(){
    this.setData({
      zxtdzShow:false,
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
  registerFormSubmit: function (e) {
    app.fg({
      action:'SaveFormId',
      openId:app.globalData.GetMembersInfo.openId,
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      formId:e.detail.formId
    })

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})