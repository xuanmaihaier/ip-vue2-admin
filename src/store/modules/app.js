import Cookies from 'js-cookie'

const state = {
  windowW: 1000,
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    hide: false
  },
  breadcrumbdatalist: null,
  device: 'desktop'
}

const mutations = {
  SET_WINDOW: (state, windowW) => {
    state.windowW = windowW
  },
  SET_SIDEBAR_OPEN: state => {
    state.sidebar.opened = true
  },
  SET_SIDEBAR_CLOSE: state => {
    state.sidebar.opened = false
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIDEBAR_HIDE: (state, status) => {
    state.sidebar.hide = status
  },
  SET_BREAD_CRUMB_DATA: (state, router) => {
    const routerList = router.matched.filter((item) => item.meta.title)
    if (routerList && routerList.length) {
      routerList.forEach((value) => {
        value.title = value.meta.title
      })
    }
    state.breadcrumbdatalist = routerList
    // state.breadcrumbdatalist = unique(routerList,true,'title',true,'meta');
  }
}

const actions = {
  setSidebarOpen({ commit }) {
    commit('SET_SIDEBAR_OPEN')
  },
  setSidebarClose({ commit }) {
    commit('SET_SIDEBAR_CLOSE')
  },
  setWindows({ commit }, windowW) {
    commit('SET_WINDOW', windowW)
  },
  toggleSideBarHide({ commit }, status) {
    commit('SET_SIDEBAR_HIDE', status)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  getBreadCrumbData({ commit }, router) {
    commit('SET_BREAD_CRUMB_DATA', router)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
