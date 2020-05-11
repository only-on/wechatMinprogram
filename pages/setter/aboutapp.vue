<template>
	<view style="display: flex; flex-direction: column; width: 100%; align-items: center;">
		<image style="width: 200rpx; height: 200rpx; margin-top: 100rpx;" :src="appimage" mode="widthFix"></image>
	<view style="font-size: 33rpx; color: #333333; margin-top: 20rpx;">{{appname}}</view>
	<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 120rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7; margin-top: 60rpx;"
	 @click="upapp()">
		<view style="flex: 1; flex-direction: column; margin-left: 40rpx;">
			<view style="font-size: 28rpx; color: #333333;">检查更新</view>
		</view>
		<view style="width: 140rpx; text-align: center;">
			<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx;"></image>
		</view>
	</view>
	<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 120rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7;"
	 @click="xieyi()">
		<view style="flex: 1; flex-direction: column; margin-left: 40rpx;">
			<view style="font-size: 28rpx; color: #333333;">使用协议</view>
		</view>
		<view style="width: 140rpx; text-align: center;">
			<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx;"></image>
		</view>
	</view>
	<!-- <view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 120rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7;"
	 @click="dadianhua()">
		<view style="flex: 1; flex-direction: column; margin-left: 40rpx;">
			<view style="font-size: 28rpx; color: #333333;">联系客服</view>
		</view>
		<view style="width: 140rpx; text-align: center;">
			<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx;"></image>
		</view>
	</view> -->
	
	<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 120rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7;">
		<button  open-type="contact" class="stybutton">联系客服</button>
		<view style="width: 140rpx; text-align: center;">
			<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx;"></image>
		</view>
	</view>
	
	
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				appid:'',
				appname:'',
				appimage:''

			}
		},
		onLoad: function(option) {
			that = this;
		uni.request({
			url: this.$api_url + '/user/storeName', //仅为示例，并非真实接口地址。
			method: 'POST',
			header: {
				// 'Content-Type': 'application/x-www-form-urlencoded',
				'authorization': uni.getStorageSync('authorization') //自定义请求头信息
			},
			success: res => {
				console.log(res)
				if (res.data.code == 1000) {
					that.appid = res.data.content.appId;
					that.appname = res.data.content.storeName;
					that.appimage = res.data.content.image;
				}
			}
		});
		
		},
		methods: {
		
			upapp: function(res) {
				uni.showToast({
					title: '已是最新版本',
				});

			},
			xieyi: function(res) {
				uni.navigateTo({
					url: './agreement_of_usage'
				})
			},
		
			dadianhua: function(res) {
			uni.makePhoneCall({
			    phoneNumber: '02988188685' //仅为示例
			});
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.stybutton{
		flex: 1;
		height: 120rpx; 
		background-color: #FFFFFF;
		font-size: 28rpx;
		 color: #333333;
		 text-align: start;
		 line-height: 120rpx;
		 padding-left: 40rpx;
		 box-shadow: none; 
		 border: none;
	}
	.stybutton::after{
		 border: none;
	}
</style>
