(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sl-filter/popup-layer"],{"0086":function(t,a,n){},"287a":function(t,a,n){"use strict";var e,r=function(){var t=this,a=t.$createElement;t._self._c},o=[];n.d(a,"b",(function(){return r})),n.d(a,"c",(function(){return o})),n.d(a,"a",(function(){return e}))},"6a8e":function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={name:"popup-layer",props:{direction:{type:String,default:"top"},autoClose:{type:Boolean,default:!0},isTransNav:{type:Boolean,default:!1},navHeight:{type:Number,default:0}},data:function(){return{ifshow:!1,translateValue:-100,timer:null,iftoggle:!1}},computed:{_translate:function(){if(this.isTransNav){var t={top:"transform:translateY(".concat(-this.translateValue,"%)"),bottom:"transform:translateY(calc(".concat(this.translateValue,"% + ").concat(this.navHeight,"px))"),left:"transform:translateX(".concat(-this.translateValue,"%)"),right:"transform:translateX(".concat(this.translateValue,"%)")};return t[this.direction]}var a={top:"transform:translateY(".concat(-this.translateValue,"%)"),bottom:"transform:translateY(".concat(this.translateValue,"%)"),left:"transform:translateX(".concat(-this.translateValue,"%)"),right:"transform:translateX(".concat(this.translateValue,"%)")};return a[this.direction]},_location:function(){var t={top:"bottom:0px;width:100%;",bottom:"top:0px;width:100%;",left:"right:0px;height:100%;",right:"left:0px;height:100%;"};return t[this.direction]+this._translate}},methods:{show:function(){var t=this;this.ifshow=!0;setTimeout((function(){t.translateValue=0,null}),100),setTimeout((function(){t.iftoggle=!0,null}),300)},close:function(){var t=this;null===this.timer&&this.iftoggle&&(this.translateValue=-100-this.navHeight,this.timer=setTimeout((function(){t.ifshow=!1,t.timer=null,t.iftoggle=!1}),300),this.$emit("close"))},ableClose:function(){this.autoClose&&this.close()},stopEvent:function(t){}}};a.default=e},a41d:function(t,a,n){"use strict";n.r(a);var e=n("6a8e"),r=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(a,t,(function(){return e[t]}))}(o);a["default"]=r.a},a6e0:function(t,a,n){"use strict";n.r(a);var e=n("287a"),r=n("a41d");for(var o in r)"default"!==o&&function(t){n.d(a,t,(function(){return r[t]}))}(o);n("f57c");var i,s=n("f0c5"),l=Object(s["a"])(r["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);a["default"]=l.exports},f57c:function(t,a,n){"use strict";var e=n("0086"),r=n.n(e);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sl-filter/popup-layer-create-component',
    {
        'components/sl-filter/popup-layer-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a6e0"))
        })
    },
    [['components/sl-filter/popup-layer-create-component']]
]);
