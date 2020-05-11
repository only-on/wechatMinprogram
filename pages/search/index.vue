<template>
	<view class="index-content">
		<view class="index-header">
			<view class="index-search">
				<view class="icon_search">
					<!-- <text class="iconfont icon-search"></text> -->
					<!-- <text>请输入您需要搜索的商品名称</text> -->
					<input
						type="text"
						value=""
						placeholder="请输入您需要搜索的商品名称"
						class="search_area"
						@input="searchInput"
					/>
					<view class="search_submit" @tap="submitSearch">搜 索</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- <sl-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result"></sl-filter> -->
			<!-- <view style="width: 100%;background-color: #0077AA; height: 100px;">
				</view>
			<view class="text">
				<text>{{ filterResult }}</text>
			</view> -->
			<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index1)">
				<view v-for="(newsitem,index2) in product_app_list" :key="newsitem.id" style="background-color: #ffffff;margin-bottom: 2rpx;">
					<media-item :options="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-item>
				</view>
				<view class="loading-more" v-if="tab.isLoading || tab.data.length > 4">
					<text class="loading-more-text">{{tab.loadingText}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import mediaItem from './news-item.nvue';
export default {
	components: {
		slFilter,
		mediaItem
	},
	data() {
		return {
			location:'',
			themeColor: '#ffb925',
			titleColor: '#666666',
			filterResult: '',
			inputValue:'',
			product_app_list:[],
			menuList: [
				{
					title: '品牌',
					key: 'brandIds',
					isMutiple: false,
					detailTitle: '请选择（品牌）',
					reflexTitle: true,
					defaultSelectedIndex: 1,
					detailList: [
						{
							title: '养田系列',
							value: '1'
						},
						{
							title: '诺诚',
							value: '2'
						},
						{
							title: '六颗星',
							value: '3'
						},
						{
							title: '喜登科',
							value: '4'
						},
						{
							title: '中化',
							value: '5'
						}
					]
				},
				{
					title: '销量',
					key: 'sales',
					isSort: true,
					reflexTitle: true,
					defaultSelectedIndex: 1,
					detailList: [
						{
							title: '不按销量排序',
							value: ''
						},
						{
							title: '销量↑',
							value: '1'
						},
						{
							title: '销量↓',
							value: '0'
						}
					]
				},
				{
					title: '价格',
					key: 'priceOrder',
					isSort: true,
					reflexTitle: true,
					defaultSelectedIndex: 0,
					detailList: [
						{
							title: '不按价格排序',
							value: ''
						},
						{
							title: '价格↑',
							value: '1'
						},
						{
							title: '价格↓',
							value: '0'
						}
					]
				}
			]
		};
	},
	onLoad(e) {
		var that=this;
		that.location = e.location
		// this.$Request.toget(this.$api.home.get_product_app_list).then(res => {
		// 	if (res.code == 1000) {
		// 		that.product_app_list = res.content.productListAppVoList;
		// 	}
		// });
	},
	methods: {
		result(val) {
			console.log('filter_result:' + JSON.stringify(val));
			this.filterResult = JSON.stringify(val, null, 2);
			var brandIds='';
			var sales='';
			var priceOrder='';
			if(val.brandIds!=''&&val.brandIds!=undefined){
				brandIds=val.brandIds;
			}
			if(val.sales!=''&&val.sales!=undefined){
				sales=val.sales;
			}
			if(val.priceOrder!=''&&val.priceOrder!=undefined){
				priceOrder=val.priceOrder;
			}
			this.$Request.toget(this.$api.home.get_product_app_list,{keyword:this.inputValue,brandIds:brandIds,sales:sales,priceOrder:priceOrder}).then(res => {
				if (res.code == 1000) {
					that.product_app_list = res.content.productListAppVoList;
				}
			});
		},
		goDetail(e) {
			uni.navigateTo({
				url: '/pages/detail/goodsinfo?id=' + e.id + '&type='+ e.type
			});
		},
		searchInput(event){
			console.log(event);
			this.inputValue = event.target.value
		},
		submitSearch(){
			const accountInfo = uni.getAccountInfoSync();
			var appId = accountInfo.miniProgram.appId; 
			this.$Request.toget1(this.$api.home.get_product_app_list,{keyword:this.inputValue, appId: appId,location: this.location,pageNum: 1, pageSize: 100}).then(res => {
				if (res.code == 1000) {
					this.product_app_list = res.content.productListAppVoList;
				}else{
					this.product_app_list =[]
					uni.showModal({
						content:'暂未找到您想要的宝贝。',
						showCancel: false
					})
				}
				
			});
		}
	}
};
</script>

<style>
.text {
	margin-top: 50px;
	margin-left: 20px;
	width: 100%;
}

.index-header{
	width: 100%;
	height: 100rpx;
	background-color: rgba(202, 202, 202, 1.0);
}
.index-search {
	text-align: center;
	font-size: 16px;
	color: #fff;
	position: relative;
	/* left: 65px; */
	margin: 0 auto;
	width: 75%;
	z-index: 2;
	zoom: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-top: 8px;
	/* margin: 0 45px 0 10px; */
	padding-bottom: 6px;
}


.index-search .icon_search {
	background: #ffffff;
	border-radius: 40upx;
	-moz-border-radius: 40upx;
	-webkit-border-radius: 40upx;
	-o-border-radius: 40upx;
	-ms-border-radius: 40upx;
	height: 60upx;
	line-height: 56upx;
	font-size: 28upx;
	color: #ccc;
	text-align: left;
	text-indent: 32upx;
	position: relative;
	z-index: 1;
	zoom: 1;
	transition: all 0.4s ease 0s;
	-o-transition: all 0.4s ease 0s;
	-moz-transition: all 0.4s ease 0s;
	-webkit-transition: all 0.4s ease 0s;
	transform-origin: center;
}
.index-search input.search_area {
	background-color: transparent;
	position: relative;
	z-index: 99;
	width: 60%;
	color: #333;
	height: 60rpx;
	font-size: 26rpx;
	line-height:60upx;
	margin-left: 10upx;
}
.search_submit {
	width: 25%;
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
	background: #ffb925;
	color: #fff;
	margin-top: -60rpx;
	position: absolute;
	right: 0;
	border-radius: 15px;
	/* margin-right: -20px; */
	z-index: 30;
}
</style>
