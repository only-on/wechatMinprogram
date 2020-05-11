<template>
	<view>
		<view class="content">
			<uni-segmented-control style="width: 100%;" :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
			 @clickItem="onClickItem" />
		</view>
		<view v-for="(newsitem,num) in liststate" :key="num" style="background-color: #FFFFFF; border: 2rpx solid #FFFFFF; border-radius: 10rpx; margin: 20rpx 20rpx 0rpx 20rpx;">
			<media-item :options="newsitem" @click="goDetail(newsitem)" ></media-item>
		</view>
		<xw-empty :isShow="isShow" text="暂无数据" textColor="#777777" img="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/28/29826f321ebe634ce7028eb9eb529a75.png"></xw-empty>
	</view>

</template>

<script>
	var that;
	import mediaItem from 'pages/category/news-item.nvue';
	import xwEmpty from '@/components/xw-empty/xw-empty.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	export default {
		components: {
			mediaItem,
			uniSegmentedControl,
			xwEmpty
		},
		data() {
			return {
				isShow: false,
				tu1: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/28/33dcae809595b378bb5e42177df02aba.png',
				tu2: 'https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/28/720bb60bb28f04ac20f6cba3eacae394.png',
				status: 'more',
				page: 1,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				items: ['周期购', '商品', '套餐'],
				current: 0,
				activeColor: '#65c186',
				styleType: 'text',
				liststate: []
			};
		},
		onLoad() {
			that = this;
			uni.request({
				url: this.$api_url + '/product/collect', //仅为示例，并非真实接口地址。
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				},
				data: {
					"type": 0
				},
				success: res => {
					console.log(res)
					if (res.data.code == 1000) {
						that.liststate = res.data.content.productListAppVoList
					} else {
						that.liststate = []
					}
					if (that.liststate.length == 0) {
						that.isShow = true
					} else {
						that.isShow = false
					}
				},
				fail: function(e) {
					that.liststate = []
					that.isShow = false
				}
			});
		},

		methods: {

			onClickItem(index) {
				if (that.current !== index) {
					that.current = index;

				}

				//0fangan 1danpin 2taocan
				uni.request({
					url: this.$api_url + '/product/collect', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						"type": that.current
					},
					success: res => {
						console.log(res)
						if (res.data.code == 1000) {
							that.liststate = res.data.content.productListAppVoList
						} else {
							that.liststate = []
						}
						if (that.liststate.length == 0) {
							that.isShow = true
						} else {
							that.isShow = false
						}
					},
					fail: function(e) {
						that.liststate = []
						that.isShow = false
					}
				});
			},
			goDetail(item) {
				uni.navigateTo({
					url: '/pages/detail/goodsinfo?id=' + item.id +'&type=' + item.type
				});
			},


		}
	};
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}

	.content {
		flex-direction: column;
		width: 100%;
		background: #ffffff;
	}
</style>
