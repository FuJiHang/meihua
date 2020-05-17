// pages/storesOrder/storesOrder.js
const app = getApp();
let person = wx.getStorageSync('person')
// JSON.parse(wx.getStorageSync('person'))
Page({

  /**
   * 页面的初始数据
   */

  data: {
    showTH: false,
    actData: {},
    personData: [],
    interval: 1000,
    show: false,
    cardCur: 0,
    time: 30 * 60 * 60 * 1000,
    personData: [
      {
        name: '姓名：',
        val: '',
        post: 'RealName',
      },
      {
        name: '手机号：',
        val: '',
        post: 'CellPhone',
      },
    ],
    StoreId: '',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    showT: false,
    imgUrl: app.imgUrl,
    MiniProgramCard: '',
  },

  onLoad(opt) {
    let dddd = ''
    opt.scene ? dddd = decodeURIComponent(opt.scene) : ''
    if (dddd) {
      console.log(dddd, '22222222222');
      opt.id = dddd.split('id=')[1]
      app.globalData.fuStoreId=opt.id
    }
    opt.id = opt.id || 32;
    this.towerSwiper('swiperList');
    this.getIndexData(opt.id);
    this.setData({
      StoreId: opt.id
    })
    let that = this, data = this.data;
    // wx.getStorage({
    //   key: 'personData',
    //   success(res) {
    //     for (let i = 0; i < data.personData.length; i++) {
    //       data.personData[i].val = res.data[data.personData[i].post] ? res.data[data.personData[i].post] : app.globalData.GetMembersInfo[data.personData[i].post]
    //     }
    //     that.setData({
    //       personData: data.personData
    //     })
    //   }, fail(res) {
    //     for (let i = 0; i < data.personData.length; i++) {
    //       data.personData[i].val = app.globalData.GetMembersInfo[data.personData[i].post]
    //     }
    //     that.setData({
    //       personData: data.personData
    //     })
    //   }
    // })
    // 初始化towerSwiper 传已有的数组名即可

  },
  myQCode() {
    let data = this.data, that = this
    app.fl()
    app.fg({
      action: 'GetShopExtension',
      openId: 'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      Path: 'fuPackageB/act/index?id=' + data.StoreId,
      OnlyQrCode: true
    }).then(r => {
      app.fh()
      if (r.data.Status == 'OK') {
        that.setData({
          showTH: true
        })

        setTimeout(() => {
          data.MiniProgramCard = r.data.data[0].MiniProgramCard.replace(/\s*/g, "")
          const query = wx.createSelectorQuery()
          query.select('#myCanvasT').boundingClientRect()
          query.exec(function (res) {
            console.log(res, '2222222111111111');
            that.createCanT(res[0].width, res[0].height)
          })
        }, 500)


      } else app.fa(r.data.Message)
    })
  },


  onShow() {

    // wx.getImageInfo({
    //   src: 'https://file.9oasd.com/bcdj/QR/20200413/084a6175-76fe-43fb-9db5-7068470bcb5c.20200413043711.png',
    //   success(res) {
    //     console.log(res,'mmmmmmm');



    //   },
    //   fail(e) {
    //     console.log(e,'mmmmmmm');

    //   }
    // })



  },

  // 获取图片临时路径
  getImgPath(img) {
    console.log(img, 'pppppwwwwwwwww');
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: img,
        success(res) {
          console.log(res, 'mmmmmmm');
          resolve(res)


        },
        fail(e) {
          console.log(e, 'mmmmmmm');
          reject(e)
        }
      })
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
            _this.setData({
              showTH: false
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
  

    this.getImgPath(this.data.imgUrl + 'actionCav002.jpg').then((res) => {
      ctx.drawImage(res.path, 0, 0, rpxw, rpxh);
      ctx.draw(true);

      let aaa = that.data.MiniProgramCard
      that.getImgPath(aaa).then((res) => {
        console.log(res, '21pppppppp');
        ctx.drawImage(res.path, 175 * z, 395 * z, z * 75, z * 75);
    
        ctx.setFontSize(14 * z)
        ctx.setFillStyle('#fff')
        ctx.setTextAlign('right')
        ctx.fillText(that.data.actData.StoreName, rpxw - 32, 153 * z)
        ctx.draw(true);
      })

    })

    console.log(this.data.MiniProgramCard, 22222222333333);


    // MiniProgramCard
    // ctx.setTextAlign('center')

    // ctx.setFontSize(16 * z)
    // ctx.setFillStyle('#FB1F4F')
    // ctx.fillText('邀请码：41120' + app.globalData.GetMembersInfo.UserId, 137.5 * z, 34 * z)
    // ctx.setFontSize(14 * z)
    // ctx.setFillStyle('#333')
    // ctx.fillText('申请门店或者申请渠道的时候必填', 137.5 * z, 54 * z)
    // ctx.setFontSize(16 * z)
    // ctx.setTextAlign('center')
    // ctx.fillText('长按二维码识别小程序', 137.5 * z, 350 * z)
    // this.getImgPath(this.data.imgUrl + 'xiaochengxu.jpg').then((res) => {
    //   ctx.drawImage(res.path, 16 * z, 80 * z, rpxw - 32 * z, 230 * z);
    //   ctx.draw(true);

    // })
    ctx.draw();
  },

  payOrder() {
    let data = this.data, that = this
    if (!(/^1[3|4|5|6|7|8][0-9|9]\d{4,8}$/.test(data.personData[1].val))) return app.fa('手机号码不正确！')

    wx.setStorageSync('person', data.personData);

    app.fl("正在购买...")


    app.fg({
      action: 'UserGetCoupon',
      openid: app.globalData.openId,
      shopType: 2,
      couponId: 34,
      StoreId: data.StoreId,
    }).then(b => {
      if (b.data.Status != 'OK') {
        app.fh()
        app.fa(b.data.Message)
        return
      }

      let pay = b.data.Data
      wx.requestPayment({
        timeStamp: pay.timeStamp,
        nonceStr: pay.nonceStr,
        package: "prepay_id=" + pay.prepayId,
        signType: 'MD5',
        paySign: pay.sign,
        success(res) {
          app.fh()
          if (res.errMsg == "requestPayment:ok") {
            app.fa('购买成功！')
            setTimeout(() => {
              wx.navigateTo({
                url: './list?id=' + 1,
              });
            }, 1450)

          } else {
            app.fh()
            app.fa('购买失败！')
          }
        }, fail(res) {
          app.fh()
          app.fa('购买失败！')
        }
      })
    })
  },

  changeInput(e) {

    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value,
    })
  },
  onCloseP() {
    console.log('2222222222');
    this.setData({
      show: false,
      showTH: false,
    })
  },
  shareFN() {
    this.setData({

      showTH: true,
    })
  },
  openFN() {
    let s = this.data.actData.StoreName
    wx.navigateTo({
      url: '/fuPackageA/fuStroreCode/fuStroreCode?s=' + s + '&url=' + this.data.actData.CodeUrl
    })
    // this.setData({
    //   showT:true
    // })
  },

  onCloseP() {
    this.setData({
      showT: false
    })
  },

  goBuy() {
    wx.navigateTo({
      url: '/fuPackageB/act/prize'
    })
    // this.setData({
    //   show: true
    // })
  },
  getIndexData(id) {
    let that = this;
    app.fl()
    app.fg({
      action: 'GetStoreCouponActivity',
      StoreId: id || 32
    }).then(r => {
      app.fh()
      let result = r.data;

      if (result.Status == "OK") {
        result.Data.overDate = new Date(result.Data.EndDate).getTime() - new Date(result.Data.StartDate).getTime()

        this.setData({
          actData: result.Data
        })
        wx.setNavigationBarTitle({
          title: result.Data.StoreName + '活动'
        })

      } else {
        app.fa('获取失败！')
      }
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: true
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})