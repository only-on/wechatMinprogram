<template>
	<view class="content">
		<view style=" margin-top: 100rpx; width: 100%; font-size: 40rpx; color: #ff0000; text-align: center;">恭喜你中奖啦！</view>
	<view style="margin-top: 50rpx; width: 100%; font-size: 25rpx; color: #353535; text-align: center;">狼来了！</view>
		<image style="margin-top: 100rpx; background-image: url(https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/25/dfc13228a0e0b02ca87066aa150fa6b0.png);"></image>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {

			}
		},
		onLoad: function(e) {
			that = this;
		},
		onShow: function(res) {

		},
		methods: {

		}

	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
