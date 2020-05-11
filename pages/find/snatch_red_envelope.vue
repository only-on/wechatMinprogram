<template>
	<view class="content" style="position: relative; align-items: center;">
		<image style="width: 100%; height: 100%;" :src="tupian2">

		</image>
		<view v-if="havetime>0" style="position: absolute; width: 100%; text-align: center; top: 40%; font-size: 42rpx; color: #3B4144;">
			<view style=" font-size: 25rpx; color: #3B4144; ">
				开抢倒计时...
			</view>
			<view style="margin-top: 20rpx; font-size: 50rpx; color: #d00000;">
				{{strtime}}
			</view>
		</view>

		<view v-if="havetime>0" style="position: absolute; width: 100%; text-align: center; top: 70%; font-size: 42rpx; color: #3B4144;">
			<view style=" font-size: 23rpx; color: #f0f0f0; ">
				你离红包只差一个时间点~
			</view>
			<view style="margin-top: 35rpx; font-size: 32rpx; color: #fafafa; padding: 20rpx;" @click="jilu()">
				查看红包记录 >>
			</view>
		</view>
		<image v-if="state==1" :src="tupian4" style="width: 300rpx; height: 300rpx; position: absolute; top: 43%;" @click="openred()"></image>

		<view v-if="state==2" style="position: absolute;  text-align: center; top: 40%; font-size: 42rpx; color: #3B4144;">
			<view style=" font-size: 50rpx; color: #f75d45; ">
				￥ {{money}}
			</view>
			<view style=" font-size: 28rpx; color: #ffffff; height: 70rpx; line-height: 70rpx; width: 300rpx; margin-top: 30rpx; background-color: #f75d45; border-radius: 50rpx;"
			 @click="jilu()">
				前往钱包提现
			</view>
		</view>
		<view v-if="state==2" style="position: absolute; width: 100%; text-align: center; top: 70%; font-size: 42rpx; color: #3B4144;">
			<view style=" font-size: 23rpx; color: #f0f0f0; ">
				本次红包已领取
			</view>
			<view style="margin-top: 35rpx; font-size: 32rpx; color: #fafafa; padding: 20rpx;" @click="jilu()">
				查看红包记录 >>
			</view>
		</view>


		<view v-if="state==3" style="position: absolute; width: 100%; text-align: center; top: 40%; font-size: 42rpx; color: #3B4144;">
			<view style=" font-size: 25rpx; color: #3B4144; ">
			</view>
			<view style="margin-top: 20rpx; font-size: 30rpx; color: #d00000;">
				本次活动已结束！<br />请留意下次活动开始时间。
			</view>
		</view>

		<view v-if="state==3" style="position: absolute; width: 100%; text-align: center; top: 70%; font-size: 42rpx; color: #3B4144;">
			<view style=" font-size: 23rpx; color: #f0f0f0; ">
				你离红包只差一个时间点~
			</view>
			<view style="margin-top: 35rpx; font-size: 32rpx; color: #fafafa; padding: 20rpx;" @click="jilu()">
				查看红包记录 >>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				endtime:0,
				intervalID: 0,
				money: '',
				state: 0,
				alltime: '',
				havetime: 0,
				redid: 0,
				strtime: '',
				tupian1: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/46a9580491bab41c3c7135f82be4a5b2.jpg',
				tupian2: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/bf6952399d86e004b3dd683b6c23073c.jpg',
				tupian3: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/7a220e67a85ba4418264d32a50655a54.jpg',
				tupian4: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/488cb264891cedbab6cbbc043871516f.png'
			}
		},
		onLoad: function(e) {
			that = this;
			that.alltime = e.havetime;
			that.endtime = e.endtime;
			that.redid = e.id;
			var nowtime = (new Date()).getTime();
			that.havetime = Math.floor((new Date('' + that.alltime) - nowtime) / 1000); //计算出两个日期差
			that.opentime = Math.floor((new Date('' + that.endtime) - nowtime) / 1000); //计算出两个日期差
			if (that.havetime > 0) {
				that.intervalID = setInterval(function() {
					that.havetime--;
					if (that.havetime > 0) {
						var hour = Math.floor(that.havetime / 60);
						var minus = that.havetime % 60;
						hour = hour < 10 ? "0" + hour : hour;
						minus = minus < 10 ? "0" + minus : minus;
						that.strtime = hour + ':' + minus
					} else {
						that.tupian2 = that.tupian1;
						that.state = 1;
						clearInterval(that.intervalID)
					}
				}, 1000)
			}else if(that.opentime>0){
				that.tupian2 = that.tupian1;
				that.state = 1;
			} else {
				that.state = 3;
			}

		},
		onUnload() {
			console.log('页面卸载')
			clearInterval(that.intervalID)
		},
		onBackPress() {
			console.log('页面返回...')
		},
		methods: {
			jilu: function(res) {
				//红包记录
				uni.navigateTo({
					url:'./wallet'
				})
			},
			openred: function(res) {
				//打开红包
				uni.showLoading({
					title: '红包开启中...'
				})

				uni.request({
					url: that.$api_url + '/red_packet/garb',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						redPacketId: that.redid + ''
					},

					success: (res) => {
						console.log(res)
						// var json = JSON.parse(res.data)
						uni.hideLoading();
						if (res.data.code == 1000) {
							that.tupian2 = that.tupian3;
							that.state = 2;
							that.money = '' + res.data.content;
						}else if(res.data.code == 4041){
							uni.showModal({
								content:res.data.message,
								cancelText:'返回',
								confirmText:'去查看',
								success:function(res){
									if(res.confirm){
										uni.redirectTo({
											url:'./wallet'
										})
									}else if(res.cancel){
										uni.navigateBack({
											delta:1
										})
									}
								}
							})
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
		width: 100%;
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
