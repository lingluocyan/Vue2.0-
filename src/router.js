import VueRouter from "vue-router";
//导入对应路由组件
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:"/",redirect:'/home'},
    {path:"/home",component:HomeContainer},
    {path:"/member",component:MemberContainer},
    {path:"/shopcar",component:SearchContainer},
    {path:"/search",component:ShopcarContainer},
    {path:"/home/newslist",component:NewsList},
    {path:"/home/newsinfo/:id",component:NewsInfo},
    {path:"/home/photolist",component:PhotoList}
  ],
  //当前选中项会有这个类，可以设置高亮样式
  linkActiveClass: "mui-active"
});

// 把路由对象暴露出去
export default router;
