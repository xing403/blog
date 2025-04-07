---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
title: 缓动函数
tags: [animate.ts, ts, tool]
---

# 缓动函数使用

<el-divider />

<script setup>
  import AnimateDemo from '/examples/AnimateDemo.vue'
  import { ref } from 'vue'
  const size = ref(100)
</script>

<ClientOnly>
  <AnimateDemo />
</ClientOnly>
