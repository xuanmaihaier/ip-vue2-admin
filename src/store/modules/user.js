import { syscenterApi } from '@/api/index'

const getDefaultState = () => {
  return {
    userId: '',
    name: '',
    isLogin: false,
    cachePages: [],
    pageResource: [],
    sideBarData: [],
    permission: [],
    username: '',
    zoneName: '',
    zoneId: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_ZONEID: (state, zoneId) => {
    state.zoneId = zoneId
  },
  SET_ZONENAME: (state, zoneName) => {
    state.zoneName = zoneName
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  },
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ISLOGIN: (state, flag) => {
    state.isLogin = flag
  },
  REMOVE_CACHEPAGES: (state, page) => {
    state.cachePages.splice(
      state.cachePages.findIndex(item => item === page),
      1
    )
  },
  SET_PAGE_RESOURCE: (state, pageResource) => {
    state.pageResource = pageResource
  },
  SET_SIDE_BAR_DATA: (state, sideBarData) => {
    state.sideBarData = sideBarData
  }
}

const actions = {

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE')
      resolve()
    })
  },
  getMenus({ commit }) {
    return new Promise(resolve => {
      syscenterApi.getMenus().then(res => {
        resolve(res.data)
      }).catch()
    })
  },
  menusCallBack({ commit }, obejct) {
    const menus = obejct.data.pageResource
    const permission = obejct.data.permission
    // 功能权限
    commit('SET_PERMISSION', permission)
    // 左侧菜单
    commit('SET_PAGE_RESOURCE', menus[0].children)
    commit('SET_SIDE_BAR_DATA', menus[0].children)
  },
  getUserDataFn({ commit }) {
    return new Promise(resolve => {
      syscenterApi.getUserData().then(res => {
        if (res.code == 200 && res.data) {
          commit('SET_ISLOGIN', true)
          commit('SET_NAME', res.data.realname)
          commit('SET_USERID', res.data.uid)
          commit('SET_ZONEID', res.data.zoneId)
          commit('SET_ZONENAME', res.data.zoneName)
          commit('SET_USERNAME', res.data.username)
          resolve(res.data)
        }
      }).catch()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
