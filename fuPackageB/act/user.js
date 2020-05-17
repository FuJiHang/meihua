const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    userType: 2,
    StoreId: 32,
    load: true,
    storeList: [],
    content: '',
  },
  onLoad(opt) {
    console.log(opt, '55545')
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // });

    this.setData({ StoreId: opt.StoreId })
    app.getId().then(data => {

      // if (this.data.userType == 1) {
      this.getData()
      // } else {
      //   this.referUser();
      // }


    })
  },
  inputText(e) {
    this.setData({ content: e.detail.value })
  },
  submit() {
    if (this.data.content)
      this.getData(this.data.list[this.data.TabCur].StoreId, this.data.content);
  },
  getData(id, content) {
    // 店长 执行者

    let that = this;
    let params = {
      action: 'GetStoreUserActivitysList',
      openId: app.globalData.openId,
      IsMyActivitys: true
    }

    if (content) {
      params.content = that.data.content;
    }

    app.fl()
    app.fg(params).then(r => {
      app.fh()

      let list = r.data.Data;
      // if (this.data.userType == 1) {

      let array = [{}];
      array[0] = {};
      array[0].StoreName = '我的门店';
      array[0].item = list;
      this.setData({
        list: array,
        listCur: array[0]
      })
      // } else {
      //   that.data.list[0].item = list
      //   this.setData({
      //     list: that.data.list
      //   })
      // }


      // this.setData({
      //   list: list,
      //   listCur: list[0]
      // })

      console.log(r)
      let result = r.data;

      if (result.Status == "OK") {
        result.Data.overDate = new Date(result.Data.EndDate).getTime() / 1000
        this.setData({
          actData: result.Data
        })

      } else {
        app.fa('获取失败！')
      }
    })
  },
  // 获取个人信息
  referUser() {
    let that = this
    app.getOpenId(function (a) {
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

          that.getStore(dataR.ExcutorId);
        } else {
          wx.redirectTo({
            url: "/pages/login/login"
          });
        }
      })
    })
  },
  getStore(exid) {
    let data = this.data, that = this;
    app.fl()
    app.fg({
      action: "Search",
      tag: "store",
      Latitude: '23.129010d',
      Longitude: '113.2668d',
      pageindex: 1,
      exid

    }).then(r => {
      app.fh()

      that.setData({
        list: r.data.Models
      })
      that.getData(that.data.list[0].StoreId)
      // console.log(this.data.list)

    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    // debugger
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 130
    })
    this.getData(this.data.list[e.currentTarget.dataset.id].StoreId)
  },

  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 130,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})