<template>
  <el-config-provider>
    <div class="app-container">
      <el-header class="header">
        <h1>Blog System</h1>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: #409EFF;
}

.el-main {
  padding-top: 32px;
}
</style>
