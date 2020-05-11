<template>
	<view class="content">
		<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 150rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7;margin-top: 12rpx;">
			<view style="flex: 1; flex-direction: column; margin-left: 40rpx;">
				<view style="font-size: 30rpx; color: #333333;">消息通知</view>
				<view style="font-size: 20rpx; color: #7d7d7d; margin-top: 12rpx;">是否接受消息推送</view>
			</view>
			<view style="width: 140rpx;">
				<switch :checked="switchChange" color="#65c186" style="transform:scale(0.7)" @change="switch1Change" />
			</view>
		</view>
		<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 150rpx; background-color: #FFFFFF;"
		 @click="clearshuju()">
			<view style="flex: 1; flex-direction: column; margin-left: 40rpx;">
				<view style="font-size: 30rpx; color: #333333;">清理缓存</view>
				<view style="font-size: 20rpx; color: #7d7d7d; margin-top: 12rpx;">清除程序图片缓存，网络请求缓存</view>
			</view>
			<view style="width: 140rpx;">
			</view>
		</view>

		<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 150rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7; margin-top: 30rpx;"
		 @click="aboutapp()">
			<view style="flex: 1; flex-direction: column; margin-left: 40rpx;">
				<view style="font-size: 30rpx; color: #333333;">关于我们</view>
				<view style="font-size: 20rpx; color: #7d7d7d; margin-top: 12rpx;">可查看这个小程序的基本信息</view>
			</view>
			<view style="width: 140rpx; text-align: center;">
				<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx;"></image>
			</view>
		</view>

		<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 150rpx; background-color: #FFFFFF;"
		 @click="feedback()">
			<view style="flex: 1; flex-direction: column; margin-left: 40rpx;">
				<view style="font-size: 30rpx; color: #333333;">意见反馈</view>
				<view style="font-size: 20rpx; color: #7d7d7d; margin-top: 12rpx;">提出您的意见,帮助我们完善</view>
			</view>
			<view style="width: 140rpx; text-align: center;">
				<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx;"></image>
			</view>
		</view>

		<view style="height: 80rpx; margin-left: 10%; margin-right: 10%; margin-top: 120rpx; border-radius: 50rpx; background-color: #65c186; text-align: center; line-height: 80rpx; color: #FFFFFF; font-size: 30rpx;"
		 @click="outlogin()">退出登录</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				switchChange: false

			}
		},
		onLoad: function(option) {
			that = this;
			try {
				const value = uni.getStorageSync('switchChange');
				if (value) {
					console.log(value);
					that.switchChange = value;
				}
			} catch (e) {
				console.log('change事件错误值为', e)
			}
		},
		methods: {
			switch1Change: function(res) {
				try {
					uni.setStorageSync('switchChange', res.target.value);
				} catch (e) {
					console.log('change事件错误值为', e)

				}
			},
			clearshuju: function(res) {

				uni.showModal({
					title: '清除缓存',
					content: '清理缓存会有可能影响您的使用体验效果，是否要清除缓存？',
					confirmColor: '#65c186',
					success: function(res) {
						if (res.confirm) {
							try {
								uni.showLoading({
									title: '清理中...',
									mask: true,
								});
								setTimeout(function() {
									uni.hideLoading();
									uni.showToast({
										title: '清理成功',
										icon: "success"
									});
								}, 2000);
							} catch (e) {
								console.log('清除缓存错误：' + e);
							}
						}
					}
				});

			},
			aboutapp: function(res) {
				uni.navigateTo({
					url: './aboutapp'
				})
			},
			feedback: function(res) {
				uni.navigateTo({
					url: './feedback'
				})
			},
			outlogin: function(res) {
				uni.showModal({
					title: '退出账号',
					content: '确定要退出当前 账号吗？',
					confirmColor: '#65c186',
					success: function(res) {
						if (res.confirm) {
							try {
								uni.clearStorageSync();
								uni.redirectTo({
									url: '../myinfo/login'
								})
							} catch (e) {
								console.log('清除缓存错误：' + e);
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
