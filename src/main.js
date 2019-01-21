// 入口文件
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
import moment from 'moment'
//定义全局过滤器
Vue.filter("Date",(val)=>{
    return moment(val).format('YYYY-MM-DD HH-mm-ss')
})
//导入axios
import axios from 'axios'
//可以使用this.$http.get/post
Vue.prototype.$http = axios;
//设置请求根目录地址
axios.defaults.baseURL = "http://127.0.0.1:3006/";
import app from './App.vue'
//导入Mint-ui组件
import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入router.js模块
import router from './router'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
const vm = new Vue({
    el:"#app",
    render:c=>c(app),
    //挂载路由对象到实例上
    router
})