/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 4008205898,
		nickname: '用户',
		portrait: 'http://hukao-tong.oss-cn-hangzhou.aliyuncs.com/upload/20191008/2019-10-08_1570515491_5d9c2a234a40f.png'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [{
		src: "/static/temp/banner9.jpg",
		background: "rgb(200, 200, 169)",
	},
	{
		src: "/static/temp/banner8.png",
		background: "rgb(131, 175, 155)",
	},
	{
		src: "/static/temp/banner7.png",
		background: "rgb(183, 73, 69)",
	}
]
/* 商品列表 */
const goodsList = [{
		image: "https://img1.xiujiadian.com/prod/wechat/productconfig/prod/10076_1.png?x-oss-process=image/resize,h_450&r=0.9398991258295388",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
		title: "油烟机清洗（不拆机）",
		price: 158.00,
		sales: 64856,
	},
	{
		image: "https://img1.xiujiadian.com/prod/wechat/productconfig/prod/10276_1.png?x-oss-process=image/resize,h_450&r=0.8517580614873443",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "油烟机维修",
		price: 30,
		sales: 66958,
	},
	{
		image: "https://img1.xiujiadian.com/prod/wechat/productconfig/prod/10027_1.png?x-oss-process=image/resize,h_450&r=0.7834172109723516",
		image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
		image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
		title: "冰箱清洗（单/双开门）",
		price: 108.00,
		sales: 11563,
	}, {
		image: "https://img1.xiujiadian.com/prod/plat/product/1570602045575/smallPicture.jpg?x-oss-process=image/resize,h_450&r=0.3834814357852043",
		image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
		image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
		title: "冰箱维修",
		price: 30,
		sales: 11522,
	}, {
		image: "https://img1.xiujiadian.com/prod/wechat/productconfig/prod/10037_1.jpg?x-oss-process=image/resize,h_450&r=0.1983998531646971",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "洗衣机清洗（不拆机）",
		price: 128.00,
		sales: 11256,
	}, {
		image: "https://img1.xiujiadian.com/prod/wechat/productconfig/prod/10278_1.jpg?x-oss-process=image/resize,h_450&r=0.5691272920593644",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "洗衣机维修",
		price: 30,
		sales: 22652,
	},
]

/* 购物车 */
const cartList = [{
		id: 1,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
		attr_val: '春装款 L',
		stock: 15,
		title: 'OVBE 长袖风衣',
		price: 278.00,
		number: 1
	},
	{
		id: 3,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 3,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 5
	},
	{
		id: 4,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 5,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 6,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 7,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 8,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 15,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 1
	},
	{
		id: 9,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 10,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 11,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 12,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 13,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
		attr_val: '春装款/m',
		stock: 15,
		title: '女装2019春秋新款',
		price: 420.00,
		number: 1
	}
];
//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [
	// {
	// 	time: '2019-04-06 11:37',
	// 	state: 1,
	// 	goodsList: [
	// 		{
	// 			image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg',
	// 		},
	// 		{
	// 			image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
	// 		},
	// 		{
	// 			image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
	// 		},
	// 		{
	// 			image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
	// 		},
	// 		{
	// 			image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
	// 		},
	// 		{
	// 			image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
	// 		},
	// 		{
	// 			image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
	// 		}
	// 	]
	// },
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '挂机空调清洗',
			price: 98,
			image: 'http://mrcc.xyz/jia_xiu_hui/2019-11-27/1574791367_5ddd68c741fce.jpg',
			number: 2,
			attr: '上门服务'
		}]
	},
	// {
	// 	time: '2019-04-06 11:37',
	// 	state: 1,
	// 	goodsList: [{
	// 			image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2120460599/O1CN01LBPS4C1GINkwsOTXS_!!2120460599.jpg_430x430q90.jpg',
	// 		},
	// 		{
	// 			image: 'https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg',
	// 		},
	// 		{
	// 			image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg',
	// 		},
	// 	]
	// },
	// {
	// 	time: '2019-04-06 11:37',
	// 	state: 1,
	// 	goodsList: [{
	// 		title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
	// 		price: 69,
	// 		image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
	// 		number: 1,
	// 		attr: '白色-高帮 39'
	// 	}]
	// },
	// {
	// 	time: '2019-04-06 11:37',
	// 	state: 1,
	// 	goodsList: [{
	// 			image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg',
	// 		},
	// 		{
	// 			image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg',
	// 		},
	// 	]
	// },
	// {
	// 	time: '2019-04-06 11:37',
	// 	state: 1,
	// 	goodsList: [{
	// 			image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
	// 		},
	// 		{
	// 			image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
	// 		},
	// 		{
	// 			image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
	// 		},
	// 	]
	// }

]
const cateList = [
	{id: 1,name: '家电清洗'},
	{id: 2,name: '家电维修'},
	{id: 3,name: '家电安装'},
	{id: 4,name: '管道疏通'},
	{id: 5,name: '水电维修'},
	{id: 6,name: '开锁换锁'},
	{id: 7,name: '家具门窗'},
	{id: 8,name: '防水补漏'},
	
	{id: 101,pid: 1,name: '常用家电'},
	{id: 102,pid: 1,name: '生活电器'},
	{id: 103,pid: 1,name: '清洗套餐'},
	
	{id: 201,pid: 2,name: '常用家电'},
	{id: 202,pid: 2,name: '厨房电器'},
	{id: 203,pid: 2,name: '生活电器'},
	{id: 204,pid: 2,name: '制冷设备'},
	{id: 205,pid: 2,name: '保健电器'},
	{id: 206,pid: 2,name: '影音娱乐'},
	{id: 207,pid: 2,name: '办公设备'},
	
	{id: 301,pid: 3,name: '常用家电'},
	{id: 302,pid: 3,name: '厨房电器'},
	{id: 303,pid: 3,name: '生活电器'},
	
	{id: 401,pid: 4,name: '管道疏通'},
	
	{id: 501,pid: 5,name: '灯具电路'},
	{id: 502,pid: 5,name: '龙头管件'},
	{id: 503,pid: 5,name: '卫浴洁具'},
	{id: 504,pid: 5,name: '五金挂件'},
	
	{id: 601,pid: 6,name: '开锁'},
	{id: 602,pid: 6,name: '装锁'},
	{id: 603,pid: 6,name: '换锁'},
	
	
	{id: 701,pid: 7,name: '家具门窗'},
	
	{id: 801,pid: 8,name: '防水补漏'},
	
	
	
	{id: 10101,pid: 101,name: '空调',picture: '/static/temp/test.jpg'},
	{id: 10102,pid: 101,name: '冰箱',picture: '/static/temp/test.jpg'},
	{id: 10103,pid: 101,name: '洗衣机',picture: '/static/temp/test.jpg'},
	{id: 10104,pid: 101,name: '热水器',picture: '/static/temp/test.jpg'},
	{id: 10105,pid: 101,name: '燃气灶',picture: '/static/temp/test.jpg'},
	{id: 10106,pid: 101,name: '油烟机',picture: '/static/temp/test.jpg'},
	{id: 10107,pid: 101,name: '微波炉',picture: '/static/temp/test.jpg'},
	{id: 10108,pid: 101,name: '饮水机',picture: '/static/temp/test.jpg'},
	
	
	{id: 10201,pid: 102,name: '地暖',picture: '/static/temp/test.jpg'},
	
	{id: 10301,pid: 103,name: '空调套餐',picture: '/static/temp/test.jpg'},
	{id: 10302,pid: 103,name: '其他套餐',picture: '/static/temp/test.jpg'},
	
	{id: 20101,pid: 201,name: '空调',picture: '/static/temp/test.jpg'},
	{id: 20102,pid: 201,name: '冰箱',picture: '/static/temp/test.jpg'},
	{id: 20103,pid: 201,name: '洗衣机',picture: '/static/temp/test.jpg'},
	{id: 20104,pid: 201,name: '电视',picture: '/static/temp/test.jpg'},
	{id: 20105,pid: 201,name: '热水器',picture: '/static/temp/test.jpg'},
	{id: 20106,pid: 201,name: '燃气灶',picture: '/static/temp/test.jpg'},
	{id: 20107,pid: 201,name: '油烟机',picture: '/static/temp/test.jpg'},
	{id: 20708,pid: 201,name: '微波炉',picture: '/static/temp/test.jpg'},
	{id: 20109,pid: 201,name: '饮水机',picture: '/static/temp/test.jpg'},
	
	{id: 20201,pid: 202,name: '电压力锅',picture: '/static/temp/test.jpg'},
	{id: 20202,pid: 202,name: '电饭煲',picture: '/static/temp/test.jpg'},
	{id: 20203,pid: 202,name: '烤箱',picture: '/static/temp/test.jpg'},
	{id: 20204,pid: 202,name: '洗碗机',picture: '/static/temp/test.jpg'},
	{id: 20205,pid: 202,name: '蒸包机',picture: '/static/temp/test.jpg'},
	{id: 20206,pid: 202,name: '煮面桶',picture: '/static/temp/test.jpg'},
	{id: 20207,pid: 202,name: '电磁炉',picture: '/static/temp/test.jpg'},
	{id: 20208,pid: 202,name: '消毒柜',picture: '/static/temp/test.jpg'},
	{id: 20209,pid: 202,name: '蒸饭车',picture: '/static/temp/test.jpg'},
	{id: 20210,pid: 202,name: '粉碎机',picture: '/static/temp/test.jpg'},
	{id: 20211,pid: 202,name: '咖啡机',picture: '/static/temp/test.jpg'},
	
	{id: 20301,pid: 203,name: '净化器',picture: '/static/temp/test.jpg'},
	{id: 20302,pid: 203,name: '地暖',picture: '/static/temp/test.jpg'},
	{id: 20303,pid: 203,name: '干洗机',picture: '/static/temp/test.jpg'},
	{id: 20304,pid: 203,name: '烘干机',picture: '/static/temp/test.jpg'},
	{id: 20305,pid: 203,name: '甩干机',picture: '/static/temp/test.jpg'},
	{id: 20306,pid: 203,name: '吸尘器',picture: '/static/temp/test.jpg'},
	{id: 20307,pid: 203,name: '电暖炉',picture: '/static/temp/test.jpg'},
	{id: 20308,pid: 203,name: '油汀',picture: '/static/temp/test.jpg'},
	{id: 20309,pid: 203,name: '除湿机',picture: '/static/temp/test.jpg'},
	{id: 20310,pid: 203,name: '净水器',picture: '/static/temp/test.jpg'},
	{id: 20311,pid: 203,name: '开水机',picture: '/static/temp/test.jpg'},
	{id: 20312,pid: 203,name: '空调扇',picture: '/static/temp/test.jpg'},
	{id: 20313,pid: 203,name: '干手器',picture: '/static/temp/test.jpg'},
	{id: 20314,pid: 203,name: '风幕机',picture: '/static/temp/test.jpg'},
	{id: 20315,pid: 203,name: '回水器',picture: '/static/temp/test.jpg'},
	
	
	{id: 20401,pid: 204,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 20501,pid: 205,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 20601,pid: 206,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 20701,pid: 207,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 30101,pid: 301,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 30201,pid: 302,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 30301,pid: 303,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 40104,pid: 401,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 50101,pid: 501,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 50201,pid: 502,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 50301,pid: 503,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 50401,pid: 504,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 60101,pid: 601,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 60201,pid: 602,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 60301,pid: 603,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 70101,pid: 701,name: '测试',picture: '/static/temp/test.jpg'},
	{id: 80101,pid: 801,name: '测试',picture: '/static/temp/test.jpg'},
	
	
	
	
]

export default {
	carouselList,
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	cateList
}
