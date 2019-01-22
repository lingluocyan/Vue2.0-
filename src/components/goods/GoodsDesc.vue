<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {} //图文数据
    };
  },
  created() {
    this.getGoodDesc();
  },
  methods: {
    async getGoodDesc() {
      const { data: res } = await this.$http.get(
        "/api/goods/getdesc/" + this.id
      );
      if (res.status === 0) {
        this.info = res.message[0];
      }
    }
  }
};
</script>
<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: rgb(14, 30, 170);
    text-align: center;
    margin: 16px;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
