<template>
	<view class="content">

		<view class="example-title">评价星级</view>
		<view class="example-body">
			<image style="width: 30upx; height: 30upx;" :src="xing>0? strurl1:strurl2" @click="xingji(1)"></image>
			<image style="width: 30upx; height: 30upx; margin-left: 20upx; margin-right: 20upx;" :src="xing>1? strurl1:strurl2" @click="xingji(2)"></image>
			<image style="width: 30upx; height: 30upx;" :src="xing>2? strurl1:strurl2" @click="xingji(3)"></image>
			<image style="width: 30upx; height: 30upx; margin-left: 20upx; margin-right: 20upx;" :src="xing>3? strurl1:strurl2" @click="xingji(4)"></image>
			<image style="width: 30upx; height: 30upx;" :src="xing>4? strurl1:strurl2" @click="xingji(5)"></image>
		</view>
		
		 <textarea style="width: 80%; margin-left: 10%; border: 1upx solid #aaaaaa; background-color: #FFFFFF; border-radius: 10upx; margin-top: 20upx;" placeholder="请输入评价内容" v-model="info"/>
		 
		 <view style="margin-left: 20%; margin-top: 100upx; width: 60%; height: 70upx; line-height: 70upx; background-color: #65c186; color: #FFFFFF; border-radius: 50upx;  text-align: center; font-size: 30upx;" @click="tijiao">
		 	提交
		 </view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniRate,
		},
		data() {
			return {
				title: 'Hello',
				id: '',
				xing:3,
				info:'',
				strurl1:'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/17/acbf17e78b8b81f8dcb08bb83c84a7d0.png',
				strurl2:'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/17/16d9303112f4a377ab6d6b12eeab7145.png',
				
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		methods: {
			xingji: function(pos){
				this.xing=pos
			},
			tijiao() {
				let that = this;
				if(that.info){
					
				
				uni.request({
					url: that.$api_url + '/order/orderComment', //仅为示例，并非真实接口地址。
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					method:'POST',
					data: {
						orderId:that.id,
						grade:that.xing,
						label:that.info,
						text:that.info
					},
					success: res => {
						uni.showToast({
							title:'完成评价'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url: '/pages/order/order?state=4'
							});
						}, 1000)
						// that.addressList = res.data.data;
					}
				});
				}else{
					uni.showToast({
						title:'请输入内容'
					})
				}
			}
		}
	};
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.example {
		padding: 0 30upx 30upx
	}
	
	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}
	
	.example-title__after {
		position: relative;
		color: #031e3c
	}
	
	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}
	
	.example .example-title {
		margin: 40upx 0
	}
	
	.example-body {
		padding: 30upx;
		background: #fff;
		display: flex;
		flex-direction: row;
		
	}
	
	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}
</style>
