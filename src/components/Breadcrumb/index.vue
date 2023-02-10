<template>
  <div class="sys-breadcrumb-warp">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="pathObj in breadcrumbdatalistInit"
        :key="pathObj.path"
        :to="goTo(pathObj)"
      >{{
        pathObj.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BreadcrumbComponent',
  data() {
    return {
      breadcrumbdatalistInit: null
    }
  },
  computed: {
    ...mapGetters([
      'breadcrumbdatalist'
    ])
  },
  mounted() {
    // 干预定制化 不需要一级菜单
    this.breadcrumbdatalistInit = this.breadcrumbdatalist.slice(1, this.breadcrumbdatalist.length)
  },
  methods: {
    // 详情菜单 无法通过面包屑点击 如详情无法通过点击面包屑重复进入
    goTo(pathObj) {
      if (pathObj.redirect == 'index') {
        return { name: pathObj.name + '-index', params: this.$route.params }
      } else {
        return { name: pathObj.name, params: this.$route.params }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.sys-breadcrumb-warp {
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(200, 212, 226, 0.5);
    margin: 0px 10px;
    padding: 0 10px;
    // z-index: 1001;

    .el-breadcrumb {
        line-height: 40px;
    }
}
</style>
