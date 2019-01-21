### 制作首页App组件

1.使用Mint-ui的Header组件完成头部

2.使用Mint-ui的Tabber完成底部Tabber区域

3.下面的小图标可以在mui的extra-icon找到,需要导入对应的字体文件才可以使用，为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`

4.在中间区域放置一个router-view展示路由匹配的组件

5.使用路由的  linkActiveClass: "mui-active"可以设置选中图标高亮

### 制作首页轮播图

在HomeContainer.vue中导入Mint-ui的轮播图组件也就是import {Header,Swipe,SwipeItem} from 'mint-ui'中的Swipe

导入axios来请求轮播图的数据

在Main.js中设置

//可以使用this.$http.get/post

Vue.prototype.$http = axios;

//设置请求根目录地址

axios.defaults.baseURL = "http://127.0.0.1:3006/";

之后就可以用axios请求本地服务器获得数据渲染到页面上

​      <mt-swipe-item v-for="(item) in lunbotuList" :key="item.id">

​        <img :src="item.img" alt="">

​      </mt-swipe-item>

  methods: {

​    //获取轮播图数据的方法

​    async getLunbotu() {

​      const res = await this.$http.get("/api/getlunbo");

​      this.lunbotuList = res.data.message;

​      console.log(res)

​    }

  }

### 九宫格基本样式

使用mui的grid-default九宫格样式，修改css代码

### 组件动画切换

用transtion包裹router-view

设置.v-enter {

  opacity: 0;

  transform: translateX(100%);

}

.v-leave-to {

  opacity: 0;

  transform: translateX(-100%);

  position: absolute;

}

.v-enter-active,

.v-leave-active {

  transition: all 0.5s ease;

}

注意给父容器设置overflow-x:hidden    y轴不需要因为以后会有长菜单列表,需要滚动条

​    <transition>

​      <router-view></router-view>

​    </transition>

### 改造新闻资讯路由链接

### 新闻资讯页面制作
使用/api/getnewslist接口请求数据渲染页面,图片渲染需要v-bind绑定 :src = item.xxx
使用全局过滤器处理时间,导入Moment，使用moment(旧时间).format("YYYY-MM-DD HH-mm-ss")
使用MUI的media-list制作页面
### 实现新闻资讯列表点击跳转到新闻详情
1.把列表中的每一项改为router-link并提供唯一的标识符
2.创建新闻详情的组件页面 NewsInfo.vue
3.把新闻详情路由和组件对应
### 新闻列表基本结构和数据渲染
通过:id这类传递的参数可以用params拿到，从而获取当前的页码
请求/api/getnew/" + this.id拼接对应的id拿到数据渲染页面
### 封装一个comment.vue评论子组件
1.在需要comment的组件中手动导入comment组件 
2.import comment from './xxx/comment'
3.父组件用 components 把子组件注册
4.以标签形式把子组件在页面中引用
### 获取评论数据显示到页面中
由于接口有问题,所以会显示加载失败,但是逻辑没问题,因此加载更多没有做
加载更多逻辑是定义一个点击事件对应一个方法,里面让页码pageindex++,然后用新页码拼接的路径请求服务器得到的数据拼上之前的数据 this.commentList = this.commentList.concat(res.message[0])
### 发表评论
1.给文本框做双向数据绑定
2.给发表按钮绑定一个事件
3.校验评论内容是否为空,为空则提示不能为空
4.通过axios.post发送请求
5.刷新列表
### 创建图片列表组件并在路由中注册
1.顶部滑动条制作
2.制作底部图片列表 使用MUI的tab-top-webview-main组件 去掉full-screen这个类后可以正常显示
3.滑动条要想滑动需要初始化
+ 导入mui.js
+ 调用官方提供的初始化代码
```
mui('.mui-scroll-weapper').scroll({
  deceleration:0.0005  //系数越大滚动越慢
})
```
注意调用MUI.js会与webpack严格模式发生冲突
+ 解决方法:npm i babel-plugin-transform-remove-strict-mode -D
然后在.babelrc中修改配置"transform-remove-strict-mode"
虽然解决了冲突但是滑动会有警告
+ 解决方法:组件下方style里加上 *{touch-action: pan-y}
然后发现tabbar有不好使了,这时候把App.vue中的mui-tab-item类修改下名字比如mui-tab-item-llb然后把之前的样式重新给这个新类,问题的原因是这个类名有冲突
### 制作图片列表区域
1.图片列表使用了懒加载技术,可以使用Mint-ui提供的lazy-load,但是由于不明bug导入lazy-load后程序崩溃无法解决加上接口的图片失效因此弃用lazy-load
2.根据其使用文档使用
3.渲染图片列表数据
### 制作点击图片跳转到图片详情页面
1.把Li改造为router-link并用tag标签改为li
2.制作详情页面，获取数据渲染页面
### 实现缩略图功能
1.使用 vue-preview 缩略图插件
2.获取图片列表渲染页面
3.图片数据对象中,必须有w 和 h
