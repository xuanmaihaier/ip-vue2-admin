<template>
  <div class="vue-doc full-fill">
    <div class="vue-content">
      <div class="vue-header">
        <h1 class="vue-title">逸曜公用组件库 - 使用 <a target="_blank" href="http://gitlab/web-local-project/ip-vue-cli">ip-vue-cli</a> 快速创建</h1>
        <p class="sub-title">逸曜公用组件库集成了逸曜公用<code>vuex、router、layout</code>布局、组件库等基础模块，开箱即用，减少项目开发时间成本。</p>
      </div>
      <div class="vue-section">
        <h2 class="vue-section-title">下载依赖</h2>
        <pre class="vue-code"><code>npm i --registry=http://10.1.1.161:4837</code></pre>
      </div>
      <div class="vue-section">
        <h2 class="vue-section-title">启动项目</h2>
        <pre class="vue-code"><code>npm run start</code></pre>
      </div>
      <div class="vue-section">
        <h2 class="vue-section-title">打包项目</h2>
        <pre class="vue-code"><code>npm run build:prod</code></pre>
      </div>
      <div class="vue-section">
        <h2 class="vue-section-title">格式化项目</h2>
        <pre class="vue-code"><code>npm run fix</code></pre>
      </div>
      <div class="vue-section">
        <h2 class="vue-section-title">主要特性</h2>
        <ul class="vue-list">
          <li>内置布局模块</li>
          <li>内置<code>layout</code>布局模块</li>
          <li>内置<code>vuex</code>菜单、登录、面包屑模块</li>
          <li>内置<code>mixins</code></li>
          <li>内置路由基础模块、路由拦截</li>
          <li>内置自动化打包</li>
          <li>内置<code>axios</code>、业务拦截器</li>
          <li>内置所有系统的代理</li>
          <li>内置<code>Vue 2</code>私有组件库</li>
          <li>内置公共样式</li>
          <li>内置简单<code>mock</code></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.vue-doc {
  font-family: "Arial, sans-serif";
  width: 100%;
  padding: 20px;
  background-color: #fff;
  overflow: overlay;
}

.vue-content {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.vue-header {
  text-align: left;
  padding-bottom: 10px;
}

.vue-title {
  font-size: 32px;
  letter-spacing: -.02em;
  color: #35495e;
  line-height: 1.4;
  margin-bottom: 10px;
  font-weight: 600;
  color:#213547
}

.sub-title{
  font-size: 14px;
  code{
      color:#33a06f;
      padding: 0.15em 0.5em;
      border-radius: 4px
    }
}

.vue-section {
  margin-bottom: 10px;
}

.vue-section-title {
  font-size: 18px;
  color: #35495e;
  margin-bottom: 10px;
}

.vue-code {
  background-color: #f7f7f7;
  padding: 5px 10px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 14px;
  color: #333;
}
.vue-list {
  list-style: disc;
  font-size: 18px;
  color: #333;
  padding-left: 20px;
  li{
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.7;
    color: #213547;
    position: relative;
    code{
      color:#33a06f;
      padding: 0.15em 0.5em;
      border-radius: 4px
    }
    &::before{
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: rgba(60, 60, 60, .33);
      transition: background-color .5s;
      left: -1.25rem;
      top: 0.75rem;
    }
  }
}
</style>
