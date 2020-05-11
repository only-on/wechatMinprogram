<template>
	<view class="content" style="position: relative;">
		<image style="width: 95%; margin-left: 2.5%; margin-top: 15rpx;  height: 300rpx;" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/c941ffae080606c63e20143f82ae7d03.png"
		 mode="widthFix"></image>
		<view style="position: absolute; width: 100%; text-align: center; display: flex; flex-direction: column; text-align: center; top: 100rpx;">
			<view style="font-size: 50rpx; color: #FFFFFF;">{{money}}</view>
			<view style="font-size: 30rpx; color: #FFFFFF;">总金额（元）</view>
		</view>
		<view style="width: 160rpx; height: 50rpx; line-height: 50rpx; text-align: center; color: #0A98D5; font-size: 20rpx; background-color: #FFFFFF; border-radius: 50rpx; position: absolute; top: 60rpx; right: 80rpx;" @click="tixian()">立即提现</view>
		<view style="width: 70%; margin-left: 15%; display: flex; flex-direction: row; height: 60rpx; align-items: center;">
			<view style="flex: 1; height: 2rpx; background-color: #b3b3b3;"></view>
			<view style=" font-size: 22rpx; color: #b3b3b3; margin-left: 20rpx; margin-right: 20rpx;">账单</view>
			<view style="flex: 1; height: 2rpx; background-color: #b3b3b3;"></view>
		</view>
		<block v-for="(item,num) in lists" :key="num">
			<view style="display: flex; flex-direction: row; width:95%; margin-left: 2.5%; height: 130rpx; border-bottom: 1rpx solid #b8b8b8;">
				<view style="flex: 1; display: flex; flex-direction: column; height: 130rpx;">
					<view style="flex: 1; width: 1rpx;"></view>
					<view style="font-size: 33rpx; color: #000000;">{{item.titelstr}}</view>
					<view style="font-size: 23rpx; color: #3a3a3a; margin-top: 10rpx; margin-bottom: 5rpx;">{{item.infostr}}</view>
				</view>
				<view style="width: 100rpx; height: 130rpx; line-height: 130rpx; text-align: center; color: #55ff7f;"> {{item.zhuangtaistr}}</view>
				<view style="flex: 1; display: flex; flex-direction: column; height: 130rpx; text-align: right;">
					<view style="flex: 1; width: 1rpx;"></view>
					<view style="font-size: 33rpx; color: #55ff7f;">{{item.money}}</view>
					<view style="font-size: 23rpx; color: #5e5e5e; margin-top: 10rpx; margin-bottom: 5rpx;">{{item.time}}</view>
				</view>
			</view>
		</block>
		<uni-load-more :status="status" :content-text="contentText" color="#007aff" iconType="spinner" />

	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	var that, timer = null;
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				status: 'more',
				page: 1,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				money: '',
				lists: []
			}
		},
		onLoad: function(e) {
			that = this;
			uni.request({
				url: that.$api_url + '/app/user_balance/get_balance',
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				// data: {
				// 	opinion: that.sendDate.content,
				// },
				success: (res) => {
					console.log(res)
					uni.hideLoading();
					if (res.data.code == 1000) {
						that.money = '' + res.data.content.balance
					}


				},
				fail: (res) => {
					console.log(res)
					uni.hideLoading();
				}
			});

			that.getnewsList();

		},
		onShow: function(res) {

		},
		onPullDownRefresh: function() {

			this.getnewsList();
		},
		onReachBottom: function() {
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				that.getmorenews();
			}, 100);
		},
		methods: {
			getmorenews: function() {
				that.status = 'loading';
				console.log('page=' + that.page);
				uni.showNavigationBarLoading();
				uni.request({
					url: that.$api_url + '/app/user_balance/get_balance_list',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						pageNum: that.page,
						pageSize: 10
					},
					success: function(res) {
						console.log(res.data);
						if (res.data.code != 1000) {
							uni.hideNavigationBarLoading();
							that.status = 'noMore';
							return false;
						}
						that.page = that.page + 1;

						for (var i = 0; i < res.data.content.length; i++) {
						var strbena = {
							"money": -0.34,
							"time": "2020-03-20 18:17",
							"withdrawalStatus": 0,
							"withdrawalType": 0,
							"inSource": 1,
							"titelstr": '',
							"zhuangtaistr": '',
							"infostr": ''
						}
						if (res.data.content.list[i].money > 0) {
							strbena.withdrawalStatus = 0
							strbena.withdrawalType = 0
							strbena.inSource = res.data.content.list[i].inSource
							if(1==res.data.content.list[i].inSource){
								strbena.titelstr = '抢红包'
								strbena.zhuangtaistr = ''
								strbena.infostr = '返现到钱包'
							}else if(0==res.data.content.list[i].inSource){
								strbena.titelstr = '团购团长返现'
								strbena.zhuangtaistr = ''
								strbena.infostr = '返现到钱包'
							}
						} else {
							strbena.withdrawalStatus = res.data.content.list[i].withdrawalStatus
							strbena.withdrawalType = res.data.content.list[i].withdrawalType
							strbena.inSource = 0
							if(0==res.data.content.list[i].withdrawalStatus){
								strbena.titelstr = '提现'
								strbena.zhuangtaistr = '审核中'
								strbena.infostr = '提现到微信'
							}else if(1==res.data.content.list[i].withdrawalStatus){
								strbena.titelstr = '提现'
								strbena.zhuangtaistr = '通过'
								strbena.infostr = '提现到微信'
							}else if(2==res.data.content.list[i].withdrawalStatus){
								strbena.titelstr = '提现'
								strbena.zhuangtaistr = '拒绝'
								strbena.infostr = '提现到微信'
							}
						}
						strbena.time = res.data.content.list[i].time
						strbena.money = res.data.content.list[i].money
							that.lists = that.lists.concat(strbena)
						}
						that.status = 'more';
						uni.hideNavigationBarLoading();
					}
				});
			},
			getnewsList: function() {
				that.page = 1;
				that.status = 'loading';
				uni.showNavigationBarLoading();
				uni.request({
					url: that.$api_url + '/app/user_balance/get_balance_list',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						pageNum: 1,
						pageSize: 10
					},
					success: function(res) {
						console.log(res);
						if (res.data.code != 1000) {
							uni.hideNavigationBarLoading();
							that.status = 'noMore';
							return false;
						}
						that.page = that.page + 1;
						// that.listsss = res.data.content;
						// console.log(that.listsss);
						that.lists = [];
						for (var i = 0; i < res.data.content.list.length; i++) {
							var strbena = {
								"money": -0.34,
								"time": "2020-03-20 18:17",
								"withdrawalStatus": 0,
								"withdrawalType": 0,
								"inSource": 1,
								"titelstr": '',
								"zhuangtaistr": '',
								"infostr": ''
							}
							if (res.data.content.list[i].money > 0) {
								strbena.withdrawalStatus = 0
								strbena.withdrawalType = 0
								strbena.inSource = res.data.content.list[i].inSource
								if(1==res.data.content.list[i].inSource){
									strbena.titelstr = '抢红包'
									strbena.zhuangtaistr = ''
									strbena.infostr = '返现到钱包'
								}else if(0==res.data.content.list[i].inSource){
									strbena.titelstr = '团购团长返现'
									strbena.zhuangtaistr = ''
									strbena.infostr = '返现到钱包'
								}
							} else {
								strbena.withdrawalStatus = res.data.content.list[i].withdrawalStatus
								strbena.withdrawalType = res.data.content.list[i].withdrawalType
								strbena.inSource = 0
								if(0==res.data.content.list[i].withdrawalStatus){
									strbena.titelstr = '提现'
									strbena.zhuangtaistr = '审核中'
									strbena.infostr = '提现到微信'
								}else if(1==res.data.content.list[i].withdrawalStatus){
									strbena.titelstr = '提现'
									strbena.zhuangtaistr = '通过'
									strbena.infostr = '提现到微信'
								}else if(2==res.data.content.list[i].withdrawalStatus){
									strbena.titelstr = '提现'
									strbena.zhuangtaistr = '拒绝'
									strbena.infostr = '提现到微信'
								}
							}
							strbena.time = res.data.content.list[i].time
							strbena.money = res.data.content.list[i].money

							that.lists = that.lists.concat(strbena)
						}
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						if(that.lists.length<10){
							that.status = 'noMore';
						}else{
							that.status = 'more';
						}
					}
				});
			},
			tixian: function(){
				uni.navigateTo({
					url:'./tixian'
				})
			}
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
