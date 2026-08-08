<script lang="ts" setup>
import { useData, useRouter, useRoute } from 'vitepress'

import { computed, ref, watchEffect } from 'vue'

import OverViewItem from './OverViewItem.vue'
import OverViewGroup from './OverViewGroup.vue'

defineOptions({
  name: 'OverView'
})

const { site } = useData()
const sidebar = computed(() => site.value.themeConfig.sidebar)
const router = useRouter()
const routes = useRoute()
const currentSideBar = ref()
watchEffect(() => {
  let s = {}
  const keys = Object.keys(sidebar.value)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (routes.path.startsWith(key)) {
      const s = sidebar.value[key]

      currentSideBar.value = {
        ...s,
        items: s.items.filter((item: any) => !item.link?.includes('overview'))
      }
    }
  }

})


</script>

<template>
  <div class="mt-2">
    <el-empty v-if="currentSideBar.items.length === 0" description="去别处看看吧！^v^"></el-empty>
    <OverViewGroup v-for="item in currentSideBar.items" :key="item.text" :overview-list="item" />
  </div>
</template>
