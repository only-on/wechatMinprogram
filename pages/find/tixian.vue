<template>
	<view class="content">
		<view style="display: flex; flex-direction: row; background-color: #FFFFFF; width: 100%; height: 100rpx; text-align: center; align-items: center;">
			<view style="font-size: 28rpx; color: #838383; margin-left: 20rpx; margin-right: 40rpx;">当前钱包余额</view>
			<view style="font-size: 36rpx; color: #0d0d0d;">{{money}}</view>
		</view>
		<view style="width: 100%; padding-top: 30rpx; padding-left: 20rpx; padding-bottom: 20rpx; margin-top: 10rpx; font-size: 28rpx; color: #242424; background-color: #FFFFFF;">提现方式</view>
		<view style="display: flex; flex-direction: row; width: 100%;   background-color: #FFFFFF;">
			<image src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/87d2851d349d3d8291d935ffb1ff6bf6.png"
			 mode="widthFix" style="flex: 1; padding-left: 20rpx;"></image>
			<view style="width: 50rpx; height: 1rpx;"></view>
			<view style="flex: 1; padding-right: 20rpx;"></view>
		</view>
		<view style="width: 100%; padding-top: 30rpx; padding-left: 20rpx; padding-bottom: 20rpx; font-size: 28rpx; color: #242424; background-color: #FFFFFF;">提现金额</view>
		<view style="display: flex; flex-direction: row; width: 100%;   background-color: #FFFFFF;">
			<view :class="zhuangtai==1? 'liangse1':'anse1'" @click="zhangtaiset(1,10)">10元</view>
			<view style="width: 50rpx; height: 1rpx;"></view>
			<view :class="zhuangtai==2? 'liangse':'anse'" @click="zhangtaiset(2,50)">50元</view>
		</view>
		<view style="display: flex; flex-direction: row; width: 100%; padding-top: 16rpx; padding-bottom: 18rpx; background-color: #FFFFFF;">
			<view :class="zhuangtai==3? 'liangse1':'anse1'" @click="zhangtaiset(3,100)">100元</view>
			<view style="width: 50rpx; height: 1rpx;"></view>
			<view :class="zhuangtai==4? 'liangse':'anse'" @click="zhangtaiset(4,500)">500元</view>
		</view>
		<view style="display: flex; flex-direction: row; background-color: #FFFFFF; width: 100%; height: 100rpx; text-align: center; align-items: center; margin-top: 2rpx;">
			<view style="font-size: 28rpx; color: #838383; margin-left: 20rpx; margin-right: 40rpx;">提现金额</view>
			<input :value="inputValue" style="font-size: 33rpx; color: #0d0d0d; height: 100rpx; width: 250rpx;" type="number"
			 placeholder="请输入提现金额" @input="onKeyInput" />
		</view>
		<view style="width: 100%; padding-left: 20rpx; padding-top: 30rpx; padding-right: 20rpx; padding-bottom: 60rpx; font-size: 28rpx; color: #a3a3a3; background-color: #FFFFFF; margin-top: 15rpx;">
			注意事项<br />1.请及时关注钱包页面提现状态。<br />2.提现到账查询：微信-我-钱包-零钱-零钱明细查看。
		</view>
		<view style="width: 60%; height: 80rpx; margin-left: 20%; border-radius: 50rpx; background-color: #fcb412; line-height: 80rpx; text-align: center; color: #FFFFFF; font-size: 30rpx; margin-top: 100rpx;"
		 @click="lijitixian()">立即提现</view>
		<!-- 支付插件 -->
		<pay :qian="inputValue" :show="payShow" @close='payCloseFunc' ></pay>
	</view>
</template>

<script>
	var that;
	import pay from '@/components/payPassword/pay_Password.vue'
	export default {
		components: {
			pay
		},
		data() {
			return {
				zhuangtai: 0,
				inputValue: '',
				payShow: false,
				money:'',
				minmoney:0
			}
		},
		onLoad: function(e) {
			that = this;
			that.getmoney();
		},
		onShow: function(res) {

		},
		methods: {
			zhangtaiset: function(e, money) {
				that.zhuangtai = e
				that.inputValue = '' + money
			},
			onKeyInput: function(event) {
				// var this_ = event.target.value;
				// this_.val(this_.val().replace(/[^0-9-]+/, '')); //input标签只能输入数字并且第一位不能为0
				// if (this_.val().length == 1) {
				// 	this_.val() == '0' ? this_.val(' ') : this_.val();
				// }
				// that.inputValue = this_.val();
				that.inputValue = event.target.value
			},
			lijitixian: function(e) {
				if(that.inputValue==''||that.inputValue<that.minmoney){
					uni.showModal({
					    title: '提示',
					    content: '输入金额须大于等于'+that.minmoney+'元',
						showCancel:false
					});
					return
				}
				if(that.money<that.inputValue){
					uni.showModal({
					    title: '提示',
					    content: '输入金额大于可提现金额',
						showCancel:false
					});
					return
				}
				uni.request({
					url: that.$api_url + '/app/user_balance/withdrawal_cash_code',
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
							this.payShow = true
						}
					},
					fail: (res) => {
						console.log(res)
						uni.hideLoading();
					}
				});
			},
			payCloseFunc: function() {
				this.payShow = false
			},
			getmoney: function() {
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
							that.minmoney = res.data.content.withdrawalLimit
						}


					},
					fail: (res) => {
						console.log(res)
						uni.hideLoading();
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
	}

	.liangse {
		flex: 1;
		margin-right: 20rpx;
		border-radius: 10rpx;
		border: 1rpx solid #fcb412;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #fcb412;
		font-size: 33rpx;
	}

	.anse {
		flex: 1;
		margin-right: 20rpx;
		border-radius: 10rpx;
		border: 1rpx solid #9d9d9d;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #313131;
		font-size: 33rpx;
	}

	.liangse1 {
		flex: 1;
		margin-left: 20rpx;
		border-radius: 10rpx;
		border: 1rpx solid #fcb412;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #fcb412;
		font-size: 33rpx;
	}

	.anse1 {
		flex: 1;
		margin-left: 20rpx;
		border-radius: 10rpx;
		border: 1rpx solid #9d9d9d;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #313131;
		font-size: 33rpx;
	}
</style>
