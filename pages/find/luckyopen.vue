<template>
	<view class="content">
		<image style="width: 100%;" :src="tutop" mode="widthFix"></image>
		<image style="width: 100%;" :src="tucenter" mode="widthFix"></image>
		<image style="width: 100%; position: fixed; bottom: 1rpx;" :src="tubottom" mode="widthFix"></image>
		<image style="width: 200rpx; height: 200rpx; position: absolute; top: 34%;" :src="tupian" mode="widthFix"></image>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				tutop:'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/27/e77bf65f1a488511dad15fdca3dc0dd1.png',
				tucenter:'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/25/dfc13228a0e0b02ca87066aa150fa6b0.png',
				tubottom:'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/23/fc384a9924eb403797874ad97c3b0672.png',
				tupian:''
			}
		},
		onLoad: function(e) {
			that = this;
			that.tupian=e.imgurl;
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
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
	}
</style>
