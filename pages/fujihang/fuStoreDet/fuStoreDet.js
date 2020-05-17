const app = getApp()
import QQMapWX from '../../../libs/qqmap-wx-jssdk.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.imgUrl,
    imgheights: [],//轮播图高度
    minImgH: 0,//最小高度
    current: 0,//图片第几张
    background: [],//轮播图
    video: false,//视频
    LatiLongitude: {},//经纬度
    nowAddressId: '',
    active: 0,
    getXKTList: [],
    getXKTListYS: [],
    newJL: 0,
    neerPdD: [],
    hotPro: [
      {
        name: '匠心粉墨眉',
      },
      {
        name: '明眸亮瞳黑',
      },
      {
        name: '裸妆润彩唇',
      },
    ],
    nearList: {
      finsh: false,
      data1: [],
      data2: [],
      page: 1,
    },
    getStore: {},
    myQcode: '',//我的二维码
    Qcode: false, //二维码弹窗
    userlatitude: '', //经度
    userlongitude: '', //纬度
    addressData: '', //获取的地区总数
    nowCityName: '', //默认的地址显示
    nowCityId: '', //默认的区的id 或者市的id  
    isFalse: true, //判断客户是否使用第一次的id
    firstProvince: '', //客户第一次获取的省
    firstCity: '', //客户第一次获取的市
    firstDistrict: '', //客户第一次获取的区
    showSelect: false,
    navBar: [{
      name: '首页',
      img: 'sySy.png?2',
      to: '/pages/fujihang/fuStoreDet/fuStoreDet',
    },
    {
      name: '商城',
      img: 'sySc.png',
      to: '/pages/fujihang/fuBeaStore/fuBeaStore',
    },
    {
      img: 'syAdd.png?2',
      to: '/fuPackageA/fuRelease/fuRelease'
    },
    {
      name: '我的预约',
      img: 'syYy.png?2',
      to: '/pages/technician/technician',
    },
    {
      name: '我的',
      img: "syMy.png?2",
      to: '/pages/mine/mine',
    },
    ], //导航条
  },
  toFFN(e) {

    wx.navigateTo({
      url: e.currentTarget.dataset.to
    });
  },
  // 跳转页面
  toFNB(e) {
    wx.switchTab({
      url: e.currentTarget.dataset.to
    });
    wx.navigateTo({
      url: e.currentTarget.dataset.to
    });
  },
  toFFNSS() {
    if (!app.globalData.GetMembersInfo.UserId) app.fuLo()
    else {
      if (app.globalData.GetMembersInfo.CellPhone) {
        wx.navigateTo({
          url: '/fuPackageA/fuLuckDraw/fuLuckDraw'
        })
      } else {
        wx.navigateTo({
          url: '/fuPackageA/fuEveryDay/fuEveryDay'
        })
      }
    }

  },
  getGps() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        success: function (res) {
          resolve(res)
        },
      })

    })
  },
  // 接受组件传递过来的值 data是成功
  onSelectRegion: function (data) {
    if (!data.detail.iscancel) {
      if (!data.detail.address || data.detail.address.province.name === "请选择") {
        // || data.detail.address.city.name === "请选择" || data.detail.address.area.name === "请选择"
        wx.showModal({
          title: '提示',
          content: '请选择地址',
          showCancel: false
        })
        return
      }
      // this.data.nowCityId = data.detail.address.city.id
      var nowCityId = data.detail.address.province.id + ',' + data.detail.address.city.id + ',' + data.detail.address.area.id
      this.data.nowCityId = nowCityId
      wx.setStorage({
        key: 'nowAddressId',
        data: nowCityId
      })
      //预期设计功能 让客户选择省市区 发送省市区的id给后端
      if (data.detail.address.city.id == 0 && data.detail.address.area.id == 0) { //无选择市和区
        this.setData({
          nowCityName: data.detail.address.province.name
        })
      } else if (data.detail.address.city.id == 0 && data.detail.address.area.id !== 0) { //只选了区没选市
        this.setData({
          nowCityName: data.detail.address.province.name
        })
      } else if (data.detail.address.city.id !== 0 && data.detail.address.area.id == 0) { //只选了市没选区
        this.setData({
          nowCityName: data.detail.address.city.name
        })
        if (data.detail.address.city.name == '市辖区') {
          this.setData({
            nowCityName: data.detail.address.province.name
          })
        }
      } else if (data.detail.address.city.id !== 0 && data.detail.address.area.id !== 0) {
        this.setData({
          nowCityName: data.detail.address.area.name
        })
      }
      // 点击确定地址后判断客户目前所在页面  是项目,,,还是技师,,,门店
      this.data.isFalse = false //重置值
      // var nowPage = this.data.nowPage
      // if (nowPage == "项目") {
      //   this.data.indexData[0].projectData = '' //点击确定时候清空再 获取
      //   this.data.indexData[0].pageindex = '1'
      //   this.getprojectData();
      // } else if (nowPage == "门店") {
      //   this.data.indexData[2].storeData = []
      //   this.data.indexData[2].pageindex = 1
      //   this.data.indexData[2].finsh=false
      //   this.getstoreData()
      // } else if (nowPage == "技师") {
      //   this.data.indexData[1].technicianData = []
      //   this.data.indexData[1].pageindex=1
      //   this.data.indexData[1].finsh=false
      //   this.gettechnicianData();
      // }
      this.setData({
        showSelect: false,
        region: data.detail.address,
        // isSelected: true
      })
    } else {
      this.setData({
        showSelect: false
      })
    }
  },
  //调取腾讯地图
  getTencentMap(latitude, longitude) {
    return new Promise((resolve, reject) => {
      var qqmapsdk = new QQMapWX({
        key: '7V4BZ-4WFW4-L3LU6-XLRLM-ZZ7BJ-MBFAM' // 必填
      });
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          resolve(res)
        }
      })
    })
  },
  // 调接口地址
  getaddress() {
    this.setData({
      showSelect: true
    })
  },
  remakeAddress() { //重新定位
    this.getGps().then(r => {
      this.data.userlatitude = r.latitude
      this.data.userlongitude = r.longitude; //重置经纬度
      // 获取客户的地理位置
      this.getTencentMap(r.latitude, r.longitude).then(res => {
        let sheng = res.result.address_component.province
        let shi = res.result.address_component.city
        let qu = res.result.address_component.district
        var addressData = this.data.addressData
        var shengID = '',
          shiId = '',
          quID = ''
        addressData.filter(function (item, index) {
          if (item.name == sheng) {
            shengID = item.id
            item.city.filter(function (item2, index2) {
              if (item2.name == shi) {
                shiId = item2.id
                if (item2.area.length !== 0) { //非市辖区
                  item2.area.filter(function (item3, index3) {
                    if (item3.name == qu) {
                      quID = item3.id
                    }
                  })
                } else {
                  quID = 0
                }
              }
            })
          }
        })

        var nowAddressId = shengID + "," + shiId + ',' + quID
        wx.setStorage({
          key: 'nowAddressId',
          data: nowAddressId
        })
        this.data.nowCityId = nowAddressId
        this.data.nowCityName = qu
        // var indexData = this.data.indexData
        // for (var i = 0; i < indexData.length; i++) {
        //   indexData[i].pageindex = 1 //重置所有的页数
        // }
        // 333
        // if (this.data.nowPage == '项目') {
        //   // 清空项目数据  重新获取 
        //   indexData[0].projectData = ''
        //   this.setData({
        //     indexData: indexData
        //   }) //重现渲染
        //   this.getprojectData();
        // } else if (this.data.nowPage == '门店') {
        //   indexData[2].storeData = []
        //   indexData[2].pageindex=1
        //   indexData[2].finsh=false
        //   this.setData({
        //     indexData: indexData
        //   })
        //   this.getstoreData();
        // } else if (this.data.nowPage == '技师') {
        //   indexData[1].technicianData = []
        //   indexData[1].pageindex=1
        //   indexData[1].finsh=false
        //   this.setData({
        //     indexData: indexData
        //   })
        //   this.gettechnicianData();
        // }
        this.data.showSelect = false; //关闭蒙版
        this.data.isFalse = false //关闭使用第一次获取的地址
        // 444
        this.setData({ //重置显示区名字
          nowCityName: this.data.nowCityName,
          // indexData: indexData,
          showSelect: this.data.showSelect
        })
      })
    }) //异步等待结果
  },

  // 轮播图变化
  imageLoadS: function (e) {//获取图片真实宽度  
    console.log(e, 11111111);
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    // imgheights.sort(function (a, b) {
    //   return a - b;
    // });
    this.setData({
      imgheights: imgheights,
      // minImgH: imgheights[0]
    })
    console.log(this.data.minImg);
  },

  paixu(a, b) {
    return b.SaleCounts - a.SaleCounts
  },

  //二维码弹窗
  QcodeFN() {
    let that = this
    console.log(this.data.getStore)
    app.getOpenId(function (a) {
      app.fl()
      app.fg({
        action: 'GetMembersInfo',
        openId: a
      }).then(r => {
        if (r.data.Status == "OK") {
          let dataR = r.data.Data
          dataR.openId = a
          app.setMembersInfo(dataR)
          app.fg({
            action: "GetShopExtension",
            openId: a,
            Path: 'pages/fujihang/fuStoreDet/fuStoreDet?storeid=' + that.data.getStore.StoreId + '&Referral=' + app.globalData.GetMembersInfo.UserId,
          }).then(r => {
            app.fh()
            if (r.data.Status == "OK") {

              that.setData({
                Qcode: true,
                myQcode: r.data.data[0].MiniProgramCard
              })
            } else app.fa(r.data.Message)
          })
        }
      })



    })
  },
  exitImgFN() {
    this.setData({
      Qcode: false
    })
  },

  // 保存二维码
  saveImgFN() {
    let url = this.data.myQcode.replace('http:', 'https:')
    wx.downloadFile({
      url: url,     //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode == 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              app.fa('保存图片成功！')
            },
            fail(res) {
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

  // 获取热门项目
  getHotPro(id) {
    let data = this.data
    if (data.hotPro[data.active].finish) return
    app.fl()
    app.fg({
      action: 'GetProducts',
      cId: data.hotPro[data.active].cid,
      Type: 2,
      StoreId: data.getStore.StoreId ? data.getStore.StoreId : id,
      pageIndex: 1,
      pageSize: 1000,
      sortBy: 'ShowSaleCounts',
      sortOrder: 'Desc'
    }).then(r => {
      app.fh()
      if (r.data.Status == "OK") {
        let getdata = r.data.Data, n = 0
        data.hotPro[data.active].data = []
        getdata.sort(this.paixu)
        try {

          getdata.forEach(s => {
            if (5 == n) {
              throw new Error("ending")
            }
            s.SalePrice < 10000 ? (data.hotPro[data.active].data.push(s), n++) : ''

          })
        } catch (e) {

        }

        data.hotPro[data.active].finish = true

        this.setData({
          hotPro: data.hotPro
        })
      } else app.fa("获取数据失败！")
    })

  },

  bindchangeImg: function (e) {
    console.log(e, 188888);
    let imgheights = this.data.imgheights
    this.setData({ current: e.detail.current })
    if (e.detail.current == 0 && this.data.video) {
      imgheights[0] = (wx.getSystemInfoSync().windowWidth) * 4 / 3
      this.setData({
        imgheights: imgheights
      })
    }
  },
  ff() {
    app.ff()
  },
  toProList(e) {
    let id = e.currentTarget.dataset.id, data = this.data
    wx.navigateTo({
      url: "/pages/packageList/packageList?projectid=" + id + "&addressid=" + data.nowAddressId +
        "&userlatitude=" + data.LatiLongitude.Latitude + "&userlongitude=" + data.LatiLongitude.Longitude
    });
  },
  getData(id) {
    let data = this.data, that = this
    app.fl()
    app.fg({
      // action: 'GetStoreDetail',
      // storeid: 600,
      // Latitude: 23.12901,
      // Longitude: 113.2668,
      action: 'GetStoreDetail',
      storeid: id,
      Latitude: data.LatiLongitude.Latitude,
      Longitude: data.LatiLongitude.Longitude,
      openId: app.globalData.GetMembersInfo.openId,
    }).then(r => {
      app.fh()
      if (r.data.Status == "OK") {
        let rf = r.data
        let bg = rf.EnvironmentImages.split(',')
        rf.yysj = rf.OpenStartDate.split(' ')[1].slice(0, 5) + '~' + rf.OpenEndDate.split(' ')[1].slice(0, 5)
        if (rf.Video) {
          data.background.push(rf.Video)
          data.video = true
        }
        bg.forEach((c, i) => {
          if (c) data.background.push(c)
        })
        rf.Appraises.forEach(c => {
          c.Pictures = c.Pictures.split(',')
          c.AddDate = c.AddDate.slice(5, 7) + '月' + c.AddDate.slice(8, 10) + '日'
          c.all = false
        })
        rf.FightGroups.forEach(c => {
          c.ProductPicture = c.ProductPicture.split(",")[0]
        })
        rf.Tel ? rf.Tel = rf.Tel.substring(0, 7) + "****" : ''
        // data.background=data.background.slice(0,data.background.length-1)
        that.setData({
          video: data.video,
          background: data.background,
          getStore: rf,
        })
        wx.setNavigationBarTitle({
          title: rf.StoreName
        })
      } else app.fa(r.data.Message)
      // console.log(r)
    })
  },
  // 
  allFN(e) {

    this.setData({
      [e.currentTarget.dataset.index]: e.currentTarget.dataset.data ? false : true
    })
  },

  // 
  toFN(e) {
    wx.navigateTo({
      url: '/fuPackageA/fuCardGet/fuCardGet?data=' + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.data))
    })
    // console.log(e.currentTarget.dataset.data)
  },

  // 
  toFNEVA() {
    wx.navigateTo({
      url: '/fuPackageA/fuEvaluatAll/fuEvaluatAll?sid=' + this.data.getStore.StoreId
    })
  },

  toFNBar(e) {
    wx.switchTab({
      url: e.currentTarget.dataset.to
    });
    wx.navigateTo({
      url: e.currentTarget.dataset.to
    });
  },

  onChange(event) {
    this.setData({
      active: event.detail.index
    })
    this.getHotPro()
  },
  toProDet(e) {
    wx.navigateTo({
      url: '/pages/fujihang/fuProduct/fuProduct?id=' + e.currentTarget.dataset.id + "&StoreName="
        + encodeURIComponent(this.data.getStore.StoreName) + "&storeDet=" + encodeURIComponent(JSON.stringify(this.data.getStore))
    })
  },
  toStroe() {
    wx.navigateTo({
      url: '/pages/fujihang/fuAppoint/fuAppoint?id=' + this.data.getStore.StoreId
    })
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.getStore.Tel
    })
  },

  // 获取分类
  getProCat(id) {
    let that = this
    app.fl()
    app.fg({
      action: 'GetAllCategories',
      Type: 1
    }).then(r => {
      if (r.data.Status == "OK") {
        setTimeout(() => {
          r.data.Data.splice(1, 0, {
            name: '套餐',
            data: that.data.getStore.Packs,
            finish: true,
            page: 1,
          })
          that.setData({
            hotPro: r.data.Data
          })
          that.getHotPro(id)
        }, 1000)

      } else {
        app.fh()
        app.fa("获取数据失败！")
      }
    })
  },

  //收藏 
  collectFN() {
    let data = this.data, that = this
    app.fl()
    app.fg({
      action: 'GoodAndCollection',
      // openId:"oGsqu4qBG6Icub2iLYzI3MJGH4iQ",
      openId: app.globalData.GetMembersInfo.openId,
      RelationType: 5,
      ForID: data.getStore.StoreId
    }).then(r => {
      app.fh()
      if (r.data.Status == 'OK') {
        if (r.data.Message == "取消操作成功") data.getStore.IsCollect = "False"
        else data.getStore.IsCollect = "True"
        that.setData({
          getStore: data.getStore
        })
      }
      app.fa(r.data.Message)
    })
  },

  // 
  toFigGro(e) {
    let data = this.data
    wx.navigateTo({
      url: '/fuPackageA/fuCollageDet/fuCollageDet?type=0&id=' + e.currentTarget.dataset.id
        + '&sid=' + data.getStore.StoreId
    })
  },

  // 
  toFigList() {
    wx.navigateTo({
      url: '/pages/fujihang/fuAssemList/fuAssemList?id=' + this.data.getStore.StoreId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.id=600
    app.globalData.fuStoreId = options.id ? options.id : app.globalData.fuStoreId
    wx.hideTabBar({})
    let that = this
    wx.getStorage({
      key: 'LatiLongitude',
      success(res) {
        that.setData({
          LatiLongitude: res.data
        })
      }
    })
    wx.getStorage({
      key: 'nowAddressId',
      success(res) {
        that.setData({
          nowAddressId: res.data
        })
      }
    })
    if (!app.globalData.GetMembersInfo || !app.globalData.GetMembersInfo.openId) {
      app.getOpenId(function (a) {
        app.setMembersInfo({ openId: a })
        that.getXKT(5000)
        that.getListT()
      })
    } else {
      that.getXKT(5000)
      that.getListT()
    }



    // 

    let bbbb = decodeURIComponent(options.scene)
    console.log(bbbb)
    let getBD = ''
    if (bbbb != 'undefined') {
      console.log("2323423")
      getBD = bbbb.split('storeid=')[1].split('&Referral=')
      console.log(getBD)
      wx.setStorage({
        key: 'ReferralStoreUserId',
        data: getBD[1]
      })
      // app.getWxUserInfo(function(f) {
      //   if(!f.openId||options.isNew) return
      //   wx.request({
      //     url: app.getUrl("QuickLogin"),//
      //     data: {
      //       openId: f.openId,//微信返回的用户id
      //       nickName: f.nikeName,
      //       unionId: f.unionId,
      //       headImage: f.headImage,
      //       encryptedData: f.encryptedData,
      //       session_key: f.session_key,
      //       iv: f.iv,
      //       referralUserId:getBD[1],//上级id
      //     },
      //     success:c=>{
      //       console.log(c)
      //     }
      //   })
      // })


    }


    if (!app.globalData.GetMembersInfo || !app.globalData.GetMembersInfo.openId) {
      app.getOpenId(function (a) {
        // app.fg({
        //   action: 'GetMembersInfo',
        //   openId: a
        // }).then(r => {
        //   if (r.data.Status == "OK") {
        //     let dataR = r.data.Data
        // dataR.openId = a
        let c = {
          openId: a
        }
        app.setMembersInfo(c)
        let id = getBD[0] ? getBD[0] : parseInt(options.id ? options.id : app.globalData.fuStoreId)
        that.getData(id)
        that.getProCat(id)
        that.sharePJ(options.aid)

        // } else {

        //   wx.redirectTo({
        //     url: "/pages/login/login?isStroe=true&scene=" + encodeURIComponent(bbbb) + '&referralUserId=' + getBD[1]
        //   });


        // }
        // })
      })
    } else {
      // return
      setTimeout(() => {
        let id = getBD[0] ? getBD[0] : parseInt(options.id ? options.id : app.globalData.fuStoreId)
        that.getData(id)
        that.getProCat(id)
        that.sharePJ(options.aid)
      }, 200)
    }

    // 
    if (options.fOpenId) {
      app.getWxUserInfo(function (f) {
        wx.request({
          url: app.getUrl("QuickLogin"),//
          data: {
            openId: f.openId,//微信返回的用户id
            nickName: f.nikeName,
            unionId: f.unionId,
            headImage: f.headImage,
            encryptedData: f.encryptedData,
            session_key: f.session_key,
            iv: f.iv,
            referralUserId: options.fOpenId,//上级id
            Latitude: that.data.LatiLongitude.Latitude,
            Longitude: that.data.LatiLongitude.Longitude,
          },
          success: c => {
            console.log(c)
          }
        })
      })
    }




  },

  sharePJ(aid) {
    let data = this.data, that = this
    app.fl()
    app.fg({
      action: "ShareSuccess",
      openid: app.globalData.GetMembersInfo.openId,
      Id: aid
    }).then(r => {
      app.fh()
      if (r.data.Status == 'OK') {

      }
    })
  },

  // 小课堂
  getXKT(a) {
    let data = this.data, that = this
    app.fg({
      action: 'LoadAttention',
      // openId:"oGsqu4qBG6Icub2iLYzI3MJGH4iQ",
      limitDis: a,
      openId: app.globalData.GetMembersInfo.openId,
      pageIndex: 1,
      pageSize: 10,
      lat: data.LatiLongitude.Latitude,
      lng: data.LatiLongitude.Longitude,
      IsRecommended: true,
    }).then(r => {
      app.fh()
      if (r.data.Status == 'OK') {
        if (r.data.Data.length == 0) return that.getXKT(a * 10)
        let datar = r.data.Data
        for (let i = 0; i < datar.length;) {
          let a = {
            one: datar[i],
            two: datar[i + 1]
          }
          data.getXKTList.push(a)
          i += 2
        }
        let huanChun = []
        r.data.Data.forEach(c => {
          if (c.ImageUrls.indexOf('.mp4') != -1) c.isVideo = true
          huanChun.push(c)
        })
        this.setData({
          getXKTListYS: huanChun,
          getXKTList: data.getXKTList,
          newJL: a,
        })
      } else {
        that.getXKT(a * 10)
      }
    })
  },
  // 大家都在看
  getListT() {
    let data = this.data, that = this
    if (data.nearList.finsh) return
    app.fl()
    app.fg({
      action: 'LoadAttention',
      // openId:"oGsqu4qBG6Icub2iLYzI3MJGH4iQ",
      openId: app.globalData.GetMembersInfo.openId,
      pageIndex: data.nearList.page,
      pageSize: 10,
      // lat:data.LatiLongitude.Latitude,
      // lng:data.LatiLongitude.Longitude,
      IsRecommended: true,
    }).then(r => {
      app.fh()
      if (r.data.Status == 'OK') {
        let datar = r.data.Data, cc = []
        cc.push(...data.neerPdD, ...datar)
        that.setData({
          neerPdD: cc
        })
        for (let i = 0; i < datar.length; i++) {
          setTimeout(() => {
            that.getHeight().then(r => {
              if (r) {
                if (datar[i].ImageUrls.indexOf('.mp4') != -1) datar[i].isVideo = true
                data.nearList.data2.push(datar[i])
                that.setData({
                  ['nearList.data2']: data.nearList.data2
                })
              } else {
                if (datar[i].ImageUrls.indexOf('.mp4') != -1) datar[i].isVideo = true
                data.nearList.data1.push(datar[i])
                that.setData({
                  ['nearList.data1']: data.nearList.data1
                })
              }
            })
          }, i * 500)
        }

        this.setData({
          ['nearList.finsh']: datar.length < 10 ? true : false,
          ['nearList.page']: ++data.nearList.page
        })
      } else app.fa(r.data.Message)
    })
  },
  // 获取高度
  getHeight() {
    return new Promise((resolve, reject) => {
      let leftK = wx.createSelectorQuery()
      let rightK = wx.createSelectorQuery()
      leftK.select('#leftK').boundingClientRect()
      rightK.select('#rightK').boundingClientRect()
      leftK.exec(function (res) {
        rightK.exec(r => {
          if (res[0].height > r[0].height) resolve(true)
          else resolve(false)
        })
      })
    })
  },


  toPYQFNT(e) {
    let datac = e.currentTarget.dataset, data = this.data, WeiZhi = 0
    setTimeout(() => {
      WeiZhi = datac.no - 1
      let chuang = ''
      if (WeiZhi % 10 == 0) {
        chuang = encodeURIComponent(JSON.stringify(data.getXKTListYS.slice(WeiZhi, ((Math.ceil(WeiZhi / 10) + 1) * 10))));
      }
      else {
        chuang = encodeURIComponent(JSON.stringify(data.getXKTListYS.slice(WeiZhi, (Math.ceil(WeiZhi / 10) * 10))));
      }

      wx.navigateTo({
        url: '/fuPackageA/fuJitter/fuJitter?chuang=' + chuang + '&page=' + 1 + '&choose=0&newJL=' + data.newJL
      })
    }, 300)
  },
  // 
  toPYQFN(e) {
    let datac = e.currentTarget.dataset, data = this.data, WeiZhi = 0
    console.log(data.neerPdD)

    setTimeout(() => {
      WeiZhi = datac.no - 1
      // if(datac.name=='le') WeiZhi=datac.index*2
      // else WeiZhi=datac.index*2+1
      let chuang = ''
      if (WeiZhi % 10 == 0) chuang = encodeURIComponent(JSON.stringify(data.neerPdD.slice(WeiZhi, ((Math.ceil(WeiZhi / 10) + 1) * 10))));
      else chuang = encodeURIComponent(JSON.stringify(data.neerPdD.slice(WeiZhi, (Math.ceil(WeiZhi / 10) * 10))));
      wx.navigateTo({
        url: '/fuPackageA/fuJitter/fuJitter?chuang=' + chuang + '&page=' + data.nearList.page + '&choose=0'
      })
    }, 300)



  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUserPoints() { //经纬度获取
    let that = this
    var qqmapsdk = new QQMapWX({
      key: '7V4BZ-4WFW4-L3LU6-XLRLM-ZZ7BJ-MBFAM' // 必填
    });
    var _this = this
    wx.getLocation({
      type: 'wgs84',
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '请打开位置信息授权',
          success(res) {
            if (res.confirm) {
              wx.openSetting({})
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      success: function (res) { //经纬度成功回调

        let latitude = res.latitude;
        let longitude = res.longitude
        let fujihang = {
          Latitude: res.latitude,
          Longitude: res.longitude
        }
        that.setData({
          fujihang: JSON.stringify(fujihang)
        })
        wx.setStorage({
          key: 'LatiLongitude',
          data: fujihang
        })

        app.setLatitude(fujihang)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) { //通过第三方介入获取客户的省市区成功回调//重置省市区
            let firstProvince = res.result.address_component.province
            let firstCity = res.result.address_component.city
            let firstDistrict = res.result.address_component.district
            _this.data.firstProvince = firstProvince
            _this.data.firstCity = firstCity
            _this.data.firstDistrict = firstDistrict
            let bbbbbb = {
              firstProvince: firstProvince,
              firstCity: firstCity,
              firstDistrict: firstDistrict,
            }
            that.setData({
              bbbbbb: JSON.stringify(bbbbbb)
            })
            _this.firstaddress(firstProvince, firstCity, firstDistrict); //回调成功前往排查地址id发送给后端
          },
          complete: function (res) {
          }
        })
        _this.data.userlatitude = res.latitude; //赋值客户当前经度
        _this.data.userlongitude = res.longitude; //赋值客户当前纬度

      }
    })
  },
  firstaddress(sheng, shi, qu) { //向后端发起地区的省市级请求
    let aaaaa = {
      sheng: sheng,
      shi: shi,
      qu: qu,
    }
    this.setData({
      aaaaa: JSON.stringify(aaaaa)
    })
    var _this = this
    this.setData({
      nowCityName: qu
    })
    wx.request({
      url: app.gethsyurl,
      data: {
        action: 'GetRegionsOfProvinceCity'
      },
      success: function (res) {
        var addressData = res.data.province
        _this.data.addressData = addressData
        var shengID = '',
          shiId = '',
          quID = ''
        addressData.filter(function (item, index) {
          if (item.name == sheng) {
            shengID = item.id
            item.city.filter(function (item2, index2) {
              if (item2.name == shi) {
                shiId = item2.id
                if (item2.area.length !== 0) { //非市辖区
                  item2.area.filter(function (item3, index3) {
                    if (item3.name == qu) {
                      quID = item3.id
                    }
                  })
                } else {
                  quID = 0
                }
              }
            })
            // var firstAddressId = shengID + "," + shiId + ',' + quID//首次获取省市区id
            var firstAddressId = shengID + ',' + shiId + ',' + quID


            // if(quID){

            //   app.setRegionsOfProvinceCity(quID)
            // }else{
            //   app.setRegionsOfProvinceCity(shiId)
            // }
            app.setAddress(firstAddressId)
            _this.data.firstAddressId = firstAddressId
            console.log(firstAddressId)
            wx.setStorage({
              key: 'firstAddressId',
              data: firstAddressId
            })
            wx.setStorage({
              key: 'nowAddressId',
              data: firstAddressId
            })
            // _this.getProjectList(); //获取项目分类列表
          }
        })
      }
    })
  },

  isempty() {

    if (this.data.nowCityName == "") {//判断客户原先是否有选择过地区,如果没有请重新获取
      // console.log('需要重新获取经纬度')
      this.getUserPoints() //获取客户经纬度
    }
  },
  // 跳转小游戏
  toGame() {
    wx.navigateToMiniProgram({
      appId: 'wxd3ceb1e87a8c0f81',
      path: 'pages/index/index',
      success(res) {
        // 打开成功
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let dataN = this.data.nearList
    let that = this
    this.isempty()
    wx.getStorage({
      key: "callBackL",
      success: function (datac) {

        if (datac.data.length != 0) {

          datac.data.forEach(s => {
            dataN.data2.forEach((c, i) => {
              if (c.Id == s.id) {
                that.setData({
                  ['nearList.data2[' + i + '].ArticleLikeCount']: s.ArticleLikeCount,
                  ['nearList.data2[' + i + '].IsArticleLike']: s.IsArticleLike
                })
              }
            })
            dataN.data1.forEach((c, i) => {
              if (c.Id == s.id) {
                that.setData({
                  ['nearList.data1[' + i + '].ArticleLikeCount']: s.ArticleLikeCount,
                  ['nearList.data1[' + i + '].IsArticleLike']: s.IsArticleLike
                })
              }
            })

          })
        }

      }
    })
    wx.getStorage({
      key: "callBackC",
      success: function (datac) {
        console.log(datac, 'nnnnnnnnnn')
        if (datac.data.length != 0) {
          datac.data.forEach(s => {
            dataN.data2.forEach((c, i) => {
              if (c.Id == s.Id) {
                console.log('ccccccccc')

                that.setData({
                  ['nearList.data2[' + i + '].CommentCount']: s.CommentCount,
                })
              }
            })
            dataN.data1.forEach((c, i) => {
              if (c.Id == s.Id) {
                console.log('yyyyyyyyy')
                that.setData({
                  ['nearList.data1[' + i + '].CommentCount']: s.CommentCount,
                })
              }
            })

          })
        }
      }
    })
    !app.globalData.fuStoreId ? this.getStoreNear() : ''
  },



  // 获取
  getStoreNear() {
    let data = this.data, that = this
    wx.getLocation({
      success: function (res) {
        console.log(res, 222222222)
        app.fg({
          action: 'Search',
          Latitude: res.latitude,
          Longitude: res.longitude,
          tag: 'store',
          pageindex: 1,
          pagesize: 1,
        }).then(r => {
          console.log(r, '333333333')
          that.getData(r.data.Models[0].StoreId)
          that.getProCat(r.data.Models[0].StoreId)
          app.globalData.fuStoreId = r.data.Models[0].StoreId
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '请打开位置信息授权',
          success(res) {
            if (res.confirm) {
              wx.openSetting({})
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
    })

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
    this.getListT()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    let scene = encodeURIComponent('storeid=' + that.data.getStore.StoreId + '&Referral=' + app.globalData.GetMembersInfo.UserId)
    return {
      title: that.data.getStore.StoreName,
      path: '/pages/fujihang/fuStoreDet/fuStoreDet?scene=' + scene,
      imageUrl: that.data.background[0]
    }
  }
})