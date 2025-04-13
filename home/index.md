---
title: 首页
layout: page
---

<script setup>
  import Info from '/examples/home/Info.vue'
  import { Picture as IconPicture } from '@element-plus/icons-vue'
  import Skill from '/examples/home/Skill.vue'
</script>

<div class="pt-2"></div>

<ClientOnly>
  <Info class="my-20px" />  
  <Skill />
</ClientOnly>
<div class="max-w-1152px ma">
  <el-space wrap fill :fill-ratio="30" class="w-full h-300px p-x-20px">
    <el-image src="https://github-readme-stats.vercel.app/api?username=xing403&show_icons=true&count_private=true&hide_border=true" >
      <template #error>
        <div class="flex justify-center items-center h-full">
          <el-icon :size="80"><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
    <el-image src="https://github-readme-activity-graph.vercel.app/graph?username=xing403&theme=xcode" >
      <template #error>
        <div class="flex justify-center items-center h-full">
          <el-icon :size="80"><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
    <el-image src="https://github-profile-trophy.vercel.app/?username=xing403&column=6" >
      <template #error>
        <div class="flex justify-center items-center h-full">
          <el-icon :size="80"><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
  </el-space>
</div>
