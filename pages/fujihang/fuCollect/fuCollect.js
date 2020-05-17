const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.imgUrl,
    post:{
      action:'GetGifts',
      pagesize:10,
      AttributeId:0,
      IsCollected:1,
      pageindex:1,
      
    },//请求数据
    dataList:[
      
    ],
    finsh:false,
  },
  // 搜索字

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data=this.data.post
    data.openId=app.globalData.GetMembersInfo.openId
    this.setData({
      post:data
    })
    this.getData()
  },

  getData(){
    let data=this.data,that=this
    if(data.finsh) return
    app.fl()
    app.fg(data.post).then(r=>{
      app.fh()
      let datar=r.data.rows
      datar.forEach(arr=>{
        data.dataList.push(arr)
      })
      if(datar.length<10){
        data.finsh=true
      }
      data.post.pageindex++
      that.setData({
        dataList:data.dataList,
        post:data.post,
        finsh:data.finsh,
      })
    })
  },
  // 收藏
  collFN(e){
    let data=this.data,that=this
    let index=e.currentTarget.dataset
    app.fl('正在收藏中...')
    app.fg({
      action:'AddCollection',
      giftid:e.currentTarget.dataset.giftid,
      CollectType:"Gift",
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      openId:app.globalData.GetMembersInfo.openId,
    }).then(r=>{
      app.fh()
      app.fa(r.data.Message)
      if(r.data.Status=="OK"){
        data.dataList[index.index].IsCollected='True'
        that.setData({
          dataList:data.dataList
        })
      }
   
    })
  },
  // 详情
  buyFN(e){
    let data=e.currentTarget.dataset
    // pointDetail
    wx.navigateTo({
      url:'/pages/pointDetail/pointDetail?costprice='+data.costprice+'&id='+data.giftid
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