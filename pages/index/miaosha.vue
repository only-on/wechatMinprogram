<template>
	<view class="content" style="position: relative;">
		<view style="height: 200rpx; width: 100%; overflow: hidden;">
			<image src="http://hu-kao.oss-cn-hangzhou.aliyuncs.com/upload/20200317/2020-03-17_1584384915_5e6fcb93cb31d.png" mode="widthFix"
			 style="width: 100%; "></image>
		</view>
		<block v-for="(item,num) in lists" :key="num">
			<view style="margin-top: 20rpx; margin-left: 30rpx; margin-right: 30rpx; height: 220rpx; border-radius: 20rpx; background-color: #FFFFFF; display: flex; flex-direction: row;">
				<image :src="item.imageUrl" mode="widthFix" style="width: 180rpx; height: 180rpx; margin: 20rpx;"></image>
				<view style="flex: 1; display: flex; flex-direction: column; height: 220rpx; padding-top: 20rpx; padding-bottom: 20rpx;">
					<view style="font-size: 30rpx; color: #000; height: 80rpx; line-height: 40rpx; font-weight: 700;">{{item.name}}</view>
					<view style="display: flex; flex-direction: row;  align-items: flex-end;">
						<view style="font-size: 22rpx; color: #f90000; font-weight: 600; flex: 1; "></view>

						<view style="font-size: 22rpx; color: #f90000; padding-right: 10rpx;">结束时间：{{item.endTime}}</view>
					</view>
					<view style=" display: flex; flex-direction: row; margin-top: 15rpx;">
						<view style="font-size: 30rpx; color: #f90000; ">￥{{item.price}}</view>
						<view style="flex: 1; height: 30rpx; "></view>

						<button v-if="0==item.dianji" :id="num" @click="fenxiang(item,num)" plain="true" style="border: none; margin-right: 20rpx;  border-radius: 50rpx; background-color: #f90000; font-size: 22rpx; color: #FFFFFF; width: 150rpx; height: 40rpx; line-height: 40rpx;">{{item.dianjistr}}</button>
						<view v-if="1==item.dianji" style="margin-right: 20rpx;  border-radius: 50rpx; background-color: #f90000; font-size: 22rpx; color: #FFFFFF; height: 40rpx;width: 150rpx; text-align: center;"
						 @click="choujiang(num)">{{item.dianjistr}}</view>
					</view>
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
				lists: [],
				countnum: 0
			}
		},
		onLoad: function(e) {
			that = this;
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
			fenxiang(item, pos) {

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
				// that.addshare();
				uni.showLoading({
					title: '数据生成中...'
				})
				that.countnum = pos;
				uni.request({
					url: that.$api_url + '/raffle/add_share',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						raffleJournalId: that.lists[that.countnum].id
					},
					success: function(res) {
						console.log(res);
						setTimeout(function() {
							that.lists[that.countnum].dianji = 1;
							that.lists[that.countnum].dianjistr = '立即秒杀';
						}, 1000 * 1)
						uni.request({
							url: that.$api_url + '/user/createPoster', //仅为示例，并非真实接口地址。
							method: 'POST',
							header: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'authorization': uni.getStorageSync('authorization') //自定义请求头信息
							},
							data: {
								'productId': '',
								'type': '',
								'secondKillId': item.secondKillId,
								'secondKillTimeId': item.secondKillTimeId,
								'path': 'pages/detail/goodsinfo?id=' + item.secondKillId + '&type=' + item.secondKillTimeId + '&miaosha=1'
							},
							success: res => {

								// url: '/pages/detail/goodsinfo?id=' + that.lists[e].secondKillId + '&type=' + that.lists[e].secondKillTimeId +
								// 	'&miaosha=1'


								console.log(res)
								if (res.data.code == 1000) {
									var appimage = res.data.content;
									uni.navigateTo({
										url: '/pages/videoshare/new_file?imgurl=' + appimage + '&shareimg=' + item.imageUrl +
											'&sharebiaoti=' + item.name + '(抢购价：￥' + item.price + ')&type=' + item.secondKillTimeId + '&id=' +
											item.secondKillId + '&miaosha=1'
									});
								}
							},
							complete: function(e) {

								uni.hideLoading();

							}
						});
					}
				});





			},
			getmorenews: function() {
				that.status = 'loading';
				console.log('page=' + that.page);
				uni.showNavigationBarLoading();
				uni.request({
					url: that.$api_url + '/second_kill/list',
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
						if (res.data.content.length < 1) {
							uni.hideNavigationBarLoading();
							that.status = 'noMore';
							return false;
						}
						that.page = that.page + 1;


						for (var i = 0; i < res.data.content.length; i++) {
							for (var i = 0; i < res.data.content.length; i++) {
								var strbena = {
									"id": 17,
									"name": "",
									"imageUrl": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/05/31/cccd2c3fab3eaa1071208a5ebae1190f.png",
									"price": 0.1,
									"count": 1,
									"productId": 145,
									"commodityId": 46,
									"shareCount": null,
									"raffleId": null,
									"dianji": 0,
									endTime:'',
									"dianjistr": '参与秒杀'
								}
								strbena.id = res.data.content[i].id
								strbena.name = res.data.content[i].name
								strbena.imageUrl = res.data.content[i].url
								strbena.price = res.data.content[i].price
								strbena.count = res.data.content[i].count
								strbena.productId = res.data.content[i].productId
								strbena.commodityId = res.data.content[i].commodityId
								strbena.shareCount = res.data.content[i].shareCount
								strbena.raffleId = res.data.content[i].raffleId
								strbena.endTime = res.data.content[i].endTime
								strbena.secondKillId = res.data.content[i].secondKillId
								strbena.dianji = 0
								strbena.dianjistr = '参与秒杀'
								that.lists = that.lists.concat(strbena)
							}
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
					url: that.$api_url + '/second_kill/list',
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
						for (var i = 0; i < res.data.content.length; i++) {
							var strbena = {
								"id": 17,
								"name": "",
								"imageUrl": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/05/31/cccd2c3fab3eaa1071208a5ebae1190f.png",
								"price": 0.1,
								"count": 1,
								"productId": 145,
								"commodityId": 46,
								"shareCount": null,
								"raffleId": null,
								"dianji": 0,
								endTime:'',
								"dianjistr": '参与秒杀'
							}
							strbena.id = res.data.content[i].id
							strbena.name = res.data.content[i].title
							strbena.imageUrl = res.data.content[i].url
							strbena.price = res.data.content[i].price
							strbena.count = res.data.content[i].count
							strbena.productId = res.data.content[i].productId
							strbena.commodityId = res.data.content[i].commodityId
							strbena.shareCount = res.data.content[i].shareCount
							strbena.raffleId = res.data.content[i].raffleId
							strbena.endTime = res.data.content[i].endTime
							strbena.type = res.data.content[i].type
							strbena.secondKillTimeId = res.data.content[i].secondKillTimeId
							strbena.secondKillId = res.data.content[i].secondKillId
							strbena.dianji = 0
							strbena.dianjistr = '参与秒杀'
							that.lists = that.lists.concat(strbena)
						}
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						if (that.lists.length < 10) {
							that.status = 'noMore';
						} else {
							that.status = 'more';
						}
					}
				});
			},
			addshare: function() {
				uni.request({
					url: that.$api_url + '/raffle/add_share',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						raffleJournalId: that.lists[that.countnum].id
					},
					success: function(res) {
						console.log(res);
						setTimeout(function() {
							that.lists[that.countnum].dianji = 1;
							that.lists[that.countnum].dianjistr = '立即秒杀';
						}, 1000 * 3)
					}
				});
			},
			choujiang: function(e) {
				console.log(that.lists[e]);
				if (0 == that.lists[e].dianji) {

				} else {
					uni.navigateTo({
						url: '/pages/detail/goodsinfo?id=' + that.lists[e].secondKillId + '&type=' + that.lists[e].secondKillTimeId +
							'&miaosha=1'
					});
				}

			},
			wodechoujiang: function(e) {
				uni.navigateTo({
					url: './myluckylist'
				})
			},
			shijianzhuanghuan(){
				var startTime = new Date(res.content.secondsKillVO.startTime);
				var startTimeHours = startTime.getHours();
				startTimeHours = startTimeHours < 10 ? "0" + startTimeHours : startTimeHours;
				var startTimeMinutes = startTime.getMinutes();
				startTimeMinutes = startTimeMinutes < 10 ? "0" + startTimeMinutes : startTimeMinutes;
				that.kaiqiang_time = startTimeHours + ":" + startTimeMinutes;
				
				var endTime = new Date(res.content.secondsKillVO.endTime);
				var endTimeHours = endTime.getHours();
				var endTimeMinutes = endTime.getMinutes();
				that.kaiqiang_endtime = endTimeHours + ":" + endTimeMinutes;
				
				that.intervalID = setInterval(function() {
				
					var new_date = new Date(); //新建一个日期对象，默认现在的时间
					var difftime = (startTime - new_date) / 1000; //计算时间差,并把毫秒转换成秒
					that.miaosha_show = true;
					if (difftime > 0) {
						that.miaosha_show = true;
					} else {
						clearInterval(that.intervalID)
						that.juli = "距结束"
						// that.miaosha_show=false;
						that.intervalID2 = setInterval(function() {
							var new_date = new Date(); //新建一个日期对象，默认现在的时间X
							var difftime = (endTime - new_date) / 1000; //计算时间差,并把毫秒转换成秒
							if (difftime > 0) {
								that.miaosha_show = true;
							} else {
								clearInterval(that.intervalID2)
								that.miaosha_show = false;
							}
							var days = parseInt(difftime / 86400); // 天  24*60*60*1000 
							var hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数 
							var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
							var seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数
							that.hours = hours < 10 ? "0" + hours : hours;
							that.minutes = minutes < 10 ? "0" + minutes : minutes;
							that.second = seconds < 10 ? "0" + seconds : seconds;
						}, 1000)
					}
					var days = parseInt(difftime / 86400); // 天  24*60*60*1000 
					var hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数 
					var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
					var seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数
					that.hours = hours < 10 ? "0" + hours : hours;
					that.minutes = minutes < 10 ? "0" + minutes : minutes;
					that.second = seconds < 10 ? "0" + seconds : seconds;
				}, 1000)
			}

		}

	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.content {
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
