<script setup lang="ts">
import dayjs from 'dayjs';
import { useRouter } from 'vitepress';
import { onMounted } from 'vue';
import { QuestionFilled } from '@element-plus/icons-vue'
const props = defineProps<{
  post: any
}>()
const router = useRouter()
function handleClickLink() {
  router.go(props.post.url)
}

onMounted(() => {
  console.log(props.post)
})
</script>

<template>
  <div v-if="post" class="overview-item flex flex-row items-center">
    <div class="flex flex-row flex-1 items-center gap-1">
      <el-link :href="void (0)" @click="handleClickLink" underline="never">
        {{ post.frontmatter.title }}
      </el-link>
      <el-popover title="分类标签">
        <template #reference>
          <el-icon>
            <QuestionFilled></QuestionFilled>
          </el-icon>
        </template>
        <el-space wrap>
          <el-tag v-for="tag in post.frontmatter.tags"> {{ tag }}</el-tag>
        </el-space>
      </el-popover>
    </div>
    <el-text>{{ dayjs(post.lastUpdated).format("YYYY-MM-DD") }}</el-text>
  </div>

</template>
<style lang="css" scoped></style>
