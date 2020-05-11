<template>
	<view style="background-color: #ffffff;">
		<view style="background-image: linear-gradient(to right, #ff651a, #f02323); padding: 40rpx; color: #ffffff; height: 180rpx; line-height: 55rpx;">
			<view style="font-size: 34rpx;">拼团还未成功</view>
			<view style="font-size: 30rpx;">让小伙伴们都来拼单吧</view>
		</view>
		<view style="border-bottom: 1rpx solid #fafafa;height: 120rpx; line-height: 120rpx;font-size: 32rpx;color: #666666; font-weight: 700; text-align: center;">
			我发起的拼团
		</view>
		<view style="width: 100%;text-align: center;">
			<image style="width: 100%; height: 150rpx;" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/13/0ebb8e3f66435f405af8a4b0362b4fd0.jpg"
			 mode="widthFix"></image>
			<view style="height: 60rpx;line-height: 60rpx; font-size: 34rpx; color: #666666;">
				待分享，还差
				<span style="color: red;">{{ goodsItem.order.lastNum }}</span>
				件即可
			</view>
			<view style="height: 60rpx;line-height: 60rpx; font-size: 30rpx;">
				<text style="color: red;">截至{{ goodsItem.order.endTime }}结束</text>
				<!-- 后结束 -->
			</view>
			<view style="margin-top: 60rpx;">
				<view style="text-align: center;width: 35%;outline: none; box-shadow: none; border: none;  border-radius: 50rpx; background-color: #ff651a; color: #ffffff;  font-size: 30rpx; height: 80rpx; line-height: 80rpx; margin-left: 32%;"
				 @click="onShareinfo">
					分享好友
				</view>
			</view>
		</view>
		<view class="goods-box-single" style="width: 100%;">
			<image class="goods-img" :src="goodsItem.imageUrl" mode="aspectFill"></image>
			<view class="right">
				<text class="title clamp" style="color: #666666;">{{ goodsItem.commodityItemVO.title }}</text>
				<text class="attr-box"></text>
				<text class="price" style="color: #999999;">{{ goodsItem.commodityItemVO.commodityName }}</text>
			</view>
		</view>
		<view style="width: 100%; height: 1rpx; background-color: #fafafa; margin-top: 20rpx;"></view>
		<view style="padding: 0 10rpx;color: red;border-bottom: 1rpx solid #fafafa; text-align: right; padding-right: 15rpx;">共计{{goodsItem.commodityItemVO.quantity}}件
			总金额 ￥{{goodsItem.amount}}</view>
		<view style="color: #888888;font-size: 26rpx; padding-left: 40rpx;height: 80rpx;line-height: 80rpx;">订单编号：{{goodsItem.number}}</view>
		<view style="color: #888888;font-size: 26rpx; padding-left: 40rpx;height: 80rpx;line-height: 80rpx;border-bottom: 1rpx solid #fafafa;">下单时间：{{goodsItem.createTime}}</view>
		<view style="color: #888888;font-size: 26rpx; padding-left: 40rpx;height: 80rpx;line-height: 80rpx;">拼单规则：人满发货 不满退款</view>
		<view style="display: flex; flex-direction: row;position: fixed;bottom: 0;width: 100%; border-top: 1rpx solid #fafafa;height: 100rpx; line-height: 100rpx;">
			<!-- <view style="flex: 2;background-color: #ffffff;color: #000000; font-size: 32rpx;font-weight: 700;text-align: center;line-height: 100rpx;"></view> -->
			<button style="text-align: center;outline: none; box-shadow: none; border: none;flex: 2;background-color: #ffffff;color: #666666; font-size: 32rpx;font-weight: 500;text-align: center;line-height: 100rpx;height: 100%;"
			 plain="true" open-type="contact">
				联系我们
			</button>
			<view style="text-align: center;width: 35%;outline: none; box-shadow: none; border: none;flex: 1;background-color: #ff651a;color: #ffffff; font-size: 32rpx;font-weight: 500;text-align: center;line-height: 100rpx;height: 100%;"
			 @click="onShareinfo">
				分享好友拼单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsItem: [],
				id: '',
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.loadGoodsInfo();
		},
		methods: {
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
						that.goodsItem = res.content;

					} else {
						uni.navigateBack();
					}
				});




			},


			onShareinfo(res) {

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
				uni.showLoading({
					title: '数据生成中...'
				})
				uni.request({
					url: this.$api_url + '/user/createPoster', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						'productId': this.goodsItem.productId,
						'type': '-1',
						'secondKillId': '',
						'secondKillTimeId': '',
						'path': 'pages/detail/goodsinfo?id=' + this.id + '&type=-1' + '&miaosha=0'
					},
					success: res => {
						console.log(res)
						if (res.data.code == 1000) {
							var appimage = res.data.content;
							var strid = this.goodsItem.productId
							var strtype = '-1'
							console.log('+++' + strid)
							console.log('+++' + strtype)
							uni.navigateTo({
								url: '/pages/videoshare/new_file?imgurl=' + appimage + '&shareimg=' + this.goodsItem.imageUrl +
									'&sharebiaoti=' + this.goodsItem.commodityItemVO.title + '(您的好友邀您一起拼着买！更便宜！)&id=' + strid + '&type=' +
									strtype + '&miaosha=0'

							});

						}
					},
					complete: function(e) {
						uni.hideLoading();
					}
				});

			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 20upx 20upx;
		margin: 20rpx 0;

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
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}
</style>
