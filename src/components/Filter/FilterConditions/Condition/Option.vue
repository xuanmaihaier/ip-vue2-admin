<template>
  <!-- 可选项 -->
  <div class="flex-1 flex container">
    <el-select
      v-if="type == 'lazyLoading'"
      v-model="rightExpr.compareValue"
      class="flex-1"
      size="medium"
      style="width: 100%"
      placeholder="请选择药品名称"
    >
      <el-option
        v-for="item in similarProducts"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-else
      v-model="rightExpr.compareValue"
      class="flex-1"
      size="medium"
      style="width: 100%"
      placeholder="请选择"
    >
      <el-option
        v-for="item in defaultTypeObj.json"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>

export class DefaultTypeObj {
  constructor() {
    this.type = 'default'
    this.json = []
  }
}
export default {
  name: '',
  props: {
    rightExpr: {},
    attrValue: null,
    similarProducts: null
  },
  data() {
    return {
      type: 'lazyLoading',
      defaultTypeObj: new DefaultTypeObj()
    }
  },
  watch: {
    attrValue: {
      handler: function(newV, oldV) {
        if (newV && newV.length) {
          if (newV[0] && newV[0].treeType && newV[0].treeType == 'json') {
            this.type = this.defaultTypeObj.type
            this.defaultTypeObj.json = newV[0]['json']
          }
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
  }
}
</script>

<style lang="scss">
.container {
  align-items: center;
  padding: 0 10px;
}
</style>
