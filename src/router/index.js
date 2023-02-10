// import Layout from '@/layout'
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    hidden: true,
    redirect: 'demo',
    component: () => import('@/layout/index')
  },
  {
    path: '/demo',
    hidden: true,
    component: () => import('@/views/demo/index')
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/error-page/404')
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service supportz
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
const isIncludeCurMenu = (route, menus) => {
  const cur = route.path
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

  if (route.meta && route.meta.parentUrl) { // 如果是嵌套的子菜单则验证其父级菜单的权限
    mainMethod(route.meta.parentUrl, menus)
  } else {
    mainMethod(cur, menus)
  }

  return flag
}

export default router
router.beforeEach((to, from, next) => {
  if (to.path == '/demo') {
    next()
    return
  }
  if (store.state.user.isLogin) {
    next()
  } else {
    /**
     * 获取用户信息
    */
    store.dispatch('user/getUserDataFn').then(() => {
      if (store.state.user.isLogin) {
        /**
         * 获取菜单权限
        */
        store.dispatch('user/getMenus').then((data) => {
          if (data && data.pageResource && data.pageResource.length) {
            store.dispatch('user/menusCallBack', { data: data, to: to })
            const defaultItem = data.pageResource[0] && data.pageResource[0].children && data.pageResource[0].children.length ? data.pageResource[0].children[0] : null
            if (to.path == '/') { // 跟路径时,根据菜单权限选中默认路由
              next({ path: defaultItem.url, replace: true })
            } else {
              if (!isIncludeCurMenu(to, data.pageResource) && to.path != '/404') {
                next('/404')
              } else {
                next()
              }
            }
          } else {
            if (to.path != '/') {
              next('/404')
            } else {
              next()
            }
          }
        })
      }
    })
  }
})

router.afterEach((to, from) => {
  store.dispatch('app/getBreadCrumbData', to)
})
