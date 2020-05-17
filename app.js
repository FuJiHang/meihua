var QQMapWX = require('/libs/qqmap-wx-jssdk.js');
import { getTime, getDate } from './utils/util.js';
import Alert from './utils/alert.js';
function t(t, a, i) {
  if (Number.isNaN(t)) return 0;
  if (a.length <= 0) return parseFloat(t);
  for (var s = 0, d = a.length, l = t; s < d;) {
    var u;
    if (u = a[s], !Number.isNaN(u)) switch (i) {
      case "add":
        l = e(l, u);
        break;

      case "subtract":
        l = o(l, u);
        break;

      case "multiply":
        l = r(l, u);
        break;
      case "divide":
        l = n(l, u);
    }
    s++;
  }
  return l;
}

function e(t, e) {
  var o, r, n;
  try {
    o = t.toString().split(".")[1].length;
  } catch (t) {
    o = 0;
  }
  try {
    r = e.toString().split(".")[1].length;
  } catch (t) {
    r = 0;
  }
  return n = Math.pow(10, Math.max(o, r)), (t.toMul(n) + e.toMul(n)).toDiv(n).toFixed(n);
}

function o(t, e) {
  var o, r, n, a;
  try {
    o = t.toString().split(".")[1].length;
  } catch (t) {
    o = 0;
  }
  try {
    r = e.toString().split(".")[1].length;
  } catch (t) {
    r = 0;
  }
  return n = Math.pow(10, Math.max(o, r)), a = o >= r ? o : r, (t.toMul(n) - e.toMul(n)).toDiv(n).toFixed(a);
}

function r(t, e) {
  var o = 0,
    r = t.toString(),
    n = e.toString();
  try {
    o += r.split(".")[1].length;
  } catch (t) { }
  try {
    o += n.split(".")[1].length;
  } catch (t) { }
  return Number(r.replace(".", "")) * Number(n.replace(".", "")) / Math.pow(10, o);
}

function n(t, e) {
  var o, r, n = 0,
    a = 0;
  try {
    n = t.toString().split(".")[1].length;
  } catch (t) { }
  try {
    a = e.toString().split(".")[1].length;
  } catch (t) { }
  return o = Number(t.toString().replace(".", "")), r = Number(e.toString().replace(".", "")),
    o / r * Math.pow(10, a - n);
}

Number.prototype.toFixed = function (t) {
  e = this + "";
  if (t || (t = 0), -1 == e.indexOf(".") && (e += "."), e += new Array(t + 1).join("0"),
    new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (t + 1) + "})?)\\d*$").test(e)) {
    var e = "0" + RegExp.$2,
      o = RegExp.$1,
      r = RegExp.$3.length;
    return r == t + 2 && (e = (r = e.match(/\d/g)).join("").replace(new RegExp("(\\d+)(\\d{" + t + "})\\d$"), "$1.$2")),
      e = e.substr(1), (o + e).replace(/\.$/, "");
  }
  return this + "";
}, String.prototype.toAdd = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "add");
}, Number.prototype.toAdd = function () {
  return t(this, arguments, "add");
}, String.prototype.toSub = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "subtract");
}, Number.prototype.toSub = function () {
  return t(this, arguments, "subtract");
}, String.prototype.toMul = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "multiply");
}, Number.prototype.toMul = function () {
  return t(this, arguments, "multiply");
}, String.prototype.toDiv = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "divide");
}, Number.prototype.toDiv = function () {
  return t(this, arguments, "divide");
}, App({
  common: {
    getTime, getDate
  },

  ff: function () {
    wx.showToast({
      icon: 'none',
      title: '该功能正在开发...',
      mask: true,
      duration: 1000
    })
  },
  fuLo: function (tip) {
    let a = "登录获得更好体验哦！"
    if (tip) a = tip
    wx.showModal({
      title: '提示',
      content: a,
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: "/pages/login/login"
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 弹窗提示
  fa: function (data, time) {
    let title = '没有更多的了'
    let timeA = 1500
    if (data) title = data
    if (time) timeA = time
    wx.showToast({
      icon: 'none',
      title: title,
      mask: true,
      duration: timeA
    })
  },
  // 时间戳转字符串
  ftts: function (timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() + ' ';
    if (D < 10) {
      D = '0' + D
    }
    var h = date.getHours();
    if (h < 10) {
      h = '0' + h
    }
    var m = date.getMinutes();
    if (m < 10) {
      m = '0' + m
    }
    var s = date.getSeconds()
    if (s < 10) {
      s = '0' + s
    }
    return Y + M + D + ' ' + h + ':' + m + ':' + s
  },

  fttst: function (timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    if (D < 10) {
      D = '0' + D
    }
    var h = date.getHours()
    if (h < 10) {
      h = '0' + h
    }
    var m = date.getMinutes()
    if (m < 10) {
      m = '0' + m
    }
    var s = date.getSeconds()
    if (s < 10) {
      s = '0' + s
    }
    return Y + M + D + ' ' + h + ':' + m + ':' + s
  },

  fct: function () {
    wx.navigateTo({
      url: "/pages/fujihang/fuCoupon/fuCoupon?active=3"
    });

  },
  // Furl:"http://bcdj.9oasd.com/API/WeChatApplet.ashx",//fujihang请求路径
  // url:'http://192.168.3.100/API/WeChatApplet.ashx',
  // 加载中
  fl: function (data) {
    let title = '加载中...'
    if (data) title = data
    wx.showLoading({
      icon: 'loading',
      title: title,
      mask: true,
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 6000)
  },
  // 关闭加载
  fh: function () {
    wx.hideLoading()
  },
  // 请求接口
  fp: function (data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.gethsyurl,
        data: data,
        method: 'POST',
        success(res) {
          resolve(res)
        },
        fail(res) {
          resolve(res)
        }
      })
    })
  },
  fg: function (data) {
    let that = this
    return new Promise((resolve, reject) => {
      if (data.action == 'GetMembersInfo') {
        data.Latitude = wx.getStorageSync('LatiLongitude').Latitude
        data.Longitude = wx.getStorageSync('LatiLongitude').Longitude
      }
      wx.request({
        url: this.gethsyurl,
        data: data,
        success(res) {
          resolve(res)
        },
        fail(res) {
          wx.onNetworkStatusChange(function (res) {
            if (!res.isConnected) that.fa('当前无网络，请求超时！', 5000)
          })
          resolve(res)
        }
      })
    })
  },
  onLaunch: function () {

    // 强制更新

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    wx.alert = Alert;
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })


    // 

    var qqmapsdk = new QQMapWX({
      key: '5JTBZ-XHBWQ-4NW5I-GET5P-EDI43-X5BFS' // 必填
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude

        var longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            // console.log(res)
          },
          complete: function (res) {
            // console.log('获取客户地址成功')
            // console.log(res);
          }
        })
      },
    })

  },
  // 获取用户信息
  getUserInfo: function (t) {
    var e = this;
    e.globalData.userInfo && "0" == e.globalData.isReloadUser ? ("function" == typeof t && t(e.globalData.userInfo),
      wx.hideNavigationBarLoading()) : (e.globalData.isReloadUser = "0", wx.showNavigationBarLoading(),
        e.getOpenId(function (o) {
          wx.request({
            url: e.getUrl("LoginByOpenId"),
            data: {
              openId: o
            },
            success: function (o) {
              console.log('userInfo', o)
              "OK" == o.data.Status ? (e.globalData.userInfo = o.data.Data, "function" == typeof t && t(e.globalData.userInfo)) : wx.redirectTo({
                url: "/pages/login/login"
              });
            },
            complete: function () {
              wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
          });
        }));
  },
  setRefferUserId: function (t) {
    wx.setStorageSync("ReferralUserId", t);
  },
  getRefferUserId: function (t) {
    return wx.getStorageSync("ReferralUserId");
  },

  getId: function (t) {

    var e = this;
    //如果openId不为空且openId不为undefined，则执行函数t，否则调用wx.login登录
    // "" != e.globalData.openId && void 0 != e.globalData.openId ? "function" == typeof t && t(e.globalData.openId) : 
    return new Promise((resolve, reject) => {
      if (!e.globalData.openId || (e.globalData.GetMembersInfo && e.globalData.GetMembersInfo.openId)) {
        wx.login({
          success: function (o) {
            // console.log('登录',o)
            if (o.code) {
              wx.request({
                url: e.gethsyurl,
                data: {
                  action: 'GetOpenId',
                  appid: e.globalData.appId,
                  secret: e.globalData.secret,
                  js_code: o.code
                },
                success: function (o) {

                  if (o.data && o.data.openid) {
                    const { openid } = o.data;
                    // t(e.globalData.openId)
                    e.globalData.GetMembersInfo = e.globalData.GetMembersInfo || {};
                    e.globalData.GetMembersInfo.openId = openid;
                    e.globalData.openId = openid;
                    resolve(o)
                  }
                }
              });
            }
          }
        })
      }
    })


  },

  getOpenId: function (t) {

    var e = this;
    // e.getId();
    //如果openId不为空且openId不为undefined，则执行函数t，否则调用wx.login登录
    "" != e.globalData.openId && void 0 != e.globalData.openId ? "function" == typeof t && t(e.globalData.openId) : wx.login({
      success: function (o) {
        // console.log('登录',o)
        o.code ? wx.request({
          url: e.gethsyurl,
          data: {
            action: 'GetOpenId',
            appid: e.globalData.appId,
            secret: e.globalData.secret,
            js_code: o.code
          },
          success: function (o) {
            // console.log('回调',o.data)
            void 0 != o.data && void 0 != o.data.openid && (e.globalData.openId = o.data.openid,
              "function" == typeof t && t(e.globalData.openId));
          }
        }) : console.log("获取用户登录态失败！" + o.errMsg);
      }
    });
  },
  tempLogin() {

    let that = this;
    if (!that.globalData.GetMembersInfo) {
      return new Promise((resolve, reject) => {

        app.fg({
          action: 'GetOpenId',
          appid: that.globalData.appId,
          secret: that.globalData.secret,
          js_code: data.code
        }).then(r => {
          app.fh()
          if (r.data.Status == 'OK') {
            // dataInfo
            r.data.splittin_get_response.Orders.forEach(c => {
              c.OrderDate = c.OrderDate.slice(0, 10)
            })
            that.setData({
              dataInfo: r.data.splittin_get_response
            })
          } else app.fa(r.data.Message)

          console.log(r)
        })
        // wx.login({
        //   success: function (data) {
        //     console.log('登录',data)
        //     wx.request({
        //       url: that.gethsyurl,
        //       data: {
        //         action: 'GetOpenId',
        //         appid: that.globalData.appId,
        //         secret: that.globalData.secret,
        //         js_code: data.code
        //       },
        //       success: function (o) {
        //         resolve(o)
        //       }
        //     })
        //     // debugger
        //   }
        // })
      })

    }
  },
  getWxUserInfo: function (t) {
    console.log('2222222221');
    var e = this;
    e.globalData.wxUserInfo ? "function" == typeof t && t(e.globalData.wxUserInfo) : wx.login({
      success: function (o) {
        console.log(o, '2222222221');

        if (o.code) {
          var r = o.code;
          wx.getUserInfo({
            success: function (o) {
              console.log(o, 'yyyyyyyyy');

              wx.request({
                url: e.gethsyurl,
                data: {
                  action: 'GetOpenId',
                  appid: e.globalData.appId,
                  secret: e.globalData.secret,
                  js_code: r
                },
                success: function (r) {
                

                  if (void 0 != r.data && void 0 != r.data.openid) {
                    
                    var n = {
                      openId: r.data.openid,
                      nikeName: o.userInfo.nickName,
                      unionId: "",
                      headImage: o.userInfo.avatarUrl,
                      encryptedData: o.encryptedData,
                      session_key: r.data.session_key,
                      iv: o.iv
                    };
                    e.globalData.wxUserInfo = n, "function" == typeof t && t(e.globalData.wxUserInfo);
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: '用户信息失败',
                      mask: true,
                      duration: 1500
                    })
                  }
                }
              });
            },
            fail: function (o) {
              console.log(o, 'pppppppp');
              wx.showToast({
                icon: 'none',
                title: o,
                mask: true,
                duration: 1500
              })
            }
          });
        } else console.log("获取用户登录态失败！" + o.errMsg);
      }
    });
  },
  // 设置地区id
  setRegionsOfProvinceCity(r) {
    this.globalData.getRegionsOfProvinceCity = r
  },
  // 设置经纬度
  setLatitude(r) {
    this.globalData.Latitude = r.Latitude
    this.globalData.Longitude = r.Longitude
  },
  // 设置地址id
  setAddress(r) {
    this.globalData.address = r
  },
  // 设置用户信息
  setMembersInfo: function (r) {
    this.globalData.GetMembersInfo = r
  },
  setUserInfo: function (t) {
    this.globalData.userInfo = t;
  },
  orderPay: function (t, e, o) {
    var r = this;
    r.getOpenId(function (n) {
      wx.request({
        url: r.getUrl("GetPayParam"),
        data: {
          openId: n,
          orderId: t
        },
        success: function (t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            wx.requestPayment({
              timeStamp: r.timeStamp,
              nonceStr: r.nonceStr,
              package: "prepay_id=" + r.prepayId,
              signType: "MD5",
              paySign: r.sign,
              success: function (t) {
                wx.showModal({
                  title: "提示",
                  content: "支付成功！",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm && wx.redirectTo({
                      url: "../orderlist/orderlist?status=" + e
                    });
                  }
                });
              },
              fail: function (t) {
                wx.showModal({
                  title: "提示",
                  content: "支付失败！",
                  showCancel: !1,
                  success: function (t) {
                    o || t.confirm && wx.redirectTo({
                      url: "../orderlist/orderlist?status=" + e
                    });
                  }
                });
              }
            });
          } else wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function (t) {
              o || t.confirm && wx.redirectTo({
                url: "../orderlist/orderlist?status=" + e
              });
            }
          });
        }
      });
    });
  },
  tempOpenId: 'oGsqu4kr4cw0lP0vIV5sTDoxa66k',
  getRequestUrl: "https://m5.hmeshop.cn",
  imgUrl: 'https://bcdj.meiniwangluo.cn/images/',//图片路径
  getAllUrl: "s://bcdj.meiniwangluo.cn",//线上接口
  // getAllUrl: 'http://20220.9oasd.cn/API/WeChatApplet.ashx',// 'http://192.168.3.100/API/WeChatApplet.ashx',
  // getAllUrl: 'http://192.168.3.100/API/WeChatApplet.ashx',
  // gethsyurl: 'http://20220.9oasd.cn/API/WeChatApplet.ashx',// 'http://192.168.3.100/API/WeChatApplet.ashx',
  gethsyurl: 'https://bcdj.meiniwangluo.cn/API/WeChatApplet.ashx',  //线上接口
  // getAllUrl: "://cs.9oasd.com",//测试接口
  // gethsyurl: 'http://cs.9oasd.com/API/WeChatApplet.ashx',  //测试接口
  //  getAllUrl: "://20220.9oasd.cn",//测试接口
  // gethsyurl: 'https://20220.9oasd.cn/API/WeChatApplet.ashx',  //测试接口
  // getAllUrl: "://192.168.3.100",//本地接口
  // gethsyurl: 'http://192.168.3.100/API/WeChatApplet.ashx',  //本地接口
  getUrl: function (t) {
    return "http" + this.getAllUrl + "/API/WeChatApplet.ashx?action=" + t;
  },
  getGroupChatUrl: function (t) {
    return "http" + this.getAllUrl + "/CommunicationCircle/GroupChat.ashx?action=" + t;
  },

  globalData: {
    appId: "wxd2f195f3a61f2e35", //小程序appid
    secret: "3acfa2d5e397fec843e9054f10ca98d4", //小程序密钥
    userInfo: null,//一开始的userinfo是空的
    siteInfo: null,
    ReferralInfo: null,
    ReferralSettingInfo: null,
    openId: "",
    wxUserInfo: null,
    GetMembersInfo: null,//用户信息 by fujihang  
    isReloadUser: "0",
    // QQMapKey: "7UPBZ-XO7WU-5HBVI-BCTF7-5N2CS-5YFIB",
    QQMapKey: "MIGBZ-NK6WO-JUPWH-SJYCP-NPJ7V-K7BK3",
    loginByOpenId: "LoginByOpenId",
    loginByUserName: "LoginByUserName",
    quickLogin: "QuickLogin",
    getIndexData: "GetHelpsData",
    GetIndexProductData: "GetIndexProductData",
    getProducts: "GetProducts",
    getProductDetail: "GetProductDetail",
    getCountDownProductDetail: "GetCountDownProductDetail",
    userGetCoupon: "UserGetCoupon",
    loadCoupon: "LoadCoupon",
    LoadSiteCoupon: "LoadSiteCoupon",
    getUserShippingAddress: "GetUserShippingAddress", //获取收货地址
    addShippingAddress: "AddShippingAddress",
    updateShippingAddress: "UpdateShippingAddress",
    setDefaultShippingAddress: "SetDefaultShippingAddress",
    GetShippingAddressById: "GetShippingAddressById",
    delShippingAddress: "DelShippingAddress",
    AddWXChooseAddress: "AddWXChooseAddress", //添加地址
    orderList: "OrderList",
    closeOrder: "CloseOrder",
    finishOrder: "FinishOrder",
    getLogistic: "GetLogistic",
    getPayParam: "GetPayParam",
    getShoppingCart: "GetShoppingCart",
    sumbitOrder: "SumbitOrder",
    getRegionsOfProvinceCity: "GetRegionsOfProvinceCity",//地区id
    getRegions: "GetRegions",
    GetRegionByLatLng: "GetRegionByLatLng",
    getAllCategories: "GetAllCategories",
    loadOrderProduct: "GetOrderProduct",
    loadReview: "LoadReview",
    loadCouponDetails: "GetCouponDetail",
    getAfterSalePreCheck: "AfterSalePreCheck",
    Latitude: '',//维度
    Longitude: '',//经度
    address: '',//地址id
    fuStoreId: 0,
    isNew: false,
    scene: {},
    reId: '',//积分分享id
  }
}), Number.prototype.toFixed = function (t) {
  e = this + "";
  if (t || (t = 0), -1 == e.indexOf(".") && (e += "."), e += new Array(t + 1).join("0"),
    new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (t + 1) + "})?)\\d*$").test(e)) {
    var e = "0" + RegExp.$2,
      o = RegExp.$1,
      r = RegExp.$3.length;
    return r == t + 2 && (e = (r = e.match(/\d/g)).join("").replace(new RegExp("(\\d+)(\\d{" + t + "})\\d$"), "$1.$2")),
      e = e.substr(1), (o + e).replace(/\.$/, "");
  }
  return this + "";
};