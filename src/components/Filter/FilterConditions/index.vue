<template>
  <div class="filter-conditions">
    <div v-for="(item, index) in conditionData" :key="index">
      <el-row v-if="(conditionData.length > 1) & (index > 0)" :gutter="20">
        <el-col :span="22" :offset="2">
          <div class="placeholder">AND</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col v-if="index == 0" :span="2">条件{{ curIndex + 1 }}:</el-col>
        <el-col :span="22" :offset="index > 0 ? 2 : 0">
          <el-row>
            <el-col>
              <div class="condition-con flex">
                <conditionComponent
                  ref="condition"
                  :condition="item"
                  :attrs="attrs"
                  :similar-products="similarProducts"
                  :subject-id="subjectId"
                />
                <i
                  class="el-icon-circle-close"
                  @click="deleteCondition(item, index)"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="22" :offset="2">
        <div class="filter-conditions-add-btn" @click="addCondition()">
          <i class="el-icon-circle-plus-outline" /><span>AND</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ConditionComponent from './Condition/index'

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
  name: 'FilterConditionsComponent',
  components: { ConditionComponent },
  props: {
    curIndex: 0,
    attrs: null,
    engineNodeItem: null,
    similarProducts: null,
    subjectId: String
  },
  data() {
    return {
      conditionData: [new DefaultCondition()],
      oldConditionData: [new DefaultCondition()]
    }
  },
  computed: {
    engineNodeItemChange() {
      return this.engineNodeItem
    }
  },
  watch: {
    engineNodeItemChange: {
      handler: function(newVal, oldVal) {
        if (newVal && newVal.length) {
          this.conditionData = newVal
          this.oldConditionData = JSON.parse(JSON.stringify(newVal))
        }
      },
      immediate: true
    }
  },
  methods: {
    // 格式化数据
    formatCondition() {
      let conditionIdx = 0
      const newArray = []
      this.conditionData.forEach((value, index, array) => {
        const condition = this.$refs.condition[conditionIdx].formatCondition()
        newArray.push(condition)
        conditionIdx++
      })

      return newArray
    },
    addCondition() {
      this.conditionData.push(new DefaultCondition())
    },
    deleteCondition(item, index) {
      this.$refs.condition[index].activeAttribute = {}
      this.conditionData.splice(index, 1)
      if (this.conditionData.length == 0) {
        this.conditionData.push(new DefaultCondition())
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter-conditions {
  .placeholder {
    line-height: 36px;
  }
  .el-row {
    .filter-conditions-add-btn {
      margin-top: 20px;
      cursor: pointer;
      width: 170px;
      height: 36px;
      background: #f7fbff;
      border-radius: 2px;
      border: 1px dashed #4585ff;
      text-align: center;
      line-height: 36px;
      font-size: 18px;
      color: #4585ff;
      .el-icon-circle-plus-outline {
        margin-right: 10px;
      }
    }
    .condition-con {
      align-items: center;
      i.el-icon-circle-close {
        cursor: pointer;
        margin-left: 10px;
        font-size: 18px;
        color: #eb5026;
      }
    }
  }
}
</style>
