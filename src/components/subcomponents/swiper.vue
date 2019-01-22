<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item) in lunbotuList" :key="item.id">
        <img :src="item.img" :class="{full:isfull}">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 商品评论中轮播图失真的原因,宽高设置为100% -->
  </div>
</template>
<script>
export default {
  //谁调用组件谁传入需要的数据
  //应为父组件给子组件传值传入数据
  props: ["lunbotuList", "isfull"]
};
</script>
<style lang="scss">
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    // &:nth-child(1) {
    //   background-color: cyan;
    // }
    // &:nth-child(2) {
    //   background: yellow;
    // }
    // &:nth-child(3) {
    //   background: hotpink;
    // }
    img {
      //   width: 100%;
      height: 100%;
    }
  }
}
.full {
  width: 100%;
}
</style>
