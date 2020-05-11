<template>
	<view class="content">
		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">头像</text>
			<image style="width: 100rpx; height: 100rpx; margin: 25rpx 15 rpx; border-radius: 50%;" :src="tupian" @tap="upload()">
			</image>
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>
		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">昵称</text>
			<input class="desc" type="text" v-model="name" placeholder="请填写昵称" placeholder-class="placeholder" />
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>
		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">性别</text>
			<input class="desc" disabled="true" type="text" v-model="sex" placeholder="请选择性别" placeholder-class="placeholder"
			 @click="handleTap" />
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>
		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">出生日期</text>
			<view class="uni-list-cell-db">
				<picker mode="date" :value="birthday" start="1950" :end="endDate" @change="bindDateChange">
					<!-- <view class="uni-input">{{date}}</view> -->
					<input class="desc" disabled="true" type="text" v-model="birthday" placeholder="请选择出生日期" placeholder-class="placeholder" />

				</picker>
			</view>
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>
		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">个人地址</text>
			<input class="desc" disabled="true" type="text" v-model="address" placeholder="请选择个人地址" placeholder-class="placeholder"
			 @tap="handleTap5()" />
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>
		<view class="yt-list-cell desc-cell">
			<text class="cell-tit clamp">个人简介</text>
			<input style="height: 100rpx; " class="desc" type="text" v-model="info" placeholder="请填写个人简介" placeholder-class="placeholder" />
		</view>
		<view style="width: 100%; padding: 0upx 20upx; height: 1upx; background-color: #f1f1f1; "></view>

		<view style="margin-top: 200rpx; border-radius: 50rpx; background-color: #65c186; font-size: 24rpx; color: #FFFFFF; height: 70rpx;line-height: 70rpx; width: 400rpx; text-align: center;"
		 @click="updatainfo()">更新信息</view>
		<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel" cropWidth="200" cropHeight="200"></image-cropper>



		<lb-picker ref="picker" v-model="value" mode="selector" :list="list" @change="handleChange" @confirm="handleConfirm"
		 @cancle="handleCancle">
		</lb-picker>

		<lb-picker ref="picker5" v-model="value5" mode="multiSelector" :list="list5" :level="3" @change="handleChange5"
		 @confirm="handleConfirm5" @cancle="handleCancle5">
		</lb-picker>


	</view>
</template>

<script>
	var that;
	import areaData from './area-data-min.js'
	import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue";
	export default {
		components: {
			ImageCropper
		},
		data() {
			return {
				name:'新用户',
				birthday: '2000-05-01',
				tupian: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/20/fe6861f82870aa9826f7e01ea8878235.png',
				tempFilePath: '',
				cropFilePath: '',
				themeColor: '#65c186',
				list: [{
						label: '男',
						value: 1
					},
					{
						label: '女',
						value: 2
					},
					{
						label: '保密',
						value: 0
					}
				],
				sex: '男',
				value5: ['610000', '610100', '610113'],
				list5: areaData,
				address: '陕西省西安市雁塔区',
				info: ''
			}
		},
		computed: {

			endDate() {
				return this.getDate('end');
			}
		},
		onLoad: function(e) {
			that = this;
			uni.request({
				url: this.$api_url + '/user/get_user_info', //仅为示例，并非真实接口地址。
				method: 'GET',
				header: {
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				success: res => {
					console.log(res)
					if (res.data.code == 1000) {
						that.info = res.data.content.intro;
						that.address = res.data.content.address;
						that.sex = res.data.content.sexName;
						that.birthday = res.data.content.birthday;
						that.name = res.data.content.userName;
						that.tupian = res.data.content.headimg;
					}
				}
			});
		},
		onShow: function(res) {

		},
		methods: {
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["camera", 'album'], //从相册选择
					success: (res) => {
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
							that.tupian = json.content.url

							uni.request({
								url: this.$api_url + '/user/update_headimg', //仅为示例，并非真实接口地址。
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
									'authorization': uni.getStorageSync('authorization') //自定义请求头信息
								},
								data: {
									headimg: that.tupian
								},
								success: res => {
									console.log(res)
									if (res.data.code == 1000) {
										console.log("ok")
									}
								}
							});


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
			handleTap() {
				this.$refs.picker.show()
			},
			handleChange(item) {
				console.log('change::', item)
			},
			handleConfirm(item) {
				this.sex = item.item.label
				console.log('confirm::', item)
			},
			handleCancle(item) {
				console.log('cancle::', item)
			},

			handleTap5() {
				this.$refs.picker5.show()
			},
			handleChange5(item) {
				console.log('change::', item)
			},
			handleConfirm5(item) {
				console.log('confirm::', item)
				this.address = item.item[0].label + item.item[1].label + item.item[2].label
			},
			handleCancle5(item) {
				console.log('cancle::', item)
			},
			bindDateChange: function(e) {
				this.birthday = e.target.value
				console.log(e)
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			updatainfo: function() {
				if (that.name == '' || that.name == null) {
					uni.showToast({
						title: '请输入昵称'
					})
					return
				}
				if (that.info == '' || that.info == null) {
					uni.showToast({
						title: '请输入简介'
					})
					return
				}
				uni.request({
					url: this.$api_url + '/user/update_user_info', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						    "birthday": that.birthday,
						    "userName": that.name,
						    "address": that.address,
						    "intro": that.info,
						    "sexName": that.sex,
					},
					success: res => {
						console.log(res)
						if (res.data.code == 1000) {
							console.log(res)
							uni.showToast({
								title:''+res.data.message
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
		background-color: #FFFFFF;
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
