---
title: defineProps & defineEmits
layout: doc
tags: [vue, vite, component]
---

## 父子组件间传递参数
在子组件中定义参数变量 `props`，在父组件中通过 `v-bind` 或者 `:` 绑定参数值
> 子组件
```vue
<template>
  <button btn>{{ name }}</button>
</template>
<script setup>
  defineProps(['name'])
</script>
```
> 父组件
```vue
<template>
  <div>
    <Child :name="name" />
  </div>
</template>
<script setup>
  import Child from './Child.vue'
  const name = ref('张三')
</script>
```
### 子组件修改父组件参数
子组件中使用 `defineProps` 定义的变量 `name` 是个常量，在子组件中无法修改其的值，想要在子组件中改变值方法如下
#### 1. 定义事件, 让父组件修改

> 子组件
```vue{2,9-12}
<template>
  <button btn @click="changeName">{{ name }}</button>
</template>

<script setup>
  defineProps(['name'])
  const emits = defineEmits(['changeName'])
  function changeName(){
    emits('changeName', '李四')
  }
</script>
```
> 父组件
```vue{3,9-11}
<template>
  <div>
    <Child :name="name" @changeName="handleChangeName"/>
  </div>
</template>
<script setup>
  import Child from './Child.vue'
  const name = ref('张三')
  function handleChangeName(val: string){
    name.value = val
  }
</script>
```

#### 2. `v-model` 定义双向绑定

::: details `v-model` 用法
`v-model` 单独使用，默认`modelValue`; 或者自定义变量名 `v-model:name`
> 子组件
```vue{2,7}
<template>
  <button btn @click="$emit('update:modelValue', '李四')">{{ modelValue }}</button>
</template>

<script setup>
  defineProps(['modelValue'])
  const emits = defineEmits(['update:modelValue'])
</script>
```
> 父组件
```vue{3}
<template>
  <div>
    <Child v-model="value"/>
  </div>
</template>
<script setup>
  import Child from './Child.vue'
  const value = ref('张三')
</script>
```
:::

> 子组件
```vue{2,7}
<template>
  <button btn @click="$emit('update:name', '李四')">{{ name }}</button>
</template>

<script setup>
  defineProps(['name'])
  const emits = defineEmits(['update:name'])
</script>
```
> 父组件
```vue{3}
<template>
  <div>
    <Child v-model:name="name"/>
  </div>
</template>
<script setup>
  import Child from './Child.vue'
  const name = ref('张三')
</script>
```

## `provide` 和 `inject` 依赖注入
当组件较多时，页面将会呈现出组件树的形式，使根节点的组件传递参数到子节点的任意一个节点(包括叶子节点)。在需要传递参数的节点使用 `provide` 为子组件提供参数值，并在其子组件中使用 `inject` 接收
### `provide`
```vue
<script setup>
import { provide } from 'vue'

provide('key', 'value')
</script>
```
> 使用provide 全局参数
```ts
const app = createApp({})

app.provide('key', 'value')
```
### `inject`
```vue
<script setup>
import { inject } from 'vue'

const message = inject('key')
</script>
```
