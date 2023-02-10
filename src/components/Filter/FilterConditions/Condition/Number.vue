<template>
  <!-- number 数值 -->
  <div class="flex-1 flex container">
    <span style="margin-right: 10px">每月</span>

    <el-input
      v-model="rightExpr.compareValue"
      style="
        border-radius: 0;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
      "
      class="flex-1"
      size="medium"
      placeholder="请输入大于等于1且小于等于31的整数"
      @change="handleChange"
    />
    <span style="margin-left: 10px">日</span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    rightExpr: {}
  },
  data() {
    return {}
  },
  methods: {
    handleChange() {

    }
  }
}
</script>

<style scoped lang="scss">
.container {
  align-items: center;
  padding: 0 10px;
}
</style>
