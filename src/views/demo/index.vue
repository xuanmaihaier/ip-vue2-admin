<template>
  <div class="vue-doc flex flex-1">
    <div class="vue-content">
      <div class="vue-header">
        <h1 class="vue-title">逸曜公用组件库 - 使用ip-vue-cli快速创建</h1>
        <p>逸曜公用组件库集成了逸曜公用vuex、router、layout布局、组件库等基础模块，开箱即用，减少项目开发时间成本。</p>
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
          <li>◆ 内置布局模块</li>
          <li>◆ 内置layout布局模块</li>
          <li>◆ 内置vuex菜单、登录、面包屑模块</li>
          <li>◆ 内置mixins</li>
          <li>◆ 内置路由基础模块、路由拦截</li>
          <li>◆ 内置自动化打包</li>
          <li>◆ 内置axios、业务拦截器</li>
          <li>◆ 内置所有系统的代理</li>
          <li>◆ 内置Vue 2私有组件库</li>
          <li>◆ 内置公共样式</li>
          <li>◆ 内置简单mock</li>
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
}

.vue-content {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.vue-header {
  text-align: left;
  padding-bottom: 10px;
}

.vue-title {
  font-size: 32px;
  color: #35495e;
  margin-bottom: 10px;
}

.vue-section {
  margin-bottom: 20px;
}

.vue-section-title {
  font-size: 24px;
  color: #35495e;
  margin-bottom: 10px;
}

.vue-code {
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 16px;
  color: #333;
}

.vue-list {
  list-style: disc;
  font-size: 18px;
  color: #333;
}
</style>
