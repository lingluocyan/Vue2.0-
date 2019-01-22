<template>
  <div class="goods-list">
    <!-- 可以使用router-link或者a标签形式或者编程式导航(window.location.href)进行跳转 -->
    <div @click="goDetail(item.id)" v-for="item in goodslist" :key="item.id" class="goods-item">
      <div class="imgcon">
        <!-- <img :src="item.img_url" alt> -->
        <img src="../../img/bgc.jpg" alt>
      </div>
      <h3 class="title">{{item.title}}</h3>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button @click="getMore" type="danger" size="large" plain>加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      //获取商品列表
      const { data: res } = await this.$http.get(
        "/api/getgoods?pageindex=" + this.pageindex
      );
      if (res.status === 0) {
        this.goodslist = this.goodslist.concat(res.message);
      }
    },
    getMore(){
      this.pageindex++
      this.getGoodsList()
    },
    goDetail(id) {
      //编程式跳转
      //this.$route是获取路由中的参数,有query和params
      //this.$router是路由导航对象,用它可以实现路由的前进后退跳转到新的地址
      // this.$router.push('/home/goodsinfo/'+id)
      //这种方式需要在路由中定义name才可跳转params传递需要的参数
      this.$router.push({name:'goodsinfo',params:{id}})
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  .goods-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 49%;
    margin: 3px 0;
    padding: 2px;
    border: 1px solid #cccccc;
    box-shadow: 0 0 8px #ccc;
    min-height: 293px;
    .imgcon {
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: rgb(209, 12, 12);
          font-weight: bold;
          margin-left: 6px;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 15px;
        }
      }
      .sell {
        display: flex;
        padding: 0 12px;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>
