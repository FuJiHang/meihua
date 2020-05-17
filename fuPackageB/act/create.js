
const app = getApp();
const { getTime, getDate } = app.common;
let gift = [];
if (wx.getStorageSync('giftList')) {
	console.log(JSON.parse(wx.getStorageSync('giftList')))
	gift = JSON.parse(wx.getStorageSync('giftList'));
}
Page({

  /**
   * 页面的初始数据
   */

	data: {
		columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
		showPicker1: false,
		showPicker2: false,
		showDatePicker1: false,
		showDatePicker2: false,
		GetMembersInfo: {},
		minDate: new Date().getTime(),
		maxDate: new Date(2019, 10, 1).getTime(),
		form: {
			Gifts: '',
			shareCardImg: '',
			ActivityName: '',
			startTime: getTime(),
			startDate: getDate(),
			Address: '',
			storeName: '',
			StoreId: '',
			activityName: '',
			Tel: '',
			UserLimitCount: 0,
			gift: '',
			CodeUrl: '',
			products: [],
			TopMsg:'',
			ShowSaleCounts:'',
		},
		storeList: [],
		includeProducts: [],
		giftList: gift || [],
		time: getTime(),
		date: getDate(),
		modalName: '',
		checkedAll: false,
		imgUrl:app.imgUrl,
	},
	DelImg(e) {
		let { type } = e.currentTarget.dataset;
		if (type == 1) {
			this.setData({
				'form.CodeUrl': ''
			})
		} else {
			this.setData({
				'form.roomImg': ''
			})
		}

	},
	DateChange(e) {
		this.setData({
			'form.date': e.detail.value
		})
	},
	TimeChange(e) {
		let { type } = e.currentTarget.dataset;
		if (type == 1) {
			this.setData({
				'form.startTime': e.detail.value
			})
		} else {
			this.setData({
				'form.endTime': e.detail.value
			})
		}

	},
	onInput(e) {
		console.log(e);
	},
	remove(e) {
		let that = this;
		let { index } = e.currentTarget.dataset;
		that.data.giftList.splice(index, 1);
		that.setData({
			giftList: that.data.giftList
		})
	},
	removeProduct(e) {
		let that = this;
		let { index } = e.currentTarget.dataset;
		that.data.form.products.splice(index, 1);
		that.setData({
			'form.products': that.data.form.products
		})
	},
	inputItem(e) {
		const { index, type } = e.currentTarget.dataset;
		let { value } = e.detail;
		let { products } = this.data.form;
		products[index][type] = value;
		this.setData({
			'form.products': products
		})
	},
	ChooseImage(e) {
		let that = this;
		let { type } = e.currentTarget.dataset;


		wx.chooseImage({
			count: 1, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: (res) => {
				that.upLoadImg(res.tempFilePaths[0]).then(res => {
					console.log(res)
					that.setData({ 'form.CodeUrl': res })
				});

			}
		});
		1
	},
	handleShowPicker(e) {
		const { type } = e.currentTarget.dataset;
		if (type == 1) {
			this.setData({
				showDatePicker1: true
			})
		} else {
			this.setData({
				showDatePicker2: true
			})
		}

	},
	onConfirm(event) {
		const { picker, value, index } = event.detail;
		const { type } = event.currentTarget.dataset;
		let { storeName, StoreId } = this.data.form;

		console.log(getDate(event.detail) + ' ' + getTime(event.detail))



		if (type == 'StartDate') {
			this.setData({
				'form.StartDate': getDate(event.detail) + ' ' + getTime(event.detail),
				showDatePicker1: false
			})
		} else if (type == 'EndDate') {
			this.setData({
				'form.EndDate': getDate(event.detail) + ' ' + getTime(event.detail),
				showDatePicker2: false
			})
		} else {
			storeName = value.StoreName;
			StoreId = value.StoreId;
			this.setData({
				['form.storeName']: storeName,
				['form.StoreId']: StoreId,
				['form.Address']:value.Address,
				['form.Tel']:value.Tel,

				showPicker1: false,
			})
		}

	},

	getGift() {
		console.log(app)

		let params = {
			pageindex: 1,
			// AttributeId: 111,
			IsPromotion: 1,
			pagesize: 1000,
			action: 'GetGifts',
			AttributeId:111,
			openId: app.globalData.GetMembersInfo.openId || 210
		}



		let data = this.data, that = this;
		app.fl()
		app.fg(params).then(r => {
			app.fh()
			// app.fa(r.data.Message)
			console.log(r);

			if (r.data.Status != 'NO') {
				let datar = r.data.rows
				this.setData({ giftList: datar })
			}



		})
	},
	onCancel() {
		// Toast('取消');
		this.setData({ showPicker1: false })
	},
	addGooods() {
		let that = this;
		let { includeProducts, form } = that.data;

		form.products.push({ Name: '', Price: '', Unit: '', UseTime: '' })

		this.setData({
			'form.products': form.products
		})
	},
	selectGoods() {
		let that = this;
		let { giftList } = that.data;


		this.setData({
			showPicker2: false

		})
	},

	showModal(e) {
		this.setData({
			modalName: e.currentTarget.dataset.target
		})
	},
	handleShow(e) {
		const { type } = e.currentTarget.dataset;
		if (type == 1) {
			this.setData({ showPicker1: true })
		} else {
			this.setData({ showPicker2: true })
		}
	},
	onClose(e) {
		const { type } = e.currentTarget.dataset;
		if (type == 'StartDate') {
			this.setData({ showDatePicker1: false })
		} else if (type == 'StoreName') {
			this.setData({ showPicker: false })
		} else {
			this.setData({ showDatePicker2: false })
		}

	},
	inputText(e) {
		let { type } = e.currentTarget.dataset;
		let { value } = e.detail;

		let { Address, ActivityName, Tel, UserLimitCount,TopMsg,ShowSaleCounts } = this.data.form;
		switch (type) {
			case 'Address': Address = value; break;
			case 'ActivityName': ActivityName = value; break;
			case 'Tel': Tel = value; break;
			case 'UserLimitCount': UserLimitCount = value; break;
			case 'TopMsg' : TopMsg=value ;break;
			case 'ShowSaleCounts' : ShowSaleCounts=value ;break;


		};
		this.setData({
			'form.Address': Address,
			'form.ActivityName': ActivityName,
			'form.Tel': Tel,
			'form.UserLimitCount': UserLimitCount,
			'form.TopMsg':TopMsg,
			'form.ShowSaleCounts':ShowSaleCounts
		})
		console.log(this.data.form)
	},
	changeSwitch(e) {
		let { type, index } = e.currentTarget.dataset;
		if (type == 'goods') {

			this.data.giftList[index].checked = !this.data.giftList[index].checked;

			this.setData({
				giftList: this.data.giftList
			})
		} else if (type == 'selectAll') {

			this.data.checkedAll = !this.data.checkedAll;

			let temp = this.data.giftList;

			temp.forEach(d => { d.checked = this.data.checkedAll });

			this.setData({
				checkedAll: this.data.checkedAll,
				giftList: temp
			})

		}

	},
	getSuaLian() {
		let data = this.data, that = this
		app.fl()
		app.fg({
			action: 'CreateStoreCouponActivity',
			StoreId: app.globalData.fuStoreId,
		}).then(r => {
			app.fh()
			that.setData({
				isShuaLian: r.data.Message == '可支付'
			})
		})
	},
	/**
	* 上传图片
	* */
	upLoadImg(path) {
		console.log(app)

		return new Promise((resolve, reject) => {
			wx.showLoading({
				title: '图片上传中',
				mask: true
			})

			wx.uploadFile({
				url: app.getUrl('UploadAppletImage'),
				filePath: path,
				name: 'file',
				header: {
					"Content-Type": "multipart/form-data"
				},
				formData: {

					openId: app.globalData.openId || 210
				},
				success: function (res) {
					wx.hideLoading()


					let resData = JSON.parse(res.data);


					if (resData.Status == "OK") {
						let okimgurl = resData.Data[0].ImageUrl
						resolve(okimgurl)
					} else {
						wx.showModal({
							title: '提示',
							content: "上传失败",
						})
					}


				},
				fail: function (e) {
					wx.hideLoading()
					console.log(e)
					wx.showModal({
						title: '提示',
						content: '上传失败',
						showCancel: false
					})
				}
			})
		})

	},

	// wx:if="{{getStore.IsHaveAction == 'True'}}"/
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

	submit() {

		let {
			Gifts,
			ActivityName,
			StartDate,
			EndDate,
			Address,
			StoreId,
			Tel,
			CodeUrl,
			products,
			UserLimitCount,
			TopMsg,
			ShowSaleCounts,
		} = this.data.form;



		if (!StoreId) {
			wx.alert.error('请选择门店')
			return
		}
		if (!Address) {
			wx.alert.error('请输入地址')
			return
		}
		if (!Tel) {
			wx.alert.error('请输入手机号')
			return
		}

		if (!ActivityName) {
			wx.alert.error('请输入活动名')
			return
		}
		if (!StartDate) {
			wx.alert.error('缺少开始时间')
			return
		}
		if (!EndDate) {
			wx.alert.error('缺少结束时间')
			return
		}

		if (!UserLimitCount) {
			UserLimitCount = 0
		}


		let relateProductIds = () => {
			let r = [];
			this.data.giftList.map(d => {
				if (d.checked) {
					r.push(d.GiftId);
				}

			})
			return r;
		}



		let data = {
			action: 'CreateStoreCouponActivity',
			CodeUrl,
			ActivityName,
			StartDate,
			EndDate,
			Address,
			StoreId,
			Tel,
			CodeUrl,
			JSON: JSON.stringify(products),
			UserLimitCount,
			Gifts: relateProductIds().join(','),
			openId: app.globalData.openId,
			isExcutor: true,
			TopMsg,
			ShowSaleCounts,
		}
		console.log(data)


		app.fl()
		app.fg(data).then(r => {
			app.fh()
			app.fa()
			console.log(r)
			if (r.data.Status == 'NO') {
				app.fa(r.data.Message)
			} else {
				app.fa('提交成功')
				setTimeout(() => {
					app.globalData.fuStoreId? wx.switchTab({
						url: '/pages/fujihang/fuStoreDet/fuStoreDet'
					}) : wx.switchTab({
						url: '/pages/fujihang/fuIndexG/fuIndexG'
						// url: '/pages/bchome/bchome'
					});
				}, 2000)
			}

		})

	},
	showModal(e) {
		this.setData({
			modalName: e.currentTarget.dataset.target
		})

	},
	hideModal(e) {
		this.setData({
			showPicker2: false
		})
	},

	// ListTouch触摸开始
	ListTouchStart(e) {
		this.setData({
			ListTouchStart: e.touches[0].pageX
		})
	},

	// ListTouch计算方向
	ListTouchMove(e) {
		this.setData({
			ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
		})
	},

	// ListTouch计算滚动
	ListTouchEnd(e) {
		if (this.data.ListTouchDirection == 'left') {
			this.setData({
				modalName: e.currentTarget.dataset.target
			})
		} else {
			this.setData({
				modalName: null
			})
		}
		this.setData({
			ListTouchDirection: null
		})
	},

	getStore(exid) {
		let data = this.data, that = this
		app.fl()
		app.fg({
			action: "Search",
			tag: "store",
			Latitude: '23.129010d',
			Longitude: '113.2668d',
			pageindex: 1,
			exid,
			bindType: 1

		}).then(r => {
			app.fh()

			that.setData({
				storeList: r.data.Models
			})
			console.log(this.data.storeList)

		})
	},
	onLoad(options) {
		// this.getProductList();
		let that = this;
		app.getId().then(data => {
			console.log(app.globalData)
			that.referUser();
			if (!gift || gift.length == 0) {
				that.getGift();
			}

		})
	}
})