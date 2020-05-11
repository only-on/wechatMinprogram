<template>
	<view class="content">
		<view style="display: flex; flex-direction: row; width: 100%; height: 180rpx; background-color: #FFFFFF; margin-top: 5rpx;">
			<image :src="tupian" style="width: 100rpx; height: 100rpx; border-radius: 50%; margin-top: 20rpx;margin-left: 60rpx;"
			 mode="widthFix" @click="info()"></image>
			<view style="flex: 1;margin-top: 40rpx;margin-left: 20rpx; font-size: 28rpx; color: #333333;" @click="info()">{{nicheng}}</view>
			<view style="padding:10rpx 40rpx; text-align: center; font-size: 30rpx; color: #333333;" @click="setting()">设置</view>
		</view>
		<view class="example-body" style="margin-top: 12rpx;">
			<uni-grid :column="3" :show-border="false" :square="false" @change="change">
				<!-- <uni-grid-item :hor="35" :ver="-45" marker="badge" type="error" text="12">
					<image class="image" src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png" mode="aspectFill" />
					<text class="text">新浪</text>
				</uni-grid-item>
				<uni-grid-item :hor="40" :ver="-55" :img-width="30" marker="image" src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/recommend.png">
					<image class="image" src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png" mode="aspectFill" />
					<text class="text">微信</text> -->
				<!-- </uni-grid-item> -->
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/902e26202f6159d75e28fc460271b605.png"
					 mode="aspectFill" />
					<text class="text">优惠券</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/2d4ff1e56ec873005f66df930a38bce5.png"
					 mode="aspectFill" />
					<text class="text">收货地址</text>
				</uni-grid-item>
				<uni-grid-item v-if="count==0">
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/b556b63b3b28c75e6593c5b73db4ceff.png"
					 mode="aspectFill" />
					<text class="text">我的消息</text>
				</uni-grid-item>

				<uni-grid-item v-if="count!=0" :hor="35" :ver="-45" marker="badge" type="error" :text="count">
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/b556b63b3b28c75e6593c5b73db4ceff.png"
					 mode="aspectFill" />
					<text class="text">我的消息</text>
				</uni-grid-item>
			</uni-grid>
		</view>

		<view style="width: 100%; height: 80rpx; background-color: #FFFFFF; font-size: 26rpx; line-height: 80rpx; padding-left: 20rpx; border-bottom: 2rpx solid #eeeeee; margin-top: 12rpx;">我的信息</view>

		<view class="example-body">
			<uni-grid :column="4" :show-border="false" :square="false" @change="changexinxi">
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/0935d506515e9b5b5ecfd09a55ec077d.png"
					 mode="aspectFill" />
					<text class="text">资料</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/9ab1c87e540499418e4c650562c08b89.png"
					 mode="aspectFill" />
					<text class="text">积分</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/824bad262cdc67ae9e5bb1fe0a1092c9.png"
					 mode="aspectFill" />
					<text class="text">钱包</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/d49f9f67be5ea799bc89c8d721e05f3e.png"
					 mode="aspectFill" />
					<text class="text">收藏</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view style="width: 100%; height: 80rpx; background-color: #FFFFFF; font-size: 26rpx; line-height: 80rpx; padding-left: 20rpx; border-bottom: 2rpx solid #eeeeee; margin-top: 12rpx;">我的订单</view>

		<view class="example-body">
			<uni-grid :column="4" :show-border="false" :square="false" @change="changedingdan">
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/f99d531d656b29ca15c8eb2e5b630004.png"
					 mode="aspectFill" />
					<text class="text">全部订单</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/ea6590f569f3daed1c205deee882dd78.png"
					 mode="aspectFill" />
					<text class="text">待付款</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/a58d2b93a29f5b94eeca6d97d925a015.png"
					 mode="aspectFill" />
					<text class="text">待发货</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/521fc91ce19e8bb25322e0e652e0071d.png"
					 mode="aspectFill" />
					<text class="text">待收货</text>
				</uni-grid-item>

			</uni-grid>
		</view>
		<view style="width: 100%; height: 80rpx; background-color: #FFFFFF; font-size: 26rpx; line-height: 80rpx; padding-left: 20rpx; border-bottom: 2rpx solid #eeeeee; margin-top: 12rpx; ">问答相关</view>

		<view class="example-body">
			<uni-grid :column="3" :show-border="false" :square="false" @change="changewenda">
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/d45500215824aea93b2981524998620b.png"
					 mode="aspectFill" />
					<text class="text">我的关注</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/771ed0360a42b890871000cd8179c1ba.png"
					 mode="aspectFill" />
					<text class="text">我的问题</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/8a0b589fe5e451c7632fddb416849767.png"
					 mode="aspectFill" />
					<text class="text">我的回答</text>
				</uni-grid-item>
			</uni-grid>
		</view>

		<view style="width: 100%; flex: 1; background: #EEEEEE; "></view>

	</view>
</template>

<script>
	var that;
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				tupian: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/20/fe6861f82870aa9826f7e01ea8878235.png',
				nicheng: '请先登录',
				count: 0
			}
		},
		onLoad: function(option) {
			that = this;
		},
		onShow: function(res) {

			uni.request({
				url: this.$api_url + '/user/get_user_info', //仅为示例，并非真实接口地址。
				method: 'GET',
				header: {
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				success: res => {
					console.log(res)
					if (res.data.code == 1000) {
						that.nicheng = res.data.content.userName;
						that.tupian = res.data.content.headimg;
					}else if(res.data.code == 2002){
						try {
							uni.clearStorageSync();
						} catch (e) {
							console.log('清除缓存错误：' + e);
						}
					}
				}
			});


			uni.request({
				url: this.$api_url + '/notify/count', //仅为示例，并非真实接口地址。
				method: 'GET',
				header: {
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				// data: {
				// 	openid: uni.getStorageSync('openid')
				// },
				success: res => {
					console.log(res)
					if (res.data.code == 1000) {
						that.count = res.data.content;
					}else if(res.data.code == 2002){
						try {
							uni.clearStorageSync();
						} catch (e) {
							console.log('清除缓存错误：' + e);
						}
					}
				}
			});

		},
		methods: {
			setting: function() {

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
									url: './login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}

				uni.navigateTo({
					url: '/pages/setter/setter'
				});

			},
			info: function() {

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
									url: './login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}

				uni.navigateTo({
					url: './changinfo'
				});

			},
			change: function(e) {

				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {

					return
				}

				let {
					index
				} = e.detail
				console.log(index)
				if (0 == index) {
					uni.navigateTo({
						url: './conpon?type=0'
					})
				} else if (1 == index) {
					uni.chooseAddress({
						success(res) {
							console.log(res)
							console.log(res.postalCode)
							console.log(res.provinceName)
							console.log(res.cityName)
							console.log(res.countyName)
							console.log(res.detailInfo)
							console.log(res.nationalCode)
							console.log(res.telNumber)

						}
					})
				} else {
					uni.navigateTo({
						url: './systemmessage'
					})
				}
				// if (3 == index) {
				// 	uni.navigateTo({
				// 		url: './systemmessage'
				// 	})
				// }
			},
			changexinxi: function(e) {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {

					return
				}
				let {
					index
				} = e.detail
				console.log(index)
				if (0 == index) {
					uni.navigateTo({
						url: './information'
					})
				}
				if (1 == index) {
					uni.showModal({
						title: '提示',
						content: '该功能正在研发中...敬请期待！',
						showCancel: false,
						confirmColor: '#65c186',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							}
						}
					});

				}
				if (2 == index) {
					uni.navigateTo({
						url: '../find/wallet'
					})
				}
				if (3 == index) {
					uni.navigateTo({
						url: './collect'
					})
				}
			},
			changedingdan: function(e) {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {

					return
				}
				let {
					index
				} = e.detail
				console.log(index)
				that.order(index);
			},
			changewenda: function(e) {
				let {
					index
				} = e.detail
				uni.showModal({
					title: '提示',
					content: '该功能正在研发中...敬请期待！',
					showCancel: false,
					confirmColor: '#65c186',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});

				// uni.downloadFile({
				// 	url: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/pdfFiles/2020-04-14469.png', //仅为示例，并非真实的资源
				// 	success: (res) => {
				// 		console.log('分享海报' + res.tempFilePath);
				// 		if (res.statusCode === 200) {
				// 			uni.saveImageToPhotosAlbum({
				// 				filePath: res.tempFilePath,
				// 				success: function(res) {
				// 					var savedFilePath = res.savedFilePath;
				// 					console.log('分享海报保存成功' + savedFilePath);
				// 				}
				// 			});
				// 		}
				// 	},
				// 	fail: (e) => {
				// 		console.log(e)
				// 	}
				// });


			},

			order: function(e) {
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {

					return
				}
				uni.navigateTo({
					url: '/pages/order/order?state=' + e
				});
			},
		}
	}
</script>

<style>
	page {
		background: #eeeeee;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #eeeeee;
	}

	.example-body {
		padding: 20rpx;
		background: #fff
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #fff
	}

	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 26upx;
		margin-top: 10upx;
		color: #999;
	}
</style>
