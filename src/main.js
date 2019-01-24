// 入口文件
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
//注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//获取本地存储的购物车数据
let car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
  state: {
    //类似data存放数据 this.$store.state.xxx
    car //把购物车商品的数据存到一个数组中
  },
  mutations: {
    //类似methods存放方法 this.$store.commit('方法名'，按需传入第二个参数)
    addToCar(state, goodsinfo) {
      //点击加入购物车将商品信息保存到car里
      //car中有对应数据则重新计算数量,没有则添加对应数据
      //默认没有找到
      let flag = false
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if (flag === false) {
        state.car.push(goodsinfo)
      }
      //购物车数据更新之后存储到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      //修改购物车中的商品数量
      state.car.some(item => {
        //注意这里goodsinfo.id可能和item.id不同类型如果使用===则不报错但没有效果
        if (item.id == goodsinfo.id) {
          //说明购物车中的商品发生了变化
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //购物车数据更新之后存储到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id) {
      //根据传过来的id从store中的购物车删除对应的商品
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      // 更新商品的选择状态
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      //把最新的购物车商品的状态保存到store中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    //对data的数据进行加工 this.$route.getters.xxx
    getAllCount(state) {
      let c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      let o = {
        count: 0, //商品总件数
        amount: 0 //商品总价格
      }
      state.car.forEach(item => {
        if (item.selected) {
          ;(o.count += item.count), (o.amount += item.price * item.count)
        }
      })
      return o
    }
  }
})
//安装路由
Vue.use(VueRouter)
import moment from 'moment'
//定义全局过滤器
Vue.filter('Date', val => {
  return moment(val).format('YYYY-MM-DD HH-mm-ss')
})
//导入axios
import axios from 'axios'
//可以使用this.$http.get/post
Vue.prototype.$http = axios
//设置请求根目录地址
axios.defaults.baseURL = 'http://127.0.0.1:3006/'
import app from './App.vue'
//导入Mint-ui组件
// import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
import MintUI from 'mint-ui'
Vue.use(MintUI)
//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//导入router.js模块
import router from './router'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
const vm = new Vue({
  el: '#app',
  render: c => c(app),
  //挂载路由对象到实例上
  router,
  store //挂载vuex的store实例
})
