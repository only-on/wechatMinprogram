<template>
	<view class="nodata" v-if="isShow">
		<image :src="img" mode="widthFix" class="empty_image"></image>
		<text :style="{color:textColor}">{{ text }}</text>
	</view>
</template>

<script>
export default {
	name: 'xw-empty',
	props: {
		//text
		text: {
			type: String,
			default: '暂无数据'
		},
		img: {
			type: String,
			default: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/28/1190d46b6402adc6126ff09142b01610.png'
		},
		textColor:{
			type: String,
			default: '#1e1e1e'
		},
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			};
	},
	methods: {}
};
</script>

<style lang="scss">
.nodata {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 500rpx;
	width: 100%;
	align-items: center;
	color: #555555;
	font-size: 30rpx;
	
}
.empty_image {
		width: 200rpx !important;
		margin-bottom: 50rpx;
	}
</style>
