(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/lingyhqshare"],{"572e":function(t,n,o){},"57d4":function(t,n,o){"use strict";var e,u=function(){var t=this,n=t.$createElement;t._self._c},a=[];o.d(n,"b",(function(){return u})),o.d(n,"c",(function(){return a})),o.d(n,"a",(function(){return e}))},"6ba9":function(t,n,o){"use strict";(function(t){o("c6bf"),o("921b");e(o("66fd"));var n=e(o("c7e7"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},"7ffa":function(t,n,o){"use strict";var e=o("572e"),u=o.n(e);u.a},c7e7:function(t,n,o){"use strict";o.r(n);var e=o("57d4"),u=o("e4ba");for(var a in u)"default"!==a&&function(t){o.d(n,t,(function(){return u[t]}))}(a);o("7ffa");var c,i=o("f0c5"),r=Object(i["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);n["default"]=r.exports},d8f6:function(t,n,o){"use strict";(function(t){var o;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{textinfo:2,productId:0,couponList:[],coupon1List:[]}},onLoad:function(t){o=this,o.productId=t.id},onShow:function(){this.getlist()},methods:{duihuan:function(n){var o=this;t.request({url:this.$api_url+"/bonus/take",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",authorization:t.getStorageSync("authorization")},data:{bonusId:n.id,productId:o.productId},success:function(n){1e3==n.data.code&&t.showToast({title:"领取成功"}),o.getlist()}})},getlist:function(){var n=this;n.coupon1List=[],n.couponList=[],t.request({url:this.$api_url+"/bonus/take/share",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",authorization:t.getStorageSync("authorization")},data:{productId:n.productId},success:function(t){1e3==t.data.code&&(null!=t.data.content.bonusList&&t.data.content.bonusList!=[]&&(n.coupon1List=t.data.content.bonusList),console.log(n.coupon1List),null!=t.data.content.productList&&t.data.content.productList!=[]&&(n.coupon1List=n.coupon1List.concat(t.data.content.productList)),console.log(n.coupon1List))}})}}};n.default=e}).call(this,o("543d")["default"])},e4ba:function(t,n,o){"use strict";o.r(n);var e=o("d8f6"),u=o.n(e);for(var a in e)"default"!==a&&function(t){o.d(n,t,(function(){return e[t]}))}(a);n["default"]=u.a}},[["6ba9","common/runtime","common/vendor"]]]);