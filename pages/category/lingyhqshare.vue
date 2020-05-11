<template>
	<view>
		<view class="content">
			<view class="mask">
				<view v-if="coupon1List.length == 0" style="width: 100%; height: 500upx; text-align: center;line-height: 500upx;">暂无可使用的优惠券</view>
				<view class="mask-content">
					<view v-for="(item, index) in coupon1List" :key="index">
						<view
							class="coupon-item"
							v-if="item.take == false"
							style="background-image: url(https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/06/8cc27a7cbc3af0888be4542f069e9452.png); background-size: 100% 100%; height: 150rpx;"
						>
							<!-- https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/08/c22908d0c3dbc6358bf6990cae151619.png -->
							<view style="display: flex; flex-direction: row;">
								<view class="right" style="flex: 3; margin-top: 20rpx; color: #ffffff;">
									<text class="price" style="color: #ffffff;">{{ item.money }}</text>
									<text style="color: #ffffff; font-size: 24rpx;">满{{ item.minGoodsAmount }}元可使用</text>
								</view>
								<view style="flex: 5; margin-top: 30rpx; padding-left: 30rpx;">
									<text class="title" style="color: #ffffff; font-size: 34rpx;">{{ item.name }}</text>
								</view>
								<text
									style="flex: 3; background-color: #ffffff;color: red; width: 120rpx; height: 60rpx; border-radius: 10rpx;text-align: center;margin-top: 40rpx;line-height: 60rpx; margin-right: 20rpx;"
									@click="duihuan(item)"
								>
									领用
								</text>
							</view>
						</view>
						<view
							class="coupon-item"
							v-if="item.take == true"
							style="background-image: url(https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/08/c22908d0c3dbc6358bf6990cae151619.png); background-size: 100% 100%; height: 150rpx;"
						>
							<!-- https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/08/c22908d0c3dbc6358bf6990cae151619.png -->
							<view style="display: flex; flex-direction: row;">
								<view class="right" style="flex: 3; margin-top: 20rpx;color: #ffffff;">
									
									
									<text class="price" style="color: #ffffff;">{{ item.money }}</text>
									<text style="color: #ffffff; font-size: 24rpx;">满{{ item.minGoodsAmount }}元可使用</text>
								</view>
								<view style="flex: 5; margin-top: 30rpx; padding-left: 30rpx;">
									<text class="title" style="color: #ffffff; font-size: 34rpx;">{{ item.name }}</text>
								</view>
								<view
									style="flex: 3; color: red; width: 120rpx; height: 60rpx; border-radius: 10rpx;text-align: center;margin-top: 40rpx;line-height: 60rpx; margin-right: 20rpx;">
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			textinfo: 2,
			productId: 0,
			couponList: [],
			coupon1List: []
		};
	},
	onLoad: function(e) {
		that = this;
		that.productId = e.id;
	},
	onShow() {
		this.getlist();
	},
	methods: {
	
		duihuan(item) {
			var that = this;
			uni.request({
				url: this.$api_url + '/bonus/take', //仅为示例，并非真实接口地址。
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					authorization: uni.getStorageSync('authorization') //自定义请求头信息
				},
				data: {
					bonusId: item.id,
					productId: that.productId
				},
				success: res => {
					if (res.data.code == 1000) {
						uni.showToast({
							title: '领取成功'
						});
					}
					that.getlist();
				}
			});
		},

		getlist() {
			var that = this;
			that.coupon1List = [];
			that.couponList = [];
			uni.request({
				url: this.$api_url + '/bonus/take/share', //仅为示例，并非真实接口地址。
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					authorization: uni.getStorageSync('authorization') //自定义请求头信息
				},
				data: {
					productId: that.productId
				},
				success: res => {
					if (res.data.code == 1000) {
						
						if (res.data.content.bonusList != null && res.data.content.bonusList != []) {
							that.coupon1List = res.data.content.bonusList;
						}
						console.log(that.coupon1List)
						
						if (res.data.content.productList != null && res.data.content.productList != []) {
							that.coupon1List = that.coupon1List.concat(res.data.content.productList);
						}
						
						console.log(that.coupon1List)
						// that.coupon1List = res.data.content.bonusList;
						// that.couponList = res.data.content.productList;
						// if(that.couponList!=null&&that.couponList!=[]){
						// 	// _self.lists = _self.lists.concat(res.data.content);
						// 	that.coupon1List=that.coupon1List.concat(that.couponList);
						// }
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #f7f7f7;
}

view {
	font-size: 28upx;
	line-height: inherit;
}

.example {
	padding: 0 30upx 30upx;
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
	border-bottom: 1px #f5f5f5 solid;
}

.example-title__after {
	position: relative;
	color: #031e3c;
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
	background-color: #ccc;
}

.example .example-title {
	margin: 40upx 0;
}

.example-body {
	padding: 30upx;
	background: #fff;
}

.example-info {
	padding: 30upx;
	color: #3b4144;
	background: #fff;
}

.uni-common-mt {
	margin-top: 20upx;
}

.content {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	flex: 1;
}

.color-tag {
	width: 50upx;
	height: 50upx;
}

uni-radio-group uni-label {
	padding: 0;
}

.uni-list-item__container {
	padding: 24upx 30upx;
	width: 100%;
	box-sizing: border-box;
	flex: 1;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.uni-list-item__container:after {
	position: absolute;
	z-index: 3;
	right: 0;
	bottom: 0;
	left: 30upx;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.example-body {
	padding: 0;
}

/* 优惠券面板 */
.mask {
	// display: flex;
	// align-items: flex-end;
	// position: fixed;
	// left: 0;
	// top: var(--window-top);
	// bottom: 0;
	width: 100%;
	// background: rgba(0, 0, 0, 0);
	// z-index: 9995;
	// transition: 0.3s;

	.mask-content {
		width: 100%;
		// min-height: 30vh;
		// max-height: 70vh;
		background: #f3f3f3;
		// transform: translateY(100%);
		// transition: 0.3s;
		overflow-y: scroll;
	}

	&.none {
		display: none;
	}

	&.show {
		background: rgba(0, 0, 0, 0.4);

		.mask-content {
			transform: translateY(0);
		}
	}
}

.uni-list .uni-list-item:last-child {
}

/* 优惠券列表 */
.coupon-item {
	display: flex;
	flex-direction: column;
	margin: 20upx 24upx;
	background: #fff;
	text-align: left;

	.con {
		display: flex;
		align-items: center;
		position: relative;
		height: 120upx;
		padding: 0 30upx;

		&:after {
			position: absolute;
			left: 0;
			bottom: 0;
			content: '';
			width: 100%;
			height: 0;
			border-bottom: 1px dashed #f3f3f3;
			transform: scaleY(50%);
		}
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		overflow: hidden;
		height: 100upx;
	}

	.title {
		font-size: 32upx;
		color: $font-color-dark;
		margin-bottom: 10upx;
	}

	.time {
		font-size: 24upx;
		color: $font-color-light;
	}

	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: $font-color-base;
		height: 100upx;
	}

	.price {
		font-size: 44upx;
		color: $base-color;

		&:before {
			content: '￥';
			font-size: 34upx;
		}
	}

	.tips {
		font-size: 24upx;
		color: $font-color-light;
		line-height: 60upx;
		padding-left: 30upx;
		float: left;
		width: 40%;
		display: flex;
	}

	.tips1 {
		float: right;
		width: 27%;
		font-size: 24rpx;
		color: red;
		line-height: 45rpx;
		display: block;
		border-radius: 50rpx;
		background: #ff0000;
		color: #ffffff;
		margin-top: 7rpx;
		margin-right: 20rpx;
		text-align: center;
	}

	.circle {
		position: absolute;
		left: -6upx;
		bottom: -10upx;
		z-index: 10;
		width: 20upx;
		height: 20upx;
		background: #f3f3f3;
		border-radius: 100px;

		&.r {
			left: auto;
			right: -6upx;
		}
	}
}
</style>
