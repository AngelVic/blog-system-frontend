<template>
  <div class="home-container">
    <div class="actions">
      <el-button type="primary" @click="showUploadDialog">Upload Link</el-button>
      <el-input
        v-model="searchKeyword"
        placeholder="Search by title or description"
        class="search-input"
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <div class="content-layout">
      <div class="filter-section">
        <h3>Categories</h3>
        <el-menu
          class="category-menu"
          :default-active="activeCategory"
          @select="handleCategorySelect"
        >
          <el-menu-item index="">
            All Categories
          </el-menu-item>
          <el-menu-item 
            v-for="category in categories" 
            :key="category" 
            :index="category"
          >
            {{ category }}
          </el-menu-item>
        </el-menu>
      </div>

      <div class="links-section">
        <el-empty v-if="links.length === 0" description="No links found" />
        <el-card v-for="link in links" :key="link.id" class="link-card">
          <h3>{{ link.title }}</h3>
          <p class="description">{{ link.description }}</p>
          <div class="link-footer">
            <el-tag size="small">{{ link.category }}</el-tag>
            <span class="time">{{ formatDate(link.createdAt) }}</span>
          </div>
          <el-button 
            type="primary" 
            link 
            @click="openLink(link.url)"
          >
            Visit Link
          </el-button>
        </el-card>
      </div>
    </div>

    <upload-dialog
      v-model="uploadDialogVisible"
      @success="handleUploadSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import UploadDialog from '../components/UploadDialog.vue'
import { fetchLinks, searchLinks, fetchLinksByCategory } from '../api/links'
import type { Link } from '../types'

const links = ref<Link[]>([])
const searchKeyword = ref('')
const uploadDialogVisible = ref(false)
const activeCategory = ref('')

const categories = [
  'Large Models',
  'Frontend Learning',
  'Backend Learning',
  'Product Learning',
  'Data Analysis',
  'Design Tools',
  'Office Software'
]

const showUploadDialog = () => {
  uploadDialogVisible.value = true
}

const handleUploadSuccess = async () => {
  uploadDialogVisible.value = false
  await loadLinks()
  ElMessage.success('Link uploaded successfully')
}

const handleSearch = async () => {
  if (searchKeyword.value) {
    const result = await searchLinks(searchKeyword.value)
    links.value = result
  } else {
    await loadLinks()
  }
}

const handleCategorySelect = async (category: string) => {
  activeCategory.value = category
  if (category) {
    const result = await fetchLinksByCategory(category)
    links.value = result
  } else {
    await loadLinks()
  }
}

const loadLinks = async () => {
  try {
    const result = await fetchLinks()
    links.value = result
  } catch (error) {
    ElMessage.error('Failed to load links')
  }
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}

onMounted(() => {
  loadLinks()
})
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.actions {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-input {
  width: 300px;
}

.content-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 24px;
}

.filter-section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.category-menu {
  border-right: none;
}

.links-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.link-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.link-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.description {
  color: #666;
  margin-bottom: 16px;
  flex-grow: 1;
}

.link-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.time {
  color: #999;
  font-size: 12px;
}
</style>
