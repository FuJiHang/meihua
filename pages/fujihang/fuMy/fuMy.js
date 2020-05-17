const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.imgUrl,//
    GetMembersInfo: {},//人信息
    functionJosn: [], //功能
    showXY: false,//显示执行团队长列表
    richtext: '',//富文本内容
    totalTime: 6,
    userIDF: 0,
    SMS: '',
    jishi: [{
      name: '技师订单',
      fun: false,
      child: [{
        img: app.imgUrl + 'icon_order_01.png',
        name: '已预约',
        to: '/pages/technicianAppointment/technicianAppointment?type=0&active=0',
      },
      {
        img: app.imgUrl + 'icon_order_03.png',
        name: '已完成',
        to: '/pages/technicianAppointment/technicianAppointment?type=0&active=1',
      },
      ]
    },
    {
      name: '常用功能',
      fun: true,
      child: [
        {
          img: app.imgUrl + 'yj031.png',
          name: '我的业绩',
          to: '/pages/fujihang/fuExecuPer/fuExecuPer?type=2',
        },
        {
          img: app.imgUrl + 'team031.png',
          name: '绑定团队长',
          to: '/pages/fujihang/fuTeachTeam/fuTeachTeam?role=technician',
        },
        {
          img: app.imgUrl + 'wj031.png',
          name: '核销',
          to: '/pages/fujihang/fuWriteOff/fuWriteOff?tea=1'
        },
        {
          img: app.imgUrl + 'coupon031.png',
          name: '我的优惠券',
          to: '/pages/fujihang/fuCoupon/fuCoupon?type=1'
        },
        {
          img: app.imgUrl + 'qq031.png',
          name: '活动项目',
          to: '/pages/fujihang/fuTeaProGet/fuTeaProGet',
        },
        {
          img: app.imgUrl + 'help031.png',
          name: '帮助',
          to: '/pages/fujihang/fuHelp/fuHelp?role=TC',
        },
        {
          img: app.imgUrl + 'gxjj064.png',
          name: '我的经济',
          to: '/pages/myCommission/myCommission?type=8',
        },
        {
          img: app.imgUrl + 'edit031.png',
          name: '信息编辑',
          to: '/fuPackageA/fuEditerTeach/fuEditerTeach',
        },
        {
          img: app.imgUrl + 'phb051.png',
          name: '排行榜',
          to: '/fuPackageA/fuRank/fuRank',
        },
        {
          img: app.imgUrl + 'news031.png',
          name: '我要投诉',
          to: '/fuPackageA/fuApplyCom/fuApplyCom',
        },
        {
          img: app.imgUrl + 'baoZhen.png',
          name: '保证金',
          to: '/fuPackageA/fuEnsure/fuEnsure?type=2',
        },

      ]
    },
    ], //技师
    dianjia: [{
      name: '店家订单',
      fun: false,
      child: [{
        img: app.imgUrl + 'icon_order_01.png',
        name: '已预约',
        to: '/pages/storesOrder/storesOrder?active=0',
      },
      {
        img: app.imgUrl + 'icon_order_02.png',
        name: '已核销',
        to: '/pages/storesOrder/storesOrder?active=1',
      },
      {
        img: app.imgUrl + 'icon_order_03.png',
        name: '已完成',
        to: '/pages/storesOrder/storesOrder?active=2',
      },
      {
        img: app.imgUrl + 'icon_order_04.png',
        name: '已取消',
        to: '/pages/storesOrder/storesOrder?active=3',
      },

      ]
    },
    {
      name: '常用功能',
      fun: true,
      child: [{
        img: app.imgUrl + 'gxjj064.png',
        name: '我的经济',
        to: '/pages/myCommission/myCommission?type=11',
      },
      {
        img: app.imgUrl + 'type031.png',
        name: '门店设置',
        to: '/fuPackageA/fuEditerStore/fuEditerStore',
      },
      // {
      //   img: app.imgUrl+'ssmd.png',
      //   name: '直属门店',
      // },

      // {
      //   img: app.imgUrl+'dmf.png',
      //   name: '当面付',
      // },
      {
        img: app.imgUrl + 'wj031.png',
        name: '核销',
        to: '/pages/fujihang/fuWriteOff/fuWriteOff'
      },
      {
        img: app.imgUrl + 'help031.png',
        name: '帮助',
        to: '/pages/fujihang/fuHelp/fuHelp?role=ST',
      },
      {
        img: app.imgUrl + 'yj031.png',
        name: '我的业绩',
        to: '/pages/fujihang/fuExecuPer/fuExecuPer?type=4',
      },
      {
        img: app.imgUrl + 'sj051.png',
        name: '上架项目',
        to: '/pages/fujihang/fuUpDown/fuUpDown?edit=0',
      },
      {
        img: app.imgUrl + 'draw051.png',
        name: '奖品',
        to: '/fuPackageA/fuPrizeList/fuPrizeList?dzOrZxz=true',
      },
      {
        img:  app.imgUrl+'act.png',
        name: '拓客活动',
        type: 1,
        to: '/fuPackageB/act/list',
      },
      {
        img: app.imgUrl + 'action031.png',
        name: '门店活动',
        to: '/pages/fujihang/fuActionList/fuActionList?zxz=1&IsStore=true',
      },
      {
        img: app.imgUrl + 'heton003.png',
        name: '门店合同',
        to: 'heton',
      },
      

      ]
    },
    ], //店家
    zxtdz: [{
      name: '常用功能',
      fun: true,
      child: [{
        img: app.imgUrl + 'gxjj064.png',
        name: '我的经济',
        to: '/pages/myCommission/myCommission?type=9',

      },
      {
        img: app.imgUrl + 'yj031.png',
        name: '我的业绩',
        to: '/pages/fujihang/fuExecuPer/fuExecuPer?type=1',
      },
      {
        img: app.imgUrl + 'team032.png',
        name: '技师团队',
        to: '/pages/fujihang/fuTeachTeam/fuTeachTeam?role=head',
      },
      {
        img: app.imgUrl + 'wj031.png',
        name: '团队技师订单',
        to: '/pages/technicianAppointment/technicianAppointment?type=1',
      },
      {
        img: app.imgUrl + 'store031.png',
        name: '绑定门店',
        to: '/pages/fujihang/fuCountryStore/fuCountryStore',
      },
      {
        img: app.imgUrl + 'qq031.png',
        name: '活动申报',
        to: '/pages/fujihang/fuAction/fuAction',
      },
      {
        img: app.imgUrl + 'action031.png',
        name: '活动记录',
        to: '/pages/fujihang/fuActionList/fuActionList?zxz=1',
      },
      {
        img: app.imgUrl + 'pass031.png',
        name: '审核技师',
        to: '/pages/fujihang/fuExamine/fuExamine?type=TH',

      },
      {
        img: app.imgUrl + 'help031.png',
        name: '帮助',
        to: '/pages/fujihang/fuHelp/fuHelp?role=TH',
      },
      {
        img: app.imgUrl + 'sj051.png',
        name: '上架项目',
        to: '/pages/fujihang/fuShopChoose/fuShopChoose',
      },

      {
        img: app.imgUrl + 'phb051.png',
        name: '排行榜',
        to: '/fuPackageA/fuRank/fuRank',
      },
      {
        img: app.imgUrl + 'news031.png',
        name: '我要投诉',
        to: '/fuPackageA/fuApplyCom/fuApplyCom',
      },
      {
        img: app.imgUrl + 'baoZhen.png',
        name: '预留款',
        to: '/fuPackageA/fuEnsure/fuEnsure',
      },
        // {
        //   img: app.imgUrl+'baoZhen.png',
        //   name: '活动',
        //   to:'/fuPackageB/act/list',
        // },

        // {
        //   img: app.imgUrl+'shenbao.png',
        //   name: '业绩申报',
        //   to:'/fuPackageA/fuDeclare/fuDeclare?zxzOrtdz=1',
        // },
      ]
    },], //执行团队长

    jddls: [{
      name: '常用功能',
      fun: true,
      child: [{
        img: app.imgUrl + 'gxjj064.png',
        name: '我的经济',
        to: '/pages/myCommission/myCommission?type=10',
      },
      {
        img: app.imgUrl + 'store031.png',
        name: '我的门店',
        // to:'/pages/fujihang/fuGathStore/fuGathStore',
        to: '/pages/fujihang/fuCountryStore/fuCountryStore?judao=true',
      },
      {
        img: app.imgUrl + 'help031.png',
        name: '帮助',
        to: '/pages/fujihang/fuHelp/fuHelp?role=BS',
      },
      // {
      //   img: app.imgUrl+'wdsj051.png',
      //   name: '我的团队',
      //   to:'/pages/fujihang/fuMyTeam/fuMyTeam',
      // },

      {
        img: app.imgUrl + 'shfxdz051.png',
        name: '我的团队',
        to: '/pages/fujihang/fuExamine/fuExamine?type=BS',
      },
      {
        img: app.imgUrl + 'yj031.png',
        name: '我的业绩',
        to: '/pages/fujihang/fuExecuPer/fuExecuPer?type=3',
      },
      {
        img: app.imgUrl + 'news031.png',
        name: '我要投诉',
        to: '/fuPackageA/fuApplyCom/fuApplyCom',
      },

      ]
    },], //聚到代理商
    zxz: [{
      name: '常用功能',
      fun: true,
      child: [
        {
          img: app.imgUrl + 'gxjj064.png',
          name: '我的经济',
          to: '/pages/myCommission/myCommission?type=14',
        },
        {
          img: app.imgUrl + 'star031.png',
          name: '执行者技师订单',
          to: '/pages/fujihang/fuExecutList/fuExecutList',
        },
        {
          img: app.imgUrl + 'zwsz031.png',
          name: '晋升团队长',
          to: '/pages/fujihang/fuPromot/fuPromot',
        },
        {
          img: app.imgUrl + 'qq031.png',
          name: '我的活动',
          to: '/pages/fujihang/fuAction/fuAction?zxz=true',
        },
        {
          img: app.imgUrl + 'action031.png',
          name: '活动记录',
          to: '/pages/fujihang/fuActionList/fuActionList?zxz=0',
        },
        {
          img: app.imgUrl + 'sj051.png',
          name: '上架项目',
          to: '/pages/fujihang/fuShopChoose/fuShopChoose?zxz=true',
        },

        {
          img: app.imgUrl + 'yj031.png',
          name: '我的业绩',
          to: '/pages/fujihang/fuExecuPer/fuExecuPer?type=0',
        },

        // {
        //   img: app.imgUrl+'shenbao.png',
        //   name: '业绩申报',
        //   to:'/fuPackageA/fuDeclare/fuDeclare?zxzOrtdz=0',
        // },


        {
          img: app.imgUrl + 'phb051.png',
          name: '排行榜',
          to: '/fuPackageA/fuRank/fuRank',
        },
        {
          img: app.imgUrl + 'news031.png',
          name: '我要投诉',
          to: '/fuPackageA/fuApplyCom/fuApplyCom',
        },
        {
          img: app.imgUrl + 'draw051.png',
          name: '奖品',
          to: '/fuPackageA/fuPrizeList/fuPrizeList?dzOrZxz=true',
        },
        {
          img: app.imgUrl + 'baoZhen.png',
          name: '预留款',
          to: '/fuPackageA/fuEnsure/fuEnsure',
        },
        {
          img: app.imgUrl+'act.png',
          name: '活动',
          type: 2,
          to: '/fuPackageB/act/list',
        },
        {
          img: app.imgUrl+'act.png',
          name: '创建活动',
          type: 2,
          to: '/fuPackageB/act/create',
        },
      ]
    }],//执行者


    navBar: [{
      name: '首页',
      img: '../../../images/home_tab_11.png',
      to: '/pages/bchome/bchome',
    },
    {
      name: '商城',
      img: '../../../images/home_tab_33.png',
      to: '/pages/fujihang/fuBeaStore/fuBeaStore',
    },
    {
      name: '我的预约',
      img: '../../../images/home_tab_22.png',
      to: '/pages/technician/technician',
    },
    {
      name: '我的',
      img: "../../../images/home_tab_44.png",
      to: '/pages/mine/mine',
    },

    ], //导航条
    yqm: '',//邀请码
    showAlert: false
  },

  inputFN(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },
  // 关闭协议
  closeXY() {
    wx.navigateBack({
      delta: 1
    })
  },
  closeFN() {
    this.setData({
      showAlert: false,
    })
  },
  okFN() {
    let data = this.data, that = this
    app.fl()
    app.fg({
      action: "BindHeadBS",
      openId: app.globalData.GetMembersInfo.openId,
      Code: data.yqm
    }).then(r => {
      app.fh()
      if (r.data.Status == 'OK') {
        that.setData({
          showAlert: false,
        })

      }
      app.fa(r.data.Message)
      console.log(r)
    })
  },

  //我同意 
  wtyFN() {
    let data = this.data, that = this
    if (this.data.totalTime > 0) return
    app.fl()
    app.fg({
      action: 'UpdateAgreement',
      openId: app.globalData.GetMembersInfo.openId,
      Status: true,
      Type: data.userIDF == '0' ? 3 : data.userIDF == '1' ? 1 : data.userIDF == '2' ? 4 : data.userIDF == '3' ? 3 : 4,
    }).then(r => {
      app.fh()
      if (r.data.Status == 'OK') {
        that.setData({
          showXY: false,
        })
      }
      app.fa(r.data.Message)
    })
  },


  toMH() {
    wx.navigateTo({
      url: '/fuPackageA/fuFunChoose/fuFunChoose'
    })
  },
  // 跳转页面
  toFN(e) {
    let data = this.data
    let dataset = e.currentTarget.dataset;
    let _url = data.functionJosn[dataset.id].child[dataset.index].to;
    let type = data.functionJosn[dataset.id].child[dataset.index].type;
    if (!_url) {
      this.setData({
        showAlert: true
      })
      return
    }
    if(_url=='heton'){
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: data.GetMembersInfo.SignContract,
        success: function (ss) {
          const filePath = ss.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (ss) {
              console.log('打开文档成功')
            }
          })
        }
      })
      return
    }
    if (type == 1) {
      wx.navigateTo({ url: _url + '?id=' + data.GetMembersInfo.StoreId })
    } else {
      wx.navigateTo({ url: _url })
    }
  },
  // 底部按钮跳转
  toNavFN(e) {
    let data = this.data
    let index = e.target.dataset.index
    wx.switchTab({
      url: data.navBar[index].to
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = this.data
    let that = this


    this.setData({
      userIDF: options.id
    })





    if (!app.globalData.GetMembersInfo || !app.globalData.GetMembersInfo.openId) {
      app.getOpenId(function (a) {
        app.fg({
          action: 'GetMembersInfo',
          openId: a
        }).then(r => {
          if (r.data.Status == "OK") {
            let dataR = r.data.Data
            dataR.openId = a
            app.setMembersInfo(dataR)
            data.GetMembersInfo = app.globalData.GetMembersInfo
            that.setData({
              GetMembersInfo: data.GetMembersInfo
            })
            let change = []
            let name = ''


            app.fl()
            app.fg({
              action: 'CheckAgreement',
              openId: app.globalData.GetMembersInfo.openId,
              Type: options.id == '0' ? 3 : options.id == '1' ? 1 : options.id == '2' ? 4 : options.id == '3' ? 3 : 4,
            }).then(j => {
              app.fh()
              if (j.data.Status == 'Yes') {
                that.setData({
                  richtext: j.data.Message,
                  showXY: true
                })
                let clock = setInterval(() => {
                  data.totalTime--
                  data.SMS = data.totalTime + 's'
                  if (data.totalTime < 0) {
                    clearInterval(clock)
                    data.SMS = '同意'
                    // data.totalTime = 6
                  }
                  that.setData({
                    SMS: data.SMS,
                    totalTime: data.totalTime,
                  })
                }, 1000)
              }
            })



            switch (options.id) {
              case "0":
                change = that.data.jishi
                name = '技师'
                break;
              case "1":
                change = that.data.dianjia
                name = '店家'
                break;
              case "2":
                change = that.data.zxtdz
                name = '执行团队长'
                break;
              case "3":
                if (that.data.GetMembersInfo.BSHeadId) {
                  that.data.jddls[0].child.push({
                    img: app.imgUrl + 'pri031.png',
                    name: '邀请码',
                    to: '/fuPackageA/fuYaoQin/fuYaoQin',
                  })
                } else {
                  that.data.jddls[0].child.push({
                    img: app.imgUrl + 'sryqm001.png',
                    name: '绑定上级渠道',
                    to: '',
                  })
                }
                change = that.data.jddls
                name = '渠道代理商'
                break;
              case "4":
                change = that.data.zxz
                name = '执行者'
                break;

            }
            that.data.GetMembersInfo.gradeName = name
            that.setData({
              functionJosn: change,
              GetMembersInfo: that.data.GetMembersInfo
            })

          } else {
            wx.redirectTo({
              url: "/pages/login/login"
            });
          }
        })
      })
    } else {
      data.GetMembersInfo = app.globalData.GetMembersInfo
      this.setData({
        GetMembersInfo: data.GetMembersInfo
      })

      app.fl()
      app.fg({
        action: 'CheckAgreement',
        openId: app.globalData.GetMembersInfo.openId,
        Type: options.id == '0' ? 3 : options.id == '1' ? 1 : options.id == '2' ? 4 : options.id == '3' ? 3 : 4,
      }).then(j => {
        app.fh()
        if (j.data.Status == 'Yes') {
          that.setData({
            richtext: j.data.Message,
            showXY: true
          })
          let clock = setInterval(() => {
            data.totalTime--
            data.SMS = data.totalTime + 's'
            if (data.totalTime < 0) {
              clearInterval(clock)
              data.SMS = '同意'
              // data.totalTime = 6
            }
            that.setData({
              SMS: data.SMS,
              totalTime: data.totalTime,
            })
          }, 1000)
        }
      })


      let change = []
      let name = ''
      switch (options.id) {
        case "0":
          change = this.data.jishi
          name = '技师'
          break;
        case "1":
          change = this.data.dianjia
          name = '店家'
          break;
        case "2":
          change = this.data.zxtdz
          name = '执行团队长'
          break;
        case "3":
          if (that.data.GetMembersInfo.BSHeadId) {
            that.data.jddls[0].child.push({
              img: app.imgUrl + 'pri031.png',
              name: '邀请码',
              to: '/fuPackageA/fuYaoQin/fuYaoQin',
            })
          } else {
            that.data.jddls[0].child.push({
              img: app.imgUrl + 'sryqm001.png',
              name: '绑定上级渠道',
              to: '',
            })
          }
          change = this.data.jddls
          name = '渠道代理商'
          break;
        case "4":
          change = this.data.zxz
          name = '执行者'
          break;

      }
      this.data.GetMembersInfo.gradeName = name
      this.setData({
        functionJosn: change,
        GetMembersInfo: this.data.GetMembersInfo
      })

    }




  },


  registerFormSubmit: function (e) {

    app.fg({
      action: 'SaveFormId',
      openId: app.globalData.GetMembersInfo.openId,
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      formId: e.detail.formId
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