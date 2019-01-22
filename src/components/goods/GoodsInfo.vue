<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" ref="ball" v-show="ballFlag"></div>
    </transition>
    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :isfull="false" :lunbotuList="lunbotu"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            <span>
              市场价:
              <del>￥{{goodsinfo.market_price}}</del> 销售价:
              <span class="now_price">￥{{goodsinfo.sell_price}}</span>
              <p>购买数量 :
                <numbox :max="goodsinfo.stock_quantity" @getCount="getSelectedCount"></numbox>
              </p>
              <p>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button @click="addToShopCar" type="danger" size="small">加入购物车</mt-button>
                <!-- 点击按钮修改购物车上面的数字 -->
                <!-- 因为按钮属于goodsinfo而数字属于goodsinfo_numbox组件因此要用到子传父 -->
                <!-- 子传父原理:在子组件上定义方法,父组件给其传递方法,子组件调用方法并传值 -->
              </p>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header"></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}</p>
          <p>上架时间:{{goodsinfo.add_time|Date}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button @click="goDesc(id)" type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button @click="goComment(id)" type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      //把id挂到data上方便使用
      id: this.$route.params.id,
      lunbotu: [
        {
          img:
            "https://i0.hdslb.com/bfs/archive/ad2934d947ebe810d05971826dafa6d13e5b7835.jpg@80w_50h.webp"
        },
        {
          img:
            "https://i1.hdslb.com/bfs/archive/25b01cb6c91fe4f4b841fbd8732f85e5dfe10c32.jpg@80w_50h.webp"
        },
        {
          img:
            "https://i1.hdslb.com/bfs/archive/f4fd355273d18c39aaf0f92d9a462a4c2a21b431.jpg@80w_50h.webp"
        }
      ],
      goodsinfo: {}, //商品信息
      ballFlag: false, //控制小球的隐藏和显示
      selectedCount: 1 //最少为1个
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    async getLunbotu() {
      const { data: res } = await this.$http.get(
        "/api/getthumimages/" + this.id
      );
      if (res.status === 0) {
        //改造数据以便轮播图使用,添加img属性
        // res.message.forEach(item=>{
        //     item.img = item.src
        // })
        // this.lunbotu = res.message
      }
    },
    async getGoodsInfo() {
      const { data: res } = await this.$http.get(
        "/api/goods/getinfo/" + this.id
      );
      if (res.status === 0) {
        this.goodsinfo = res.message[0];
      }
    },
    goDesc(id) {
      //编程式导航跳转,到图文列表页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      //编程式导航跳转到评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      // el.style.transform = "translate(93px,240px)";
      // el.style.transition = "all 1s ease"
      //   获取小球的 在页面中的位置
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标(购物车右上角小图标) 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      // 横向移动
      const xDist = badgePosition.left - ballPosition.left;
      //纵向移动
      const yDist = badgePosition.top - ballPosition.top;
      //es6模板语法
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.6s cubic-bezier(.4,-0.3,1,.68)";
      done(); //代表执行下一个方法
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
      console.log(count);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 380px;
    left: 146px;
    z-index: 99;
  }
}
</style>
