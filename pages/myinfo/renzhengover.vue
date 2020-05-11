<template>
	<view class="content">
		<image :src="url" style="width: 460upx; height: 280upx; margin-top: 60rpx;"></image>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; margin-top: 50rpx;"></view>
		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">姓名</text>
			<input class="desc" type="text" v-model="name" placeholder="请填写姓名" placeholder-class="placeholder" />
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>

		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">身份证号</text>
			<input class="desc" type="idcard" v-model="stridcard" placeholder="请填写身份证号" placeholder-class="placeholder" />
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>

		<image style="width: 400rpx; margin-top: 200rpx;" :src="urlyes" mode="widthFix" @click="nextto()"></image>

	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				urlyes: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/31/0d6d6d3cbf0bcfc82db82d78dc1193cf.png',
				url: '',
				name: '',
				stridcard: ''

			}
		},
		onLoad: function(e) {
			that = this;
			that.url = e.imgurl
		},
		onShow: function(res) {

		},
		methods: {
			nextto: function() {
				console.log(that.name);
				console.log(that.stridcard);
				if (that.name == '') {
					uni.showToast({
						title: '请填写姓名'
					})
					return
				}
				if (that.stridcard == '') {
					uni.showToast({
						title: '请填写身份证号'
					})
					return
				}

				uni.request({
					url: this.$api_url + '/user/doVerify', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						// 'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						 "usergroup": 1,
						"user_verified_category_id": 1,
						"realname": that.name,
						"idcard": that.stridcard,
						"expertIntro": "这方面我可是专家，值得您的信赖"
					},
					success: res => {
						console.log(res)
						if (res.data.code == 1000) {
							uni.showToast({
								title: "提交成功"
							});

							setTimeout(function() {
								uni.navigateBack({
									delta: 2
								});
							}, 1000);
						}
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
		align-items: center;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 15upx 40upx 15upx 40upx;
		line-height: 70upx;
		width: 100%;

	}

	.cell-tit {
		flex: 1;
		font-size: 26upx;
		color: $font-color-light;
		margin-right: 10upx;
	}


	.desc {
		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
		text-align: right;

	}
</style>
