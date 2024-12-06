<template>
  <el-dialog
    v-model="dialogVisible"
    title="Add New Link"
    width="500px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="form.title" placeholder="Enter link title" />
      </el-form-item>

      <el-form-item label="URL" prop="url">
        <el-input v-model="form.url" placeholder="Enter link URL" />
      </el-form-item>

      <el-form-item label="Category" prop="category">
        <el-select v-model="form.category" placeholder="Select category" class="w-full">
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Description" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          rows="3"
          placeholder="Enter link description"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          Submit
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { createLink } from '../api/links'
import type { LinkDTO } from '../types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'success'): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const categories = [
  'Large Models',
  'Frontend Learning',
  'Backend Learning',
  'Product Learning',
  'Data Analysis',
  'Design Tools',
  'Office Software'
]

const form = ref<LinkDTO>({
  title: '',
  url: '',
  category: '',
  description: ''
})

const rules = {
  title: [{ required: true, message: 'Please enter title', trigger: 'blur' }],
  url: [
    { required: true, message: 'Please enter URL', trigger: 'blur' },
    { type: 'url', message: 'Please enter valid URL', trigger: 'blur' }
  ],
  category: [{ required: true, message: 'Please select category', trigger: 'change' }],
  description: [{ required: true, message: 'Please enter description', trigger: 'blur' }]
}

const dialogVisible = ref(props.modelValue)

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    await createLink(form.value)
    ElMessage.success('Link added successfully')
    emit('success')
    handleCancel()
  } catch (error) {
    ElMessage.error('Failed to add link')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  form.value = {
    title: '',
    url: '',
    category: '',
    description: ''
  }
  emit('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  dialogVisible.value = val
})

watch(() => dialogVisible.value, (val) => {
  emit('update:modelValue', val)
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.w-full {
  width: 100%;
}
</style>
