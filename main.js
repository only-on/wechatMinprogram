import Vue from 'vue'
import App from './App'
import httpApi from './common/httpApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import store from './store'

import loadMore from './components/uni-pro/load-more'
import LbPicker from './components/lb-picker'
Vue.component('lb-picker', LbPicker)
Vue.config.productionTip = false
Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$Sysconf = HttpRequest.config
Vue.prototype.$SysCache = HttpCache
Vue.prototype.$store = store
Vue.prototype.$api_token = '518_c67e9582-2709-4b3d-a62c-bef26aa1b878'
App.mpType = 'app'
Vue.prototype.$api_url = 'https://test.tomsung.cn/';
// Vue.prototype.$api_url = 'http://test.tomsung.cn:8070';
const app = new Vue({
    ...App
})
app.$mount()
