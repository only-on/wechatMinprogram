<template>
	<view class="content">
		<block v-for="(item,num) in lists" :key="num">
			<view style="margin-top: 20rpx; margin-left: 30rpx; margin-right: 30rpx; height: 220rpx; border-radius: 20rpx; background-color: #FFFFFF; display: flex; flex-direction: row;"
			 @click="choujiang(num)">
				<image :src="item.url" mode="scaleToFill" style="width: 180rpx; height: 180rpx; margin: 20rpx;"></image>
				<view style="flex: 1; display: flex; flex-direction: column; height: 220rpx; padding-top: 20rpx; padding-bottom: 20rpx;">
					<view style="font-size: 28rpx; color: #242424; height: 40rpx; ">{{item.name}}</view>
					<view :class="item.isPrize==1? 'lvse':'huise'">{{item.info}}</view>
					<view style="display: flex; flex-direction: row; margin-bottom: 20rpx; height: 110rpx; align-items: flex-end;">
						<view style="font-size: 30rpx; color: #f90000; ">{{item.dianjistr}}</view>
						<view style="font-size: 20rpx; color: #999999; margin-left: 10rpx; padding-bottom: 8rpx;"></view>
					</view>
				</view>
				<view v-if="1==item.isPrize" style="margin-right: 20rpx; margin-top: 150rpx; border-radius: 50rpx; background-color: #f90000; font-size: 24rpx; color: #FFFFFF; height: 40rpx;width: 150rpx; text-align: center;">中奖详情</view>

			</view>
		</block>

		<xw-empty :isShow="money" text="暂无抽奖数据" textColor="#777777"></xw-empty>
	</view>
</template>

<script>
	var that;
	import xwEmpty from '@/components/xw-empty/xw-empty.vue'
	export default {
		components: {
			xwEmpty
		},
		data() {
			return {

				money: true,
				lists: [],
				countnum: 0,
				testlist: [{
						"raffleJournalId": 21,
						"name": "",
						"url": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/05/31/cccd2c3fab3eaa1071208a5ebae1190f.png",
						"raffleJournalStatus": 3,
						"isPrize": 0,
						"orderStatus": null
					},
					{
						"raffleJournalId": 17,
						"name": "",
						"url": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/05/31/cccd2c3fab3eaa1071208a5ebae1190f.png",
						"raffleJournalStatus": 3,
						"isPrize": 0,
						"orderStatus": 8
					},
					{
						"raffleJournalId": 15,
						"name": "",
						"url": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/05/31/cccd2c3fab3eaa1071208a5ebae1190f.png",
						"raffleJournalStatus": 3,
						"isPrize": 1,
						"orderStatus": 1
					},
					{
						"raffleJournalId": 6,
						"name": "好运抽出来",
						"url": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/03/15/c81622256b7a36f6300a27ad6dd25488.png",
						"raffleJournalStatus": 3,
						"isPrize": 1,
						"orderStatus": 1
					},
					{
						"raffleJournalId": 1,
						"name": "好运抽抽看",
						"url": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/03/15/0bebe05a3746107a7878dda623bf1c2f.jpg",
						"raffleJournalStatus": 3,
						"isPrize": 0,
						"orderStatus": null
					}
				]
			}
		},
		onLoad: function(e) {
			that = this;
			that.getnewsList();
		},
		onShow: function(res) {

		},


		methods: {

			getnewsList: function() {

				uni.request({
					url: that.$api_url + '/raffle/raffle_journal_list',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},

					success: function(res) {
						console.log(res);
						if (res.data.code != 1000) {
							return false;
						}

						that.lists = [];
						that.testlist = res.data.content;
						for (var i = 0; i < that.testlist.length; i++) {
							var strbena = {
								"raffleJournalId": 17,
								"name": "",
								"url": "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/05/31/cccd2c3fab3eaa1071208a5ebae1190f.png",
								"raffleJournalStatus": 1,
								"isPrize": 1,
								"orderStatus": 1,
								"info": "请在活动期间尽快付款参与",
								"dianjistr": '分享抽奖'
							}
							strbena.raffleJournalId = that.testlist[i].raffleJournalId
							strbena.name = that.testlist[i].name
							strbena.url = that.testlist[i].url
							strbena.raffleJournalStatus = that.testlist[i].raffleJournalStatus
							strbena.isPrize = that.testlist[i].isPrize
							strbena.orderStatus = that.testlist[i].orderStatus
							if (3 == that.testlist[i].raffleJournalStatus && null != that.testlist[i].orderStatus) {
								if (1 == that.testlist[i].isPrize) {
									strbena.dianjistr = '已抽中'
									strbena.info = '恭喜你中奖啦！'
								} else {
									strbena.dianjistr = '退款将自动返回原账户'
									strbena.info = '很遗憾，未中奖！'
								}
							} else {
								if (null == that.testlist[i].orderStatus) {
									// strbena.dianjistr = '待付款'
									// strbena.info = '请在活动期间尽快付款参与'
									strbena.dianjistr = '退款将自动返回原账户'
									strbena.info = '很遗憾，未中奖！'
								} else {
									strbena.dianjistr = '待开奖'
									strbena.info = '人满开奖，快去分享好友吧'
								}
							}
							that.lists = that.lists.concat(strbena)
						}
						if(that.lists.length != 0 ){
							that.money = false
						}
					}
				});
			},
			choujiang: function(e) {
				if (1 == that.lists[e].isPrize) {
					//中奖
					uni.navigateTo({
						url: './luckyopen?imgurl=' + that.lists[e].url
					})
				} else if (3 != that.lists[e].raffleJournalStatus) {
					//未参与
					uni.navigateTo({
						url: './goluckyshare?id=' + that.lists[e].raffleJournalId
					})
				}
				// else {
				// 	//查看详情
				// 	uni.navigateTo({
				// 		url: './luckyinfo?id='+that.lists[e].raffleJournalId
				// 	})
				// }

			}

		}

	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.content {
		/* display: flex; */
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.huise {
		font-size: 25rpx;
		color: #686868;
		height: 30rpx;
		margin-top: 10rpx;
	}

	.lvse {
		font-size: 25rpx;
		color: #55ff7f;
		height: 30rpx;
		margin-top: 10rpx;
	}
</style>
