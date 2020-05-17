
const app = getApp();

Page({
	data: {
		tabText: ['预告', '直播中', '回放'],
		TabCur: 0,
		scrollLeft: 0,
		LiveList: [],
		notUser: false,
		id: '',
		list: [],
		page: 0, // 分页
		rows: 4, // 每页条数
		isLastPage: false, // 是否为最后一页


	},

	useFN(e) {
		let data = this.data, that = this, datar = e.currentTarget.dataset
		if (!data.notUser) return
		app.fl()
		app.fg({ 
			action: 'SetUserProductUseTime',
			openId: app.globalData.openId,
			Id: datar.id

		}).then(r => {
			app.fh()
			if (r.data.Status == 'OK') {
				setTimeout(() => {
					that.getData(data.id)
				}, 1450)
			}
			app.fa(r.data.Message)
			console.log(r)
		})
	},
	getFN(e) {
		let data = this.data, that = this, datar = e.currentTarget.dataset
		if (!data.notUser) return
		app.fl()
		app.fg({
			action: 'SetUserActivityGetGift',
			openId: app.globalData.openId,
			Id: datar.id

		}).then(r => {
			app.fh()
			if (r.data.Status == 'OK') {
				setTimeout(() => {
					that.getData(data.id)
				}, 1450)
			}
			app.fa(r.data.Message)
			console.log(r)
		})
	},

	getData(id) {
		let that = this;
		app.fl()
		app.fg({
			action: 'GetStoreUserActivitysDetail',
			Id: id || 32,
			openId: app.globalData.openId
		}).then(r => {
			app.fh()
			let result = r.data;

			if (result.Status == "OK") {
				// result.Data.overDate = new Date(result.Data.EndDate).getTime() / 1000
				this.setData({
					actData: result.Data
				})

			} else {
				app.fa('获取失败！')
			}
		})
	},

	onShow() {
		// this.getDataList()
	},
	onLoad(opt) {
		this.data.id = opt.id
		this.data.notUser = opt.notUser || ''

		this.getData(opt.id)


	}
})