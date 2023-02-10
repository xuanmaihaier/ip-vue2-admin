<template>
  <!-- 产品选择 -->
  <el-dialog
    class="flex"
    title="产品选择"
    width="1200px"
    :visible.sync="_dialogTableVisible"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <!-- body主体内容 -->
    <div class="el-dialog-body-main flex-1 flex flex-column">
      <el-form :model="params" label-width="85px" @keyup.enter.native="toQuery" @submit.native.prevent>
        <el-row>
          <el-col :span="5">
            <el-form-item label="产品名称：">
              <el-input v-model="params.productName" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="厂家：">
              <el-input v-model="params.manufactureName" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="剂型：">
              <el-input v-model="params.formulation" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="规格：">
              <el-input v-model="params.chinesespecification" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="3" align="right">
            <el-form-item>
              <el-button icon="el-icon" plain @click="toQuery">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table-box">
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="tableList"
          border
          size="medium"
          style="width: 100%"
          height="100%"
          element-loading-text="数据加载中..."
          fit
          highlight-current-row
          type="index"
          :row-class-name="rowClassName"
          @selection-change="handleSelectionChange"
          @row-dblclick="dblclickTableRow"
          @row-click="clickTableRow"
        >
          <el-table-column v-if="multielect" type="selection" width="55" :selectable="checkSelectable" />
          <el-table-column prop="" label="序号" width="50" type="index" />
          <el-table-column prop="id" label="产品id" />
          <el-table-column prop="chineseproductname" label="产品名称" />
          <el-table-column prop="goodsname" label="商品名称" />
          <el-table-column prop="chinesemanufacturename" label="生产厂家" />
          <el-table-column prop="formulation" label="剂型" />
          <el-table-column prop="chinesespecification" label="规格" />
          <el-table-column prop="enabled" label="状态">
            <template slot-scope="scope">
              {{ scope.row.enabled == 0 ? '停用' : '启用' }}
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="flex-pagination-footer">
          <ip-pagination
            :current-page="page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, ->,sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="sizeChange"
            @current-change="pageChange"
          />
        </div>
      </div>
    </div>
    <!-- footer -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="_dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import common from '@/mixins/common'
export default {
  name: 'ProductDialog',
  mixins: [common],
  props: [
    'dialogTableVisible',
    'multielect',
    'api',
    'keyNameList',
    'type',
    'tableData'
  ],
  data() {
    return {
      params: {
        showAll: true
      },
      curSelectRowData: ''
    }
  },
  computed: {
    _dialogTableVisible: {
      get() {
        return this.dialogTableVisible
      },
      set(val) {
        this.$emit('updateDialogTableVisible', val)
      }
    }
  },
  watch: {
    _dialogTableVisible: function(val, oldVal) {
      if (val) {
        // 每次打开弹框要做的事情
        this.params = {
          showAll: true
        }
        this.initData()
      }
    }
  },
  created() { },
  methods: {
    beforeInit() {
      this.url = this.api
      this.keyNameOptions = this.keyNameList
      this.method = this.type
      return true
    },
    // checkout数据处理
    afterLoder() {
      this.$emit('afterLoder', this.tableList)
    },

    // 不允许点击的需要置灰样式置灰
    rowClassName({ row }) {
      // console.log(row);
      if (row.disCheck) {
        return 'discheck-row'
      } else {
        return ''
      }
    },

    // 多选产品
    handleSelectionChange($event) { },

    // 双击tbale行
    dblclickTableRow($event) {
      if ($event.disCheck) return
      this.curSelectRowData = $event
      if (!this.multielect) {
        this.$emit('selectedData', $event)
        this._dialogTableVisible = false
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }
    },

    // 是否可以选择
    checkSelectable(row) {
      return !row.disCheck
    },

    // 单击行
    clickTableRow($event) {
      if (!this.multielect) {
        this.curSelectRowData = $event
      }
    },
    // 点击确定
    onSubmit() {
      if (!this.multielect) {
        if (this.curSelectRowData) {
          this.$emit('selectedData', this.curSelectRowData)
          this._dialogTableVisible = false
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请选择产品',
            type: 'error'
          })
        }
      } else {
        const selectData = this.$refs.table.selection
        if (selectData && selectData.length) {
          this.$emit('selectedData', selectData)
          this._dialogTableVisible = false
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请选择同类产品',
            type: 'error'
          })
        }
      }
    },
    // 关闭弹框
    closeDialog() {
      if (!this.multielect) {
        this.curSelectRowData = null
        this.$refs.table.setCurrentRow() // 出除单选表格当前行
      } else {
        this.$refs.table.clearSelection()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .discheck-row {
  cursor: not-allowed;

  td.el-table__cell {
    color: #999 !important;
  }
}
</style>
