let app = getApp();
Page({
	data: {
		tabText: ['预告', '直播中', '回放'],
		TabCur: 0,
		scrollLeft: 0,
		LiveList: [],
		actData: {},

		list: [],
		page: 0, // 分页
		rows: 4, // 每页条数
		isLastPage: false, // 是否为最后一页


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

	// 

	getData(id) {
		app.fl()
		app.fg({
			action: 'GetStoreUserActivitysDetail',
			id,
			openId: app.globalData.openId,
		}).then(r => {
			app.fh()
			let result = r.data;

			if (result.Status == "OK") {

				this.setData({
					actData: result.Data
				})

			} else {
				app.fa('操作失败！')
			}
		})
	},
	setUse(e) {
		let { id, index } = e.currentTarget.dataset;
		let that = this;
		wx.showModal({
			title: '提示',
			content: '确定扣除次数？',
			success: function (sm) {
				if (sm.confirm) {
					// 用户点击了确定 可以调用删除方法了
					app.fl()
					app.fg({
						action: 'SetUserProductUseTime',
						id,
						openId: app.globalData.openId,
					}).then(r => {
						app.fh()
						let result = r.data;

						if (result.Status == "OK") {
							app.fa('操作成功！')
							that.data.actData.Products[index].UseTime--
							that.setData({ actData: that.data.actData })

						} else {
							app.fa('操作失败！')
						}
					})
				} else if (sm.cancel) {
					console.log('用户点击取消')
				}
			}
		})

	},

	setGet(e) {
		let { id,  } = e.currentTarget.dataset;
		let that = this;
		app.fl()
		app.fg({
			action: 'SetUserActivityGetGift',
			id: that.data.actData.Id,
			openId: app.globalData.openId,
		}).then(r => {
			app.fh()
			let result = r.data;

			if (result.Status == "OK") {
				app.fa('操作成功！')
		
				// that.setData({ actData: that.data.actData })

			} else {
				app.fa('获取失败！')
			}
		})
	},

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
	onLoad(opt) {

		console.log(opt, 2222)
		app.getId().then(data => {
			this.getData(opt.id)
		})
	}
})