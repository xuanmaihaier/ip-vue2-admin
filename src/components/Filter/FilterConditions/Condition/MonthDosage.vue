<template>
  <!-- 月用剂量 -->
  <div
    class="flex-1 flex container"
    :class="{ 'merge-container': outsideAttrNames.indexOf(attrName) != -1 }"
  >
    <!-- 中标药品本月用量 -->
    <div v-if="includeAttrNames.indexOf(attrName) != -1" class="flex-1 flex">
      <span
        v-if="outsideAttrNames.indexOf(attrName) == -1"
        style="margin-right: 10px"
      >本月任务量</span>
      <el-input
        v-model="rightExpr.compareValue"
        style="
          border-radius: 0;
          border-right: 1px solid #ddd;
          border-left: 1px solid #ddd;
        "
        size="medium"
        class="flex-1"
        placeholder="请输入数字"
        type="number"
      />
      <span style="margin-left: 10px"> %</span>
    </div>
    <!-- 同类药品本月用量 -->
    <div v-if="attrName == '同类药品本月用量'" class="flex-1 flex">
      <el-select
        v-model="rightExpr.monthDosage"
        size="medium"
        placeholder="请选择"
        style="width:150px;"
      >
        <el-option
          v-for="item in sameMonthDosageList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="rightExpr.compareValue"
        style="
          border-radius: 0;
          border-right: 1px solid #ddd;
          border-left: 1px solid #ddd;
        "
        size="medium"
        class="flex-1"
        placeholder="请输入数字"
        type="number"
      />
      <span style="margin-left: 10px"> %</span>
    </div>
    <!-- 累计用量 -->
    <div v-if="totalAttrNames.indexOf(attrName) != -1" class="flex-1 flex">
      <span style="margin-right: 10px">总任务量</span>
      <el-input
        v-model="rightExpr.compareValue"
        style="
          border-radius: 0;
          border-right: 1px solid #ddd;
          border-left: 1px solid #ddd;
        "
        size="medium"
        class="flex-1"
        placeholder="请输入数字"
        type="number"
      />
      <span style="margin-left: 10px"> %</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    attrName: null,
    rightExpr: {}
  },
  data() {
    return {
      outsideAttrNames: [
        '医生中标药品本月用量占比',
        '科室中标药品本月用量占比'
      ],
      includeAttrNames: [
        '中标药品本月用量',
        '医生中标药品本月用量',
        '科室中标药品本月用量',
        '医生当前科室中标药品本月用量',
        '医生中标药品本月用量占比',
        '科室中标药品本月用量占比'
      ],
      currentFinishedAttrNames: [
        '中标药品本月用量',
        '医生中标药品本月用量',
        '科室中标药品本月用量',
        '医生当前科室中标药品本月用量'
      ],
      totalAttrNames: [
        '医生中标药品累计用量',
        '科室中标药品累计用量',
        '中标药品累计用量'
      ],
      current_finished: {
        id: 'current_finished',
        name: '本月任务完成量'
      },
      total_finished: {
        id: 'total_finished',
        name: '累计任务完成量'
      },
      sameMonthDosageList: [
        {
          label: '上月用量',
          value: 'last_month'
        },
        {
          label: '上年同期月用量',
          value: 'same_month_last_year'
        }
      ]
    }
  },
  computed: {
    attrNameChange() {
      return this.attrName
    },
    rightExprChange() {
      return this.rightExpr
    }
  },
  watch: {
    rightExprChange: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          if (
            this.currentFinishedAttrNames.indexOf(this.attrNameChange) !== -1
          ) {
            this.rightExpr.monthDosage = 'current_finished'
          } else if (
            this.outsideAttrNames.indexOf(this.attrNameChange) !== -1
          ) {
            this.rightExpr.monthDosage = 'current_rate'
          } else if (this.totalAttrNames.indexOf(this.attrNameChange) !== -1) {
            this.rightExpr.monthDosage = 'total_finished'
          }
        }
      },
      immediate: true
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.container {
  align-items: center;
  padding: 0 10px;
  div {
    align-items: center;
  }
}
.merge-container {
  padding-left: 0;
  /deep/ .el-input {
    border-left: none !important;
  }
}
</style>
