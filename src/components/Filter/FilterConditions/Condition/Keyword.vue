<template>
  <!-- 关键字 -->
  <div class="flex-1 flex">
    <el-input
      v-model="rightExpr.compareValue"
      :placeholder="'请输入' + attrName + ',多个以“|”分隔'"
      size="medium"
    />
  </div>
</template>

<script>

export default {
  name: '',
  props: {
    attrName: '',
    rightExpr: {}
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>

