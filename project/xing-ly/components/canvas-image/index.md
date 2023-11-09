---
title: xl-canvas-image
layout: doc
---
# xl-canvas-image
<script setup>
  import CanvasImageDemo from '/demo-test/canvas-image.vue'
  import { ref } from 'vue'
  const size = ref(100)
</script>

## 基础使用
<xl-canvas-image image-url='/images/avatar.jpg' :width='300' :height='300' />

::: details 样例代码
```vue
<script>
  import { XlCanvasImage } from 'xing-ly'
</script>
<xl-canvas-image image-url='/images/avatar.jpg' :width='300' :height='300' />
```
:::
## 不同尺寸
<div>
  <el-slider v-model="size" :min="50" :max="500" />
</div>
<xl-canvas-image image-url='/images/avatar.jpg' :width='size' :height='size' />

::: details 样例代码
```vue
<script>
  import { XlCanvasImage } from 'xing-ly'
</script>
<xl-canvas-image image-url='/images/avatar.jpg' :width='400' :height='400' />
```
:::

## 根据图片大小自适应

<xl-canvas-image image-url='/images/avatar.jpg' auto />
::: details 样例代码
```vue
<script setup>
  import { XlCanvasImage } from 'xing-ly'
</script>
<xl-canvas-image image-url='/images/avatar.jpg' auto />
```
:::

## 展示信息

<CanvasImageDemo />

::: details
```html
<div class="demo-text">
  <xl-canvas-image image-url='/images/avatar.jpg' :width='300' :height='300'>
    <template #info="scope">
      <el-descriptions title="canvas image information" :column="1" border>
        <el-descriptions-item label="scale">{{ scope.scale }}</el-descriptions-item>
        <el-descriptions-item label="width">{{ scope.width }}</el-descriptions-item>
        <el-descriptions-item label="height">{{ scope.height }}</el-descriptions-item>
        <el-descriptions-item label="x">{{ scope.x }}</el-descriptions-item>
        <el-descriptions-item label="y">{{ scope.y }}</el-descriptions-item>
      </el-descriptions>
    </template>
  </xl-canvas-image>
</div>
```
:::

## 参数
|  组件名   |       描述       |  类型   | 是否必填 | 默认  |
| :-------: | :--------------: | :-----: | :------: | :---: |
| image-url |     图片路径     | string  |   true   |   -   |
|   auto    | 是否根据图片尺寸 | Boolean |  false   | false |
|   width   |    展示的宽度    | Number  |  false   |  300  |
|  height   |    展示的宽高    | Number  |  false   |  150  |
| minScale  |  缩小时，最小值  | Number  |  false   |  0.1  |
| maxScale  |  放大时，最大值  | Number  |  false   |  10   |

## 插槽
| 插槽名称 |                描述                |
| :------: | :--------------------------------: |
|   info   | 图片的信息(缩放比例，左上角坐标等) |

## 事件
|   事件名    |      描述      |   类型   |
| :---------: | :------------: | :------: |
|  mousedown  |    鼠标按下    | Function |
|  mousemove  | 鼠标按下并移动 | Function |
| imageLoaded |   图片被加载   | Function |
|  drawImage  |    刷新图片    | Function |
|  mouseout   |  鼠标移出组件  | Function |
|   mouseup   |    鼠标抬起    | Function |
|    wheel    |    鼠标滚动    | Function |
