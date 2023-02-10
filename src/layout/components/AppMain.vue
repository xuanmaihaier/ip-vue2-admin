<template>
  <section
    v-if="pageResource && pageResource.length"
    class="app-main full-fill flex flex-1"
  >
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="key" />
      </keep-alive>
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" :key="key" />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  computed: {
    ...mapGetters(['pageResource']),
    key() {
      return this.$route.path
    }
  },
  watch: {
    pageResource: {
      handler: function(newValue, oldValue) {
        if (!newValue.length) {
          this.$message({
            type: 'warning',
            message: '当前用户没有开通菜单权限,请联系管理员'
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.app-main {
  position: relative;
  overflow: hidden;
  background: #f5f8fd;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
