<template>
	<view class="index-content">
		<!-- 搜索板块 -->
		<view class="index-header" :style="top_alpha">
			<view class="icon_header">
				<view class="icon_suji" @tap="toZujiIndex">
					<image src="../../static/img/index/address.png" mode=""></image>
					<text class="iconfont" style="color: #333333;">{{cityname.length>3? cityname.substring(0,2)+'...': cityname}}</text>
				</view>
				<view class="index-search" style="width: 75%;" @tap="toSearchIndex">
					<view class="icon_search">
						<!-- <text class="iconfont icon-search"></text> -->
						<text>请输入您需要搜索的商品名称</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索板块 -->

		<!-- banner板块 -->
		<view class="index-banner">
			<view class="swiper" v-if="banner.length > 0">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true" :indicator-dots="true"
				 indicator-active-color="#FC3F78" indicator-color="#cccccc">
					<block v-for="(item, index) in banner" :key="index">
						<swiper-item class="swiper-wrapper" @tap="toGoodsInfo(item.mainId, item.productType)">
							<image :src="item.url" mode="widthFix"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>

		<!-- banner -->

		<!-- 导航栏板块 -->
		<view class="index-navlist s-grids has-bg-white has-pdtb-2" v-if="categoryList.length > 0">
			<scroll-view scroll-x="true" class="scroll">
				<view class="is-col-1-5 is-center scin" v-for="(nav, index) in categoryList" v-if="nav.show==1" :key="index" @tap="toCategory(nav.id, nav.title)">
					<view class="has-pdtb-5">
						<image :src="nav.url"></image>
						<view class="is-size-14">{{ nav.name }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 导航栏板块 -->

		<!-- 今日必拼 -->
		<view class="index-navlist pintuan  has-bg-white has-pd-6" v-if="get_activity.length>0">
			<view class="coupon-tab s-row">
				<view class="fl-jutext-img">
					<image src="../../static/img/index/bianqian.png"></image>
				</view>
				<text class="fl-jutext">今日必拼</text>
				<text class="fr-jutext" @tap="toPintuan">更多拼团</text>
			</view>
			<view class="goods-list">
				<view class="coupon-page s-row" @tap="toGoodsInfo(get_activity[0].id,get_activity[0].type)">
					<view class="image">
						<image :src="get_activity[0].url"></image>
					</view>
					<view class="content">
						<view class="title">{{ get_activity[0].title }}</view>
						<view class="num s-row">
							<text v-if="get_activity[0].minAskType ==1" class="tmprice">{{ get_activity[0].minAsk }}件成团</text>
							<text v-if="get_activity[0].minAskType ==0" class="tmprice">{{ get_activity[0].minAsk }}人成团</text>
							<!-- <text class="volume">已售{{ item.volume }}件</text> -->
						</view>
						<view class="money s-row">
							<text class="coupon-price">
								<text>¥{{ get_activity[0].discountPrice }}</text>
								<text class="del">¥{{ get_activity[0].originalPrice }}</text>
							</text>
							<view class="quan">
								<view class="image-fire">
									<image src="../../static/img/index/fire.png"></image>
								</view>
								已拼{{ get_activity[0].salesVolume }}件
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 今日必拼 -->




		<!-- 特惠套餐 -->
		<view class="index-navlist home_ant_juhuasuan has-bg-white has-pd-6" v-if="specialVos.length > 0">
			<view class="juhuasuan-tab s-row">
				<view class="fl-jutext-img">
					<image src="../../static/img/index/taocanicon.png"></image>
				</view>
				<text class="fl-jutext">特惠套餐</text>
				<text class="fr-jutext" @tap="toTaocan">更多套餐</text>
			</view>
			<view class="s-row juhuasuan-list">
				<view class="juhuasuan-list-goods" v-for="(item, index) in specialVos" :key="index" v-if="index<3" @tap="toGoodsInfo(item.id,item.type)">
					<view class="image">
						<image :src="item.url"></image>
						<!-- <view class="name">
							<text class="pinname">￥{{ item.price }}</text>
							<text class="price"></text>
						</view> -->
						<view class="content">
							<view class="title">{{ item.title }}</view>
							<view class="money s-row">
								<text class="coupon-price">
									<text>¥{{ item.discountPrice }}</text>
									<text class="del">¥{{ item.originalPrice }}</text>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 特惠套餐 -->

		<!-- 限时秒杀板块 -->
		<view class="index-navlist home_miaosha has-bg-white" v-if="miaosha_show">
			<view class="xianshimiaosha">
				<view class="kaiqiangshijian">
					<view class="kqshijian">
						<image src="../../static/img/index/shandian.png" mode=""></image>
						<text>{{kaiqiang_time}}开抢</text>
					</view>
					<view class="kqjukaishi">
						<text>{{juli}}</text>
						<text class="red-block">{{hours}}</text>
						<text>:</text>
						<text class="red-block">{{minutes}}</text>
						<text>:</text>
						<text class="red-block">{{second}}</text>
					</view>
				</view>
				<view class="goods-list">
					<view class="coupon-page s-row" style="display: flex;width: 100%;" @tap="toMiaoSha()">
						<view class="image">
							<image :src="secondsKillVO.url"></image>
						</view>
						<view class="content">
							<view class="title">{{ secondsKillVO.title }}</view>
							<!-- <view class="num s-row"> -->
							<!-- <text class="tmprice">天猫价 ¥{{ item.price }}</text> -->
							<!-- <text class="volume">已售{{ item.volume }}件</text> -->
							<!-- </view> -->
							<view class="money s-row">
								<text class="coupon-price">
									<text> ¥{{ secondsKillVO.price }}</text>
								</text>
								<text class="quan">
									<i></i>
									获取秒杀资格
									<i></i>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 限时秒杀板块 -->

		<!-- 方案推荐 -->
		<view class="index-navlist index-coupon has-bg-white has-pd-6" v-if="schemeIsRecommendedVos.length > 0">
			<view class="coupon-tab s-row">
				<view class="fl-jutext-img">
					<image src="../../static/img/index/danpin1.png"></image>
				</view>
				<text class="fl-jutext">周期购推荐</text>
				<text class="fr-jutext" @tap="toZhouqigou">更多周期购</text>
			</view>
			<view class="goods-list">
				<view class="coupon-page s-row" v-for="(item, index) in schemeIsRecommendedVos" :key="index" @tap="toGoodsInfo(item.productId,item.type)">
					<view class="image">
						<image :src="item.mainImage"></image>
					</view>
					<view class="content">
						<view class="title">{{ item.title }}</view>
						<view class="num s-row">
							<text class="tmprice" v-for="(item1, index1) in item.labels" :key="index1">{{ item1.name }}</text>
							<!-- <text class="volume">已售{{ item.volume }}件</text> -->
						</view>
						<view class="money s-row">
							<text class="coupon-price">
								<text>¥{{ item.nowPrice }}</text>
								<text class="del">¥{{ item.oldPrice }}</text>
							</text>
							<!-- <text class="quan">
								<view class="image-fire"><image src="../../static/img/index/fire.png"></image></view>
								<i></i>
								{{ item.coupon }}元券
								<i></i>
							</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 方案推荐 -->


		<!-- 品牌推荐 -->
		<view class=" pinpaituijian has-bg-white has-pd-6">
			<view class="coupon-tab s-row">
				<view class="fl-jutext-img">
					<image src="../../static/img/index/huangguan.png"></image>
				</view>
				<text class="fl-jutext">品牌推荐</text>
				<!-- <text class="fr-jutext">更多方案</text> -->
			</view>
			<view class="goods-list" v-if="brand_recommend_list.length > 0">
				<view class="goods" v-for="(item, index) in brand_recommend_list" :key="index" @tap="toGoodsInfo(item.mainId,item.productType)">
					<image :src="item.url" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 品牌推荐 -->



		<!-- 全部商品 -->
		<view class="index-navlist allgoods has-pd-6">
			<view class="coupon-tab s-row">
				全部商品
			</view>
			<view class="goods-list" v-if="product_app_list.length > 0">
				<view class="coupon-page has-bg-white" v-for="(item, index) in product_app_list" :key="index" @tap="toGoodsInfo(item.id,item.type)">
					<view class="image">
						<image :src="item.url" mode="widthFix"></image>
					</view>
					<view class="content">
						<view class="title">{{ item.title }}</view>
						<view class="num s-row">
							<text class="tmprice" v-for="(itema1, indexa1) in item.labelNames" :key="indexa1" v-if="indexa1<2">{{itema1}}</text>
						</view>
						<view class="money s-row">
							<text class="coupon-price">
								<text>¥{{ item.discountPrice }}</text>
								<text class="del">¥{{ item.originalPrice }}</text>
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 全部商品 -->

		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="product_app_list.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多提示 -->
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				cityname: '请登录',
				top_alpha: 'background-color: rgba(255,255,255,1);',
				banner: [],
				miaosha_show: false,
				navlist: [],
				juli: "据开始",
				juhuasuanlist: [],
				couponlist: [], //之前全部
				product_app_list: [],
				get_activity: [],
				kaiqiang_time: "00:00",
				hours: "00",
				minutes: "00",
				second: "00",
				secondsKillVO: [],
				categoryList: [],
				brand_recommend_list: [],
				specialVos: [],
				schemeIsRecommendedVos: [],
				page: 1,
				loadingType: 0,
				location: '',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				appid: 'wx1e036895e60e3a06'
			};
		},
		methods: {
			loadBanner: function(Refresh) {
				var that = this;
				that.$Request.toget1(that.$api.home.banner, {
					appId: that.appId,
					location: that.location
				}).then(res => {
					if (res.code == 1000) {
						that.banner = res.content.advertisementVos;
						that.brand_recommend_list = res.content.brandRecommendationVos;
						that.specialVos = res.content.specialVos;
						that.schemeIsRecommendedVos = res.content.schemeIsRecommendedVos;
						that.categoryList = res.content.categoryList;
					}
				});


				// 秒杀
				that.$Request.toget1(that.$api.home.get_activity, {
					appId: that.appId,
					location: that.location
				}).then(res => {
					if (res.code == 1000) {
						if (res.content.secondsKillVO == null) {
							return;
						}

						console.log(JSON.stringify(res.content.secondsKillVO));
						that.secondsKillVO = res.content.secondsKillVO;
						var startTime = new Date(res.content.secondsKillVO.startTime);
						var startTimeHours = startTime.getHours();
						startTimeHours = startTimeHours < 10 ? "0" + startTimeHours : startTimeHours;
						var startTimeMinutes = startTime.getMinutes();
						startTimeMinutes = startTimeMinutes < 10 ? "0" + startTimeMinutes : startTimeMinutes;
						that.kaiqiang_time = startTimeHours + ":" + startTimeMinutes;

						var endTime = new Date(res.content.secondsKillVO.endTime);
						var endTimeHours = endTime.getHours();
						var endTimeMinutes = endTime.getMinutes();
						that.kaiqiang_endtime = endTimeHours + ":" + endTimeMinutes;

						that.intervalID = setInterval(function() {

							var new_date = new Date(); //新建一个日期对象，默认现在的时间
							var difftime = (startTime - new_date) / 1000; //计算时间差,并把毫秒转换成秒
							that.miaosha_show = true;
							if (difftime > 0) {
								that.miaosha_show = true;

								var days = parseInt(difftime / 86400); // 天  24*60*60*1000
								var hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数 
								var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
								var seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数
								that.hours = hours < 10 ? "0" + hours : hours;
								that.minutes = minutes < 10 ? "0" + minutes : minutes;
								that.second = seconds < 10 ? "0" + seconds : seconds;
							} else {
								// clearInterval(that.intervalID)
								that.juli = "距结束"
								// that.miaosha_show=false;
								// that.intervalID2 = setInterval(function() {
								var new_date = new Date(); //新建一个日期对象，默认现在的时间X
								var difftime = (endTime - new_date) / 1000; //计算时间差,并把毫秒转换成秒
								if (difftime > 0) {
									that.miaosha_show = true;
								} else {
									// clearInterval(that.intervalID2)
									clearInterval(that.intervalID)
									that.miaosha_show = false;
								}
								var days = parseInt(difftime / 86400); // 天  24*60*60*1000 
								var hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数 
								var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
								var seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数
								that.hours = hours < 10 ? "0" + hours : hours;
								that.minutes = minutes < 10 ? "0" + minutes : minutes;
								that.second = seconds < 10 ? "0" + seconds : seconds;
								// }, 1000)
							}

						}, 1000)

					}
				});

				// 拼团列表
				this.$Request.topost1(this.$api.home.group_buy, {
					appId: that.appId,
					location: that.location
				}).then(res => {
					if (res.code == 1000) {
						this.get_activity = res.content;
					}
				});


			},
			loadNavList: function() {
				var indexNav = this.$SysCache.get('app_index_navlist');
				if (indexNav) {
					this.navlist = indexNav;
				} else {
					this.$Request.post1(this.$api.home.navlist, {
						appId: that.appId,
						location: that.location
					}).then(res => {
						if (res.code == 200) {
							this.navlist = res.data;
							this.$SysCache.put('app_index_navlist', res.data, 86400);
						}
					});
				}
			},

			// onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			// 	this.top_alpha = "background-color: rgba(255,255,255," + e.scrollTop / 300 + ");"
			// },


			loadJuhuasuanlist: function() {
				// this.$Request.post(this.$api.home.juhusuan).then(res => {
				// 	if (res.code == 200) {
				// 		this.juhuasuanlist = res.data;
				// 	}
				// });
			},


			loadCouponList: function(type) {
				if (1 == this.page) {
					this.product_app_list = []
				}
				this.loadingType = 1;
				this.$Request.toget1(this.$api.home.get_product_app_list, {
						appId: that.appId,
						location: that.location,
						pageNum: this.page,
						pageSize: 10
					}).then(res => {

						this.loadingType = 0;
						if (res.code == 1000) {
							this.page = this.page + 1;
							res.content.productListAppVoList.forEach(d => {
								this.product_app_list.push(d);
								console.log('eeee' + d);
							});
						} else {
							this.loadingType = 2;
						}
						if (type == 'Refresh') {
							uni.stopPullDownRefresh(); // 停止刷新
						}
						// setTimeout(t => {
						// 	this.loadBanner('Refresh'); // 当首页数据加载完毕后 刷新banner
						// }, 1000);
					})
					.catch(err => {
						// 					this.loadingType = 2;
						// 					this.contentText.contentnomore = "网络繁忙，请稍后再试"
					});
			},
			toNavList: function(url, title) {
				uni.showToast({
					title: title,
					mask: false,
					duration: 1500,
					icon: 'none'
				});
			},
			toCategory: function(id, title) {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/category/category?categoryId=' + id
				});
			},

			toZhouqigou: function() {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/category/zhouqigou'
				});
			},
			toTaocan: function() {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/category/taocan'
				});
			},
			toPintuan: function() {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/category/pintuan?location=' + that.location
				});
			},

			toMiaoSha: function() {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/index/miaosha'
				});
			},


			toGoodsInfo: function(id, type) {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/detail/goodsinfo?id=' + id + '&type=' + type
				});
			},
			toSearchIndex: function() {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/search/index?location=' + that.location
				});
			},
			toZujiIndex: function() {
				var token = uni.getStorageSync('authorization');
				if (token != '' && token != null) {
					uni.chooseAddress({
						success(res) {
							var Location = res.cityName;
							uni.request({
								url: that.$api_url + '/user/login/loginLocation', //仅为示例，并非真实接口地址。
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
									'authorization': uni.getStorageSync('authorization') //自定义请求头信息
								},
								data: {
									location: res.provinceName + res.cityName + res.countyName + res.detailInfo,
									type: 2
								},
								success: res => {
									if (res.data.code == 1000) {
										uni.setStorageSync('Location', Location);
										that.cityname = Location;
										if(res.data.content){
											that.location = ''+res.data.content;
										}
										that.loadBanner();
										that.loadNavList();
										that.loadJuhuasuanlist();
										that.loadCouponList();

									}
								}
							});
						}
					})
				}
			},






			// 执行函数
			getSettingMess() {
				// 获取已授权类别
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userLocation']) {
							console.log("userLocation位置功能已授权")
							// 如果已授权,直接获取对应参数
							if (that.cityname != '请登录') {
								return
							}
							uni.getLocation({
								type: 'wgs84',
								success: function(res) {
									console.log('当前位置的经度：' + res.longitude);
									console.log('当前位置的纬度：' + res.latitude);
									that.location = '' + res.latitude + ',' + res.longitude;
									that.loadBanner();
									that.loadNavList();
									that.loadJuhuasuanlist();
									that.loadCouponList();
									that.location = '' + res.latitude + ',' + res.longitude;
									uni.request({
										url: that.$api_url + '/user/login/loginLocation', //仅为示例，并非真实接口地址。
										method: 'POST',
										header: {
											'Content-Type': 'application/x-www-form-urlencoded',
											'authorization': uni.getStorageSync('authorization') //自定义请求头信息
										},
										data: {
											location: '' + res.latitude + ',' + res.longitude,
											type: '1'
										},
										success: res => {
											console.log(res)
											if (res.data.code == 1000) {
												uni.setStorageSync('Location', res.data.content.city);
												that.cityname = res.data.content.city;
											}
										}
									});
								}
							});
						} else if (!res.authSetting['scope.userLocation']) {
							// 说明此时要获取的位置功能尚未授权,
							// 则设置进入页面时主动弹出，直接授权
							uni.authorize({
								scope: 'scope.userLocation',
								success(res) {
									// 授权成功
									console.log(res)
									// 成功后获取对应的位置参数
									if (that.cityname != '请登录') {
										return
									}
									uni.getLocation({
										type: 'wgs84',
										success: function(res) {
											console.log('当前位置的经度：' + res.longitude);
											console.log('当前位置的纬度：' + res.latitude);
											that.location = '' + res.latitude + ',' + res.longitude;
											that.loadBanner();
											that.loadNavList();
											that.loadJuhuasuanlist();
											that.loadCouponList();
											that.location = '' + res.latitude + ',' + res.longitude;
											uni.request({
												url: that.$api_url + '/user/login/loginLocation', //仅为示例，并非真实接口地址。
												method: 'POST',
												header: {
													'Content-Type': 'application/x-www-form-urlencoded',
													'authorization': uni.getStorageSync('authorization') //自定义请求头信息
												},
												data: {
													location: '' + res.latitude + ',' + res.longitude,
													type: '1'
												},
												success: res => {
													console.log(res)
													if (res.data.code == 1000) {
														uni.setStorageSync('Location', res.data.content.city);
														that.cityname = res.data.content.city;
													}
												}
											});
										}
									});
								},
								fail() {
									console.log("位置授权失败23")
									// 如未授权则重新打开设置页面,进行授权
									uni.showModal({
										//弹出提示框
										title: '是否打开设置页？',
										content: '需要在设置中获取当前位置信息权限，方便为你推选更多好货。',
										success(res) {
											if (res.confirm) {
												// 用户点击确定按钮
												uni.openSetting({
													// 确认后打开设置页面
													success(res) {
														if (res.authSetting['scope.userLocation']) {
															console.log("手动授权成功")
														} else {
															console.log("手动授权失败")
														}
													},
													fail() {
														console.log("打开设置页面失败")
													}
												})
											} else if (res.cancel) {
												// 用户点击取消按钮
												console.log('用户点击取消');
											}
										},
										fail() {
											console.log("确认取消弹出未弹出")
										}
									});
								}
							})


							// 如未授权则重新打开设置页面,进行授权
							// uni.showModal({
							// 	//弹出提示框
							// 	title: '是否打开设置页？',
							// 	content: '需要在设置中获取xx信息和xx权限',
							// 	success(res) {
							// 		if (res.confirm) {
							// 			// 用户点击确定按钮
							// 			uni.openSetting({
							// 				// 确认后打开设置页面
							// 				success(res) {
							// 					if (res.authSetting['scope.userLocation']) {
							// 						console.log("手动授权成功")
							// 					} else {
							// 						console.log("手动授权失败")
							// 					}
							// 				},
							// 				fail() {
							// 					console.log("打开设置页面失败")
							// 				}
							// 			})
							// 		} else if (res.cancel) {
							// 			// 用户点击取消按钮
							// 			console.log('用户点击取消');
							// 		}
							// 	},
							// 	fail() {
							// 		console.log("确认取消弹出未弹出")
							// 	}
							// });
						}
					},
					fail() {
						console.log("获取授权信息授权失败")
					}
				})
			},
			// 如果初始进入页面时点击了拒绝授权,如需要该权限,需要手动授权
			// 手动授权的触发方法
			handleLocation() {
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userLocation']) {
							// 再次判断所需权限是否已授权,如已授权则直接使用
							if (that.cityname != '请登录') {
								return
							}
							uni.getLocation({
								type: 'wgs84',
								success: function(res) {
									console.log('当前位置的经度：' + res.longitude);
									console.log('当前位置的纬度：' + res.latitude);
									that.location = '' + res.latitude + ',' + res.longitude;
									that.loadBanner();
									that.loadNavList();
									that.loadJuhuasuanlist();
									that.loadCouponList();
									that.location = '' + res.latitude + ',' + res.longitude;
									uni.request({
										url: that.$api_url + '/user/login/loginLocation', //仅为示例，并非真实接口地址。
										method: 'POST',
										header: {
											'Content-Type': 'application/x-www-form-urlencoded',
											'authorization': uni.getStorageSync('authorization') //自定义请求头信息
										},
										data: {
											location: '' + res.latitude + ',' + res.longitude,
											type: '1'
										},
										success: res => {
											console.log(res)
											if (res.data.code == 1000) {
												uni.setStorageSync('Location', res.data.content.city);
												that.cityname = res.data.content.city;
											}
										}
									});
								}
							});
						} else if (!res.authSetting['scope.userLocation']) {
							// 如未授权则重新打开设置页面,进行授权
							uni.showModal({
								//弹出提示框
								title: '是否打开设置页？',
								content: '需要在设置中获取xx信息和xx权限',
								success(res) {
									if (res.confirm) {
										// 用户点击确定按钮
										uni.openSetting({
											// 确认后打开设置页面
											success(res) {
												if (res.authSetting['scope.userLocation']) {
													console.log("手动授权成功")
												} else {
													console.log("手动授权失败")
												}
											},
											fail() {
												console.log("打开设置页面失败")
											}
										})
									} else if (res.cancel) {
										// 用户点击取消按钮
										console.log('用户点击取消');
									}
								},
								fail() {
									console.log("确认取消弹出未弹出")
								}
							});
						}
					},
					fail() {
						console.log("获取已授权信息失败")
					}
				})
			}



		},
		onReady: function() {},
		onShow: function(res) {

			uni.request({
				url: this.$api_url + '/notify/count', //仅为示例，并非真实接口地址。
				method: 'GET',
				header: {
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				success: res => {
					console.log(res)
					if (res.data.code == 2002) {
						try {
							uni.clearStorageSync();
						} catch (e) {
							console.log('清除缓存错误：' + e);
						}
					}
				}
			});
			this.getSettingMess();

		},
		onHide: function(e) {

		},
		onLoad: function() {

			that = this;
			const accountInfo = uni.getAccountInfoSync();
			that.appId = accountInfo.miniProgram.appId;
		},
		onReachBottom: function() {
			this.loadCouponList();
		},
		onPullDownRefresh: function() {
			// this.page = 1;
			// this.loadJuhuasuanlist();
			// this.loadCouponList('Refresh');
		}
	};
</script>

<style>
	@import '../../static/css/index.css';
</style>
