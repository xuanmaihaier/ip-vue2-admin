import request from '@/utils/request'

export default {
  data() {
    return {
      spanArr: [],
      spanIndex: 0,
      extend: false, //  搜索展开收起
      // tableList = null 在使用row-key会报错
      tableList: [], // 表格数据
      tableLoading: false, // 表格 Loading 属性
      height: '200px', // 高度
      page: 1, // 页码
      validCount: 0, // 生效中药品条数
      pageSize: 20, // 每页数据条数
      total: 0, // 总数据条数
      url: '', // 请求数据的url
      params: {}, // 查询数据的参数
      // query: {}, // 待查询的对象
      // time: 50, // 等待时间
      isAdd: false, // 是否为新增类型的表单
      downloadLoading: false, // 导出的 Loading
      delLoading: false, // 删除 Loading 属性
      delAllLoading: false,
      dialog: false, // 弹窗属性，是否显示
      form: {}, // Form 表单
      resetForm: {}, // 重置表单
      title: '', // 标题
      keyNameOptions: [], // 可配置的接口参数名,0:page,1:pageSize
      method: 'post', // 请求方法
      otherHeight: 0, // 计算table高度用的其它元素所占页面的高度
      elTableHeaderWrapperHeight: 37// 固定表头的height，可配置
    }
  },
  methods: {
    beforeInit() {
      return true
    },
    getQueryParame: function() { // 表格参数
      const objParam = {
        page: this.page,
        pagesize: this.pageSize,
        ...this.params
      }; const newObj = {}
      if (this.keyNameOptions && this.keyNameOptions.length) {
        for (const item in objParam) {
          if (item == 'page') {
            newObj[this.keyNameOptions[0]] = objParam[item]
          } else if (item == 'pageSize') {
            newObj[this.keyNameOptions[1]] = objParam[item]
          }
        }
        return { ...newObj, ...this.params }
      }
      return objParam
    },
    // 数据加载完成后
    afterLoder() {

    },
    async initData() {
      if (!(await this.beforeInit())) {
        return
      }
      return new Promise((resolve, reject) => {
        this.tableList = []
        this.tableLoading = true
        if (this.method == 'post') {
          request({ url: this.url, method: 'post', data: this.getQueryParame() }).then(data => {
            this.tableLoading = false
            if (data && data.code == 200) {
              this.total = data.data ? data.data.total : 0
              this.validCount = data.data ? data.data.validCount : 0
              this.tableList = data.data ? data.data.list : []
              this.afterLoder()
              resolve(data)
            }
          }).catch(err => {
            this.tableLoading = false
            reject(err)
          })
        } else if (this.method == 'get') {
          request({ url: this.url, method: 'get', params: this.getQueryParame() }).then(data => {
            this.tableList = []
            this.tableLoading = false
            if (data && data.code == 200) {
              this.total = data.total ? data.total : 0
              this.tableList = data.data ? data.data : data.data ? data.data : []
              this.afterLoder()
              resolve(data)
            }
          }).catch(err => {
            this.tableLoading = false
            reject(err)
          })
        }
      })
    },
    pageChange(e) {
      this.page = e
      this.initData()
    },
    sizeChange(e) {
      this.page = 1
      this.pageSize = e
      this.initData()
    },
    dleChangePage(pageSize) {
      if (this.tableList.length === 1 && this.page > 1) {
        this.page = this.page - 1
      }
    },
    // 这个方法用来动态设置 height
    getAutoHeight(otherHeight, searchElHeight) {
      const elParent = document.querySelector('#c-container')
      const searchEl = document.querySelector('#search-box')
      this.$nextTick(() => {
        this.height = elParent.clientHeight - otherHeight - (searchElHeight || searchEl.clientHeight) + 'px'
        const tableBody = document.querySelector('.el-table__body-wrapper.is-scrolling-none')
        tableBody.style.height = elParent.clientHeight - otherHeight - (searchElHeight || searchEl.clientHeight) - 37 + 'px'
      })
    },
    // 获取样式 我们需要减掉 padding-top， padding-bottom的值
    getStyle(obj, attr) {
      // 兼容IE浏览器
      const result = obj.currentStyle ? obj.currentStyle[attr].replace('px', '') : document.defaultView.getComputedStyle(obj, null)[attr].replace('px', '')
      return Number(result)
    },
    // 查询搜索方法
    toQuery() {
      this.page = 1
      this.initData()
    },
    /**
     * 通用的提示封装
     */
    submitSuccessNotify() {
      this.$notify({
        title: '提交成功',
        type: 'success',
        duration: 2500
      })
    },
    addSuccessNotify() {
      this.$notify({
        title: '新增成功',
        type: 'success',
        duration: 2500
      })
    },
    editSuccessNotify() {
      this.$notify({
        title: '编辑成功',
        type: 'success',
        duration: 2500
      })
    },
    delSuccessNotify() {
      this.$notify({
        title: '删除成功',
        type: 'success',
        duration: 2500
      })
    },
    notify(title, type) {
      this.$notify({
        title: title,
        type: type,
        duration: 2500
      })
    },
    /**
     * 获取弹窗的标题
     */
    getFormTitle() {
      return this.isAdd ? `新增${this.title}` : `编辑${this.title}`
    }
  }
}
