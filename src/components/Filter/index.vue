<template>
  <div class="filter">
    <div v-for="(item, index) in filterList" :key="index">
      <div v-if="(filterList.length > 1) & (index > 0)" class="placeholder">
        OR
      </div>
      <div class="filter-box">
        <div class="filter-box-main">
          <filterConditionsComponent
            ref="filterConditions"
            :subject-id="subjectId"
            :cur-index="index"
            :engine-node-item="item.engineNodeList"
            :attrs="attrs"
            :similar-products="similarProducts"
          />
        </div>
        <div class="filter-box-footer">
          <el-switch
            v-model="item.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"
            :active-value="1"
            :inactive-value="0"
            @change="changeSwitch($event, item)"
          />
          <span
            class="ml-10"
            style="cursor: pointer"
            @click="deleteItem(index, item)"
          ><i class="el-icon-delete" />
            <span style="color: red">删除条件组</span></span>
        </div>
      </div>
    </div>

    <div class="filter-item-add" @click="addFormItem">
      <i
        class="el-icon-circle-plus-outline"
        style="font-size: 18px; color: #4585ff"
      />
      <span style="color: #4585ff; font-size: 18px"> OR </span>
    </div>
  </div>
</template>

<script>
import FilterConditionsComponent from './FilterConditions/index'

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

class DefaultFilter {
  constructor() {
    this.id = null
    this.version = null
    this.enabled = 1
    this.engineNodeList = [new DefaultCondition()]
  }
}

export default {
  name: 'FilterComponent',
  components: { FilterConditionsComponent },
  props: {
    attrs: null,
    conditions: null,
    similarProducts: null,
    subjectId: String
  },
  data() {
    return {
      filterList: [new DefaultFilter()],
      oldFilterList: [new DefaultFilter()]
    }
  },
  computed: {
    conditionsChange() {
      return this.conditions
    }
  },
  watch: {
    conditionsChange: {
      handler: function(newVal, oldVal) {
        if (newVal && newVal.length) {
          newVal.forEach(item => {
            if (item.engineNodeList && item.engineNodeList.length) {
              item.engineNodeList.forEach(value => {
                if (
                  value.expressionJson &&
                  typeof value.expressionJson === 'string'
                ) {
                  value.expressionJson = JSON.parse(value.expressionJson)
                }
              })
            }
          })
          this.filterList = JSON.parse(JSON.stringify(newVal))
          this.oldFilterList = JSON.parse(JSON.stringify(newVal))
        }
      },
      immediate: true
    }
  },
  methods: {
    addFormItem() {
      this.filterList.push(new DefaultFilter())
    },
    deleteItem(index, item) {
      if (this.filterList.length > 1) {
        this.$confirm('是否确认删除?', {
          distinguishCancelAndClose: true,
          closeOnClickModal: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.filterList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
      } else {
        this.$confirm('是否确认删除?', {
          distinguishCancelAndClose: true,
          closeOnClickModal: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 如果是最后一个条件组，则要保留一个条件，且清空条件名称的缓存数据
          if (this.$refs.filterConditions[0]) {
            this.$refs.filterConditions[0].$refs.condition[0].activeAttribute = {}
          }
          item.engineNodeList = [new DefaultCondition()]
          item.enabled = 1
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
      }
    },
    changeSwitch($event, item) {
      if ($event == 0) {
        this.$confirm('是否确认关闭?', {
          distinguishCancelAndClose: true,
          closeOnClickModal: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          })
          .catch(() => {
            item.enabled = item.enabled == 0 ? 1 : 0
          })
      }
    },
    // 格式化数据
    formatCondition() {
      let conditionIdx = 0
      this.filterList.forEach(item => {
        const filterCondition = this.$refs.filterConditions[
          conditionIdx
        ].formatCondition(conditionIdx)
        item.engineNodeList = filterCondition
        conditionIdx++
      })
      const filterList = JSON.parse(JSON.stringify(this.filterList))
      /** *去除不规则的数据***/
      filterList.forEach((value, index, array) => {
        if (value.engineNodeList && value.engineNodeList.length) {
          for (let i = 0; i < value.engineNodeList.length; i++) {
            const item = value.engineNodeList[i]
            item.expressionJson = JSON.stringify(item.expressionJson)
            if (!item.factName) {
              value.engineNodeList.splice(i, 1)
              i--
              continue
            }
          }
        }
      })
      for (let k = 0; k < filterList.length; k++) {
        const value = filterList[k]
        if (!value.engineNodeList.length) {
          filterList.splice(k, 1)
          k--
          continue
        }
      }
      /** *去除不规则的数据***/

      /** *根据condition的id改变条件组的version***/
      filterList.forEach((item, index, array) => {
        if (item.engineNodeList && item.engineNodeList.length) {
          const flag = item.engineNodeList.some(value => {
            return value.id == null
          })

          if (
            this.oldFilterList[index] &&
            this.oldFilterList[index].engineNodeList &&
            this.oldFilterList[index].engineNodeList.length
          ) {
            if (
              this.oldFilterList[index].engineNodeList.length !=
              item.engineNodeList.length
            ) {
              item.version = null
            }
          }
          if (
            this.oldFilterList[index] &&
            this.oldFilterList[index].enabled != item.enabled
          ) {
            item.version = null
          }
          if (flag) {
            item.version = null
          }
        }
      })
      /** *根据condition的id改变条件组的version***/
      return filterList
    }
  }
}
</script>

<style scoped lang="scss">
.placeholder {
  font-size: 18px;
  line-height: 32px;
  height: 32px;
  padding-left: 20px;
}
.filter-box {
  width: 100%;
  border-radius: 2px;
  border: 1px dashed #dcdfe6;
  .filter-box-main {
    padding: 20px;
  }
  .filter-box-footer {
    padding: 10px 20px;
    border-top: 1px dashed #dcdfe6;
    .el-icon-delete {
      color: red;
    }
  }
}
.filter-item-add {
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #f7fbff;
  border-radius: 2px;
  border: 1px dashed #4585ff;
  border-radius: 2px;
  margin: 20px 0;
}
</style>
