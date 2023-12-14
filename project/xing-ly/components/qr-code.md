---
title: xl-qr-code
layout: doc
---
# xl-qr-code

## 基础使用

<XlQRCode text="hello world, this is xl-qr-code component"/>

::: details 使用代码
```vue
<script>
  import { XlQRCode } from 'xing-ly'
</script>
<XlQRCode text="hello world, this is xl-qr-code component"/>
```
:::

## 不同质量
<el-row>
  <el-col :span="12" >
    <XlQRCode text="hello world,hello world,hello world,hello world,hello world,hello world" :quality="0"/>
  </el-col>
  <el-col :span="12" >
    <XlQRCode text="hello world,hello world,hello world,hello world,hello world,hello world" :quality="1" />
  </el-col>
</el-row>

::: details 使用代码
```html
<script>
  import { XlQRCode } from 'xing-ly'
</script>
<el-row>
  <el-col :span="12" >
    <XlQRCode text="hello world,hello world,hello world,hello world,hello world,hello world" :quality="0"/>
  </el-col>
  <el-col :span="12" >
    <XlQRCode text="hello world,hello world,hello world,hello world,hello world,hello world" :quality="1" />
  </el-col>
</el-row>
```
:::

## 不同颜色

<XlQRCode text="hello world, this is xl-qr-code component" dark="#ffd26f" light="#3677ff" :margin="1" :scale="1"/>

::: details 使用代码
```vue
<script>
  import { XlQRCode } from 'xing-ly'
</script>
<XlQRCode text="hello world, this is xl-qr-code component" dark="#ffd26f" light="#3677ff" :margin="1" :scale="1"/>
```
:::

## 下载与刷新

<script setup>
  import { ref } from 'vue'
  const text = ref(`${Date.now()}`)
  function handleRefreshBefore(done){
    text.value = `${Date.now()}`
    done()
  }
</script>
<el-row>
  <el-col :span="8">
    <div style="text-align: center;">下载</div>
    <XlQRCode text="hello world,hello world,hello world,hello world,hello world,hello world" download />
  </el-col>
  <el-col :span="8">
    <div style="text-align: center;">刷新</div>
    <XlQRCode :text="text" :refresh-before="handleRefreshBefore" refresh/>
  </el-col>
  <el-col :span="8">
    <div style="text-align: center;">下载 & 刷新</div>
    <XlQRCode :text="text" :refresh-before="handleRefreshBefore" refresh download />
  </el-col>
</el-row>

::: details 使用代码
```html
<script setup>
  import { ref } from 'vue'
  const text = ref(`${Date.now()}`)
  function handleRefreshBefore(done){
    text.value = `${Date.now()}`
    done()
  }
</script>
<el-row>
  <el-col :span="8">
    <div style="text-align: center;">下载</div>
    <XlQRCode text="hello world,hello world,hello world,hello world,hello world,hello world" download />
  </el-col>
  <el-col :span="8">
    <div style="text-align: center;">刷新</div>
    <XlQRCode :text="text" :refresh-before="handleRefreshBefore" refresh/>
  </el-col>
  <el-col :span="8">
    <div style="text-align: center;">下载 & 刷新</div>
    <XlQRCode :text="text" :refresh-before="handleRefreshBefore" refresh download />
  </el-col>
</el-row>
```
:::

## 参数类型
| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| :---: | :---: | :---: | :---: | :---: |
| text | 二维码的字符串 | string | true | - |
| type | 图片类型 | `image/png`,`image/jpeg`,`image/webp` | false | `image/jpeg` |
| quality | 图片质量(0-1) | number | false | 0.8 |
| margin | 外边距 | number | false | 4 |
| scale | 码元尺寸 | number | false | 4 |
| width | 二维码宽度 | number | false | 200 |
| dark | 码元颜色 | hex-color | false | `#000000` |
| light | 背景颜色 | hex-color | false | `#ffffff` |
| level | 容错等级 | `low`,`medium`,`quartile`,`high`,`L`,`M`,`Q`,`H` | false | `low` |
| download | 是否可下载 | boolean | false | false |
| refresh | 是否可刷新 | boolean | false | false |
| download-before | 下载之前 | Function | false | - |
| refresh-before | 刷新之前 | Function | false | - |

## 事件类型
| 事件名 | 说明 | 回调参数 |
| :---: | :---: | :---: |
| downloaded | 下载之后 | - |
| refreshed | 刷新之后 | - |
