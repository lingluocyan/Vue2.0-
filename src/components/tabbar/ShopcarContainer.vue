<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])" 
            ></mt-switch>
            <img
              src="https://m.360buyimg.com/babel/jfs/t1/4528/10/3590/153299/5b997bf5E4a513949/45ab3dd6c35d981b.jpg!q70.jpg"
              alt
            >
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
                <!-- 获取购物车中对应商品的数量 -->
                <!-- 先创建一个空对象,循环遍历购物车中商品的数据,每一项的id作为属性名,
                每一项的数量最为属性值,从而构造出一个对象例如 {88(id):2(count)}-->
                <!-- 这里item.id用于删除store中的state的数据而 index是用来删除goodslist中的数据 -->
                <a @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner allprice">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已选中商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,总价:￥
              <span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
  data() {
    return {
      goodslist: [] //购物车中全部商品的数据
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      let idArr = []
      this.$store.state.car.forEach(item => {
        idArr.push(item.id)
      })
      //如果购物车没有商品就不发送请求直接返回防止报错
      if (idArr.length <= 0) {
        return
      }
      //获取购物车商品列表
      const { data: res } = await this.$http.get(
        '/api/goods/getshopcarlist/' + idArr.join(',')
      )
      if (res.status === 0) {
        this.goodslist = res.message
      }
    },
    remove(id, index) {
      // 删除商品,对应id把商品从store中删除,同时删除goodslist中对应Index的商品
      this.goodslist.splice(index, 1)
      this.$store.commit('removeFromCar', id)
    },
    selectedChanged(id,val){
        //每当点击开关把开关状态同步到store中
        this.$store.commit("updateGoodsSelected",{id:id,selected:val})
    }
  },
  components: {
    numbox
  }
}
</script>
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 15px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin-bottom: 0;
      }
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .allprice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>