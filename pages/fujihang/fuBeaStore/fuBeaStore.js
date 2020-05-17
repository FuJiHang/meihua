const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.imgUrl,
    imgUrls: [
      
    ],//轮播图
    imgheights:[],//所有图片高度
    news:'',//消息
    show:false,
    fisrtData:[],
    chooseList:[
      {
        name:'积分区间（美丽金）',
        index:-1,
        child:[
          {
            name:'0-300',
            val:'',
            post:'0,300',
            data:'A1',
            index:-1,
            min:0,
            max:300,
          },
          {
            name:'300-1000',
            val:'',
            post:'300,1000',
            data:'A2',
            index:-1,
            min:300,
            max:1000,
          },
          {
            name:'1000-3000',
            val:'',
            post:'1000,3000',
            data:'A3',
            index:-1,
            min:1000,
            max:3000,
          },
        ]
      },
      {
        name:'现金+美丽金兑换',
        index:-1,
        child:[
          {
            name:'100~300元',
            post:'',
            index:-1,
            min:100,
            max:300,
          },
          {
            name:'300~800元',
            post:'',
            index:-1,
            min:300,
            max:800,
          },
          {
            name:'1000元以上',
            post:'',
            index:-1,
            min:1000,
            max:'',
          },
        ]
      },
      {
        name:'品种类型',
        index:-1,
        child:[

        ]
      }
    ],
    hotList:[],//热门推荐
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
  xz:1,
  getTypeList:[],
  senoud:[],
  current:0,
  typeList:[],//系列
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
  // 更多
  toMore(e){
    
    let post={
      action:'GetGifts',
      IsPromotion:1,
      AttributeId:e.currentTarget.dataset.index,
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      openId:app.globalData.GetMembersInfo.openId,
    }
    wx.navigateTo({
      url: "/pages/fujihang/fuBeaStoreList/fuBeaStoreList?post="+JSON.stringify(post)
    });
  },
  // 轮播图变化
  imageLoad: function (e) {//获取图片真实宽度  
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
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },

  // 获取分类
  getType(){
    let data=this.data,that=this
    app.fl()
    app.fg({
      action: 'GetGifts',
      AttributeId: 109,
      IsPromotion: 0,
      openId:app.globalData.GetMembersInfo.openId,
      pageindex: 1,
      pagesize: 2,
    }).then(r=>{
      app.fh() 
    
        that.setData({
          senoud:r.data.rows
        })

      console.log(r) 
    })
  },


  onClose() {
    this.setData({ show: false });
  },

  // 收藏
  collFN(e){
    let data=this.data,that=this
    let index=e.currentTarget.dataset
    app.fl('正在收藏中...')
    app.fg({
      action:'AddCollection',
      giftid:e.currentTarget.dataset.giftid,
      CollectType:'Gift',
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      openId:app.globalData.GetMembersInfo.openId,
    }).then(r=>{
      app.fh()
      app.fa(r.data.Message)
      if(r.data.Status=="OK"){
        data.fisrtData[index.indexs].child[index.index].IsCollected=r.data.Message=='收藏成功'?'True':'False'
        that.setData({
          fisrtData:data.fisrtData
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar({})
    this.setData({
      ['navBar[0].to']:app.globalData.fuStoreId?'/pages/fujihang/fuStoreDet/fuStoreDet':'/pages/fujihang/fuIndexG/fuIndexG',
    })
    let data=this.data,that=this


    // 轮播图
    // banner
    app.fg({
      action:'GetBannerPictures',
      ptype:1,
    }).then(r=>{
      that.setData({
        imgUrls:r.data.rows
      })
    })

    app.fg({
      action:'GetGiftsRecords',
    }).then(r=>{
      that.setData({
        news:r.data.Message
      })
    })
    that.kaisi()
    if(!app.globalData.GetMembersInfo||!app.globalData.GetMembersInfo.openId){
      app.getOpenId(function(a) {
        app.setMembersInfo({openId:a})
        that.getType()
      })

      // app.getOpenId(function(a) {
      //   app.fg({
      //     action: 'GetMembersInfo',
      //     openId: a
      //   }).then(r => {
      //     if (r.data.Status == "OK") {
      //       let dataR = r.data.Data
      //       dataR.openId = a
      //       app.setMembersInfo(dataR)
      //       that.kaisi()
      //       that.getType()
      //     } else {
      //       wx.redirectTo({
      //         url: "/pages/login/login"
      //       });
      //     }
      //   })
     
      // })
      // app.fuLo()
    }else{
      
      that.getType()
    } 


   
   
  },

  kaisi(){
    let data=this.data,that=this

    app.fg({
      action:'GetGiftCategory',
    }).then(r=>{
      let datar=r.data
      data.chooseList[2].child=[]
      for(let i=0;i<datar.length;i++){
        datar[i].index=-1
        datar[i].name=datar[i].AttributeName
        data.chooseList[2].child.push(datar[i])
      }
      that.setData({
        chooseList:data.chooseList
      })
      data.fisrtData=datar
      for(let o=0;data.fisrtData.length;o++){
        // console.log(!data.fisrtData[o].AttributeImage)
        if(!data.fisrtData[o].AttributeImage){
          app.fg({
            action:'GetGifts',
            // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
            openId:app.globalData.GetMembersInfo.openId,
            pageindex:1,
            pagesize:4,
            IsPromotion:0,
            AttributeId:data.fisrtData[o].AttributeId
          }).then(r=>{
            data.fisrtData[o].child=r.data.rows
            that.setData({
              fisrtData:data.fisrtData
            })
            
          })
        }else {
          data.typeList.push(data.fisrtData[o])
          that.setData({
            typeList:data.typeList
          })
        }
        
      }
      
    })

    app.fg({
      action:'GetGiftSelections',
      a1:data.chooseList[0].child[0].post,
      a2:data.chooseList[0].child[1].post,
      a3:data.chooseList[0].child[2].post,
    }).then(r=>{
      let datar=r.data.rows[0]
      for(let i=0;i<data.chooseList[0].child.length;i++){
        data.chooseList[0].child[i].val=datar[data.chooseList[0].child[i].data]
      }
      that.setData({
        chooseList:data.chooseList
      })

      
    })

    // 热门推荐
    app.fg({
      action:'GetGifts',
      pageindex:1,
      pagesize:3,
      IsPromotion:1,
      AttributeId:0,
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      openId:app.globalData.GetMembersInfo.openId,
    }).then(r=>{

      that.setData({
        hotList:r.data.rows
      })

      
    })

    

    
    

    setTimeout(()=>{
      app.fh()
    },1500)
   
  },
  showFN(){
    this.setData({
      show:true
    })
  },
  // 选择
  chooseFN(e){
    let data=this.data.chooseList
    let choose=e.currentTarget.dataset
    if(data[choose.findex].index==choose.index) data[choose.findex].index=-1
    else data[choose.findex].index=choose.index
    this.setData({
      chooseList:data
    })
  },

  // 查询
  seachFN(){
    let data=this.data
    let post={
      action:'GetGifts',
      IsPromotion:1,
      AttributeId:0,
      // openId:'oGsqu4qBG6Icub2iLYzI3MJGH4iQ',
      openId:app.globalData.GetMembersInfo.openId,
    }
    if(data.chooseList[0].index!=-1){
      post.minPoint=data.chooseList[0].child[data.chooseList[0].index].min
      post.maxPoint=data.chooseList[0].child[data.chooseList[0].index].max
    }
    if(data.chooseList[1].index!=-1){
      post.minPrice=data.chooseList[1].child[data.chooseList[1].index].min
      post.maxPrice=data.chooseList[1].child[data.chooseList[1].index].max
    }
    if(data.chooseList[2].index!=-1){
      post.AttributeId=data.chooseList[2].child[data.chooseList[2].index].AttributeId
    }
    wx.navigateTo({
      url: "/pages/fujihang/fuBeaStoreList/fuBeaStoreList?post="+JSON.stringify(post)
    });
    // app.fg(post).then(r=>{
    //   console.log(r)
      // that.setData({
      //   hotList:r.data.rows
      // })
    // })
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
    if(!app.globalData.GetMembersInfo||!app.globalData.GetMembersInfo.openId) app.fuLo()
    
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
    if(!app.globalData.GetMembersInfo||!app.globalData.GetMembersInfo.openId) app.fuLo()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})