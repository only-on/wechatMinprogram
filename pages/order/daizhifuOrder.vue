<template>
	<view>
		<view style="background-image: linear-gradient(to right, #ff651a, #f02323);  color: #ffffff; height: 85rpx; line-height: 85rpx; width: 100%; display: flex; flex-direction: row;">
			<view style="font-size: 30rpx; flex: 1; padding-left: 20rpx; height: 85rpx; line-height: 85rpx;">等待买家付款</view>
			<view v-if="havetime" style="font-size: 27rpx; flex: 1; text-align: right; padding-right: 20rpx; height: 85rpx; line-height: 85rpx;">{{havetime}}分钟后自动取消</view>
		</view>
		<!-- 地址 -->
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{ goods.consignee }}</text>
						<text class="mobile">{{ goods.phone }}</text>
					</view>
					<text class="address">{{ goods.address }}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>

			<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
		</navigator>

		<view class="goods-section">
			<!-- <view class="g-header b-b">
				<image class="logo" src="/static/temp/h1.png"></image>
				<text class="name">家修汇家庭维修</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item">
				<image :src="goods.imageUrl"></image>
				<view class="right">
					<text class="title clamp">{{ goods.commodityItemVO.title }}</text>
					<text class="spec"></text>
					<view class="price-box">
						<text class="price">{{ goods.commodityItemVO.commodityName }}</text>
						<!-- <text class="number">x 1</text> -->
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<!-- <view class="yt-list">
			<view class="yt-list-cell b-b" >
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					优惠{{goods.bonusMoney}}元
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>

		</view> -->
		<!-- 金额明细 -->
		<view class="yt-list">

			<!-- <view class="yt-list-cell b-b"> -->
			<!-- <text class="cell-tit clamp">商品数量</text> -->
			<!-- <text class="cell-tip">￥{{ all_price }}</text> -->
			<!-- <view class="example-body" style="margin-left: 200upx;"> -->
			<!-- <uni-number-box :min="minQuantity" :max="99" :value="minQuantity" @change="change" /> -->
			<!-- </view> -->
			<!-- </view> -->
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip red">包邮</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥{{goods.bonusMoney==null? 0: goods.bonusMoney}}元</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<view class="desc">
					{{goods.raffleJournalName==null? '':goods.raffleJournalName}}
				</view>
			</view>
			<view style="width: 100%; height: 1rpx; background-color: #fafafa; margin-top: 20rpx;"></view>
			<view style="padding: 0 10rpx;color: red;border-bottom: 1rpx solid #fafafa; text-align: right; padding-right: 15rpx;">共计{{goods.commodityItemVO.quantity}}件
				总金额 ￥{{goods.amount}}</view>
			<view style="color: #888888;font-size: 26rpx; padding-left: 40rpx;height: 80rpx;line-height: 80rpx;">订单编号：{{goods.number}}</view>
			<view style="color: #888888;font-size: 26rpx; padding-left: 40rpx;height: 80rpx;line-height: 80rpx;border-bottom: 1rpx solid #fafafa;">下单时间：{{goods.createTime}}</view>

		</view>

		<!-- 底部 -->
		<!-- 	<view class="footer">
			<view class="price-content">
				<text class="price-tip" style="color: #666666; font-size: 30rpx;">取消订单</text>
				<text class="price" v-if="total <= 0">0.01</text>
		</view>
		<text class="submit" @click="submit">立即支付</text>
		</view> -->
		<view style="display: flex; flex-direction: row;position: fixed;bottom: 0;width: 100%; border-top: 1rpx solid #fafafa;height: 100rpx; line-height: 100rpx;">
			<!-- <view style="flex: 2;background-color: #ffffff;color: #000000; font-size: 32rpx;font-weight: 700;text-align: center;line-height: 100rpx;"></view> -->
			<view style="text-align: center;outline: none; box-shadow: none; border: none;flex: 2;background-color: #ffffff;color: #666666; font-size: 32rpx;font-weight: 500;text-align: center;line-height: 100rpx;height: 100%;"
			 @click="cancelOrder">
				取消订单
			</view>
			<view style="text-align: center;width: 35%;outline: none; box-shadow: none; border: none;flex: 1;background-color: #ff651a;color: #ffffff; font-size: 32rpx;font-weight: 500;text-align: center;line-height: 100rpx;height: 100%;"
			 @click="submit">
				立即支付
			</view>
		</view>
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState === 0 ? 'none' : maskState === 1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<button type="default" @click="nobonus" style="width: 100%;">不使用优惠券</button>
				<view v-if="couponList.length==0" style="width: 100%; height: 500upx; text-align: center;line-height: 500upx;">暂无可使用的优惠券</view>
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item, index) in couponList" v-if="item.usable" :key="index" @click="selCoupon(item)">
					<view class="con">
						<view class="left">
							<text class="title">{{ item.name }}</text>
							<text class="time">有效期至{{item.expiredTime}}</text>
						</view>
						<view class="right">
							<text class="price">{{ item.money }}</text>
							<text>下单立减</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">券号：zhxn_{{ item.id }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import uniSection from '@/components/uni-section/uni-section.vue';

	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			// year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		components: {
			uniNumberBox,
			uniSection
		},
		data() {
			return {
				quxiaostate: 0,
				paystate: 0,
				intervalID: 0,
				havetime: '',
				id: '',
				type: 0,
				new_type: '',
				youhui: 0,
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				numberValue: 1,
				minQuantity: 1,
				price: 0,
				all_price: 0,
				secondKillId: 0,
				secondKillTimeId: 0,
				guige_id: 0,
				miaosha: 0,
				buy_type: 0,
				couponSel: '',
				commodity: [],
				// selCouponName: '选择优惠券',
				total: 0,
				goods: [],
				service: [],
				note: '',
				date: getDate({
					format: true
				}),
				time: '2',
				startDate: getDate('start'),
				endDate: getDate('end'),
				couponList: [],
				addressData: {
					name: '添加地址',
					mobile: null
				}
			};
		},
		onUnload() {
			console.log('页面卸载')
			clearInterval(that.intervalID)
		},
		onLoad(option) {
			//商品数据
			//let data = JSON.parse(option.data);
			//console.log(data);
			var that = this;
			that.paystate = 0;
			that.quxiaostate = 0;
			let id = option.id;
			let type = option.type;
			let guige_id = option.guige_id;
			console.log(guige_id);
			that.id = option.id;
			that.type = option.type;
			that.guige_id = option.guige_id;
			that.buy_type = option.buy_type;
			that.loadData(id);
			if (type == 0) {
				that.new_type = 2;
			} else if (type == 1) {
				that.new_type = 0;
			} else if (type == 2) {
				that.new_type = 6;
			} else if (type == -1) {
				if (option.buy_type == 1) {
					that.new_type = 1;
				} else {
					that.new_type = 0;
				}

			} else if (type == -2) {
				if (option.buy_type == 1) {
					that.new_type = 7;
				} else {
					that.new_type = 6;
				}

			} else if (type == -3) {
				if (option.buy_type == 1) {
					that.new_type = 3;
				} else {
					that.new_type = 2;
				}
			}

			if (option.miaosha == 1) {
				that.miaosha = option.miaosha;
				that.secondKillId = option.secondKillId;
				that.secondKillTimeId = option.secondKillTimeId;
				console.log('is秒杀' + option.miaosha)
				that.new_type = 5;
			}
		},
		methods: {
			//取消订单
			cancelOrder() {
				let that = this;
				if (that.quxiaostate == 1) {
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
						orderNo: that.goods.number
					},
					success: res => {
						that.quxiaostate = 0;
						uni.navigateBack({
							delta: 2
						})
					},
					complete: function(e) {
						that.quxiaostate = 0;
						uni.hideLoading();
					}
				});
			},
			change(value) {
				console.log(value);
				this.numberValue = value;
				this.all_price = this.price * value;
				// this.total = ((this.goods.discountPrice * value)).toFixed(2);
				this.countTotal();
			},
			async loadData(id) {
				let that = this;
				this.loadGoodsInfo();

			},
			selAddress: function() {
				var that = this;
				uni.chooseAddress({
					success(res) {
						that.addressData = res;
						if (that.goods.pickUp) {
							that.addressData.provinceName = that.goods.pickUpAddress;
							that.addressData.cityName = '';
							that.addressData.detailInfo = '';
							uni.showModal({
								title: '提示',
								content: '该商品为自提，请注意自提地址！',
								showCancel: false,
								success: function(e) {

								}
							})
						}
						console.log(res.userName)
						console.log(res.postalCode)
						console.log(res.provinceName)
						console.log(res.cityName)
						console.log(res.countyName)
						console.log(res.detailInfo)
						console.log(res.nationalCode)
						console.log(res.telNumber)
					}
				})
			},
			nobonus: function() {
				this.selCouponName = '选择优惠券';
				this.couponSel = '';
				this.maskState = 0;
				this.youhui = 0;
				this.all_price = this.price * this.numberValue;
				this.countTotal();
			},

			loadGoodsInfo: function() {
				var that = this;
				console.log('this.miaosha==' + that.miaosha);
				var goodsinfo = 'order/detail';
				var vals = {
					orderId: that.id,
				};
				var xxx = this.$Request.topost(goodsinfo, vals);
				xxx.then(res => {
					// this.$Request.toget(this.$api.goods.goodsinfo, { productId: this.id, type: this.type }, { authorization: uni.getStorageSync('authorization') }).then(res => {
					console.log(res);
					if (res.code == 1000) {
						that.goods = res.content;

						var chooseTime = (new Date(this.goods.createTime)).getTime() + 24 * 60 * 60 * 1000;
						console.log(chooseTime);
						var nowTime = (new Date()).getTime();
						console.log(nowTime);
						this.havetime = Math.floor((chooseTime - nowTime) / 1000 / 3600) + '小时' + Math.floor((chooseTime - nowTime) /
							1000 % 3600 / 60);
						console.log(this.havetime);
						if (that.type != 0) {
							console.log(that.guige_id);
							that.commodity = res.content.commodityList[that.guige_id];
							that.minQuantity = res.content.commodityList[that.guige_id].minQuantity;
							if (that.buy_type == 1) {
								that.price = that.commodity.groupBuyPrice;
							} else {
								if (that.miaosha == 1) {
									that.price = that.commodity.secondKillPrice;
								} else {
									that.price = that.commodity.price;
								}
							}
						} else {
							that.minQuantity = 1;
							that.price = res.content.discountPrice;
						}

						that.countTotal();

						that.goods = res.content;
						that.$Request.topost(that.$api.order.bonus_list, {
							productId: that.id,
							price: that.price * that.minQuantity
						}).then(res => {
							if (res.code == 1000) {
								that.couponList = res.content;
							}
						});

						that.$Request.topost(that.$api.order.bonus_best, {
							productId: that.id,
							price: that.price * that.minQuantity
						}).then(res => {
							if (res.code == 1000) {
								that.couponSel = res.content.id;
								that.youhui = res.content.money;
								that.selCouponName = res.content.name;
								that.selCoupon(res.content);
								that.countTotal();
							}
						});

					} else {
						uni.navigateBack();
					}
				});




			},

			countTotal() {
				if (this.price * this.numberValue > this.youhui) {
					this.total = ((this.price * this.numberValue) - this.youhui).toFixed(2);
				} else {
					this.total = 0;
				}
			},


			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer);
			},
			selCoupon(item) {
				this.youhui = item.money;
				this.all_price = this.price * this.numberValue;
				this.countTotal();
				this.selCouponName = item.name + "(￥" + item.money + "元)";
				this.couponSel = item.id;
				this.maskState = 0;
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type) {
				this.payType = type;
			},

			submit() {
				let that = this;
				if (that.paystate == 1) {
					return
				}
				that.paystate = 1;
				uni.request({
					url: this.$api_url + '/weixin/payment.do', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						"orderId": that.goods.id
					},
					success: res => {
						console.log(res)
						// 仅作为示例，非真实参数信息。
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: 'MD5',
							paySign: res.data.paySign,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
								that.paystate = 0;
								uni.navigateBack({
									delta: 2
								})
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
								that.paystate = 0;
								uni.showModal({
									content: '确定要放弃本次支付吗？',
									success: function(res) {
										if (res.confirm) {
											uni.navigateBack({
												delta: 2
											})
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								})

							}
						});
					},
					complete: function(e) {
					}
				});
			},

			bindDateChange: function(e) {
				this.date = e.target.value;
			},
			radioChange: function(e) {
				var checked = e.target.value
				this.time = checked;
				console.log(checked)
			},
			stopPrevent() {}
		}
	};
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}


	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}
		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6bcc03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06b4fd;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $base-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $base-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: 0.3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: 0.3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, 0.4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $base-color;

			&:before {
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
