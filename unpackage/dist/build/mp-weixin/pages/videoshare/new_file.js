(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/videoshare/new_file"],{"018f":function(o,n,t){"use strict";(function(o){t("c6bf"),t("921b");e(t("66fd"));var n=e(t("a1a4"));function e(o){return o&&o.__esModule?o:{default:o}}o(n.default)}).call(this,t("543d")["createPage"])},"06ec":function(o,n,t){"use strict";(function(o){var e;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){t.e("components/uni-popup/uni-popup").then(function(){return resolve(t("5662"))}.bind(null,t)).catch(t.oe)},c=function(){Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(function(){return resolve(t("0494"))}.bind(null,t)).catch(t.oe)},s={components:{uniPopup:i,uniIcons:c},data:function(){return{img:"",shareimg:"",sharebiaoti:"",id:"",type:"",miaosha:"",showcoupon:0,couponList:[],coupon1List:[],show:!1,closeurl:"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/04/23/7569e0f79866a97e4dafd1c484b8924f.png"}},onLoad:function(o){e=this,e.img=o.imgurl,e.shareimg=o.shareimg,e.sharebiaoti=o.sharebiaoti,e.id=o.id,e.type=o.type,e.miaosha=o.miaosha},onShow:function(n){1==e.showcoupon&&(e.showcoupon=0,e.coupon1List=[],e.couponList=[],o.request({url:this.$api_url+"/bonus/take/share",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",authorization:o.getStorageSync("authorization")},data:{productId:e.id},success:function(o){1e3==o.data.code&&(console.log(o),null!=o.data.content.bonusList&&o.data.content.bonusList!=[]&&(e.coupon1List=o.data.content.bonusList),console.log(e.coupon1List),null!=o.data.content.productList&&o.data.content.productList!=[]&&(e.coupon1List=e.coupon1List.concat(o.data.content.productList)),console.log(e.coupon1List),console.log(e.coupon1List.length),e.coupon1List.length>0&&e.togglePopup())}}))},onShareAppMessage:function(n){return e.showcoupon=1,o.showShareMenu({withShareTicket:!0}),{title:""+e.sharebiaoti,imageUrl:e.shareimg,path:"/pages/detail/goodsinfo?id="+this.id+"&type="+this.type+"&miaosha="+this.miaosha,success:function(n){console.log("--- 转发回调 ---",n),console.log("--- shareTickets ---",n.shareTickets),n.shareTickets&&n.shareTickets[0]&&o.getShareInfo({shareTicket:n.shareTickets[0],success:function(o){console.log("--- 错误信息 ---",o.errMsg),console.log("--- 包括敏感数据在内的完整转发信息的加密数据 ---",o.encryptedData),console.log("--- 错误信息 ---",o.iv)},fail:function(o){console.log("--- getShareInfo fail ---",o)}})},fail:function(){console.log("--- 转发失败 ---",path)},complete:function(o){console.log("--- 转发结束 ---",o)}}},methods:{logoTime:function(n){console.log("长按"),o.downloadFile({url:e.img,success:function(n){console.log("分享海报"+n.tempFilePath),200===n.statusCode&&o.saveImageToPhotosAlbum({filePath:n.tempFilePath,success:function(o){var n=o.savedFilePath;console.log("分享海报保存成功"+n)}})},fail:function(o){console.log(o)}})},togglePopup:function(){this.show=!0},cancel:function(o){this.show=!1},change:function(o){},guanbipop:function(){this.show=!1},golingqu:function(){o.navigateTo({url:"../category/lingyhqshare?id="+e.id}),this.show=!1}}};n.default=s}).call(this,t("543d")["default"])},5136:function(o,n,t){},"66ca":function(o,n,t){"use strict";var e={"uni-popup":function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"5662"))}},i=function(){var o=this,n=o.$createElement;o._self._c},c=[];t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return c})),t.d(n,"a",(function(){return e}))},7970:function(o,n,t){"use strict";var e=t("5136"),i=t.n(e);i.a},"978e":function(o,n,t){"use strict";t.r(n);var e=t("06ec"),i=t.n(e);for(var c in e)"default"!==c&&function(o){t.d(n,o,(function(){return e[o]}))}(c);n["default"]=i.a},a1a4:function(o,n,t){"use strict";t.r(n);var e=t("66ca"),i=t("978e");for(var c in i)"default"!==c&&function(o){t.d(n,o,(function(){return i[o]}))}(c);t("7970");var s,a=t("f0c5"),u=Object(a["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],s);n["default"]=u.exports}},[["018f","common/runtime","common/vendor"]]]);