---
title: 外链
layout: page
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
  icon:'http://ilstudy.vip/favicon.ico',
  desc:'个人CSDN',
}, {
  title:'deviantart',
  link:'https://www.deviantart.com',
  icon:'http://ilstudy.vip/favicon.ico',
  desc:'鼠标样式库(科学上网)',
}, {
  title:'鼠标样式',
  link:'https://custom-cursor.com',
  icon:'http://ilstudy.vip/favicon.ico',
  desc:'鼠标样式',
}, {
  title:'freecodecamp',
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
  title:'Vue弹幕项目',
  link:'http://dm.project.ilstudy.vip',
  icon:'http://ilstudy.vip/favicon.ico',
  desc:'一个可以发送实时弹幕的小项目',
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
  title:'ilovepdf',
  link:'https://www.ilovepdf.com/zh-cn',
  icon:'https://www.ilovepdf.com/img/favicons-pdf/favicon-32x32.png',
  desc:'免费的pdf格式转换',
}, {
  title:'unoCSS',
  link:'https://unocss.dev/',
  icon:'https://unocss.dev/favicon.svg',
  desc:'unoCSS 原子化CSS样式',
}, {
  title:'icones',
  link:'https://icones.js.org/',
  icon:'https://icones.js.org/favicon.svg',
  desc:'统一格式icons 图标库 上千种库图标共选择',
}, {
  title:'blog',
  link:'http://blog.ilstudy.vip',
  icon:'http://ilstudy.vip/favicon.ico',
  desc:'星如雨静态博客站点',
}, {
  title:'board',
  link:'http://board.ilstudy.vip',
  icon:'http://board.ilstudy.vip/favicon.svg',
  desc:'画板',
}, {
  title:'avatar',
  link:'https://avatar.ilstudy.vip',
  icon:'https://avatar.ilstudy.vip/favicon.svg',
  desc:'随机头像',
}, {
  title:'mines',
  link:'http://mines.ilstudy.vip',
  icon:'http://mines.ilstudy.vip/favicon.svg',
  desc:'扫雷游戏',
}, {
  title:'todo',
  link:'http://todo.ilstudy.vip',
  icon:'http://todo.ilstudy.vip/favicon.svg',
  desc:'todo list',
}]
</script>
<div style="padding:10px">
  <el-row :gutter="10">
    <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="24" v-for="link, index in links" :key="index">
      <el-card style="margin-bottom:10px">
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <div style="margin-right:20px;text-overflow:ellipsis">
            <el-link :href="link.link" target="_blank" link style="font-size: 20px;font-weight:600;">{{ link.title }}</el-link>
            <div style="font-size: 12px;margin-top:10px">{{ link.desc }}</div>
          </div>
          <div style="width:75px">
            <el-avatar :size="75" :src="link.icon" />
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>