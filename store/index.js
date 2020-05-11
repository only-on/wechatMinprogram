/**
 * 利用缓存的方式 如果用户登录成功后，将信息缓存下来
 * @createTime 2019-04-05
 */
import Vue from 'vue'
import Vuex from 'vuex'
import HttpCache from '../common/cache'
Vue.use(Vuex)
const user_account = HttpCache.get("user_account"); // 获取用户信息
const store = new Vuex.Store({
    state: {
        hasLogin: user_account ? true : false, // 登录状态
        loginProvider: "",
        openid: user_account['token'] ? user_account['token'] : null, // openid
        userinfo: user_account ? user_account : {}, // 用户信息 
        params:{}
        
    },
    mutations: {
        login(state, user) {
            state.hasLogin = true;
            state.loginProvider = user.provider || "";
            state.openid = user.token;
            state.userinfo = user;
            HttpCache.put("user_account", user); // 缓存用户信息
        },
        logout(state) {
            state.hasLogin = false;
            state.openid = null;
            state.userinfo = [];
            HttpCache.remove("user_account"); // 清理用户信息
        },
        setOpenid(state, openid) {
            state.openid = openid
        },
        save(state, data) {
            var user = state.userinfo;
            for (let i in data) {
                user[i] = data[i];
                if (i == "openid") {
                    state.openid = data[i];
                }
            }
            state.userinfo = user;
            HttpCache.put("user_account", user); // 缓存用户信息
        },
        getUseriInfo(state) {
            return HttpCache.get("user_account"); // 获取用户信息
        }
    },
    actions: {
        // lazy loading openid
        getUserOpenId: async function({
            commit,
            state
        }) {
            return await new Promise((resolve, reject) => {
                if (state.openid) {
                    resolve(state.openid)
                } else {
                    uni.login({
                        success: (data) => {
                            commit('login')
                            setTimeout(function() { //模拟异步请求服务器获取 openid
                                const openid = '123456789'
                                console.log('uni.request mock openid[' + openid +
                                    ']');
                                commit('setOpenid', openid)
                                resolve(openid)
                            }, 1000)
                        },
                        fail: (err) => {
                            console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
                            reject(err)
                        }
                    })
                }
            })
        }
    }
})

export default store
