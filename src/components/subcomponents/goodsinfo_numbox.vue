<template>
<!-- 由于传过来的max有问题,但最终能得到真正的max值，因此可以用watch来监听父组件传递过来的max值 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      ref="numbox"
      @change="countchanged"
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
    console.log(this.max);
  },
  methods: {
    countchanged() {
      this.$emit("getCount", parseInt(this.$refs.numbox.value));
    }
  },
  watch: {
    //属性监听
    'max'(newVal,oldVal){
        mui(".mui-numbox").numbox().setOption('max',newVal)
    }
  },
  props: ["max"]
};
</script>
<style lang="scss">
</style>
