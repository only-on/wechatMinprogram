(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/find/snatch_red_envelope"],{"19cb":function(e,t,n){"use strict";n.r(t);var a=n("e30a"),i=n("6cab");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("bce0");var c,u=n("f0c5"),l=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);t["default"]=l.exports},"62b4":function(e,t,n){"use strict";(function(e){var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{endtime:0,intervalID:0,money:"",state:0,alltime:"",havetime:0,redid:0,strtime:"",tupian1:"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/46a9580491bab41c3c7135f82be4a5b2.jpg",tupian2:"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/bf6952399d86e004b3dd683b6c23073c.jpg",tupian3:"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/7a220e67a85ba4418264d32a50655a54.jpg",tupian4:"https://zzwl1zsxn.oss-cn-hangzhou.aliyuncs.com/images/2020/03/21/488cb264891cedbab6cbbc043871516f.png"}},onLoad:function(e){n=this,n.alltime=e.havetime,n.endtime=e.endtime,n.redid=e.id;var t=(new Date).getTime();n.havetime=Math.floor((new Date(""+n.alltime)-t)/1e3),n.opentime=Math.floor((new Date(""+n.endtime)-t)/1e3),n.havetime>0?n.intervalID=setInterval((function(){if(n.havetime--,n.havetime>0){var e=Math.floor(n.havetime/60),t=n.havetime%60;e=e<10?"0"+e:e,t=t<10?"0"+t:t,n.strtime=e+":"+t}else n.tupian2=n.tupian1,n.state=1,clearInterval(n.intervalID)}),1e3):n.opentime>0?(n.tupian2=n.tupian1,n.state=1):n.state=3},onUnload:function(){console.log("页面卸载"),clearInterval(n.intervalID)},onBackPress:function(){console.log("页面返回...")},methods:{jilu:function(t){e.navigateTo({url:"./wallet"})},openred:function(t){e.showLoading({title:"红包开启中..."}),e.request({url:n.$api_url+"/red_packet/garb",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",authorization:e.getStorageSync("authorization")},data:{redPacketId:n.redid+""},success:function(t){console.log(t),e.hideLoading(),1e3==t.data.code?(n.tupian2=n.tupian3,n.state=2,n.money=""+t.data.content):4041==t.data.code&&e.showModal({content:t.data.message,cancelText:"返回",confirmText:"去查看",success:function(t){t.confirm?e.redirectTo({url:"./wallet"}):t.cancel&&e.navigateBack({delta:1})}})},fail:function(t){console.log(t),e.hideLoading()}})}}};t.default=a}).call(this,n("543d")["default"])},"6cab":function(e,t,n){"use strict";n.r(t);var a=n("62b4"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},bce0:function(e,t,n){"use strict";var a=n("fb13"),i=n.n(a);i.a},e30a:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}))},fb13:function(e,t,n){},ff00:function(e,t,n){"use strict";(function(e){n("c6bf"),n("921b");a(n("66fd"));var t=a(n("19cb"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["ff00","common/runtime","common/vendor"]]]);