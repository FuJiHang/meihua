const app = getApp()
import QQMapWX from '../../../libs/qqmap-wx-jssdk.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.imgUrl,
    functionList: [

    ],
    paiLie: true,//显示方式
    nowAddressId: '',//省市区id
    LatiLongitude: '',//用户的经纬
    seach: '',
    active: 0,
    showC: true,
    nowCityName: "",
    showSelect:false,
    userlatitude: '', //经度
    userlongitude: '', //纬度
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

  onCloseP() {
    this.setData({
      showC: false
    })
  },
  // 调接口地址
  getaddress() {
    this.setData({
      showSelect: true
    })
  },
  toProduct(e) {
    let xx = e.currentTarget.dataset
    console.log(typeof xx.store)
    let store = {
      StoreId: xx.store.StoreId,
      EnvironmentImages: xx.store.StoreImages,
      StoreName: xx.store.StoreName,
      Distance: xx.store.Distance,
      Address: xx.store.Address,
    }
    console.log(store)
    wx.navigateTo({
      url: '/pages/fujihang/fuProduct/fuProduct?id=' + xx.id + "&StoreName="
        + encodeURIComponent(xx.store.StoreName) + "&storeDet=" + encodeURIComponent(JSON.stringify(store))
    })
  },
  toStroe(e) {
    // wx.navigateTo({
    //   url: "/pages/fujihang/fuStoreDet/fuStoreDet?id="+e.currentTarget.dataset.id
    // });
    app.globalData.fuStoreId = e.currentTarget.dataset.id
    wx.reLaunch({
      url: '/pages/fujihang/fuStoreDet/fuStoreDet'
    })
  },
  toFFN(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.to
    });
  },
  ff() {
    app.ff()
  },
  seaChFN(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  seachZXT() {
    let data = this.data
    data.functionList.forEach(c => {
      c.data = []
      c.page = 1
      c.finsh = false
    })
    this.setData({
      functionList: data.functionList
    })
    this.getData()
  },
  // 选择功能
  onChange(event) {
    this.setData({
      active: event.detail.index
    })
    if (this.data.functionList[this.data.active].page != 1) return
    this.getData()
  },

  // 切换显示
  changePai() {
    let paiLie = this.data.paiLie
    this.setData({
      paiLie: !paiLie,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = this.data, that = this
    wx.getStorage({
      key: 'nowAddressId',
      success(res) {
        that.setData({
          nowAddressId: res.data
        })
      }
    })
    wx.getStorage({
      key: 'LatiLongitude',
      success(res) {
        that.setData({
          LatiLongitude: res.data
        })
      }
    })
    setTimeout(() => {
      that.getTas()
    }, 500)
  },

  // 获取
  getData() {
    let data = this.data, that = this
    if (data.functionList[data.active].finsh) return
    app.fl()
    app.fg({
      action: 'Search',
      content: data.seach ? data.seach : '不输入完整不给',
      regionPath: data.nowAddressId,
      Latitude: data.LatiLongitude.Latitude,
      Longitude: data.LatiLongitude.Longitude,
      tag: 'store',
      pageindex: data.functionList[data.active].page,
      pagesize: 10,
      StoreTagId: data.functionList[data.active].TagId
    }).then(r => {
      app.fh()
      let datar = r.data.Models, pingjie = []
      if (data.functionList[data.active].page == 1) data.functionList[data.active].data = datar
      else data.functionList[data.active].data = data.functionList[data.active].data.concat(datar)
      if (datar.length < 10) data.functionList[data.active].finsh = true
      data.functionList[data.active].page++
      that.setData({
        functionList: data.functionList
      })




      console.log(r)
    })
  },

  getTas() {
    let data = this.data, that = this
    app.fl()
    app.fg({
      action: 'GetStoresTags',
    }).then(r => {
      app.fh()
      r.data.forEach(c => {
        c.data = []
        c.page = 1
        c.finsh = false
        data.functionList.push(c)
      })
      that.setData({
        functionList: data.functionList
      })
      that.getData()
    })
  },

// 
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


  getGps() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        success: function (res) {
          resolve(res)
        },
      })

    })
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
  }, // 接受组件传递过来的值 data是成功
  onSelectRegion: function (data) {
    if (!data.detail.iscancel) {
      if (!data.detail.address || data.detail.address.province.name === "请选择") {
        wx.showModal({
          title: '提示',
          content: '请选择地址',
          showCancel: false
        })
        return
      }
      var nowCityId = data.detail.address.province.id + ',' + data.detail.address.city.id + ',' + data.detail.address.area.id
      this.data.nowCityId = nowCityId
      this.data.nowAddressId=nowCityId
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
    
      this.data.isFalse = false //重置值
     
      this.setData({
        showSelect: false,
        region: data.detail.address,
      })
    } else {
      this.setData({
        showSelect: false
      })
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
    this.isempty()
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
    console.log("===========")
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})