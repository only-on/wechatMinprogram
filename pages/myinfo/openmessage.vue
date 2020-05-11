<template>
	<view class="content">
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#f56b6b'
					}
				},
				url:''
			}
		},
		onLoad: function(e) {
			that = this;
			that.url=e.url;
		},
		onShow: function(res) {

		},
		methods: {

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
	}
</style>
