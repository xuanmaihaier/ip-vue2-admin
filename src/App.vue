<template>
  <div id="app" class="full-fill flex flex-column">
    <router-view />
  </div>
</template>
<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import { syscenterApi } from '@/api/index'
const defaultSettings = require('./src/settings.js')
const title = defaultSettings.title || '逸曜后台'
export default {
  name: 'App',
  data() {
    return {
      moment
    }
  },
  mounted() {
    syscenterApi.getDocumentTitle().then(res => {
      if (res.code == 200 && res.data) {
        document.title = `${title}-` + res.data
      }
    })
  }
}
</script>
