<template>
  <div class="combination-container flex-1">
    <!-- 属性名 -->
    <el-select
      ref="attrSelect"
      v-model="activeAttribute.attrName"
      :title="activeAttribute.attrName"
      size="medium"
      placeholder="请选择"
      style="width: 200px"
      class="combination-item"
      @change="changeFactName($event)"
    >
      <el-option
        v-for="item in attrsList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- 操作符 -->
    <el-select
      v-if="localMetaData.factName && activeExprList && activeExprList.length"
      v-model="localMetaData.expressionJson.expr"
      style="width: 90px"
      class="combination-item"
      size="medium"
      placeholder="请选择"
      @change="changeExpr($event)"
    >
      <el-option
        v-for="item in activeExprList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- keyword 关键字 -->
    <Keyword
      v-if="localMetaData.expressionJson.rightExprType.id == 'keyword'"
      :attr-name="activeAttribute.attrName"
      :right-expr="localMetaData.expressionJson.rightExpr"
    />
    <!-- number 数值-->
    <Number
      v-if="localMetaData.expressionJson.rightExprType.id == 'number'"
      :right-expr="localMetaData.expressionJson.rightExpr"
    />
    <!-- month_dosage 本月用量 -->
    <MonthDosage
      v-if="localMetaData.expressionJson.rightExprType.id == 'month_dosage'"
      :right-expr="localMetaData.expressionJson.rightExpr"
      :attr-name="activeAttribute.attrName"
    />
    <!-- option 可选项 -->
    <Option
      v-if="localMetaData.expressionJson.rightExprType.id == 'option'"
      :similar-products="similarProducts"
      :right-expr="localMetaData.expressionJson.rightExpr"
      :attr-value="JSON.parse(activeAttribute.attrValue)"
    />
    <!-- dict 字典 -->
    <Dict
      v-if="
        localMetaData.expressionJson.rightExprType.id == 'dict' &&
          activeAttribute
      "
      :right-expr="localMetaData.expressionJson.rightExpr"
      :subject-id="subjectId"
      :attr-value="JSON.parse(activeAttribute.attrValue)"
      @rightExprChange="rightExprChange($event)"
    />
  </div>
</template>

<script>
import Keyword from './Keyword'
import Number from './Number'
import MonthDosage from './MonthDosage'
import Dict from './Dict'
import Option from './Option'

class DefaultRightExpr {
  constructor() {
    this.expr = ''
    this.rightExpr = {}
    this.rightExprType = {
      id: '',
      name: ''
    }
  }
}

class DefaultCondition {
  constructor() {
    this.id = null
    this.factName = ''
    this.expressionJson = new DefaultRightExpr()
  }
}

export default {
  name: 'ConditionComponent',
  components: { Keyword, Number, MonthDosage, Dict, Option },
  props: {
    attrs: null,
    condition: null,
    similarProducts: null,
    subjectId: String
  },
  data() {
    return {
      oldCondition: new DefaultCondition(),
      activeAttribute: {},
      attrsList: null,
      exprList: null,
      activeExprList: null,
      rightExprTypeGroup: [
        {
          id: 'keyword',
          name: '关键字'
        },
        {
          id: 'number',
          name: '数值'
        },
        {
          id: 'option',
          name: '可选项'
        },
        {
          id: 'month_dosage',
          name: '月用量'
        },
        {
          id: 'dict',
          name: '字典'
        }
      ]
    }
  },
  computed: {
    getAttrs() {
      return this.attrs
    },
    localMetaData() {
      return this.condition || new DefaultCondition()
    }
  },
  watch: {
    getAttrs: {
      handler: function(newValue, oldValue) {
        if (newValue) {
          this.resolveConditionAttrs(newValue)
        }
      },
      immediate: true
    },
    localMetaData: {
      handler: function(newValue, oldValue) {
        if (newValue && newValue.factName) {
          this.publicGetExpr(newValue.factName, 'callBack')
          this.oldCondition = JSON.parse(JSON.stringify(newValue))
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    rightExprChange($event) {
      this.localMetaData.expressionJson.rightExpr = $event
    },
    // 格式化数据
    formatCondition() {
      let isEmpty = false
      if (this.localMetaData.factName) {
        if (this.localMetaData.expressionJson) {
          if (!this.localMetaData.expressionJson.expr) {
            isEmpty = true
          }
          if (this.localMetaData.expressionJson.rightExprType) {
            if (
              this.localMetaData.expressionJson.rightExprType.id == 'keyword'
            ) {
              // keyword
              if (this.localMetaData.expressionJson.rightExpr) {
                if (!this.localMetaData.expressionJson.rightExpr.compareValue) {
                  isEmpty = true
                }
              }
            } else if (
              this.localMetaData.expressionJson.rightExprType.id == 'number'
            ) {
              // number
              if (
                !this.localMetaData.expressionJson.rightExpr.compareValue ||
                this.localMetaData.expressionJson.rightExpr.compareValue < 1 ||
                this.localMetaData.expressionJson.rightExpr.compareValue > 31
              ) {
                isEmpty = true
              }
            } else if (
              // month_dosage
              this.localMetaData.expressionJson.rightExprType.id ==
              'month_dosage'
            ) {
              if (
                !(
                  this.localMetaData.expressionJson.rightExpr.compareValue >
                    0 &&
                  this.localMetaData.expressionJson.rightExpr.compareValue <=
                    100
                )
              ) {
                isEmpty = true
              }
            } else if (
              this.localMetaData.expressionJson.rightExprType.id == 'option'
            ) {
              if (!this.localMetaData.expressionJson.rightExpr.compareValue) {
                isEmpty = true
              }
            } else if (
              this.localMetaData.expressionJson.rightExprType.id == 'dict'
            ) {
              if (
                !(
                  this.localMetaData.expressionJson.rightExpr.dict &&
                  this.localMetaData.expressionJson.rightExpr.dict[0] &&
                  this.localMetaData.expressionJson.rightExpr.dict[0]['data'] &&
                  this.localMetaData.expressionJson.rightExpr.dict[0]['data'].length
                )
              ) {
                isEmpty = true
              }
            }
          }
        }
      }
      if (isEmpty) {
        this.activeAttribute = {}
        return new DefaultCondition()
      } else {
        if (
          JSON.stringify(this.oldCondition) !=
          JSON.stringify(this.localMetaData)
        ) {
          this.localMetaData.id = null
        }
        return JSON.parse(JSON.stringify(this.localMetaData))
      }
    },
    resolveConditionAttrs(attrs) {
      const attrsList = JSON.parse(JSON.stringify(attrs))
      if (attrsList && attrsList.length > 0) {
        this.attrsList = []
        attrsList.forEach((item) => {
          item['label'] = item.attrName
          item['value'] = item.attrName
          this.attrsList.push(item)
        })
      }
    },
    publicGetExpr(name, type) {
      let curAttr = []
      if (type == 'callBack') {
        curAttr = this.attrsList.filter((value) => {
          return value.allName == name
        })
      } else {
        curAttr = this.attrsList.filter((value) => {
          return value.attrName == name
        })
      }

      if (curAttr.length) {
        curAttr.forEach((value) => {
          this.activeAttribute = JSON.parse(JSON.stringify(value))
          this.activeExprList = JSON.parse(value.operation)
          this.activeExprList.forEach((item, index, array) => {
            item.label = item.name
            item.value = item.id
            // 确保默认第一个显示操作符在第一位
            if (item.default && index != 0) {
              array.unshift(array.splice(index, 1)[0])
            }
          })
          if (this.activeAttribute) { this.localMetaData.factName = this.activeAttribute.allName }
        })
      }
    },
    changeFactName($event) {
      this.localMetaData.expressionJson = new DefaultRightExpr()
      this.activeAttribute = {}
      this.publicGetExpr($event)
    },
    changeExpr($event) {
      // 先清空rightExpr
      this.localMetaData.expressionJson.rightExpr = {}
      // 先取出display
      const curActiveExpr = this.activeExprList.filter((item) => {
        return item.id == $event
      })
      if (curActiveExpr && curActiveExpr.length) {
        const curDisplay = curActiveExpr[0]['display']
        if (curDisplay) {
          const curRightExprType = this.rightExprTypeGroup.filter((value) => {
            return value.id == curDisplay
          })
          this.localMetaData.expressionJson.rightExprType = curRightExprType
            ? curRightExprType[0]
            : {}
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.combination-container {
  display: flex;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  .combination-item {
    border-radius: 0;
    border-right: 1px solid #dcdfe6;
  }
  /deep/ .el-input__inner {
    border: none;
    line-height: 36px;
    height: 36px;
  }
  /deep/ .dict-input .el-input__inner {
    border: 1px solid #dcdfe6;
    line-height: 28px!important;
    height: 28px;
  }
}
</style>
