<template>
	<view class="s-page-wrapper">
		<view class="index-goods" v-if="loadGoods">
			<view class="swiper" v-if="goods.imageUrls.length > 0">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true" :indicator-dots="true"
				 indicator-active-color="#FC3F78" indicator-color="#cccccc">
					<block v-for="item in goods.imageUrls" :key="item">
						<swiper-item class="swiper-wrapper">
							<image lazy-load :src="item.url" mode="widthFix" class="is-response"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<view class="coupon-price s-row uni-flex uni-row">
				<!-- <view style="width: 1rpx;height: 1rpx;"></view> -->
				<view class="price">
					<text class="discountPrice">￥{{ guigePrice }}</text>
					<text class="originalPrice">￥{{ goods.originalPrice }}</text>
				</view>
				<view class="volume">已{{ispintuan}}{{ goods.salesVolume }}件</view>
			</view>

			<view class="goods_info">
				<view class="title">
					<text>{{ good_type_name }}</text>
					{{ goods.title }}
				</view>

			</view>


			<view class="goods-jiayipeishi">
				<text>[全场包邮]</text>
				<text>[48小时发货]</text>
				<text>[送货到家]</text>
				<text>[假一赔十]</text>
			</view>

			<view class="youhuiquan" @tap="youhuiquan">
				<text>优惠券</text>
				<navigator class="youhuiquan-to" url="/pages/cate/index" open-type="switchTab" hover-class="">
					领券
					<text class="iconfont icon-youjiantou" style="font-weight: 100;"></text>
				</navigator>
			</view>
			<view style="width: 100%; height: 1rpx; background-color: #dedede;"></view>
			
			<view v-if="pickUp"  style="display: flex; flex-direction: row; align-items: center; width: 100%; min-height: 80rpx; background-color: #FFFFFF; border-bottom: 2rpx solid #F7F7F7; padding-top: 20rpx; padding-bottom: 20rpx;"
			 @click="aboutapp()">
				<view style="flex: 1; flex-direction: row; margin-left: 20rpx; display: flex;">
					<view style="font-size: 28rpx; color: #000000; font-weight: 600;">配送地址：</view>
					<view style="font-size: 28rpx; color: #000000;  flex: 1; padding-left: 10rpx; line-height: 40rpx; font-weight: 600;">{{pickUpAddress}}</view>
				</view>
				<view style="width: 80rpx; text-align: center;">
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
			<view style="width: 100%; height: 1rpx; background-color: #dedede;"></view>
			<swiper v-if="shuzi>0" autoplay="true" interval="2000" duration="300" vertical="true" style="width: 100%;  background-color: #ffffff; height: 301rpx;">
				<view v-for="(items, index) in goodsorder" :key="index">
					<swiper-item>
						<view style="width: 100%; height: 150rpx; display: flex; flex-direction: row; align-items: center;">
							<image :src="items[0].headImage" mode="widthFix" style="width: 50rpx; height: 50rpx;margin-left: 20rpx; margin-right: 20rpx;"></image>
							<view style="flex: 1; height: 50rpx; line-height: 50rpx; font-size: 22rpx; color: #333333;">{{items[0].name}}</view>
							<view v-if="items[0].minAskType==0" style="flex: 1;  margin-left: 20rpx; margin-right: 20rpx; font-size: 23rpx; color: #FC4D52;">还差{{items[0].lastNum}}人成团<br />{{items[0].endTime}}结束</view>
							<view v-if="items[0].minAskType==1" style="flex: 1;  margin-left: 20rpx; margin-right: 20rpx; font-size: 23rpx; color: #FC4D52;">还差{{items[0].lastNum}}件成团<br />{{items[0].endTime}}结束</view>
							<view style="height: 45rpx; line-height: 45rpx; width: 130rpx; border-radius: 50rpx; background-color:  #d34c0d; text-align: center; margin-right: 20rpx; font-size: 26rpx; color: #FFFFFF;"
							 @click="buttonClicktuan(1,items[0].groupBuyOrderId,items[0])">去凑团</view>
						</view>
						<view v-if="items.length>1" style="width: 100%; height: 1rpx; background-color: #dedede;"></view>
						<view v-if="items.length>1" style="width: 100%; height: 150rpx; display: flex; flex-direction: row; align-items: center;">
							<image :src="items[1].headImage" mode="widthFix" style="width: 50rpx; height: 50rpx;margin-left: 20rpx; margin-right: 20rpx;"></image>
							<view style="flex: 1; height: 50rpx; line-height: 50rpx; font-size: 22rpx; color: #333333;">{{items[1].name}}</view>
							<view v-if="items[1].minAskType==0" style="flex: 1;  margin-left: 20rpx; margin-right: 20rpx; font-size: 23rpx; color: #FC4D52;">还差{{items[1].lastNum}}人成团<br />{{items[1].endTime}}结束</view>
							<view v-if="items[1].minAskType==1" style="flex: 1;  margin-left: 20rpx; margin-right: 20rpx; font-size: 23rpx; color: #FC4D52;">还差{{items[1].lastNum}}件成团<br />{{items[1].endTime}}结束</view>
							<view style="height: 45rpx; line-height: 45rpx; width: 130rpx; border-radius: 50rpx; background-color:  #d34c0d; text-align: center; margin-right: 20rpx; font-size: 26rpx; color: #FFFFFF;"
							 @click="buttonClicktuan(1,items[1].groupBuyOrderId,items[1])">去凑团</view>
						</view>
						<!-- 	delegationId: 535
					endTime: "2020-04-11 16:01"
					groupBuyOrderId: 38
					groupBuyStartTime: "2020-04-10 16:01"
					headImage: "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/headimg/ic_default_head_portrait_man.png"
					headImage2: "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/headimg/ic_default_head_portrait_man.png"
					headImage3: "https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/headimg/ic_default_head_portrait_man.png"
					initiator: null
					join: false
					joinTime: "2020-04-10 16:01"
					lastNum: 1
					lastTimeStamp: 14569
					minAsk: 2
					minAskType: 0
					name: ""
					regionId: 1
					regionName: "" -->

					</swiper-item>
				</view>
			</swiper>

			<view v-if="goods.goods_desc" class="goods_desc">{{ goods.goods_desc }}</view>
			<!-- <view class="hr10"></view> -->

			<view v-if="'拼'==ispintuan" class="hr10"></view>
			<view class="liucheng">
				<image v-if="'拼'==ispintuan" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/10/97224ea2f8d139347d303cd4d1a3636a.png"
				 mode="widthFix" style="width: 100%; height: 150rpx;"></image>
			</view>
			<view v-if="taocanqingdan" class="hr10"></view>
			<view v-for="(items, index) in goods.commodityList" v-if="taocanqingdan" :key="index">
				<view class="qingdantitle" v-if="taocanqingdan">规格清单</view>
				<view class="qingdan" v-for="(item, ind) in items.items" :key="ind">
					<view class="qingdanimage">
						<image :src="items.imageUrl" mode=""></image>
					</view>
					<view class="qingdaninfo">
						<view class="qingdaninfo-name">{{ items.name }}</view>
						<view class="qingdaninfo-quantity">× {{ item.quantity }}</view>
						<view class="qingdaninfo-guige">
							<text>规格：</text>
							<text v-for="(itemss, indexx) in item.specifications" :key="indexx">{{ itemss.name }}{{ itemss.value }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="hr10"></view>
			<button class="button_kefu" @click="huishouye" style="width: 150rpx; height: 80rpx; position: fixed; bottom: 0;left: 0; z-index: 98;background: none;border: none !important;box-shadow: none;outline: none; "></button>
			<button class="button_kefu" open-type="contact" style="width: 150rpx; height: 80rpx; position: fixed; bottom: 0;left: 150rpx; z-index: 98;background: none;border: none !important;box-shadow: none;outline: none; "></button>
			<button class="button_kefu" @tap="shoucang" style="width: 150rpx; height: 80rpx; position: fixed; bottom: 0;left: 300rpx; z-index: 98;background: none;border: none !important;box-shadow: none;outline: none; "></button>

			<!-- <view class="hr10"></view> -->
			<view class="goods_reco">
				<view class="goods-info-title"  style="font-weight: 700;">商品详情</view>
				<u-parse :content="ccsd" @preview="preview" @navigate="navigate"></u-parse>
			</view>


			<!-- 悬浮上拉 -->
			<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '', '']" style="bottom: 56px;"><text
				 class="iconfont icon-shangla"></text></view>
			<view class="goods-carts">
				<uni-goods-nav :options="options" :fill="false" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
			</view>

			<!-- 规格-模态层弹窗 -->
			<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
				<!-- 遮罩层 -->
				<view class="mask"></view>
				<view class="layer attr-content" @click.stop="stopPrevent">
					<view class="a-t">
						<image :src="goods.imageUrls[0].url"></image>
						<view class="right">
							<text class="price">¥{{ guigePrice }}</text>
							<!-- <text class="stock">剩余{{ goods.stock }}件</text> -->
							<view class="selected">
								已选：
								<text class="selected-text">{{ guige }}</text>
								<!-- <text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{specSelected[0].name}}{{ sItem.name }}</text> -->
							</view>
						</view>
					</view>
					<view v-for="(item, index) in specList" :key="index" class="attr-list">
						<text>{{ item.name }}</text>
						<view class="item-list">
							<text v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id" :key="childIndex" class="tit"
							 :class="{ selected: childItem.selected }" @click="selectSpec(childIndex, childItem.pid)">
								{{ childItem.name }}
							</text>
						</view>
					</view>
					
					<view class="yt-list-cell b-b">
						<text class="cell-tit clamp">库存数量：{{kucunshuliang}}</text>
						<!-- <text class="cell-tip">￥{{ all_price }}</text> -->
						<view class="example-body" >
							<uni-number-box :min="minQuantity" :max="kucunshuliang" :value="minQuantity" @change="change1" />
						</view>
					</view>
					
					<button class="btn" @click="toggleSpecOk">完成</button>
				</view>
			</view>
		</view>
		<view class="" v-if="!loadGoods">
			<view class="s-page">
				<view class="is-100vh is-flex is-column is-justify-center is-align-center ">
					<image src="../../static/img/load.gif" style="width:75px;height: 75px;" class="is-response" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<button style="position: fixed; top: 50rpx; right: 50rpx;  outline: none; box-shadow: none; border: none;   background-color: #ff651a; color: #ffffff;  font-size: 28rpx; height: 64rpx; line-height: 64rpx; border-radius: 50rpx;"
		 plain="true" @click="onShareinfo">分享好友</button>

		<uni-popup :show="show" type="center" :custom="true" :mask-click="false" @change="change">
			<view style=" background-color: #FFFFFF; width: 600rpx;
height: 600rpx;
border-radius: 20rpx;
">
				<view style="border-bottom: 1rpx solid #fafafa;height: 120rpx; line-height: 120rpx;font-size: 32rpx;color: #666666; font-weight: 700; text-align: center;">
					{{itemss.name}}发起的拼团
				</view>
				<view style="width: 100%;text-align: center;">
					<image style="width: 100%;" src="https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/13/0ebb8e3f66435f405af8a4b0362b4fd0.jpg"
					 mode="widthFix"></image>
					<view style="height: 60rpx;line-height: 60rpx; font-size: 34rpx; color: #666666;">
						已拼{{itemss.minAsk - itemss.lastNum}}件，还差
						<span style="color: red;">{{ itemss.lastNum }}</span>
						件即可成团
					</view>
					<view style="height: 60rpx;line-height: 60rpx; font-size: 30rpx;">
						<text style="color: red;">截至{{ itemss.endTime }}结束</text>
						<!-- 后结束 -->
					</view>
					<view style="margin-top: 60rpx;">
						<view style="text-align: center;width: 35%;outline: none; box-shadow: none; border: none;  border-radius: 50rpx; background-color: #ff651a; color: #ffffff;  font-size: 30rpx; height: 80rpx; line-height: 80rpx; margin-left: 32%;"
						 @click="onShareinfos">
							参与拼团
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import simpleModal from '@/components/simple-pro/customModal.vue';
	import uParse from '@/components/gaoyia-parse/parse.vue';
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
	var _self;
	export default {
		data() {
			return {
				numberValue:1,
				minQuantity:1,
				kucunshuliang:999,
				goid:0,
				itemss: '',
				show: false,
				leixing: '件',
				shuzi: 0,
				pickUp: false,
				pickUpAddress: '',
				ispintuan: '售',
				id: '',
				type: 0,
				loadGoods: false,
				specClass: 'none',
				miaosha: 0,
				goods: [],
				goodsorder: [],
				shopCartBg: false,
				scrollTop: false,
				taocanqingdan: false,
				good_type_name: '单品',
				navBarButton: false,
				navsel: 1,
				isCollect: 0,
				secondKillId: 0,
				secondKillTimeId: 0,
				copyTklStatus: false,
				ccsd: '<p></p>',
				guige_id: 0,
				guige: '',
				guigePrice: '',
				options: [{
						icon: 'home-filled',
						text: '回首页',
						color: '#ffa200'
					},
					{
						icon: 'headphones',
						text: '客服',
						color: '#646566'
					},
					{
						icon: 'starhalf',
						text: '去收藏',
						color: '#646566'
					}

				],
				buttonGroup: [{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}],
				specList: [{
					id: 1,
					name: '规格'
				}],
				specChildList: []
			};
		},
		components: {
			uniPopup,
			simpleModal,
			uParse,
			uniSection,
			uniGoodsNav
		},

		onShow: function() {
			this.copyTklStatus = false;
		},
		onLoad: function(e) {
			_self = this;
			if (e.id) {
				this.id = e.id;
				this.type = e.type;
				if (e.miaosha == 1) {
					this.miaosha = e.miaosha;
					this.secondKillId = e.id;
					this.secondKillTimeId = e.type;
				}
				console.log('id=' + e.id)
				console.log('type=' + e.type)
				console.log('miaosha=' + e.miaosha)
				this.loadGoodsInfo();
			} else {
				console.log(e)
				console.log(e.scene)
				var scene = decodeURIComponent(e.scene).split('&')
				console.log(scene)
				var id = scene[0].split('=')[1] // 3736
				var type = scene[1].split('=')[1] // 3736
				var miaosha = scene[2].split('=')[1] // 3736
				console.log('id=' + id)
				console.log('type=' + type)
				console.log('miaosha=' + miaosha)
				if (scene && id && type) {
					this.id = id;
					this.type = type;
					if (miaosha == 1) {
						this.miaosha = miaosha;
						this.secondKillId = id;
						this.secondKillTimeId = type;
					}

					this.loadGoodsInfo();
				} else {
					uni.navigateBack();
				}
			}
		},

		onPageScroll: function(e) {
			if (e.scrollTop > 200) {
				this.scrollTop = true;
			} else {
				this.scrollTop = false;
			}
		},
		onNavigationBarButtonTap: function() {
			this.navBarButton = !this.navBarButton;
		},
		methods: {
			loadGoodsInfo: function() {
				console.log(this.miaosha);
				if (this.miaosha == 1) {
					var goodsinfo = 'second_kill/detail';
					var vals = {
						id: this.id,
						secondKillTimeId: this.type
					};
					var xxx = this.$Request.topost1(goodsinfo, vals);
				} else {
					var goodsinfo = this.$api.goods.goodsinfo;
					var vals = {
						productId: this.id,
						type: this.type
					};
					var xxx = this.$Request.toget1(goodsinfo, vals);
				}
				xxx.then(res => {
					console.log(res);
					if (res.code == 1000) {
						// if (res.data.yprice == undefined) {
						// 	res.data.yprice = res.data.price - res.data.coupon_price;
						// }
						this.goods = res.content;
						this.loadGoods = true;
						this.ccsd = res.content.detail;
						this.isCollect = this.goods.isCollect;
						this.pickUp = this.goods.pickUp;
						this.pickUpAddress = this.goods.pickUpAddress;
						this.minQuantity = this.goods.commodityList[0].minQuantity;
						this.kucunshuliang = this.goods.stock;
						
						console.log('库存：'+this.kucunshuliang)
						
						if (this.goods.orders != null && this.goods.orders != undefined && this.goods.orders != [] && this.goods.orders
							.length > 0) {
							this.shuzi = this.goods.orders.length;
						}
						if (this.goods.type <= 0) {
							this.id = res.content.productId;
						} else {
							this.id = res.content.id;
						}
						console.log('价格', res.content.discountPrice + 'this.goods.type' + this.goods.type + 'this.miaosha' + this.miaosha)
						this.type = res.content.type;
						if (this.miaosha == 1) {
							this.guigePrice = res.content.discountPrice;
						} else {
							if (this.goods.type == 0) {
								this.guigePrice = res.content.discountPrice;
							} else {
								this.guigePrice = res.content.returnValue;
								this.guigePrice = res.content.discountPrice;
							}
						}

						if (this.goods.orders.length > 0) {
							if (this.goods.orders.length % 2 != 0) {
								this.goodsorder = this.goodsorder.concat(this.goods.orders)
								this.goodsorder = this.goodsorder.concat(this.goods.orders)
							} else {
								this.goodsorder = this.goodsorder.concat(this.goods.orders)
							}
							let len = this.goodsorder.length;
							let n = 2; //假设每行显示4个
							let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
							let res = [];
							for (let i = 0; i < lineNum; i++) {
								let temp = this.goodsorder.slice(i * n, i * n + n);
								res.push(JSON.parse(JSON.stringify(temp)));
							}
							console.log(res);
							this.goodsorder = res;
							console.log(this.goodsorder);

						}



						console.log('规格价格', this.guigePrice)
						if (this.goods.isCollect == 1) {
							_self.options = [{
									icon: 'home-filled',
									text: '回首页',
									color: '#ffa200'
								}, {
									icon: 'headphones',
									text: '客服',
									color: '#646566'
								},
								{
									icon: 'star-filled',
									text: '已收藏',
									color: '#ffa200'
								}
							];
						}
						console.log('aaaaa', this.goods.type);
						this.buttonGroup = [{
							text: '立即购买',
							backgroundColor: '#ffa200',
							color: '#fff'
						}];

						// 0周期狗1单品2套餐,-1单品团购,-2套餐团购,-3周期狗团购
						if (this.goods.type == 0) {
							this.good_type_name = '周期购';
							this.ispintuan = '售'
						} else if (this.goods.type == 1) {
							this.good_type_name = '单品';
							this.ispintuan = '售'
						} else if (this.goods.type == 2) {
							this.good_type_name = '套餐';
							this.ispintuan = '售'
						} else if (this.goods.type == -1) {
							// this.good_type_name = '单品团购';
							if (this.goods.minAskType == 0) {
								this.good_type_name = this.goods.minAsk + '人成团';
							} else {
								this.good_type_name = this.goods.minAsk + '件成团';
							}
							this.ispintuan = '拼'
							this.taocanqingdan = true;
							this.buttonGroup = [{
									text: '单独购买',
									backgroundColor: '#ffa200',
									color: '#fff'
								},
								{
									text: '开团',
									backgroundColor: '#ff0000',
									color: '#fff'
								}
							];
						} else if (this.goods.type == -2) {
							this.good_type_name = '套餐团购';
							this.ispintuan = '拼'
							this.taocanqingdan = true;
							this.buttonGroup = [{
									text: '单独购买',
									backgroundColor: '#ffa200',
									color: '#fff'
								},
								{
									text: '开团',
									backgroundColor: '#ff0000',
									color: '#fff'
								}
							];
						} else if (this.goods.type == -3) {
							this.good_type_name = '周期购团购';
							this.ispintuan = '拼'
							this.taocanqingdan = true;
							this.buttonGroup = [{
									text: '单独购买',
									backgroundColor: '#ffa200',
									color: '#fff'
								},
								{
									text: '开团',
									backgroundColor: '#ff0000',
									color: '#fff'
								}
							];
						} else {
							this.ispintuan = '售'
							this.good_type_name = '单品';
						}


						if (this.type != 0) {
							this.goods.commodityList.forEach(item => {
								if (this.miaosha == 1) {
									var x = {
										id: item.id,
										name: item.name,
										groupBuyPrice: item.groupBuyPrice,
										imageUrl: item.imageUrl,
										price: item.secondKillPrice,
										pid: 1
									}
								} else {
									var x = {
										id: item.id,
										name: item.name,
										groupBuyPrice: item.groupBuyPrice,
										imageUrl: item.imageUrl,
										price: item.price,
										pid: 1
									}
								}

								this.specChildList.push(x);
							});
						}

					} else {
						uni.navigateBack();
					}
				});
			},

			huishouye() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},

			shoucang() {

				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}

				if (this.isCollect == 0) {
					this.$Request.topost(this.$api.goods.collect_deal, {
						productId: this.id,
						collect: true
					}).then(res => {
						console.log(res);
						if (res.code == 1000) {
							this.isCollect = 1;
							this.options = [{
									icon: 'home-filled',
									text: '回首页',
									color: '#ffa200'
								},
								{
									icon: 'headphones',
									text: '客服',
									color: '#646566'
								},
								{
									icon: 'star-filled',
									text: '已收藏',
									color: '#ffa200'
								}
							];
						}
					})
				} else {
					this.$Request.topost(this.$api.goods.collect_deal, {
						productId: this.id,
						collect: false
					}).then(res => {
						console.log(res);
						if (res.code == 1000) {
							this.isCollect = 0;
							this.options = [{
									icon: 'home-filled',
									text: '回首页',
									color: '#ffa200'
								},
								{
									icon: 'headphones',
									text: '客服',
									color: '#646566'
								},
								{
									icon: 'starhalf',
									text: '去收藏',
									color: '#646566'
								}
							];
						}
					})
				}
			},

			onClick(e) {
				console.log(e)
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				});
			},
			buttonClicktuan(e, countt, itemss) {
				this.itemss = itemss;
				this.goid = countt;
				this.show = true
			},
			cancel(type) {
				this.show = false
			},
			change(e) {


			},
			change1(value) {
				console.log(value);
				this.numberValue = value;
				
			},
			guanbipop() {
				this.show = false
			},
			onShareinfos(e, countt, itemss) {
				this.show = false
				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}

				if (this.type == 0) {
					this.id = this.goods.productId;
					uni.navigateTo({
						url: '/pages/order/createOrder?id=' + this.id + '&type=' + this.type + '&guige_id=0' + '&buy_type=0' +
							'&miaosha=' + this.miaosha + '&secondKillId=' + this.secondKillId + '&secondKillTimeId=' + this.secondKillTimeId+'&numberValue='+this.numberValue
					});
					return;
				}

				this.specChildList = [];
				if (this.type != 0) {
					this.goods.commodityList.forEach(item => {
						if (this.miaosha == 1) {
							var x = {
								id: item.id,
								name: item.name,
								groupBuyPrice: item.groupBuyPrice,
								imageUrl: item.imageUrl,
								price: item.secondKillPrice,
								pid: 1
							}
						} else {
							var x = {
								id: item.id,
								name: item.name,
								groupBuyPrice: item.groupBuyPrice,
								imageUrl: item.imageUrl,
								price: item.price,
								pid: 1
							}
						}
						if (e == 1 && x.groupBuyPrice == undefined) {

						} else {
							this.specChildList.push(x);
						}
					});
				}
				this.toggleSpec(1);
				this.navsel = this.goid + 100;
			},

			buttonClick(e) {

				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}

				if (this.type == 0) {
					this.id = this.goods.productId;
					uni.navigateTo({
						url: '/pages/order/createOrder?id=' + this.id + '&type=' + this.type + '&guige_id=0' + '&buy_type=0' +
							'&miaosha=' + this.miaosha + '&secondKillId=' + this.secondKillId + '&secondKillTimeId=' + this.secondKillTimeId+'&numberValue='+this.numberValue
					});
					return;
				}
				console.log(e);
				this.specChildList = [];
				if (this.type != 0) {
					this.goods.commodityList.forEach(item => {
						if (this.miaosha == 1) {
							var x = {
								id: item.id,
								name: item.name,
								groupBuyPrice: item.groupBuyPrice,
								imageUrl: item.imageUrl,
								price: item.secondKillPrice,
								pid: 1
							}
						} else {
							var x = {
								id: item.id,
								name: item.name,
								groupBuyPrice: item.groupBuyPrice,
								imageUrl: item.imageUrl,
								price: item.price,
								pid: 1
							}
						}
						if (e.index == 1 && x.groupBuyPrice == undefined) {

						} else {
							this.specChildList.push(x);
						}
					});
				}
				console.log(this.specChildList)
				this.toggleSpec(e.index);
				this.navsel = e.index;
			},

			youhuiquan() {

				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}

				console.log('yhq');
				uni.navigateTo({
					url: '/pages/category/lingyhq?productId=' + this.id
				});
			},

			preview(src, e) {
				// do something
				console.log(src);
			},
			navigate(href, e) {
				console.log(href);
				// do something
			},
			moveHandleStop: function() {
				console.log('111');
			},
			showShopCartBg: function(type) {
				if (type == 'cart') {
					this.shopCartBg = !this.shopCartBg;
				}
				if (type == 'nav') {
					this.navBarButton = !this.navBarButton;
				}
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			navBarButtontO: function(type) {
				console.log(type);
			},
			shopCartShare: function(type) {
				// tkl = 淘口令  picture = 图片
				if (type == 'tkl') {
					this.showShopCartBg('cart'); // 隐藏弹出的内容
					this.copyTklStatus = false;
					this.$refs.simpleModalTkl.show({
						showConfirmButton: false
					});
				} else if (type == 'tklbuy') {
					// 淘口令购买
					this.copyTklStatus = false;
					this.$refs.simpleModalTklBuy.show({
						showConfirmButton: false
					});
				}
			},
			//选择规格
			selectSpec(index, pid) {



				let list = this.specChildList;
				console.log('选择规格');
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				});

				this.$set(list[index], 'selected', true);
				console.log(list[index]);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.guige_id = index;
						this.specSelected.push(item);
						// this.guigePrice=this.specSelected[index].price
					}
				});

				this.guige = this.specSelected[0].name;
				if (this.navsel == 0) {
					this.guigePrice = this.specSelected[0].price
				} else {
					this.guigePrice = this.specSelected[0].groupBuyPrice
				}

				console.log(this.specSelected[0]);
			},
			toggleSpecOk() {

				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}

				if (this.type == 0) {
					this.id = this.goods.productId;
				}
				let guige_id = this.guige_id;
				let guige = this.guige;
				let minQuantity = this.goods.commodityList[0].minQuantity;
				console.log(guige_id + '-------' + guige + '------' + minQuantity);
				this.toggleSpec(0);
				uni.navigateTo({
					url: '/pages/order/createOrder?id=' + this.id + '&type=' + this.type + '&guige_id=' + this.guige_id +
						'&buy_type=' + this.navsel + '&miaosha=' + this.miaosha + '&secondKillId=' + this.secondKillId +
						'&secondKillTimeId=' + this.secondKillTimeId+'&numberValue='+this.numberValue
				});
			},
			//规格弹窗开关
			toggleSpec(index) {
				console.log(index);
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none' || this.specClass === 'hide') {
					this.specClass = 'show';
					//默认选择
					let list = this.specChildList;
					list.forEach(item => {
						this.$set(item, 'selected', false);
					});

					this.$set(list[0], 'selected', true);
					console.log(list[0]);
					//存储已选择
					/**
					 * 修复选择规格存储错误
					 * 将这几行代码替换即可
					 * 选择的规格存放在specSelected中
					 */
					this.specSelected = [];
					list.forEach(item => {
						if (item.selected === true) {
							this.guige_id = 0;
							this.specSelected.push(item);
						}
					});
					this.guige = this.specSelected[0].name;
					if (index == 0) {
						this.guigePrice = this.specSelected[0].price;
					} else {
						this.guigePrice = this.specSelected[0].groupBuyPrice;
					}

				}
			},
			stopPrevent: function() {},
			TklmaskClose: function(e) {
				this.$refs.simpleModalTkl.hide();
				this.copyTklStatus = false;
			},
			copyTklWenAn: function() {
				uni.setClipboardData({
					data: '复制内容测试！',
					success: r => {
						this.copyTklStatus = true;
					}
				});
			},
			TklBuymaskClose: function() {
				this.$refs.simpleModalTklBuy.hide();
				this.copyTklStatus = false;
			},

			onShareinfo(res) {

				var token = uni.getStorageSync('authorization');
				if (token == '' || token == null) {
					uni.showModal({
						cancelText: '取消登录',
						confirmText: '立即登录',
						title: '提示',
						content: '是否确定授权登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../myinfo/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.showLoading({
					title: '数据生成中...'
				})
				uni.request({
					url: this.$api_url + '/user/createPoster', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': uni.getStorageSync('authorization') //自定义请求头信息
					},
					data: {
						'productId': this.miaosha == 1 ? '' : '' + this.id,
						'type': this.miaosha == 1 ? '' : '' + this.type,
						'secondKillId': this.miaosha == 1 ? '' + this.secondKillId : '',
						'secondKillTimeId': this.miaosha == 1 ? '' + this.secondKillTimeId : '',
						'path': 'pages/detail/goodsinfo?id=' + this.id + '&type=' + this.type + '&miaosha=' + this.miaosha
					},
					success: res => {
						console.log(res)
						if (res.data.code == 1000) {
							var appimage = res.data.content;
							var strid = this.miaosha == 1 ? '' + this.secondKillId : '' + this.id
							var strtype = this.miaosha == 1 ? '' + this.secondKillTimeId : '' + this.type
							console.log('+++' + strid)
							console.log('+++' + strtype)
							uni.navigateTo({
								url: '/pages/videoshare/new_file?imgurl=' + appimage + '&shareimg=' + this.goods.imageUrls[0].url +
									'&sharebiaoti=' + this.goods.title + '(抢购价：￥' + this.guigePrice + ')&id=' + strid + '&type=' + strtype +
									'&miaosha=' + this.miaosha

							});

						}
					},
					complete: function(e) {
						uni.hideLoading();
					}
				});

				//   if (res.from === 'button') {// 来自页面内分享按钮
				//       console.log(res.target)
				//     }



				// uni.showShareMenu({
				// 	withShareTicket: true
				// })
				// return {

				// 	title: '' + _self.goods.title+'(抢购价：￥'+_self.guigePrice+')',
				// 	path: '/pages/myinfo/login',
				// 	success: res => {
				// 		console.log('--- 转发回调 ---', res);
				// 		//onShareAppMessage回调的shareTickets，如果没有，就说明不是转发到群聊的
				// 		console.log('--- shareTickets ---', res.shareTickets);
				// 		//转发到群里的才会有shareTickets
				// 		if (res.shareTickets && res.shareTickets[0]) {
				// 			//获取转发的详细信息
				// 			uni.getShareInfo({
				// 				shareTicket: res.shareTickets[0],
				// 				success: res => {
				// 					console.log('--- 错误信息 ---', res.errMsg);
				// 					console.log('--- 包括敏感数据在内的完整转发信息的加密数据 ---', res.encryptedData);
				// 					console.log('--- 错误信息 ---', res.iv);
				// 				},
				// 				fail: error => {
				// 					console.log('--- getShareInfo fail ---', error);
				// 				}
				// 			})
				// 		}
				// 	},
				// 	fail: () => {
				// 		console.log('--- 转发失败 ---', path);
				// 	}
				// }
			}
		}
	};
</script>

<style>
	@import '../../static/css/index.css';

	.index-goods {
		background-color: #ffffff;
	}

	.swiper-container {
		min-height: 100vw;
	}

	.swiper-wrapper {
		width: 100%;
	}

	.coupon-price {
		background-image: linear-gradient(to right, #ff651a, #f02323);
		display: flex;
		flex-direction: row;
		padding: 0 20rpx;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}

	.coupon-price .price {
		-webkit-flex: 1;
		flex: 1;
	}

	.coupon-price .price .discountPrice {
		font-size: 34rpx;
		margin-right: 10rpx;
	}

	.coupon-price .price .originalPrice {
		text-decoration: line-through;
	}

	.coupon-price .volume {
		-webkit-flex: 1;
		flex: 1;
		text-align: right;
	}

	.goods-jiayipeishi {
		border-top: 2rpx solid #dedede;
		border-bottom: 2rpx solid #dedede;
		height: 80rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		line-height: 80rpx;
		color: #666666;
	}

	.goods-jiayipeishi text {
		margin-right: 10rpx;
	}

	.youhuiquan {
		height: 80rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		line-height: 80rpx;
		font-weight: 600;
		color: #000000;
		/* display: flex;
	flex-direction: row; */
		position: relative;
	}

	.youhuiquan text {
		/* flex: 1; */
	}

	.youhuiquan .youhuiquan-to {
		/* flex: 1; */
		position: absolute;
		z-index: 1;
		zoom: 1;
		right: 20rpx;
		top: 50%;
		margin-top: -40rpx;
	}

	.liucheng {
		width: 100%;
	}

	.liucheng image {
		width: 100%;
	}

	.qingdantitle {
		height: 80rpx;
		padding: 0 20rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		color: #000000;
		border-bottom: 2rpx solid #f5f5f5;
	}

	.qingdan {
		width: 96%;
		display: flex;
		flex-direction: row;
		font-size: 32rpx;
		padding: 20rpx;
	}

	.qingdan .qingdanimage {
		flex: 1;
	}

	.qingdan .qingdanimage image {
		width: 200rpx;
		height: 200rpx;
	}

	.qingdan .qingdaninfo {
		flex: 2;
		display: flex;
		flex-direction: column;
	}

	.qingdan .qingdaninfo .qingdaninfo-name {
		height: 60rpx;
		line-height: 30rpx;
		text-align: left;
		overflow: hidden;
	}

	.qingdan .qingdaninfo .qingdaninfo-quantity {
		flex: 1;
		text-align: right;
		font-size: 30rpx;
		color: red;
	}

	.qingdan .qingdaninfo .qingdaninfo-guige {
		height: 80rpx;
		line-height: 40rpx;
		text-align: left;
		overflow: hidden;
	}

	.shangjia {
		width: 96%;
		margin: 20rpx auto;
		display: flex;
		flex-direction: row;
	}

	.shangjia .shangjiaimage {
		flex: 1;
	}

	.shangjia .shangjiaimage image {
		width: 100rpx;
		height: 100rpx;
		display: inline-block;
		vertical-align: middle;
		margin: 25rpx;
	}

	.shangjia .shangjiainfo {
		flex: 3;
	}

	.shangjia .shangjiainfo .shangjianame {
		flex: 1;
		font-size: 32rpx;
		font-weight: 700;
		color: #000000;
	}

	.shangjia .shangjiainfo .shangjianame image {
		width: 38rpx;
		height: 38rpx;
		vertical-align: middle;
	}

	.shangjia .shangjiainfo .shangjiastar {
		flex: 1;
	}

	.shangjia .shangjiainfo .shangjiastar image {
		flex: 1;
		width: 150rpx;
		vertical-align: middle;
	}

	.shangjia .shangjiainfo .shangpinshuliang {
		font-size: 26rpx;
	}

	.shangjia .jindianguangguang {
		flex: 2;
		position: relative;
	}

	.shangjia .jindianguangguang text {
		display: inline-block;
		padding: 4rpx;
		border: 1px solid #dedede;
		border-radius: 8rpx;
		font-size: 30rpx;
		position: absolute;
		top: 50%;
		right: 0;
		margin-top: -33rpx;
	}

	.goods-info-title {
		text-align: left !important;
		font-weight: 700;
		padding-left: 20rpx;
	}

	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	.uni-tab__cart-button-left {
		margin: 0 20px !important;
	}

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #ffffff;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007aff;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.button_kefu::after {
		display: none !important;
	}
</style>

<style lang="scss">
	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 50upx;
				min-width: 60upx;
				padding: 0 40upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				background: #edfff3;
				color: #49b76d;
				border: 1rpx solid #49b76d;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			min-height: 40vh;
			width: 100%;
			box-sizing: border-box;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: #49b76d;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 50upx auto 20upx;
			}
		}
	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 30upx 30upx 30upx 25upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}
		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 28upx;
			color: #333;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				// color: $base-color;
			}

			&.red {
				// color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
