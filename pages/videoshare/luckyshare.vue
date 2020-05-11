<template>
	<view class="content">

		<image style="width: 100%;  background-color: #eeeeee;" mode="widthFix" :src="imageUrl"></image>
		<view style="margin-top: 20rpx; height: 220rpx; border-radius: 20rpx; background-color: #FFFFFF; display: flex; flex-direction: row;">
			<view style="flex: 1; display: flex; flex-direction: column; height: 220rpx; padding-top: 20rpx; padding-bottom: 20rpx; padding-left: 20rpx;">
				<view style="font-size: 28rpx; color: #242424; height: 40rpx; ">{{strtitle}}</view>
				<view style="font-size: 22rpx; color: #f90000; height: 30rpx; margin-top: 10rpx;">送货到家，不中退款</view>
				<view style="display: flex; flex-direction: row; margin-bottom: 20rpx; height: 110rpx; align-items: flex-end;">
					<view style="font-size: 30rpx; color: #f90000; ">￥{{price}}</view>
				</view>
			</view>
			<view style="margin-right: 20rpx; margin-top: 150rpx; border-radius: 50rpx; background-color: #f90000; font-size: 24rpx; color: #FFFFFF; height: 40rpx;width: 150rpx; text-align: center;"
			 @click="choujiang()">立即抽奖</view>
		</view>
		<view style="height: 70rpx; margin-bottom: 10rpx; display: flex; flex-direction: row; background-color: #FFFFFF; align-items: center;padding: 10rpx 20rpx;
	    border: 2rpx solid #242424;
	    margin: 30rpx 40rpx;"
		 @click="choujiang()">
			<view style="flex: 1;"></view>
			<image style="width: 50rpx; height: 50rpx; " mode="scaleToFill" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/27/8cb3979de12535eaf4f98484c0db49f3.png"></image>
			<view style="font-size: 30rpx; color: #333333;margin-left: 20rpx;  height: 50rpx; line-height: 50rpx;">进入小程序,查看更多精彩</view>
			<view style="flex: 1;"></view>
		</view>
		<!-- <block v-for="(item,num) in list" :key="num">
			<view style=" flex-direction: column; text-align: center;">
				<text style="font-size: 50rpx; color: #000000; ">{{item.biaoti}}</text>
				<view style="font-size: 35rpx; color: #333333; 
						margin-top: 25rpx; margin-bottom: 25rpx;">{{item.jianjie}}</view>
				<view style="font-size: 30rpx; color: #878787; padding: 20rpx; margin-bottom: 50rpx; line-height: 50rpx;">{{item.neirong}}</view>
				<image style="width: 60%; margin: 0 auto;" :src="item.tupian" mode="widthFix"></image>
				<view style="width: 10rpx; height: 80rpx;"></view>
			</view>
		</block>
		<text style="background: #eeeeee; font-size: 50rpx; color: #000000; text-align: center; padding-top: 30rpx;padding-bottom: 80rpx;">更多功能</text>
		<block v-for="(item,num) in lists" :key="num">
			<view style=" flex-direction: column; text-align: center;background-color: #eeeeee;">
				<image style="width: 100rpx; height: 100rpx; border: 1rpx solid #dddddd; border-radius: 20rpx; background: #dddddd; padding: 30rpx;"
				 :src="item.tupian" mode="widthFix"></image>
				<view style="font-size: 35rpx; color: #333333; 
					margin-top: 25rpx; margin-bottom: 25rpx;">{{item.jianjie}}</view>
				<view style="font-size: 30rpx; color: #878787; padding: 20rpx; line-height: 50rpx;">{{item.neirong}}</view>
				<view style="width: 10rpx; height: 30rpx;"></view>
			</view>
		</block>
		<text style="background: #424242; font-size: 22rpx; color: #d8d8d8; text-align: center; padding-top: 40rpx;padding-bottom: 20rpx;">©
			2016-2020. 西安众智物联科技有限公司. All Rights Reserved.</text> -->
	</view>
</template>

<script>
	var that;
	export default {

		data() {
			return {
				price: '',
				imageUrl: '',
				strtitle: '',
				list: [{
					biaoti: '智慧新农',
					jianjie: '三农综合服务平台',
					neirong: '提供在线农事问答、农资购买、农资百科以及农业种植方案的智慧农业一体化解决方案。',
					tupian: 'http://zhxn.tomsung.cn/images/section1.png'
				}, {
					biaoti: '农资商城',
					jianjie: '货真价实，假一赔百',
					neirong: '买的多，省得多。厂家直供，一站式配送服务，省去中间商环节，低于市场零售价20%-50%。通过多地实践总结，精心甄选最佳的农业种植解决方案，为您提供有效、便捷的农资购买服务。',
					tupian: 'http://zhxn.tomsung.cn/images/section3.png'
				}, {
					biaoti: '在线问答',
					jianjie: '专家指导，种植无忧',
					neirong: '在线图片问诊，权威专家团队24小时上门服务，快速解决您的种植难题。还可以在线交流农技，为别人答疑解惑，互相学习。',
					tupian: 'http://zhxn.tomsung.cn/images/section4.png'
				}, {
					biaoti: '新农学院',
					jianjie: '在线学习，知识改变农业',
					neirong: '权威专家线上授课，学习先进种植技术，海量农业短视频，了解天下农业大事。',
					tupian: 'http://zhxn.tomsung.cn/images/section5.png'
				}, {
					biaoti: '查农资',
					jianjie: '辨真伪，查真假',
					neirong: '农药、肥料、种子、厂家真伪查询，提供多种查询方式，快速查询农资是真是假。',
					tupian: 'http://zhxn.tomsung.cn/images/section6.png'
				}, {
					biaoti: '记农事',
					jianjie: '质量追溯，给自己的园子上户口',
					neirong: '一园一码，产品价更高。每一次浇水、施肥，每一次满含汗水的辛苦劳作，都可以记录下来，支持图片和视频，作物从种到收，全透明化的种植过程可以为销路和价格打上标签。',
					tupian: 'http://zhxn.tomsung.cn/images/section7.png'
				}],
				lists: [{
					jianjie: '农业资讯',
					neirong: '资讯，是连接世界的桥梁，农业资讯，为你带来最新的业界新闻。',
					tupian: 'http://zhxn.tomsung.cn/images/news.png'
				}, {
					jianjie: '农事百科',
					neirong: '内置30000多条农业百科数据，化肥、农药、种子数据应有尽有。',
					tupian: 'http://zhxn.tomsung.cn/images/WIKI.png'
				}, {
					jianjie: '服务评价',
					neirong: '站长和专家的每一次服务，都关系着平台的口碑，而你的评价，是对他们最大的鼓励。',
					tupian: 'http://zhxn.tomsung.cn/images/serves.png'
				}, {
					jianjie: '技术教学',
					neirong: '涵盖1500多种病虫草害，每天坚持了解学习，你就是下一个专家。',
					tupian: 'http://zhxn.tomsung.cn/images/skills.png'
				}]
			}
		},

		onShareAppMessage(res) {
			uni.showShareMenu({
				withShareTicket: true
			})
			return {

				title: '' + that.strtitle,
				path: '/pages/videoshare/videoshare?price=' + that.price + '&imageUrl=' + that.imageUrl + '&strtitle=' + that
					.strtitle,
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
				}
			}
		},


		onLoad: function(option) {
			that = this;
			that.price = option.price;
			that.imageUrl = option.imageUrl;
			that.strtitle = option.strtitle;
		},
		methods: {

			choujiang: function() {
				uni.switchTab({
					url: '/pages/find/find'
				});
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.bottomBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10rpx;
		border: 2rpx solid #242424;
		margin: 30rpx 40rpx;
	}
</style>
