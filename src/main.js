// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import adminApi from './util/common.js';
import VueResource from 'vue-resource';
import axios from 'axios';
import '../static/css/global.css' /*引入公共样式*/
import '../static/iconfont/iconfont.css' /*引入字体图标*/
Vue.use(ElementUI);
Vue.use(VueResource);

//定义全局变量
Vue.prototype.adminApi = adminApi;
Vue.prototype.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
