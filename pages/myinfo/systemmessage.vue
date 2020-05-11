<template>
	<view>
		<view class="content">
			<uni-segmented-control style="width: 100%;" :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
			 @clickItem="onClickItem" />
		</view>
		<block v-for="(item,num) in liststate" :key="num">
			<view style="margin-right: 30rpx; display: flex; flex-direction: row;" @click="yuedu(num)"
			 @longpress="logoTime(num)">
				<image :src="item.url" mode="scaleToFill" style="width: 100rpx; height: 100rpx; margin: 20rpx;"></image>
				<view style="flex: 1; display: flex; flex-direction: column;  padding-top: 20rpx; padding-bottom: 20rpx;">
					<view style="display: flex; flex-direction: row; margin-bottom: 20rpx; margin-top: 20rpx;">
						<view style="font-size: 25rpx; color: #1d1d1d; width: 300rpx; overflow: hidden; text-overflow:ellipsis;
white-space: nowrap;">{{item.title}}</view>
						<view style="font-size: 20rpx; color: #353535; flex: 1; text-align: right;">{{item.createTime}}</view>
					</view>
					<view style="font-size: 23rpx; color: #242424; height: 50rpx; text-align: start;">{{item.subtitle}}</view>
				</view>
			</view>
			<view style="width: 80%; height: 1rpx; background-color: #EEEEEE; margin-left: 20%;"></view>
		</block>
		<xw-empty :isShow="isShow" text="暂无数据" textColor="#777777"></xw-empty>

	</view>

</template>

<script>
	var that, timer = null;
	import xwEmpty from '@/components/xw-empty/xw-empty.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	export default {
		components: {
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
				items: ['系统', '聊天', '评论', '@我的'],
				current: 0,
				activeColor: '#65c186',
				styleType: 'text',
				lists: [],
				liststate: []
			};
		},
		onLoad() {
			that = this;
			// that.getnewsList();
		},
		onPullDownRefresh: function() {
			// this.getnewsList();
		},
		onReachBottom: function() {
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				that.getmorenews();
			}, 100);
		},
		methods: {
			getmorenews: function() {
				that.status = 'loading';
				console.log('page=' + that.page);
				uni.showNavigationBarLoading();
				uni.request({
					url: that.$api_url + '/notify/list',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						pageNum: that.page,
						pageSize: 10,
						type: 1
					},
					success: function(res) {
						console.log(res.data);
						if (res.data.code != 1000) {
							uni.hideNavigationBarLoading();
							that.status = 'noMore';
							return false;
						}
						that.page = that.page + 1;

						for (var i = 0; i < res.data.content.length; i++) {
							var strbena = {
								"id": 1616,
								"msgId": 272186288,
								"node": "html_web",
								"title": "西安市气象台3月20日16时35分发布寒潮蓝色预警信号。",
								"subtitle": "西安市气象台3月20日16时35分发布寒潮蓝色预警信号。",
								"ext": {
									"url": "http://3g.163.com/news/article/EANVHA9900018AP2.html"
								},
								"createTime": "2019-03-21 08:54:08",
								"url": "",
								"isRead": 0
							}
							strbena.id = res.data.content[i].id
							strbena.msgId = res.data.content[i].msgId
							strbena.node = res.data.content[i].node
							strbena.title = res.data.content[i].title
							strbena.subtitle = res.data.content[i].subtitle
							if ('html_web' == res.data.content[i].node) {
								strbena.ext.url = res.data.content[i].ext.url
							} else {
								strbena.ext.url = 'none'
							}
							if (0 == res.data.content[i].isRead) {
								strbena.url = that.tu1
							} else {
								strbena.url = that.tu2
							}
							strbena.createTime = res.data.content[i].createTime
							strbena.isRead = res.data.content[i].isRead
							that.lists = that.lists.concat(strbena)
						}
						that.liststate = that.lists;
						that.status = 'more';
						uni.hideNavigationBarLoading();
					}
				});
			},
			getnewsList: function() {
				that.page = 1;
				that.status = 'loading';
				uni.showNavigationBarLoading();
				uni.request({
					url: that.$api_url + '/notify/list',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						pageNum: 1,
						pageSize: 10,
						type: 1
					},
					success: function(res) {
						console.log(res);
						if (res.data.code != 1000) {
							uni.hideNavigationBarLoading();
							that.status = 'noMore';
							return false;
						}
						that.page = that.page + 1;
						// that.listsss = res.data.content;
						// console.log(that.listsss);
						that.lists = [];
						for (var i = 0; i < res.data.content.length; i++) {
							var strbena = {
								"id": 1616,
								"msgId": 272186288,
								"node": "html_web",
								"title": "西安市气象台3月20日16时35分发布寒潮蓝色预警信号。",
								"subtitle": "西安市气象台3月20日16时35分发布寒潮蓝色预警信号。",
								"ext": {
									"url": "http://3g.163.com/news/article/EANVHA9900018AP2.html"
								},
								"createTime": "2019-03-21 08:54:08",
								"url": "",
								"isRead": 0
							}
							strbena.id = res.data.content[i].id
							strbena.msgId = res.data.content[i].msgId
							strbena.node = res.data.content[i].node
							strbena.title = res.data.content[i].title
							strbena.subtitle = res.data.content[i].subtitle
							if ('html_web' == res.data.content[i].node) {
								strbena.ext.url = res.data.content[i].ext.url
							} else {
								strbena.ext.url = 'none'
							}
							if (0 == res.data.content[i].isRead) {
								strbena.url = that.tu1
							} else {
								strbena.url = that.tu2
							}
							strbena.createTime = res.data.content[i].createTime
							strbena.isRead = res.data.content[i].isRead
							that.lists = that.lists.concat(strbena)
						}
						that.liststate = that.lists;
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						if (that.lists.length < 10) {
							that.status = 'noMore';
						} else {
							that.status = 'more';
						}
						if(that.liststate.length<1){
							that.isShow = true
						}
						
					}
				});
			},
			onClickItem(index) {
				if (that.current !== index) {
					that.current = index;
					if (that.current === 0) {
						that.liststate = that.lists;
						that.isShow = true
					} else {
						that.liststate = [];
						that.isShow = true
					}
				}
			},
			logoTime(e) {
				console.log("长按")
				uni.showActionSheet({
					itemList: ['标记全部消息为已读', '标记为已读', '删除消息'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (1 == res.tapIndex + 1) {
							that.oneyidu(e);
						}
						if (2 == res.tapIndex + 1) {
							that.allyidu();
						}
						if (3 == res.tapIndex + 1) {
							that.shanchu(e);
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			yuedu(e) {
				if('html_web'==that.liststate[e].node){
					console.log(that.liststate[e].ext.url);
					uni.navigateTo({
						url:'./openmessage?url='+that.liststate[e].ext.url
					})
				}
				if(0==that.liststate[e].isRead){
				that.oneyidu(e);
				}
			},
			oneyidu: function(e) {
				uni.request({
					url: that.$api_url + '/notify/readMessage',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						id: that.liststate[e].id
					},
					success: function(res) {
						console.log(res);
						if (res.data.code == 1000) {
							that.liststate[e].isRead = 1;
							that.liststate[e].url = that.tu2;
						}

					}
				});
			},
			allyidu: function() {
				uni.request({
					url: that.$api_url + '/notify/readAllMessage',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						type: 1
					},
					success: function(res) {
						console.log(res);
						if (res.data.code == 1000) {
							for (var i = 0; i < that.liststate.length; i++) {
								that.liststate[i].isRead = 1;
								that.liststate[i].url = that.tu2;
							}

						}

					}
				});
			},
			shanchu: function(e) {
				uni.request({
					url: that.$api_url + '/notify/delete',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						id: that.liststate[e].id
					},
					success: function(res) {
						console.log(res);
						if (res.data.code == 1000) {
							that.liststate.splice(e, 1);
						}

					}
				});
			}

		}
	};
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}

	.content {
		flex-direction: column;
		width: 100%;
		background: #ffffff;
	}
</style>
