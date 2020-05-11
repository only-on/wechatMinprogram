<template>
	<view class="content">
		<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 150rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7; margin-top: 20rpx;"
		 @click="choujiang()">
			<image src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/20/ad7dbef0defb403c13cf023eb9ab1314.png"
			 mode="widthFix" style="margin-left: 30rpx; width: 90rpx; height: 90rpx;"></image>
			<view style="flex: 1; font-size: 33rpx; color: #000000;margin-left: 30rpx;">幸运大抽奖</view>
			<view style="font-size: 28rpx; color: #7d7d7d; margin-left: 40rpx;">你就是幸运锦鲤</view>
			<view style="width: 100rpx; text-align: center;">
				<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx; height: 20rpx;"></image>
			</view>
		</view>
		<view style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 150rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7; margin-top: 20rpx;"
		 @click="qinghongbao()">
			<image src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/20/bdf4e5785b987297f628bae1a556d01e.png"
			 mode="widthFix" style="margin-left: 30rpx; width: 90rpx; height: 90rpx;"></image>
			<view style="flex: 1; font-size: 33rpx; color: #000000;margin-left: 30rpx;">天天抢红包</view>
			<view style="font-size: 28rpx; color: #7d7d7d; margin-left: 40rpx; ">{{strhongbao}}</view>
			<view style="width: 100rpx; text-align: center;">
				<image src="../../static/ic_right.png" mode="widthFix" style="width:40rpx; height: 20rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				lists: [],
				strhongbao: '今日活动已结束'
			}
		},
		onLoad: function(e) {
			that = this;
		},
		
		onShow: function(e) {
		
			that.lists = [];
			that.strhongbao = '今日活动已结束';
			uni.showLoading({
				title: '数据加载中...'
			})

			uni.request({
				url: that.$api_url + '/red_packet/now_red_packet',
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				success: (res) => {
					console.log(res)
					uni.hideLoading();
					if (res.data.code == 1000) {
						that.lists = res.data.content;
						if (that.lists.length > 0) {
							let date = new Date('' + that.lists[0].startTime);
							// var year = date.getFullYear(),
							var month = date.getMonth() + 1;
							// var weex = date.getDay(),
							var day = date.getDate();
							var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
							var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
							// var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
							month >= 1 && month <= 9 ? (month = "0" + month) : "";
							day >= 0 && day <= 9 ? (day = "0" + day) : "";
							//当前 日期
							// currentDate = year + seperator + month + seperator + day;
							//当前 时间
							// currentTime = hour + ":" + minute + ":" + second;
							that.strhongbao = '活动时间：' + month + '-' + day + '  ' + hour + ":" + minute

							// var nowtime = (new Date()).getTime();
							// const minusDays = new Date('' + that.lists[0].startTime) - nowtime; //计算出两个日期的天数差
							// console.log('time==' + minusDays);
							// if (new Date('' + that.lists[0].endTime) > nowtime && minusDays < 3600 * 1000 * 2) {
							// 	uni.navigateTo({
							// 		url: './snatch_red_envelope?havetime=' + that.lists[0].startTime + '&id=' + that.lists[0].id
							// 	})
							// }
						}

					}else if(res.data.code == 2002){
						try {
							uni.clearStorageSync();
						} catch (e) {
							console.log('清除缓存错误：' + e);
						}
					}
				},
				fail: (res) => {
					console.log(res)
					uni.hideLoading();
				}
			});
		},
		methods: {
			qinghongbao: function(e) {
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
				
				if (that.lists.length > 0) {
					var nowtime = (new Date()).getTime();
					const minusDays = new Date('' + that.lists[0].startTime) - nowtime; //计算出两个日期的天数差
					console.log('time==' + minusDays);
					if (new Date('' + that.lists[0].endTime) > nowtime && minusDays < 3600 * 1000 * 1) {
						uni.navigateTo({
							url: './snatch_red_envelope?havetime=' + that.lists[0].startTime + '&id=' + that.lists[0].id+'&endtime='+ that.lists[0].endTime
						})
					}
				}
			},
			choujiang: function(e) {
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
				uni.navigateTo({
					url: './lucky_draw'
				})
			
			},

			getDays: function(date1, date2, time) {
				const dateTime = 1000 * time; //每一天的毫秒数
				const minusDays = (date.getTime() - date2.getTime()) > dateTime; //计算出两个日期的天数差
				return minusDays;
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
