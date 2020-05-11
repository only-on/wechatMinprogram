<template>
	<view class="content">
		<image :src="urls[0]" style="width: 460upx; height: 280upx; margin-top: 60rpx;" @tap="upload(0)"></image>
		<image :src="urls[1]" style="width: 460upx; height: 280upx; margin-top: 60rpx;" @tap="upload(1)"></image>
		<checkbox-group @change="checkboxChange" style=" margin-top: 100rpx; width: 100%; align-items: center; text-align: center;">
			<label>
				<checkbox value="cb" color="#65c186" style="transform:scale(0.8)" />本人承诺以上信息均真真实有效
			</label>
		</checkbox-group>
		<image v-if="state==0" style="width: 300rpx; margin-top: 30rpx;" :src="url" mode="widthFix"></image>
		<image v-if="state==1" style="width: 300rpx; margin-top: 30rpx;" :src="urlyes" mode="widthFix" @click="nextto()"></image>
		<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel" cropWidth="310" cropHeight="175"></image-cropper>

	</view>
</template>

<script>
	var that;
	import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue";
	export default {
		components: {
			ImageCropper
		},
		data() {
			return {
				state: 0,
				values: [],
				pos: 0,
				tempFilePath: '',
				cropFilePath: '',
				urls: ["https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/29/11593012bf7a59172199b2f0eabcb6d7.png",
					"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/29/0b47e094d0f67533423caecdb6474b5b.png"
				],
				urlup1: '',
				urlup2: '',
				urlyes: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/31/aa665f09fde871910288168ed4919da5.png',
				url: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/29/3eb855468ed26b8e6e1c8fe8b69036c6.png'
			}
		},
		onLoad: function(e) {
			that = this;
		},
		onShow: function(res) {

		},
		methods: {

			checkboxChange: function(e) {
				console.log(e.detail.value);
				that.values = e.detail.value;
				if (that.values.length > 0 && that.urlup1!=''&&that.urlup2!='') {
					that.state = 1
				} else {
					that.state = 0
				}
			},

			upload(num) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["camera", 'album'], //从相册选择
					success: (res) => {
						that.pos = num;
						that.tempFilePath = res.tempFilePaths.shift();
					}
				});
			},
			confirm(e) {
				that.tempFilePath = ''
				that.cropFilePath = e.detail.tempFilePath
				uni.uploadFile({
					url: that.$api_url + '/file/image_upload',
					filePath: that.cropFilePath,
					name: 'upload_file',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					success: (res) => {
						var json = JSON.parse(res.data)
						if (json.code == 1000) {
							console.log(json);
							if(0==that.pos){
								that.urlup1 = json.content.url
								that.urls[0] = json.content.url
								
							}else{
								that.urlup2 = json.content.url
								that.urls[1] = json.content.url
							}
							if (that.values.length > 0 && that.urlup1!=''&&that.urlup2!='') {
								that.state = 1
							} else {
								that.state = 0
							}
						}
					},
					fail: (res) => {
						console.log(res)
					}
				});

			},
			cancel() {
				console.log('canceled')
			},
			nextto: function() {
				uni.request({
					url: this.$api_url + '/user/uploadCard', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data:{
						faceCard:that.urlup1,
						backCard:that.urlup2,
					},
					success: res => {
						console.log(res)
						if (res.data.code == 1000) {
							uni.navigateTo({
								url:'./renzhengover?imgurl='+that.urlup1
							})
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
</style>
