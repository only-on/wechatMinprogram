<template>
	<view class="content">
		<image style="width: 100%;" mode="widthFix" :src="img"></image>
		<view style="position: fixed; bottom: 20rpx; display: flex; flex-direction: row; margin-top: 20rpx; width: 100%;">
			<button style="flex: 1; text-align: center;width: 35%;outline: none; box-shadow: none; border: none;  border-radius: 30rpx; background-color: #ff651a; color: #ffffff; padding: 0rpx 20rpx; font-size: 30rpx; height: 80rpx; margin-left: 10%; margin-right: 10%;"
			 plain="true" open-type="share">
				分享好友
			</button>
			<button style=" flex: 1; text-align: center;width: 35%;outline: none; box-shadow: none; border: none;  border-radius: 30rpx; background-color: #ff651a; color: #ffffff; padding: 0rpx 20rpx; font-size: 30rpx; height: 80rpx; margin-right: 10%;"
			 plain="true" @click="logoTime">
				保存海报
			</button>
		</view>

		<uni-popup :show="show" type="center" :custom="true" :mask-click="false" @change="change">
			<image :src="closeurl" style="width: 50upx; height: 50upx; left: 50%; margin-left: -20upx; margin-bottom: 20upx;"
			 @click="guanbipop()"></image>
			<view style="width: 650upx; height: 500upx; position: relative;">
				<image style=" width: 650upx; height: 500upx; " src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/23/4c1ccdd55c0befb25a8196b94b446980.png"
				 mode="aspectFit"></image>
				<view style="width: 650upx;  position: absolute; top: 0upx; display: flex; flex-direction: column;">
					<view style=" color: #333333;  font-size: 35upx; margin-top: 65upx; margin-left: 7upx; margin-right: 60upx;">{{coupon1List[0].name}}</view>
					<view style="width: 650upx; display: flex; flex-direction: row; margin-top: 85upx;">
						<view style="flex: 1; height: 1uxp;"></view>
						<view style=" height: 70upx;  font-size: 20upx; color: #ff651a; font-weight: 700; padding-top: 13px;padding-right: 3px;">￥</view>
						<view style=" height: 70upx; line-height: 70upx; font-size: 40upx; color: #ff651a; font-weight: 700;">{{coupon1List[0].money}}</view>
						<view style="flex: 1; height: 1uxp;"></view>
						<view style=" height: 30upx; line-height: 30upx; font-size: 28upx; color: #333333; padding-top: 8upx;">{{coupon1List[0].name}}</view>
						<view style="flex: 1; height: 1uxp;"></view>
					</view>
				</view>
				<view style="  font-size: 25upx; position: absolute; bottom: 70upx; border-radius: 10upx; text-align: center; padding: 5upx 15upx; background-color: #ffddd1; color: #cf4331; border-radius: 10upx; width: 150upx; left: 50%; margin-left: -75upx;"
				 @click="golingqu()">立即领取</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	var that;
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniPopup,
			uniIcons
		},
		data() {
			return {
				img: '',
				shareimg: '',
				sharebiaoti: '',
				id: '',
				type: '',
				miaosha: '',
				showcoupon: 0,
				couponList: [],
				coupon1List: [],
				show: false,
				closeurl: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/23/7569e0f79866a97e4dafd1c484b8924f.png'
			}
		},
		onLoad: function(e) {
			that = this;
			that.img = e.imgurl
			that.shareimg = e.shareimg
			that.sharebiaoti = e.sharebiaoti
			that.id = e.id;
			that.type = e.type;
			that.miaosha = e.miaosha;
		},
		onShow: function(res) {
			if (that.showcoupon == 1) {
				that.showcoupon = 0
				that.coupon1List = [];
				that.couponList = [];
				uni.request({
					url: this.$api_url + '/bonus/take/share', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						authorization: uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						productId: that.id
					},
					success: res => {
						if (res.data.code == 1000) {
							console.log(res)
							if (res.data.content.bonusList != null && res.data.content.bonusList != []) {
								that.coupon1List = res.data.content.bonusList;
							}
							console.log(that.coupon1List)

							if (res.data.content.productList != null && res.data.content.productList != []) {
								that.coupon1List = that.coupon1List.concat(res.data.content.productList);
							}

							console.log(that.coupon1List)

							console.log(that.coupon1List.length)
							if (that.coupon1List.length > 0) {
								that.togglePopup();
							}
							
						}
					}
				});

			}
		},

		onShareAppMessage(res) {
			that.showcoupon = 1;
			uni.showShareMenu({
				withShareTicket: true
			})
			return {
				title: '' + that.sharebiaoti,
				imageUrl: that.shareimg,
				path: '/pages/detail/goodsinfo?id=' + this.id + '&type=' + this.type + '&miaosha=' + this.miaosha,
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
				},
				complete: function(e) {
					console.log('--- 转发结束 ---', e);
				}
			}
		},
		methods: {
			logoTime(e) {
				console.log("长按")
				uni.downloadFile({
					url: that.img, //仅为示例，并非真实的资源
					success: (res) => {
						console.log('分享海报' + res.tempFilePath);
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function(res) {
									var savedFilePath = res.savedFilePath;
									console.log('分享海报保存成功' + savedFilePath);
								}
							});
						}
					},
					fail: (e) => {
						console.log(e)
					}
				});

			},
			togglePopup() {
				this.show = true
			},
			cancel(type) {
				this.show = false
			},
			change(e) {


			},
			guanbipop() {
				this.show = false
			},
			golingqu() {
				uni.navigateTo({
					url: '../category/lingyhqshare?id=' + that.id
				})
				this.show = false
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
</style>
