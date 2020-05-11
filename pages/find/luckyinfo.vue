<template>
	<view class="content">
		<image style="width: 100%;" :src="url" mode="aspectFit"></image>
		<view style="width: 100%; height: 100rpx; display: flex; flex-direction: row; background-color: #ff2003; align-items: center;">
			<view style="width: auto; height:  font-size: 36rpx; color: #FFFFFF; margin-left: 20rpx;">￥{{price}}</view>
			<view style="width: auto; height:  font-size: 36rpx; color: #FFFFFF; margin-left: 20rpx; text-decoration: line-through;">￥{{originalPrice}}</view>
			<view style="flex: 1; height: 1rpx;"></view>
			<view style="width: auto;  font-size: 30rpx; color: #FFFFFF; margin-right: 20rpx;">共抽{{prizeQuantity}}件</view>
		</view>

		<view style="font-size: 30rpx; color: #242424; margin: 20rpx; padding-bottom: 30rpx;">{{name}}</view>
		<view style="font-size: 25rpx; color: #818181; margin: 20rpx; padding-bottom: 10rpx;">[全场包邮]&nbsp;&nbsp;&nbsp;[48小时发货]&nbsp;&nbsp;&nbsp;[送货到家]&nbsp;&nbsp;&nbsp;[假一赔十]</view>
		<view style="width: 100%;  display: flex; flex-direction: row; ">
			<view style="width: auto; font-size: 30rpx; color: #9c9c9c; margin-left: 20rpx; ">活动进度{{jindu}}%</view>
			<view style="flex: 1; height: 50rpx;"></view>
			<view style="width: auto; font-size: 30rpx; color: #9c9c9c; margin-right: 20rpx;">仅剩{{nowPeopleCount}}个名额</view>
		</view>
		<view style="margin-left: 20rpx; margin-right: 20rpx; margin-top: 10rpx;">
			<progress border-radius="50" :percent="jindu" active stroke-width="5" activeColor="#ff0000" backgroundColor="#bdbdbd" />
		</view>
		<view class="example-body">
			<uni-grid :column="4" :show-border="false" :square="false" @change="changewenda">
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/24/4be40b5654294e641711898802ba7cac.png"
					 mode="aspectFill" />
					<text class="text">参与抽奖</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/24/8a1b5e430ef829de5872ae966274e53b.png"
					 mode="aspectFill" />
					<text class="text">支付金额</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/24/f1d24d0ae322c1b44ef1073462cf4087.png"
					 mode="aspectFill" />
					<text class="text">推荐好友</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/24/ea97c34cda79acc2c00d2bea4c05d711.png"
					 mode="aspectFill" />
					<text class="text">人满开将</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view style="width: 100%; height: 80rpx; background-color: #FFFFFF; font-size: 26rpx; line-height: 80rpx; padding-left: 20rpx;  margin-top: 12rpx; ">商品详情</view>
		<view class="<strong></strong>uni-common-mt" style="background:#FFF; padding:20rpx;">
			<u-parse :content="detail" @preview="preview" @navigate="navigate"></u-parse>
		</view>
		<view style="width: 100%; height: 100rpx;"></view>
		<view style="width: 100%; height: 100rpx; line-height: 100rpx; text-align: center; background-color: #ff3108; font-size: 36rpx; color: #FFFFFF;position: fixed; bottom: 0;" @click="gobuy()">立即抢购</view>
	</view>
</template>

<script>
	var that;
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uParse from '@/components/gaoyia-parse/parse.vue';
	export default {
		components: {
			uParse,
			uniGrid,
			uniGridItem
		},
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
		methods: {
			preview(src, e) {
				// do something
				console.log(src);
			},
			navigate(href, e) {
				console.log(href);
				// do something
			},
			gobuy: function(){
				uni.navigateTo({
					url: '/pages/find/luckyorder?id=' + that.raffleJournalId
				});
			},
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
		background-color: #FFFFFF;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;

	}

	.example-body {
		padding: 20rpx;
		background: #fff
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #fff
	}

	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 26upx;
		margin-top: 10upx;
		color: #999;
	}
</style>
