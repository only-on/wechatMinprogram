<template>
	<view style="display: flex; flex-direction: column; width: 100%; align-items: center;">
		<image style="width: 200rpx; height: 160rpx; margin-top: 160rpx; border-radius: 20rpx;" :src="appimage" mode="widthFix"></image>
		<view style="font-size: 30rpx; color: #6f6f6f; margin-top: 30rpx;">{{appname}}</view>
		<view style="width: 100%; display: flex; flex-direction: row; margin-top: 250rpx;">
			<view style="text-align: center; color: #7d7d7d; border: 1rpx solid #7d7d7d; border-radius: 50rpx;  width: 40%; height: 70rpx; line-height: 70rpx; font-size: 25rpx; margin-left: 10%;"
			 @click="guanbi">取消登录</view>
			<button type="primary" open-type="getPhoneNumber" @getphonenumber="gogetphonenumber" withCredentials="true" style=" border-radius: 50rpx;  width: 40%; height: 70rpx; line-height: 70rpx; font-size: 25rpx; margin-left: 10%; margin-right: 10%;">微信登录</button>

		</view>

	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				appname: '甄田',
				appimage: '',
				code: '',
				encryptedData: '',
				iv: '',
				appId: ''
			}
		},
		onLoad: function(e) {
			that = this;
			const accountInfo = uni.getAccountInfoSync();
			var appId = accountInfo.miniProgram.appId; // 小程序 appId
			uni.request({
				url: that.$api_url + '/user/storeNameNoAuth', //仅为示例，并非真实接口地址。
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data: {
					'appId': appId
				},
				success: res => {
					console.log(res)
					if (res.data.code == 1000) {
						that.appname = res.data.content.storeName;
						that.appimage = res.data.content.image;
					}
				}
			});
		},
		onShow: function(res) {

			var token = uni.getStorageSync('authorization');
			if (token == '' || token == null) {
				that.diaoyong();
			} else {
				setTimeout(function() {
					uni.switchTab({
						url: '../index/index'
					})
				}, 1000)
			}
			console.log('获取token=' + uni.getStorageSync('authorization'))
		},
		methods: {
			guanbi: function() {
				uni.navigateBack({
					delta:1
				})
			},
			diaoyong: function() {
				const accountInfo = uni.getAccountInfoSync();
				that.appId = accountInfo.miniProgram.appId; // 小程序 appId
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(loginRes)
								that.code = loginRes.code; // 小程序 code
							}
						});
					}
				});
			},


			gogetphonenumber: function(e) {

				that.encryptedData = JSON.stringify(e.detail.encryptedData)
				that.iv = JSON.stringify(e.detail.iv)
				console.log('appId = ' + that.appId);
				console.log('code = ' + that.code);
				console.log('encryptedData = ' + that.encryptedData);
				console.log('iv = ' + that.iv);
				if (undefined != that.iv && undefined != that.encryptedData) {
					uni.request({
						url: that.$api_url + '/user/login/weixinMini',
						method: 'POST',
						data: {
							appId: that.appId,
							code: that.code,
							encryptedData: that.encryptedData,
							iv: that.iv
						},
						success: (res) => {
							console.log(res)
							if (res.data.code == 1000) {
								var phone = res.data.content.phone;
								var token = res.data.content.token;
								var userId = res.data.content.userId;
								try {
									uni.setStorageSync('authorization', token);
									uni.setStorageSync('phone', phone);
									// uni.switchTab({
									// 	url: '../index/index'
									// })
									uni.navigateBack({
										delta:1
									})
								} catch (e) {
									// error
								}
							}
						},
						fail: (res) => {
							console.log(res)
							uni.hideLoading();
						}
					});
				} else {
					that.diaoyong();
				}
			}
		}

	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
	}
</style>
