---
title: xl-infinite-load
layout: doc
tags: [vue, component]
---
# xl-infinite-load <Badge effect="plain" text="0.0.14" />
<script setup>
  import InfiniteLoadDemo from '/examples/infinite-load.vue'
</script>

## 使用

<InfiniteLoadDemo />

:::details 使用代码
```vue
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
```
:::

## 参数
|   组件名    |           描述           |               类型               | 是否必填 |     默认     |
| :---------: | :----------------------: | :------------------------------: | :------: | :----------: |
|    load     |    需要执行的加载函数    | `Function () => Promise<data[]>` |   true   |      -       |
|    delay    |       请求延迟时间       |              Number              |  false   |     200      |
|  distance   | 触发执行函数距离底部距离 |              Number              |  false   |      0       |
|  immediate  |       是否立即执行       |             Boolean              |  false   |     true     |
|  disabled   |       是否禁用加载       |             Boolean              |  false   |    false     |
| loadingText |        加载时文字        |              String              |  false   |  加载中...   |
|   endText   |    加载数据为空时文字    |              String              |  false   | 暂无更多数据 |
|  emptyText  |    数据为空时显示文字    |              String              |  false   |   暂无数据   |

## 插槽
| 插槽名称 |        描述        |
| :------: | :----------------: |
| content  | 自定义内容显示组件 |
|  empty   | 内容为空时显示组件 |


## 事件
|  事件名  |       描述       |   类型   |
| :------: | :--------------: | :------: |
| load-end | 数据全部加载结束 | Function |
|  loaded  |    数据被加载    | Function |
