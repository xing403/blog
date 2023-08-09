---
title: xl-canvas-image
layout: doc
---
# xl-canvas-image
## 基础使用
<script>
  import {XlCanvasImage} from 'xing-ly'
</script>
<xl-canvas-image image-url='/images/avatar.jpg' :width='300' :height='300' />

::: details
```vue
<script>
  import {XlCanvasImage} from 'xing-ly'
</script>
<xl-canvas-image image-url='/images/avatar.jpg' :width='300' :height='300' />

```
:::
## 不同尺寸
<xl-canvas-image image-url='/images/avatar.jpg' :width='400' :height='400' />
::: details
```vue
<script>
  import {XlCanvasImage} from 'xing-ly'
</script>
<xl-canvas-image image-url='/images/avatar.jpg' :width='400' :height='400' />

```
:::
## 展示信息
<xl-canvas-image image-url='/images/avatar.jpg' :width='300' :height='300' :show-info='true' />
::: details
```vue
<script>
  import {XlCanvasImage} from 'xing-ly'
</script>
<xl-canvas-image image-url='/images/avatar.jpg' :width='300' :height='300' :show-info='true' />
```
:::

## 参数
| 组件名 | 描述 | 类型 | 是否必填 | 默认 |
| :----: | :----: | :----: | :----: | :----: |
| image-url | 图片路径 | string | true | - |
| width | 展示的宽度 | Number | false | 854 |
| height | 展示的宽高 | Number | false | 480 |
| minLimitScale | 限制最小缩放尺度 | Number | false | 0.1 |
| showInfo | 展示缩放的部分信息 | Boolean | false | false |
