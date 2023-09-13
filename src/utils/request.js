import axios from 'axios'
import { Message } from 'web-vue2-front-end-lib'
import { Loading } from 'web-vue2-front-end-lib'
import { debounce } from 'vue-debounce'

const urlList = [
  'api/v1/report/overview/ranking/unfinished',
  'api/v1/catalog/modify',
  'api/v1/catalog/add',
  'api/v1/catalog/annual-tasks/setting/batch',
  'api/v1/rule/subject'
]

// cli生成的项目会自动带截取掉'web-'前缀的环境变量
const baseURL = process.env.VUE_APP_BASE_NAME ? `/${process.env.VUE_APP_BASE_NAME}/` : '/'

let loading = null // loading对象
let needLoadingRequestCount = 0 // 当前正在请求的数量

const startLoading = headers => {
  if (needLoadingRequestCount === 0) {
    loading = Loading.service({
      target: document.querySelector('c-container'),
      lock: true,
      text: '正在加载中...'
    })
  }
}

const showScreenLoading = headers => {
  if (needLoadingRequestCount == 0 && !loading) {
    startLoading(headers)
  }
  needLoadingRequestCount++
}

// 关闭loading状态
const endLoading = debounce(() => {
  loading.close()
  loading = null
}, 300)

const hideScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0)
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

const service = axios.create({
  // cli生成的项目会自动带截取掉'web-'前缀的环境变量
  baseURL: baseURL,
  timeout: 20000,
  headers: { 'Content-type': 'application/json' }
})

service.interceptors.request.use(
  config => {
    // if (process.env.NODE_ENV === 'production') {
    //   if (/^\/api/.test(config.url)) {
    //     config.baseURL = '/admin/'
    //   }
    // } else {
    //   config.baseURL = '/'
    // }
    let flag = false
    flag = urlList.some(value => {
      return config.url.indexOf(value) != -1
    })
    if (flag) {
      showScreenLoading()
    }
    return config
  },
  error => {
    hideScreenLoading()
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    hideScreenLoading()
    const res = response.data
    if (res.code != 200) {
      if (res.code == 405 || res.code == 402 || res.code == 999 || res.code == 401) {
        location.href = location.origin + '/syscenter/login?destination=' + btoa(encodeURIComponent(location.href))
      } else {
        if (res.code != '1111') {
          if (res.message) {
            Message({
              message: res.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
          }
        }
      }
    }
    return res
  },
  error => {
    hideScreenLoading()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
