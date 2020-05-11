<template>
	<view class="content" style="position: relative;">
		<block v-for="(item,num) in lists" :key="num">
			<view style="margin-top: 20rpx; margin-left: 30rpx; margin-right: 30rpx; height: 220rpx; border-radius: 20rpx; background-color: #FFFFFF; display: flex; flex-direction: row;">
				<image :src="item.imageUrl" mode="widthFix" style="width: 180rpx; height: 180rpx; margin: 20rpx;"></image>
				<view style="flex: 1; display: flex; flex-direction: column; height: 220rpx; padding-top: 20rpx; padding-bottom: 20rpx;">
					<view style="font-size: 28rpx; color: #242424; height: 40rpx; ">{{item.name}}</view>
					<view style="font-size: 22rpx; color: #f90000; height: 30rpx; margin-top: 10rpx;">送货到家，不中退款</view>
					<view style="display: flex; flex-direction: row; margin-bottom: 20rpx; height: 110rpx; align-items: flex-end;">
						<view style="font-size: 30rpx; color: #f90000; ">￥{{item.price}}</view>
						<view style="font-size: 20rpx; color: #999999; margin-left: 10rpx; padding-bottom: 8rpx;">已抽{{item.count}}件</view>
					</view>
				</view>
				<button v-if="0==item.dianji" :id="num" open-type="share" plain="true" style="border: none; margin-right: 20rpx; margin-top: 150rpx; border-radius: 50rpx; background-color: #f90000; font-size: 24rpx; color: #FFFFFF; width: 150rpx; height: 40rpx; line-height: 40rpx;">{{item.dianjistr}}</button>
				<view v-if="1==item.dianji" style="margin-right: 20rpx; margin-top: 150rpx; border-radius: 50rpx; background-color: #f90000; font-size: 24rpx; color: #FFFFFF; height: 40rpx;width: 150rpx; text-align: center;"
				 @click="choujiang(num)">{{item.dianjistr}}</view>

			</view>
		</block>
		<uni-load-more :status="status" :content-text="contentText" color="#007aff" iconType="spinner" />

		<image style="width: 80rpx; height: 80rpx; position: absolute; top: 85%; right: 50rpx;" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/28/3063b78e2e4e367226768cdc33a6734e.png" @click="wodechoujiang()">
		</image>
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
		onShareAppMessage(res) {
			that.countnum = 0;
			if (res.from === 'button') { // 来自页面内分享按钮
				
				that.countnum = res.target.id;
			}
			console.log('动态id='+that.countnum)
			that.addshare();
			uni.showShareMenu({
				withShareTicket: true
			})
			return {
				title: '' + that.lists[this.countnum].name,
				path: '/pages/videoshare/luckyshare?price=' + that.lists[this.countnum].price + '&imageUrl=' + that.lists[this.countnum]
					.imageUrl +
					'&strtitle=' + that.lists[this.countnum].name,
				imageUrl: that.lists[this.countnum].imageUrl,
				success: res => {
					console.log('--- 转发回调 ---', res);
					//onShareAppMessage回调的shareTickets，如果没有，就说明不是转发到群聊的
					console.log('--- shareTickets ---', res.shareTickets);
					//转发到群里的才会有shareTickets
					if (res.shareTickets && res.shareTickets[0]) {
						//获取转发的详细信息
						uni.getShareInfo({
							shareTicket: res.shareTickets[0],
							success: res => {
								console.log('--- 错误信息 ---', res.errMsg);
								console.log('--- 包括敏感数据在内的完整转发信息的加密数据 ---', res.encryptedData);
								console.log('--- 错误信息 ---', res.iv);
							},
							fail: error => {
								console.log('--- getShareInfo fail ---', error);
							}
						})
					}
				},
				fail: () => {
					console.log('--- 转发失败 ---', path);
				}
			}
			
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
					url: that.$api_url + '/raffle/list',
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
									"dianjistr": '分享抽奖'
								}
								strbena.id = res.data.content[i].id
								strbena.name = res.data.content[i].name
								strbena.imageUrl = res.data.content[i].imageUrl
								strbena.price = res.data.content[i].price
								strbena.count = res.data.content[i].count
								strbena.productId = res.data.content[i].productId
								strbena.commodityId = res.data.content[i].commodityId
								strbena.shareCount = res.data.content[i].shareCount
								strbena.raffleId = res.data.content[i].raffleId
								strbena.dianji = 0
								strbena.dianjistr = '分享抽奖'
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
					url: that.$api_url + '/raffle/list',
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
								"dianjistr": '分享抽奖'
							}
							strbena.id = res.data.content[i].id
							strbena.name = res.data.content[i].name
							strbena.imageUrl = res.data.content[i].imageUrl
							strbena.price = res.data.content[i].price
							strbena.count = res.data.content[i].count
							strbena.productId = res.data.content[i].productId
							strbena.commodityId = res.data.content[i].commodityId
							strbena.shareCount = res.data.content[i].shareCount
							strbena.raffleId = res.data.content[i].raffleId
							strbena.dianji = 0
							strbena.dianjistr = '分享抽奖'
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
					setTimeout(function(){
						that.lists[that.countnum].dianji=1;
						that.lists[that.countnum].dianjistr='立即抽奖';
					},1000*3)
					}
				});
			},
			choujiang: function(e) {
				if (0 == that.lists[e].dianji) {

				} else {
					uni.navigateTo({
						url: './luckyinfo?id='+that.lists[e].id
					})
				}

			},
			wodechoujiang: function(e){
				uni.navigateTo({
					url: './myluckylist'
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
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
