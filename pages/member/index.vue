<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? (userinfo.avatar || avatarUrl ) : avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{ login ? (userinfo.phone || userinfo.nickName ) : '您未登录' }}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @tap="loginout" v-if="login">
				<text class="list-icon">&#xe614;</text>
				<text class="list-text">退出帐号</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			login: false,
			avatarUrl: '../../static/img/logo.png',
			userinfo: {}
		};
	},
	onShow() {
        console.log( this.$store )
		var hasLogin = this.$store.state.hasLogin;
		this.login = hasLogin;
		if(hasLogin){
			this.userinfo = this.$store.state.userinfo
		}
	},
	methods: {
		...mapMutations(['logout']),
		goLogin() {
			if (!this.login) {
				this.navigateTo('1', true);
			}
		},
		navigateTo(url, hasLogin) {
			if (hasLogin && !this.login) {
				uni.navigateTo({
					url: './login'
				});
			} else {
				uni.navigateTo({
					url: url
				});
			}
		},
		loginout(){
            uni.showModal({
                title:"提示信息",
                content:"您确定退出当前帐号吗？",
                success: (r) => {
                    if(r.confirm){
                        this.logout();
                        var hasLogin = this.$store.state.hasLogin;
                        this.login = hasLogin;
                    }
                }
            })
			
		}
	}
};
</script>

<style>
@font-face {
	font-family: texticons;
	font-weight: normal;
	font-style: normal;
	src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
}

page,
view {
	display: flex;
}

page {
	background-color: #f8f8f8;
}

.center {
	flex-direction: column;
}

.logo {
	width: 750upx;
	height: 240upx;
	padding: 20upx;
	box-sizing: border-box;
	background-color: #d30201;
	flex-direction: row;
	align-items: center;
}

.logo-hover {
	opacity: 0.8;
}

.logo-img {
	width: 150upx;
	height: 150upx;
	border-radius: 150upx;
}

.logo-title {
	height: 150upx;
	flex: 1;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	margin-left: 20upx;
}

.uer-name {
	height: 60upx;
	line-height: 60upx;
	font-size: 38upx;
	color: #ffffff;
}

.go-login.navigat-arrow {
	font-size: 38upx;
	color: #ffffff;
}

.login-title {
	height: 150upx;
	align-items: self-start;
	justify-content: center;
	flex-direction: column;
	margin-left: 20upx;
}

.center-list {
	background-color: #ffffff;
	margin-top: 20upx;
	width: 750upx;
	flex-direction: column;
}

.center-list-item {
	height: 90upx;
	width: 750upx;
	box-sizing: border-box;
	flex-direction: row;
	padding: 0upx 20upx;
}

.border-bottom {
	border-bottom-width: 1upx;
	border-color: #F6F6F6;
	border-bottom-style: solid;
}

.list-icon {
	width: 40upx;
	height: 90upx;
	line-height: 90upx;
	font-size: 32upx;
	color: #d30201;
	text-align: center;
	font-family: texticons;
	margin-right: 20upx;
}

.list-text {
	height: 90upx;
	line-height: 90upx;
	font-size: 32upx;
	color: #555;
	flex: 1;
	text-align: left;
}

.navigat-arrow {
	height: 90upx;
	width: 40upx;
	line-height: 90upx;
	font-size: 34upx;
	color: #555;
	text-align: right;
	font-family: texticons;
}
</style>
