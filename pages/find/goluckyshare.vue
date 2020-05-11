<template>
	<view class="content">
		<view style=" font-size: 40rpx; color: #f90000; height: 150rpx; line-height: 150rpx; background-color: #FFFFFF; margin-bottom: 1rpx; text-align: center;">您已成功参与抽奖</view>
		
		
		<view style="padding-top: 20rpx; padding-left: 30rpx; padding-right: 30rpx; height: 240rpx; background-color: #FFFFFF; display: flex; flex-direction: row;"
		 @click="choujiang()">
			<image :src="url" mode="widthFix" style="width: 180rpx; height: 180rpx; margin: 20rpx;"></image>
			<view style="flex: 1; display: flex; flex-direction: column; height: 220rpx; padding-top: 20rpx; padding-bottom: 20rpx;">
				<view style="font-size: 28rpx; color: #242424; height: 40rpx; ">{{name}}</view>
				<view style="margin-left: 10rpx; margin-right: 10rpx; margin-bottom: 10rpx; margin-top: 100rpx;">
					<progress border-radius="50" :percent="jindu" active stroke-width="5" activeColor="#ff0000" backgroundColor="#bdbdbd" show-info=true></progress>
				</view>
			</view>

		</view>
		<view style="margin-right: 20rpx; margin-top: 150rpx;  font-size: 28rpx; color: #f90000; height: 40rpx; text-align: center;">满{{peopleQuantity}}人开奖，分享给朋友参与抽奖，可加速开奖。</view>
		<button open-type="share" plain="true" style="border: none; margin-left: 30%; margin-top: 150rpx; border-radius: 50rpx; background-color: #f90000; font-size: 28rpx; color: #FFFFFF; width: 40%; height: 70rpx; line-height: 70rpx;">分享好友</button>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				raffleJournalId: 1,
				name: "",
				price: 0.1,
				prizeQuantity: 200,
				url: "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2019/05/31/cccd2c3fab3eaa1071208a5ebae1190f.png",
				peopleQuantity: 1000,
				detail: "<p><img src=\"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/product/b934449e-27f6-4b12-9ab5-a66615c8555f.jpg\"><img src=\"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/product/f9907dad-c18f-476e-bac9-c07a859ad7d7.jpg\"></p>",
				raffleJournalStatus: 1,
				isPrize: null,
				nowPeopleCount: 594,
				originalPrice: 90,
				commodityId: 46,
				jindu: 50
			}
		},
		onLoad: function(e) {
			that = this;
			that.raffleJournalId = e.id;
			that.getnewsList();
		},
		onShow: function(res) {

		},
		onShareAppMessage(res) {
			that.countnum = 0;
		// 	if (res.from === 'button') { // 来自页面内分享按钮
		
		// 		that.countnum = res.target.id;
		// 	}
		
			uni.showShareMenu({
				withShareTicket: true
			})
			return {
				title: '' + that.name,
				path: '/pages/videoshare/luckyshare?price=' + that.price + '&imageUrl=' + that.url +
					'&strtitle=' + that.name,
				imageUrl: that.url,
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
		methods: {
getnewsList: function() {

				uni.request({
					url: that.$api_url + '/raffle/raffle_journal_detail_user',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						'raffleJournalId': that.raffleJournalId
					},

					success: function(res) {
						console.log(res);
						if (res.data.code != 1000) {
							return false;
						}
						that.jindu = Math.floor(res.data.content.nowPeopleCount*100/res.data.content.peopleQuantity)
						that.name = res.data.content.name
						that.price = res.data.content.price
						that.prizeQuantity = res.data.content.prizeQuantity
						that.url = res.data.content.url
						that.peopleQuantity = res.data.content.peopleQuantity
						that.detail = res.data.content.detail
						that.raffleJournalStatus = res.data.content.raffleJournalStatus
						that.isPrize = res.data.content.isPrize
						that.nowPeopleCount = res.data.content.peopleQuantity-res.data.content.nowPeopleCount
						that.originalPrice = res.data.content.originalPrice
						that.commodityId = res.data.content.commodityId

					}
				});
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
		height: 100%;
	}
</style>
