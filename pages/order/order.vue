<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
			 @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y>
					<!-- 空白页 @scrolltolower="loadData"-->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(item, index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<!-- <text class="time">{{ item.updated_at }}</text> -->
							<text class="time" style="color: #F02323 !important;" :style="{ color: item.stateTipColor }">{{ item.stateTip }}</text>
							<text v-if="item.state === 7" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(item)"></text>
						</view>

						<!-- 	<scroll-view v-if="item.goodsList.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							</view>
						</scroll-view> -->
						<!-- <view v-if="item.goodsList.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex">
							<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.title}}</text>
								<text class="attr-box">{{goodsItem.attr}}  x {{goodsItem.number}}</text>
								<text class="price">{{goodsItem.price}}</text>
							</view>
						</view> -->
						<view class="goods-box-single " @click="toService(item)" style="border-bottom: 1rpx solid #E4E7ED;">
							<image class="goods-img" :src="item.imageUrl" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ item.name }}</text>
								<!-- <text class="price">{{ item.commodityName }}</text> -->
								<text class="attr-box">{{ item.commodityName }}</text>
								<!-- <text class="attr-box">￥{{ item.price }}</text> -->
							</view>
							<view class="price-box" style="flex: 1;display: flex; flex-direction: column;text-align: right;">
								<view style="flex: 1;">￥{{ item.amount }}</view>
								<view style="flex: 1;">共 {{ item.quantity }}件</view>
							</view>
						</view>


						<view class="action-box b-t" v-if="item.status == 2">
							<button class="action-btn" @click="querenshouhuo(item)">确认收货</button>
						</view>
						<view class="action-box b-t" v-if="item.status == 7">
							<button class="action-btn" @click="deleteOrder(item)">删除订单</button>
						</view>
						<view class="action-box b-t" v-if="item.status == 0">
							<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
							<!-- <button class="action-btn recom" @click="pay(item)">立即支付</button> -->
						</view>
						<view class="action-box b-t" v-if="item.status == 2||item.status == 1">
							<!-- <button class="action-btn recom" @click="quanma(item)">查看券码</button> -->
							<button class="action-btn recom" @click="refund(item)">申请退款</button>
						</view>
						<view class="action-box b-t" v-if="item.status == 3||item.status == 6||item.status == 9"><button class="action-btn recom"
							 @click="ping(item)">立即评价</button></view>
					</view>

					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- <uni-popup :show="showtip" type="center" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">申请退款</text>
				<view class="uni-tip-content">
					<textarea
						style="height: 250upx;width: 100%; line-height: 40upx;  border-radius: 5upx; border: 2upx solid  #E5E5E5; font-size: 26upx; color: #666666;text-align: left;
										padding: 10upx;"
						focus
						placeholder="退款原因"
						type="text"
						maxlength="200"
						confirm-type="done"
						@input="chsngetext"
					/>
				</view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip', 1)">取消</text>
					<text class="uni-tip-button" @click="cancel('tip', 2)">确定</text>
				</view>
			</view>
		</uni-popup> -->
		<uni-popup :show="coupon_code_show" type="center" @change="change">
			<text class="popup-content">{{ coupon_code }}</text>
		</uni-popup>
	</view>
</template>

<script>
	import empty from '@/components/empty';
	import Json from '@/Json';
	export default {
		components: {
			empty
		},
		data() {
			return {
				quxiaostate: 0,
				shanchustate: 0,
				tabCurrentIndex: 0,
				showtip: false,
				strtext: '',
				selId: '',
				coupon_code: '',
				coupon_code_show: false,
				//订单状态(0,未付款; 1,已付款; 2,已发货；3,已收货；4,已完成；5,退款中; 6,已退款; 7,已取消; 8,已删除;)
				navList: [{
						state: -1,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 0,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待发货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					}
				]
			};
		},

		onLoad(options) {

			this.quxiaostate = 0;
			this.shanchustate = 0;
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData();
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData();
			}
			this.loadData();
			// #endif
		},

		methods: {
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let that = this;
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				console.log('index==' + index);
				console.log('state==' + state);

				// if (source != 'load') {
				// 	if (source === 'tabChange' && navItem.loaded === true) {
				// 		//tab切换只有第一次需要加载数据
				// 		return;
				// 	}
				// 	if (navItem.loadingType === 'loading') {
				// 		//防止重复加载
				// 		return;
				// 	}
				// }



				navItem.loadingType = 'loading';

				this.$Request
					.toget(
						this.$api.order.order_list, {
							status: state == -1 ? '' : '' + state,
						}, {
							authorization: this.$api_token
						}
					)
					.then(res => {
						console.log(res.message);
						if (res.code == 1000) {
							setTimeout(() => {
								let orderList = res.content.filter(item => {
									//添加不同状态下订单的表现形式
									item = Object.assign(item, that.orderStateExp(item.status, item.refund, item.refund_examine));
									//演示数据所以自己进行状态筛选
									return item;
								});
								if (source != 'load') {
									navItem.orderList = [];
									orderList.forEach(item => {
										navItem.orderList.push(item);
									});
								} else {
									navItem.orderList = [];
									orderList.forEach(item => {
										navItem.orderList = item;
									});
								}
								//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
								this.$set(navItem, 'loaded', true);
								//判断是否还有数据， 有改为 more， 没有改为noMore
								navItem.loadingType = 'noMore';
							}, 300);
						} else {
							navItem.orderList = [];
							navItem.loadingType = 'noMore';
						}

					})
					.catch(err => {

					});

			},

			change(e) {
				if (!e.show) {
					this.showtip = false;
					this.coupon_code_show = false;
				}
			},
			cancel(type, state) {
				let that = this;
				// if (state == 2) {
				// if (that.strtext == null || that.strtext == '') {
				// 	uni.showToast({
				// 		title: '请输入退款原因'
				// 	});
				// 	return;
				// }
				uni.request({
					url: that.$api_url + '/refund.api',
					data: {
						openid: uni.getStorageSync('openid'),
						id: that.selId,
						refund_reason: that.strtext
					},
					success: res => {
						uni.showToast({
							title: res.data.message
						});

						that.showtip = false;
						that.strtext = '';

						// uni.redirectTo({
						// 	url: '/pages/order/order?state=4'
						// });
						that.loadData();
					}
				});
				// } else if (state == 1) {
				// 	that.showtip = false;
				// 	that.strtext = '';
				// }
			},
			chsngetext(e) {
				this.strtext = e.detail.value;
				// console.log(e.detail.value)
			},
			toService(item) {
				if (item.status == 0) {
					uni.navigateTo({
						url: '/pages/order/daizhifuOrder?id=' + item.id
					});
				}
				if (item.status == 4) {

					var goodsinfo = 'order/detail';
					var vals = {
						orderId: item.id,
					};
					var xxx = this.$Request.topost(goodsinfo, vals);
					xxx.then(res => {
						// this.$Request.toget(this.$api.goods.goodsinfo, { productId: this.id, type: this.type }, { authorization: uni.getStorageSync('authorization') }).then(res => {
						console.log(res);
						if (res.code == 1000) {
							if (res.content.order != null && res.content.order.lastNum > 0) {
								uni.navigateTo({
									url: '/pages/order/daipinOrder?id=' + item.id
								});
							}
						} else {
							uni.navigateBack();
						}
					});


				}
			},

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(item) {
				let that = this;
				if(that.shanchustate == 1){
					return
				}
				that.shanchustate = 1;
				uni.showLoading({
					title: '请稍后'
				});

				uni.request({
					url: that.$api_url + '/order/delete', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						orderNo: item.number
					},
					success: res => {
						that.shanchustate = 0;
						uni.showToast({
							title: res.data.message
						});
						// setTimeout(() => {
						// 	that.navList[that.tabCurrentIndex].orderList.splice(item, 1);
							uni.hideLoading();
						// }, 300);
						this.loadData();
						// that.addressList = res.data.data;
					},
					complete:function(e){
						uni.hideLoading();
					}
				});
			},

			//确认收货
			querenshouhuo(item) {
				let that = this;
				uni.showLoading({
					title: '请稍后'
				});

				uni.request({
					url: that.$api_url + '/order/confirm_single', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						orderNo: item.id
					},
					success: res => {
						uni.showToast({
							title: res.data.message
						});
						// setTimeout(() => {
						// 	that.navList[that.tabCurrentIndex].orderList.splice(item, 1);
						// 	uni.hideLoading();
						// }, 300);
						that.loadData();
						// that.addressList = res.data.data;
					}
				});
			},
			//取消订单
			cancelOrder(item) {
				let that = this;
				if(that.quxiaostate == 1){
					return
				}
				
				that.quxiaostate = 1;
				uni.showLoading({
					title: '请稍后'
				});

				uni.request({
					url: that.$api_url + '/order/cancel', //仅为示例，并非真实接口地址。
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					method: 'POST',
					data: {
						orderNo: item.number
					},
					success: res => {
						that.quxiaostate = 0;
						setTimeout(() => {
							let {
								stateTip,
								stateTipColor
							} = that.orderStateExp(0, 0, 0);
							item = Object.assign(item, {
								state: 0,
								stateTip,
								stateTipColor
							});

							//取消订单后删除待付款中该项
							// let list = that.navList[that.tabCurrentIndex].orderList;
							// let index = list.findIndex(val => val.id === item.id);
							// console.log('index', index);
							// index !== -1 && list.splice(index, 1);


							this.loadData();
							uni.hideLoading();
						}, 300);
					},
					complete:function(e){
						uni.hideLoading();
					}
				});
			},
			pay(item) {
				let that = this;
				uni.redirectTo({
					url: '/pages/money/pay?id=' + item.id
				});
			},

			ping(item) {
				let that = this;
				uni.redirectTo({
					url: '/pages/order/ping?id=' + item.id
				});
			},
			refund(item) {
				// this.showtip = true;
				let that = this;
				uni.showLoading({
					title: '请稍后'
				});
				that.selId = item.id;
				uni.request({
					url: that.$api_url + '/order/applyRefunding',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						orderId: that.selId
					},
					success: res => {
						uni.showToast({
							title: res.data.message
						});

						that.loadData();
					},
					complete: function(e) {
						uni.hideLoading();
					}
				});
			},

			quanma(item) {
				this.coupon_code = item.coupon_code;
				this.coupon_code_show = true;
			},

			//订单状态文字和颜色
			orderStateExp(state, refund, refund_examine) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 0:
						stateTip = '待付款';
						break;
					case 1:
					case 4:
						stateTip = '待发货';
						break;
					case 2:
						stateTip = '待收货';
						break;
					case 3:
						stateTip = '已完成';
						break;
					case 6:
						stateTip = '已退款';
						break;
					case 9:
						stateTip = '已驳回';
						break;
					case 5:
						stateTip = '退款中';
						break;
					case 7:
						stateTip = '订单已取消';
						stateTipColor = '#909399';
						break;
					case 8:
						stateTip = '订单已删除';
						stateTipColor = '#909399';
						break;
					case 10:
						stateTip = '已评价';
						break;
						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		}
	};
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;
 */
		font-size: 14px;
		color: #666;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;

		/* #endif */
		background-color: #fff;
		padding: 15px;
		font-size: 30px;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 12px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 6;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}

	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center;
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999;
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.uni-load-more__img>view {
		position: absolute;
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: 0.2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite;
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px;
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0;
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px;
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0;
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px;
	}

	.load2 {
		transform: rotate(30deg);
	}

	.load3 {
		transform: rotate(60deg);
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s;
	}

	.load2 view:nth-child(1) {
		animation-delay: 0.13s;
	}

	.load3 view:nth-child(1) {
		animation-delay: 0.26s;
	}

	.load1 view:nth-child(2) {
		animation-delay: 0.39s;
	}

	.load2 view:nth-child(2) {
		animation-delay: 0.52s;
	}

	.load3 view:nth-child(2) {
		animation-delay: 0.65s;
	}

	.load1 view:nth-child(3) {
		animation-delay: 0.78s;
	}

	.load2 view:nth-child(3) {
		animation-delay: 0.91s;
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s;
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s;
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s;
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s;
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.2;
		}
	}
</style>
