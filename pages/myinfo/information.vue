<template>
	<view class="qiun-columns">
		<view class="qiun-charts">
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
		</view>

		<view style="width: 100%; height: 1rpx; background-color: #e2e2e2; margin-top: 20rpx;"></view>
		<view style="width: 100%; height: 100rpx; display: flex; flex-direction: row;" @click="changinfo()">
			<view style="width: 150rpx; height: 100rpx; line-height: 100rpx; font-size: 26rpx; color: #888888; text-align: center;">基本信息</view>
			<view style="flex: 1; height: 100rpx; line-height: 100rpx; font-size: 26rpx; color: #888888; text-align: right;">完善即可获得150积分</view>
			<image src="../../static/ic_right.png" mode="aspectFit" style="width:20rpx; margin: 30rpx 10rpx;height: 40rpx;"></image>
		</view>
		<view style="width: 100%; height: 1rpx; background-color: #e2e2e2;"></view>
		<view style="width: 100%; height: 100rpx; display: flex; flex-direction: row;" @click="renzheng()">
			<view style="width: 150rpx; height: 100rpx; line-height: 100rpx; font-size: 26rpx; color: #888888; text-align: center;">实名认证</view>
			<view style="flex: 1; height: 100rpx; line-height: 100rpx; font-size: 26rpx; color: #888888; text-align: right;">{{BkReason}}</view>
			<image src="../../static/ic_right.png" mode="aspectFit" style="width:20rpx; margin: 30rpx 10rpx;height: 40rpx;"></image>
		</view>
		<view style="width: 100%; height: 1rpx; background-color: #e2e2e2;"></view>
		<view style="width: 100%; height: 100rpx; display: flex; flex-direction: row;">
			<view style="width: 150rpx; height: 100rpx; line-height: 100rpx; font-size: 26rpx; color: #888888; text-align: center;">专家认证</view>
			<view style="flex: 1; height: 100rpx; line-height: 100rpx; font-size: 26rpx; color: #888888; text-align: right;">专家权威</view>
			<image src="../../static/ic_right.png" mode="aspectFit" style="width:20rpx; margin: 30rpx 10rpx; height: 40rpx;"></image>
		</view>
		<view style="width: 100%; height: 1rpx; background-color: #e2e2e2;"></view>
	</view>


</template>


<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRing = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				verifiedstate: 0,
				BkReason: '请实名认证，保护你的权益',
				yiwan:75,
				weiwan:25,
				baifenbi:'75%'
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.showRing('canvasRing')
		},
		onHide:function(){
			_self.yiwan=100
			_self.weiwan=0
			_self.baifenbi='100%'
			_self.showRing('canvasRing')
		},
		onShow: function(res) {
			uni.request({
				url: this.$api_url + '/user/get_user_info', //仅为示例，并非真实接口地址。
				method: 'GET',
				header: {
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				success: res => {
					console.log(res)
					if (res.data.code == 1000) {
						_self.verifiedstate = res.data.content.verified;
						if (1 == _self.verifiedstate) {
							_self.BkReason = '个人认证，审核通过'
							_self.yiwan=100
							_self.weiwan=0
							_self.baifenbi='100%'
							_self.showRing('canvasRing')
						} else if (5 == _self.verifiedstate) {
							_self.BkReason = '实名认证正在审核中...'
							_self.yiwan=100
							_self.weiwan=0
							_self.baifenbi='100%'
							_self.showRing('canvasRing')
						} else if (4 == _self.verifiedstate) {
							_self.BkReason = '审核失败，请重新提交'
							_self.yiwan=100
							_self.weiwan=0
							_self.baifenbi='100%'
							_self.showRing('canvasRing')
						} else {
							_self.BkReason = '请实名认证，保护你的权益'
							_self.yiwan=75
							_self.weiwan=25
							_self.baifenbi='75%'
							_self.showRing('canvasRing')
						}
					}
				}
			});
		},
		methods: {
			showRing(canvasId) {
				var chartData = {
					series: [{
						"name": "已完成",
						"data": _self.yiwan
					}, {
						"name": "未完成",
						"data": _self.weiwan
					}]
				};
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: _self.baifenbi,
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
						offsetY: 0 * _self.pixelRatio, //这个调节字在中间圆的位置  中间没有字的就整个title注销
					},
					subtitle: {
						name: '完善度',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: 5 * _self.pixelRatio, // 这个调节字在中间圆的位置  中间没有字的就整个subtitle注销
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 40 * _self.pixelRatio,
							labelWidth: 15
						}
					},
					background: '#fff', // 中间圆的背景颜色
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false, // 动画  画个圆的那种
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false, //  图上红圈圈出来的线  true 显示
				});
			},
			touchRing(e) {
				// 这个是点击的时候显示数值，但是我写上报错，就注销了 
				// canvaRing.showToolTip(e, {
				// 	format: function(item) {
				// 		return item.name + ':' + item.data
				// 	}
				// });

			},
			changinfo: function() {
				uni.navigateTo({
					url: './changinfo'
				});
			},
			renzheng: function() {
				if (1 != _self.verifiedstate && 5 != _self.verifiedstate) {
					uni.navigateTo({
						url: './renzheng'
					});
				}
			},
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}


	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
