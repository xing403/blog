---
title: xing-ly
layout: doc
---
# xing-ly
<el-divider />
<div>
  <img src="https://img.shields.io/npm/v/xing-ly.svg">
</div>

> 在这里你可以使用到已经封装好的部分组件

现已内置 `element-plus`

## 安装命令
~~~shell
npm install xing-ly
~~~
## 引用组件
### 按需引用
~~~vue
<script>
  import { ComponentName } from 'xing-ly'
</script>
<template>
  <ComponentName ></ComponentName>
</template>
~~~
### 全局引入
~~~ts
import { createApp } from 'vue'
import XingLy from 'xing-ly'
import App from './App.vue'

createApp(App)
.use(XingLy)
.mount('#app')

~~~
