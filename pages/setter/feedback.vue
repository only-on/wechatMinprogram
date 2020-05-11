<template>
	<view class="page">
		<view class='feedback-title'>
			<text>问题和意见</text>
			<text class="feedback-quick" @tap="chooseMsg">快速键入</text>
		</view>
		<view class="feedback-body">
			<textarea placeholder="请详细描述你的问题和意见..." v-model="sendDate.content" class="feedback-textare" />
			</view>
        <view class='feedback-title'>
            <text>图片(选填,提供问题截图,总大小10M以下)</text>
        </view>
        <view class="feedback-body feedback-uploader">
            <view class="uni-uploader">
                <view class="uni-uploader-head">
                    <view class="uni-uploader-title">点击预览图片</view>
                    <view class="uni-uploader-info">{{imageList.length}}/3</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files">
                        <block v-for="(image,index) in imageList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image class="uni-uploader__img" :src="image" @tap="previewImage(index)"></image>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-if="imageList.length < 3">
                        	<view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
      
        <button type="default" class="feedback-submit" style="margin-top: 100rpx; color: #FFFFFF; background-color: #65c186;" @tap="send">提交</button>
       
    </view>
</template>

<script>
	var that;
    export default {
        data() {
            return {
                msgContents: ["界面显示错乱", "启动缓慢，卡出翔了", "UI无法直视，丑哭了", "偶发性崩溃"],
                imageList: [],
				 strimageList: [],
                sendDate: {
                    content: ""
                }
            }
        },
        onLoad() {
          that=  this;
        },
        methods: {
            close(e){
                that.imageList.splice(e,1);
            },
            chooseMsg() { //快速输入
                uni.showActionSheet({
                    itemList: that.msgContents,
                    success: (res) => {
                        that.sendDate.content = that.msgContents[res.tapIndex];
                    }
                })
            },
            chooseImg() { //选择图片
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    sizeType: "compressed",
                    count: 3 - that.imageList.length,
                    success: (res) => {
                        that.imageList = that.imageList.concat(res.tempFilePaths);
					
						that.strimageList =[];
							for (var i = 0; i < that.imageList.length; i++) {
								uni.uploadFile({
								   url: that.$api_url + '/file/image_upload',
								   filePath: that.imageList[i],
								   name: 'upload_file',
								   header: {
								   	'Content-Type': 'application/x-www-form-urlencoded',
								   	'authorization': uni.getStorageSync('authorization') //自定义请求头信息
								   },
								   success: (res) => {
									   var json=JSON.parse(res.data)
								       if (json.code == 1000) {
										   console.log(json);
										   that.strimageList = that.strimageList.concat(json.content.url);
								       }
								   },
								    fail: (res) => {
								        console.log(res)
								    }
								});
							}
                    }
                })
            },
           
            previewImage(index) { //预览图片
                uni.previewImage({
                    urls: that.imageList,
					current:that.imageList[index]
                });
            },
            send() { //发送反馈
            
				if(""==that.sendDate.content){
					uni.showToast({
						title:'请输入意见'
					})
					return
				}
				uni.showLoading({
					title:'数据提交中...'
				})
				
               uni.request({
                   url: that.$api_url+'/user/feedback',
                  method: 'POST',
				  header:{
					  'Content-Type':'application/x-www-form-urlencoded',
				  	'authorization': uni.getStorageSync('authorization') //自定义请求头信息
				  },
                  data: {
                  	opinion: that.sendDate.content,
                  	imageUrls: that.strimageList
                  },
                 
                   success: (res) => {
					   console.log(res)
					   uni.hideLoading();
                       if (res.data.code == 1000) {
                           uni.showToast({
                               title: "反馈成功!"
                           });
                          
						   setTimeout(function () {
							   uni.navigateBack({
							       delta: 1
							   });
						   }, 1000);
                       }
                   },
                    fail: (res) => {
                        console.log(res)
						 uni.hideLoading();
                    }
                });
            }
        }
    }
</script>

<style>
    page {
        background-color: #EFEFF4;
    }

    .input-view {
        font-size: 28upx;
    }
    .close-view{
        text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px;
    }
</style>
