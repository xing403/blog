<script setup lang="ts">
import OverViewItem from './OverViewItem.vue';
import { data as posts } from '/.vitepress/theme/docs.data'
const props = defineProps<{
  overviewList: any
}>()
function getPostInfo(link: string) {
  return posts.find((post: any) => post.url.includes(link))
}
</script>
<template>
  <template v-if="overviewList.items">
    <div>
      <el-badge :value="overviewList.items.length" type="primary">
        <span class="text-2xl">{{ overviewList.text }}</span>
      </el-badge>
    </div>
    <div class="ml-3xl my-xl">
      <OverViewGroup v-for="item in overviewList.items" :key="item.link" :overview-list="item" />
    </div>
  </template>
  <OverViewItem v-else :post="getPostInfo(overviewList.link)" />
</template>
