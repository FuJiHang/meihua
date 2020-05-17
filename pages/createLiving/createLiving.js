// pages/createLiving/createLiving.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImageUrl: '../../images/image-placeholder.png', //封面图片,
    date: '请选择预播日期',
    time: '预播时间',
    roomTitle: '', //房间标题
    editType: 0, // 0新增，1修改
    editInfo: {}, //编辑页面数据
    OpenId: '',
    remarkData: '', //备注
    nowTime: '',
    LiveProductList: [], //关联商品列表
    MemberGradeList: [], //会员等级列表
    goodsList: [], //选中关联商品
    selectSortItem: {}, //选中的分类
    RoomId: '', //房间号
    selectNum: 0,
    ischecked: false,
    items: [{
        name: false,
        value: '不限制',
        checked: 'true'
      },
      {
        name: true,
        value: '付费观看'
      }
    ],
    defaultOption: [{
        name: false,
        value: '是',
        checked: 'true'
      },
      {
        name: true,
        value: '否'
      }
    ],
    selectRadio: false, //是否勾选付费观看
    selectDefaultRadio: true, //是否默认
    dateSelect: false,
    optionsType:0
  },

  // 选择分类
  selectSort: function() {
    wx.navigateTo({
      url: '/pages/createLiving/tabSelect',
    })
  },

  checkboxGoodsChange: function(e) {
    this.data.LiveProductList[e.currentTarget.dataset.index].isSelected = !this.data.LiveProductList[e.currentTarget.dataset.index].isSelected
    let arr = this.data.LiveProductList.filter(el => el.isSelected),
      goodsList = [];
    this.data.selectItems = arr
    // console.log(arr)
    for (var i = 0; i < arr.length; i++) {
      var goodsItem = {}
      goodsItem.ProductId = arr[i].ProductId
      goodsItem.DisplaySequence = arr[i].DisplaySequence
      goodsList.push(goodsItem)
    }
    this.setData({
      goodsList: JSON.stringify(goodsList)
    })
    return
  },


  // 选择适用条件
  radioChange(e) {
    var radioValue;
    e.detail.value === "true" ? radioValue = true : radioValue = false
    this.setData({
      selectRadio: radioValue
    })
    console.log(this.data.selectRadio)
  },

  // 是否默认
  radioDefaultChange(e) {
    var radioValue;
    e.detail.value === "true" ? radioValue = true : radioValue = false
    this.setData({
      selectDefaultRadio: radioValue
    })
    console.log(this.data.selectDefaultRadio)
  },

  checkboxChange(e) {
    return
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  checkboxSelect: function(e) {
    // 判断是否选中
    this.data.MemberGradeList[e.currentTarget.dataset.index].isSelected = !this.data.MemberGradeList[e.currentTarget.dataset.index].isSelected
  },
  bindfocus: function(e) {},
  // 需支付金额
  bindinput: function(e) {
    this.data.MemberGradeList[e.target.dataset.index].Commission = parseInt(e.detail.value)
  },


  /**
   * 选择预播时间
   * */
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      dateSelect: true
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  // 上传封面
  uploadPic: function() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        _this.upLoadImg(_this, res.tempFilePaths)
      }
    })
  },
  upLoadImg: function(_this, path) {
    wx.showLoading({
      title: '图片上传中',
      mask: true
    })
    wx.uploadFile({
      url: getApp().getUrl('UploadAppletImage'),
      filePath: path[0],
      name: 'file',
      formData: {
        openId: _this.data.OpenId
      },
      success: function(res) {
        wx.hideLoading()
        console.log(JSON.parse(res.data))
        let resData = JSON.parse(res.data)
        if (resData.Status === 'OK') {
          _this.setData({
            ImageUrl: resData.Data[0].ImageUrl
          })
        } else {
          wx.showModal({
            title: '提示',
            content: resData.errorMsg,
            showCancel: false
          })
        }
      },
      fail: function(e) {
        wx.hideLoading()
        console.log(e)
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      }
    })
  },

  // 获取房间标题
  writeTitle(e) {
    this.data.roomTitle = e.detail.value
  },

  // 获取备注数据
  onGetRemark: function(e) {
    this.data.remarkData = e.detail.value
  },

  /**
   * 提交处理函数
   * */
  onSubmit: function() {
    wx.showLoading({
      title: '',
    })
    // 封面图片
    if (this.data.ImageUrl === '../../images/image-placeholder.png') {
      wx.hideLoading()
      wx.showModal({
        content: '请上传封面图片',
        showCancel: false,
      })
      return
    }
    // 房间标题
    let rgxName = /^.{1,15}$/
    if (!rgxName.test((this.data.roomTitle).trim())) {
      wx.hideLoading()
      wx.showModal({
        content: '请输最少1个字符，不大于15个字符 ',
        showCancel: false,
      })
      return
    }
    // 预播时间
    if (this.data.date === '请选择预播日期') {
      wx.hideLoading()
      wx.showModal({
        content: '请选择预播日期',
        showCancel: false,
      })
      return
    } else if (this.data.time === '预播时间') {
      wx.hideLoading()
      wx.showModal({
        content: '请选择预播时间',
        showCancel: false,
      })
      return
    }
    // 判断是否勾选适用条件
    var arrlist = []
    if (this.data.selectRadio) {
      var selectMemberLength = this.data.MemberGradeList.length,
        MemberGradeList = this.data.MemberGradeList;
      for (var i = 0; i < selectMemberLength; i++) {
        let Commission = parseInt(MemberGradeList[i].Commission)
        let isSelected = MemberGradeList[i].isSelected
        if (isSelected === true) {
          arrlist.push(MemberGradeList[i])
        }
      }
      console.log(arrlist)
      if (arrlist.length === 0) {
        wx.showToast({
          title: '请选择适用会员',
          icon: 'none',
          duration: 2000
        })
        return
      } else {
        arrlist = JSON.stringify(arrlist)
      }
    }
    if (this.data.editType === 0) {
      this.createLiveRoom(arrlist)
    } else {
      this.editLiveRoom(arrlist)
    }
  },

  // 编辑房间
  editLiveRoom: function(arrlist) {
    var _this = this
    wx.request({
      url: getApp().getUrl('UpdateLiveRoom'),
      data: {
        roomname: _this.data.roomTitle, //房间标题
        image: _this.data.ImageUrl, //封面
        roomDes: _this.data.remarkData, //备注
        productstr: _this.data.goodsList, //商品列表
        joincondition: arrlist, //会员列表
        isallowguest: _this.data.selectRadio?0:1, //与joincondition互斥，为1时为不限制，允许游客观看
        isdefault: _this.data.selectDefaultRadio, //是否默认
        AdvanceTime: _this.data.date + ' ' + _this.data.time, //时间
        RoomType: _this.data.selectSortItem.TypeId || 0, //分类
        openId: _this.data.OpenId,
        roomId: _this.data.RoomId,
        actiontype: 'edit',
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.Status === 'success') {
          console.log(res)
          // wx.navigateTo({
          //   url: '/pages/myLiving/myLiving',
          // })
          wx.navigateBack({
            
          })
          wx.removeStorageSync("selectItem")
          return
        }
        if (res.data.Status === 'fail') {
          wx.showModal({
            title: '警告',
            content: res.data.ErrorMsg,
            showCancel: false,
          })
        } else {
          wx.showToast({
            title: '修改直播间失败',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: (e) => {
        console.log(e)
        wx.showToast({
          title: '修改直播间失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },

  // 创建房间
  createLiveRoom: function(arrlist) {
    var _this = this
    wx.request({
      url: getApp().getUrl('CreateLiveRoom'),
      data: {
        roomname: _this.data.roomTitle, //房间标题
        image: _this.data.ImageUrl, //封面
        roomDes: _this.data.remarkData, //备注
        productstr: _this.data.goodsList, //商品列表
        joincondition: arrlist, //会员列表
        isallowguest: _this.data.selectRadio ? 0 : 1, //与joincondition互斥，为1时为不限制，允许游客观看
        isdefault: _this.data.selectDefaultRadio ? 1 : 0, //是否默认
        AdvanceTime: _this.data.date + ' ' + _this.data.time, //时间
        RoomType: _this.data.selectSortItem.TypeId || 0, //分类
        openId: _this.data.OpenId
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        wx.hideLoading()
        console.log(res)
        if (res.data.Status === 'success' || res.data.Code === 0) {
          wx.navigateBack({})
          wx.removeStorageSync("selectItem")
          return
        }
        if (res.data.Status === 'fail') {
          console.log(res.data.Status)
          wx.showModal({
            title: '警告',
            content: res.data.ErrorMsg,
            showCancel: false,
          })
        } else {
          wx.showToast({
            title: '创建直播间失败',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: (e) => {
        console.log(e)
        wx.showToast({
          title: '创建直播间失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },

  // 获取关联商品
  getLiveProductList: function() {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetLiveProduct'),
      data: {
        PageNum: 1,
        pageSize: 10
      },
      success: function(res) {
        console.log('商品列表', res.data)
        if (res.data.Status === "success") {
          _this.setData({
            LiveProductList: res.data.Data.Data
          })
        }
      },
      fail: function(e) {
        console.log(e)
        wx.hideLoading()
      }
    })
  },

  // 获取会员等级列表
  getMemberGradeList: function() {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetMemberGradeList'),
      success: function(res) {
        console.log('会员列表', res.data.Data)
        if (res.data.Status === "success") {
          res.data.Data.forEach(v => {
            v.Commission = ''
            v.isSelected = false
          })
          _this.setData({
            MemberGradeList: res.data.Data
          })
        }
      },
      fail: function(e) {
        console.log(e)
        wx.hideLoading()
      }
    })
  },

  // 获取服务器时间
  getNowTime: function() {
    var _this = this
    wx.request({
      url: getApp().getUrl('GetServerTime'),
      success: function(res) {
        console.log(res)
        if (res.data.Status === 'success') {
          var originalTime = res.data.Data.substring(0, 10)
          _this.setData({
            nowTime: originalTime
          })
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type == 1) {
      wx.setNavigationBarTitle({
        title: '编辑直播间',
      })
      var editInfo = JSON.parse(wx.getStorageSync("editJsonInfo"))
      var editDate = editInfo.AdvanceTime.split(" ")[0],
        editTime = editInfo.AdvanceTime.split(" ")[1];
      this.setData({
        ImageUrl: editInfo.Image, //封面
        roomTitle: editInfo.RoomName, //房间标题
        date: editDate,
        time: editTime,
        RoomDes: editInfo.RoomDes,
        editType: options.type,
        RoomId: editInfo.Id,
        selectSortItem: editInfo.RoomTypeInfo,
        // MemberGradeList: editInfo.JoinConditionList,  
        editInfo: JSON.parse(wx.getStorageSync("editJsonInfo")),
        optionsType:1
      })
      wx.setStorageSync('selectItem', this.data.selectSortItem)
      wx.showModal({
        title: '提示',
        content: '适用条件与关联商品需重新选择',
        showCancel: false,
      })
    }
    if(options.type == 0){
      wx.removeStorageSync('selectItem')
    }
    var _this = this
    getApp().getOpenId(function(oId) {
      _this.setData({
        OpenId: oId,
        optionsType: 0
      })
    })
    
    this.getLiveProductList()
    this.getMemberGradeList()
    this.getNowTime()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 勾选的商品
    if (wx.getStorageSync("selectGoodsList")) {
      var selectNum = JSON.parse(wx.getStorageSync("selectGoodsList")).length,
        goodsList = wx.getStorageSync("selectGoodsList")
      this.setData({
        selectNum: selectNum,
        goodsList: goodsList
      })
      wx.removeStorageSync("selectGoodsList")
    }
    // 勾选的分类
    if (wx.getStorageSync("selectItem")) {
      var selectSortItem = wx.getStorageSync("selectItem")
    } else if (this.data.selectSortItem) {
      var selectSortItem = this.data.selectSortItem
    } else {
      var selectSortItem = {}
    }
    this.setData({
      selectSortItem: selectSortItem
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})