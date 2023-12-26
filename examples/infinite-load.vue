<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const page = ref(0)
const size = ref(10)
function load() {
  return new Promise((resolve) => {
    page.value++
    setTimeout(() => {
      if (page.value !== 10)
        resolve(Array.from({ length: size.value }, (_, i) => Math.floor(Math.random() * 100 + 1)))
      else
        resolve([])
    }, 1000)
  })
}
function loadEnd() {
  ElMessage.success('没有更多数据了')
}
</script>

<template>
  <xl-infinite-load :load="load" style="height: 200px;overflow-y: scroll;" @load-end="loadEnd">
    <template #content="scope">
      <div>{{ scope }}</div>
    </template>
  </xl-infinite-load>
</template>
