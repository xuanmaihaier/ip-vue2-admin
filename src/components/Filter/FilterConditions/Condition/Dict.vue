<template>
  <!-- 字典 -->
  <div class="flex-1 flex container">
    <div class="flex-1" :style="{'cursor':'pointer'}" @click="showDict">
      <span v-if="!dicts.length">请选择{{ curAttrValue.name }}</span>
      <el-tag
        v-if="dicts.length >= 1"
        size="mini"
      >{{ dicts[0] && dicts[0].name }}</el-tag>
      <el-tag
        v-if="dicts.length > 1"
        size="mini"
      >+{{ dicts.length - 1 }}</el-tag>
    </div>
    <tree-selector
      ref="dictSelector"
      :is-show-code="curAttrValue.is_show_code"
      :checked-nodes="dicts"
      :dept-url="'/api/v1/dict/dept-tree?type=0'"
      :category-code="curAttrValue.category"
      :tree-type="curAttrValue.treeType"
      :product-id="subjectId"
      :checked-codes="codes"
      :attr-name="curAttrValue.name"
      @confirm="getDictCodes"
    />
  </div>
</template>

<script>
class DefaultRightExpr {
  constructor() {
    this.code = ''
    this.name = ''
    this.category = ''
    this.is_show_code = false
    this.dict = [{}]
  }
}

import TreeSelector from '@/components/TreeSelector/Index'
export default {
  name: '',
  components: { TreeSelector },
  props: {
    attrValue: null,
    rightExpr: new DefaultRightExpr(),
    subjectId: String
  },
  data() {
    return {
      curAttrValue: null,
      dicts: [],
      codes: []
    }
  },
  computed: {
    getAttrValue() {
      return this.attrValue
    },
    _rightExpr() {
      if (this.rightExpr.dict && this.rightExpr.dict.length) {
        return this.rightExpr
      } else {
        return new DefaultRightExpr()
      }
    }
  },
  watch: {
    getAttrValue: {
      handler: function(newValue, oldValue) {
        if (newValue && newValue.length) {
          this.curAttrValue = newValue[0]
        }
      },
      immediate: true
    },
    _rightExpr: {
      handler: function(newValue, oldValue) {
        if (newValue && newValue.dict && newValue.dict.length && newValue.dict[0]['data']) {
          this.dicts = newValue.dict[0]['data']
          if (this.dicts && this.dicts.length) {
            this.dicts.forEach((value, index, array) => {
              this.codes.push(value.code)
            })
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getDictCodes(nodes) {
      this.dicts = nodes
      this._rightExpr.dict[0]['data'] = nodes
      this.dicts = this._rightExpr.dict[0]['data']
      this._rightExpr.dict[0]['name'] = this.curAttrValue.name
      this._rightExpr.dict[0]['category'] = this.curAttrValue.category
      this.$emit('rightExprChange', this._rightExpr)
    },
    showDict() {
      if (this.$refs['dictSelector']) {
        this.$refs['dictSelector'].open()
      }
    }
  }
}
</script>

<style lang="scss">
</style>
