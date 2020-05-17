let app = getApp();

Page({
	data: {
		imgUrl:app.imgUrl,
		tabText: ['预告', '直播中', '回放'],
		TabCur: 0,
		scrollLeft: 0,
		checkAll: false,

		list: [],
		page: 0, // 分页
		rows: 4, // 每页条数
		isLastPage: false, // 是否为最后一页
		giftList: [],
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
		show: false,
		GiftId:0,
	},

	// 
	changeInput(e) {

		this.setData({
			[e.currentTarget.dataset.name]: e.detail.value,
		})
	},
	// 获取列表数据
	// 去直播间
	toLive(e) {
		let { status, id } = e.currentTarget.dataset;
		if (status != 101 && status != 103) {
			return
		}
		let roomId = [id] // 房间号
		let customParams = { path: 'pages/index/index', pid: 1 }
		wx.navigateTo({
			url: `plugin-private://wxcbbd86b156ae4441/pages/live-player-plugin?room_id=${roomId}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`
		})
	},
	checkBox(e) {
		const { index } = e.currentTarget.dataset;
		const { giftList } = this.data;
		let that=this.data
		giftList.forEach((w, i) => {
			w.checked = false
			i == index ? (w.checked = true,that.GiftId=w.GiftId) : ''
		});
		// giftList[index].checked = !giftList[index].checked;
		this.setData({
			giftList
		})

	},
	submit() {
		// let arr = [];

		// this.data.giftList.map(d => {
		// 	if(d.checked){
		// 		arr.push(d)
		// 	}
		// })

		// wx.setStorageSync('giftList', JSON.stringify(arr));

		// wx.navigateTo({
		// 	url: './create'
		// })

		// 
		if(!this.data.GiftId) return app.fa('请选择礼品！')
		this.setData({
			show:true
		})

		



	},
	payOrder(){

	
	let data = this.data, that = this

		if (!(/^1[3|4|5|6|7|8][0-9|9]\d{4,8}$/.test(data.personData[1].val))) return app.fa('手机号码不正确！')
		app.fl("正在购买...")
		app.fg({
			action: 'UserGetCoupon',
			openid: app.globalData.GetMembersInfo.openId,
			shopType: 2,
			couponId: 34,
			StoreId:app.globalData.fuStoreId,
			GiftId:data.GiftId
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

						app.fg({
							action: 'BuyerPaid',
							shopType: 2,
							payId: pay.PayId,
							couponId:34,
							openId: app.globalData.GetMembersInfo.openId,
						})
						app.fg({
							action: 'UpdateInformationMember',
							CellPhone: data.personData[1].val,
							RealName: data.personData[0].val,
							openId: app.globalData.GetMembersInfo.openId,
						})
						app.fa('购买成功！')
						setTimeout(() => {
							wx.navigateTo({
								url:'/fuPackageB/act/user'
							})
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
	// 
	onCloseP() {
		this.setData({
			show: false,
		})
	},

	// getList(init) {
	// 	let { TabCur } = this.data;

	// 	if (init) { this.data.goodsList = [] }

	// 	wx.$ajax({
	// 		api: '/api/MiniProgramLive/api.ashx',
	// 		data: {
	// 			action: 'GetMpgoodsList',
	// 			liveStatus: TabCur == 0 ? '102' : TabCur == 1 ? '101' : '103'
	// 		}
	// 	}).then(res => {
	// 		let { goodsList } = res.data;

	// 		this.setData({ goodsList })
	// 		console.log(goodsList)
	// 	})

	// },
	toUrl(e) {
		let { id, status } = e.currentTarget.dataset;
		if (status == 103) {

			wx.navigateTo({
				url: '/pages/liveVideo/liveVideo?id=' + id,
			});
		} else {
			try {
				let roomId = [id] // 房间号
				let customParams = { path: 'pages/index/index', pid: 1 }
				wx.navigateTo({
					url: `plugin-private://wxcbbd86b156ae4441/pages/live-player-plugin?room_id=${roomId}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`
				})
			} catch (error) {
				console.warn(error)
			}

		}
	},

	trunVisitor(coun) {
		let _coun = 0;
		if (coun > 9999) {
			_coun = coun / 10000
		} else if (coun > 99999) {
			_coun = coun / 100000
		} else if (coun > 999999) {
			_coun = coun / 1000000
		} else if (coun > 999999) {
			_coun = coun / 1000000
		}

		return _coun.toFixed(2)
	},
	isCard(e) {
		this.setData({
			isCard: e.detail.value
		})
	},
	// 切换选择项
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60
		})
		this.getList(1);
	},
	getGift() {
		console.log(app)

		let that = this;
    app.fl()
    app.fg({
      action: 'GetStoreCouponActivity',
      StoreId: app.globalData.fuStoreId || 32
    }).then(r => {
      app.fh()
      let result = r.data;

      if (result.Status == "OK") {
        result.Data.overDate = new Date(result.Data.EndDate).getTime() / 1000
        this.setData({
          giftList: result.Data.GiftList
        })

      } else {
        app.fa('获取失败！')
      }
    })

		// let params = {
		// 	pageindex: 1,
		// 	// AttributeId: 111,
		// 	IsPromotion: 1,
		// 	pagesize: 1000,
		// 	action: 'GetGifts',
		// 	openId: app.globalData.GetMembersInfo.openId || 210
		// }



		// let data = this.data, that = this;
		// app.fl()
		// app.fg(params).then(r => {
		// 	app.fh()
		// 	// app.fa(r.data.Message)
		// 	console.log(r);

		// 	if (r.data.Status != 'NO') {
		// 		let datar = r.data.rows
		// 		this.setData({ giftList: datar })
		// 	}



		// })



	},



	// /* 默认获取数据方法 */
	// getList(currentPage) {

	// 	if (currentPage) {
	// 		this.data.page = currentPage;
	// 		this.data.list = [];
	// 		this.data.isLastPage = false;
	// 	}

	// 	if (this.data.isLastPage) {
	// 		return
	// 	}

	// 	this.data.page++;

	// 	let params = {};
	// 	// params.id = 394;
	// 	params.ta = {
	// 		pa: currentPage || this.data.page,
	// 		li: this.data.limit
	// 	}

	// 	app.ajax.getHeadlineList(params, res => {
	// 		// 拿到结果
	// 		let result = res.headlines;
	// 		// 计算最终条数
	// 		let maxPage = Math.ceil(Number(res.total) / Number(this.data.limit)) || 1;
	// 		// 判断是否是最后一页
	// 		if (this.data.page - 1 >= maxPage) {
	// 			this.data.isLastPage = true;
	// 		}
	// 		// 处理数据
	// 		result.forEach(item => {
	// 			// item.num = app.tools.tranCount(item.num)
	// 			this.data.list.push(item)
	// 		})
	// 		console.log(this.data.list)
	// 		// 最终结果
	// 		this.setData({
	// 			page: this.data.page,
	// 			list: this.data.list,
	// 			isLastPage: this.data.isLastPage
	// 		})
	// 		wx.stopPullDownRefresh()
	// 	})
	// },


	onPullDownRefresh() {
		this.getList(1);
		console.log('下拉刷新')
	},
	onReachBottom() {
		this.getList();
		console.log('上拉触底')
	},

	onShow() {
		// this.getDataList()
	},
	onLoad() {
		let that = this;
		app.getId().then(data => {
			that.getGift();
		})
	}
})