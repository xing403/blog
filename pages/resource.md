---
title: 外链
layout: page
sidebar: false
---
<script lang="ts" setup>
const links = [{
  title:'流星蝴蝶没有剑',
  link:'http://wx0725.top',
  icon:'http://wx0725.top/favicon.ico',
  desc:'学长站点',
}, {
  title:'星如雨',
  link:'https://blog.csdn.net/qq_46269098',
  icon:'/images/avatar.jpg',
  desc:'个人CSDN',
}, {
  title:'free-code-camp',
  link:'https://chinese.freecodecamp.org/',
  icon:'https://chinese.freecodecamp.org/favicon-32x32.png',
  desc:'网页学习练习站点',
}, {
  title:'desmos',
  link:'https://www.desmos.com/calculator?lang=zh-CN',
  icon:'https://www.desmos.com/assets/img/apps/graphing/favicon.ico',
  desc:'一个数学函数在线工具',
}, {
  title:'easing',
  link:'https://easings.net/zh-cn',
  icon:'https://easings.net/192.c6b79276.png',
  desc:'缓动函数 自定义参数随时间变化的速率。',
}, {
  title:'数据结构可视化工具',
  link:'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html',
  icon:'https://www.cs.usfca.edu/~galles/visualization/favicon.ico',
  desc:'数据结构可视化工具',
}, {
  title:'阿里云镜像库',
  link:'https://developer.aliyun.com/mirror/',
  icon:'https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-32-32.ico',
  desc:'阿里云官方镜像下载',
}, {
  title:'清华大学官方镜像',
  link:'https://mirrors.tuna.tsinghua.edu.cn/',
  icon:'https://mirrors.tuna.tsinghua.edu.cn/static/img/favicon.png',
  desc:'清华大学开源镜像',
}, {
  title:'i-love-pdf',
  link:'https://www.ilovepdf.com/zh-cn',
  icon:'https://www.ilovepdf.com/img/favicons-pdf/favicon-32x32.png',
  desc:'PDF格式转换',
}, {
  title:'i-love-img',
  link:'https://www.iloveimg.com/zh-cn',
  icon:'https://www.iloveimg.com/img/favicons-img/favicon-16x16.png',
  desc:'IMG格式处理',
}, {
  title:'unoCSS',
  link:'https://unocss.dev/',
  icon:'https://unocss.dev/favicon.svg',
  desc:'unoCSS 原子化CSS样式',
}, {
  title:'icons',
  link:'https://icones.js.org/',
  icon:'https://icones.js.org/favicon.svg',
  desc:'统一格式 icons 图标库 上千种库图标共选择',
}]
</script>

<div class="pt-2">
  <el-space wrap class="w-full" fill :fill-ratio="23">
    <el-card v-for="link in links" :key="link"  shadow="hover">
      <template #header>
        <el-link :href="link.link" target="_blank" link v-text="link.title" class="text-20px font-600"/>
      </template>
      <div class="flex justify-between items-center">
        <el-text line-clamp="2">{{ link.desc }}</el-text>
        <el-avatar :size="75" :src="link.icon" shape="square">
          <img src="/images/avatar.jpg"/>
        </el-avatar>
      </div>
    </el-card>
  </el-space>

</div>