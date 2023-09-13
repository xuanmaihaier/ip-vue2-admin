<template>
  <div class="flex-1 flex-column flex">
    <ip-topbar
      :user-id="userId"
      :name="name"
      :title="title"
      :page-resource="pageResource"
      :active-menu="activeMenu"
      :show-menu="false"
    />
    <div class="flex-1 flex" style="position: relative; min-width: 1280px">
      <ip-sidebar
        v-if="!sidebar.hide"
        ref="sidebar"
        :sidebar-data="$store.state.user.sideBarData"
        :opened="sidebar.opened"
        :without-animation="sidebar.withoutAnimation"
        :active-menu="side_activeMenu"
        @toggleSideBar="toggleSideBar"
      />
      <div
        :class="{ sidebarHide: sidebar.hide }"
        class="main-container flex-1 flex"
      >
        <div :class="{ 'fixed-header': fixedHeader }" />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
const defaultSettings = require('./src/settings.js')
const title = defaultSettings.title || '逸曜后台'

export default {
  name: 'Layout',
  components: {
    AppMain
  },
  mixins: [ResizeMixin],
  data: function() {
    return {
      title
    }
  },
  computed: {
    pageResource() {
      return this.$store.state.user.pageResource
    },
    userId() {
      return this.$store.state.user.userId
    },
    name() {
      return this.$store.state.user.name
    },
    windowW() {
      return this.$store.state.app.windowW
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    side_activeMenu() {
      const route = this.$route
      const { path } = route
      const routeList = this.$store.state.user.sideBarData
      const isIncludeCurMenu = (route, menus) => {
        let flag = false
        const mainMethod = (cur, menus) => {
          for (let i = 0; i < menus.length; i++) {
            const item = menus[i]
            if (item.url == cur) {
              flag = true
              break
            }
            if (item.children && item.children.length) {
              mainMethod(cur, item.children)
            }
          }
        }
        mainMethod(route.meta.parentUrl, menus)
        return flag
      }
      if (route.meta && route.meta.parentUrl) {
        // 如果是嵌套的子菜单则验证其父级菜单的权限
        if (isIncludeCurMenu(route, routeList)) {
          return route.meta.parentUrl
        }
      }
      return path
    },
    activeMenu() {
      const route = this.$route
      const { path } = route
      if (path === '/dashboard') {
        return '/'
      }
      const activeMenu = '/' + path.split('/')[1]
      return activeMenu
    }
  },
  watch: {
    windowW: {
      handler: function(newVal, oldValue) {
        if (newVal <= 1280) {
          this.sidebar.opened = false
          this.sidebar.withoutAnimation = true
        } else if (newVal > 1280) {
          if (!this.sidebar.opened) {
            this.sidebar.opened = true
            this.sidebar.withoutAnimation = true
          }
        }
      },
      immediate: true
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.$refs.sidebar) {
        this.$store.dispatch('app/setWindows', window.innerWidth)
      }
    })
    window.addEventListener(
      'resize',
      () => {
        this.$store.dispatch('app/setWindows', window.innerWidth)
      },
      false
    )
  },
  methods: {
    // 修改sidebar状态
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

