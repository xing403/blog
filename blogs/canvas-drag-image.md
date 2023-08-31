---
title: 实现canvas中图片的平移与缩放
layout: doc
---
# 实现canvas中图片的平移与缩放
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>vue2</el-tag>
  <el-tag>canvas</el-tag>
</div>

## 定义一个canvas
```html
<canvas
    ref="canvas"
    :width="width"
    :height="height"
    @mousedown="mousedown($event)"
    @mousemove="mousemove($event)"
    @mouseout="mouseout"
    @mouseup="mouseup($event)"
    @wheel="wheel($event)"
  />
```
> 包括鼠标事件

+ 鼠标按下 `mousedown`
+ 鼠标移动 `mousemove`
+ 鼠标抬起 `mouseup`
+ 鼠标滚轮滚动 `wheel`
+ 鼠标指针移出 `mouseout`

## 定义所需的变量
### 传入参数 `props`
```js
props: {
  imageUrl: { // 图片路径
    type: String,
    default: ''
  },
  height: { // 定义图片展示的高度
    type: Number,
    default: 480
  },
  width: { // 定义图片展示的宽度
    type: Number,
    default: 854
  },
}
```
### 定义参数 `data`
```js
data() {
  return {
    img: null,
    context: null,
    imgX: 0,
    imgY: 0,
    MINIMUM_SCALE: 0.1,  // 缩小最小限度
    pos: { x: 0, y: 0 },
    posl: { x: 0, y: 0 },
    dragging: false,  // 是否可以拖拽
    imgScale: 1,    // 缩放比例
    imgXAutoScale: 0,   // 图片适应拉伸宽度
    imgYAutoScale: 0,   // 图片适应拉伸高度
  }
}
```
## 初始化 `init()`
```js
init() {
  this.imgScale = 1
  this.imgX = 0
  this.imgY = 0
  this.context = this.$refs.canvas.getContext('2d')
  this.loadImg()
}
```
## 加载图片 `loadImg()`
```js
loadImg() {
  const that = this
  this.img = new Image()
  this.img.src = this.imageUrl
  this.img.onload = function() {
    that.imgXAutoScale = that.$refs.canvas.width / that.img.width
    that.imgYAutoScale = that.$refs.canvas.height / that.img.height
    that.drawImage()
  }
}
```
## 绘制操作后的图片 `drawImage()`
```js
drawImage() {
  this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
  this.context.drawImage(
    this.img, // 规定要使用的图像、画布或视频。
    0, 0, // 开始剪切的 x 坐标位置。
    this.img.width,
    this.img.height, // 被剪切图像的高度。
    this.imgX, this.imgY, // 在画布上放置图像的x、y坐标位置。
    this.img.width * this.imgScale * this.imgXAutoScale,
    this.img.height * this.imgScale * this.imgYAutoScale // 要使用的图像的宽度、高度
  )
}
```
## 鼠标移动事件 `mousemove(event)`
```js
mousemove(event) {
  if (this.dragging) {
    this.posl = this.windowToCanvas(event.clientX, event.clientY)
    this.imgX += this.posl.x - this.pos.x
    this.imgY += this.posl.y - this.pos.y
    this.pos = JSON.parse(JSON.stringify(this.posl))
    this.drawImage()
  }
}
```
## 鼠标按下事件 `mousedown(event)`
```js
mousedown(event) {
  this.dragging = true
  this.pos = this.windowToCanvas(event.clientX, event.clientY)
}
```
## 鼠标抬起事件 `mouseup()`
```js
mouseup() {
  this.dragging = false
},
```
## 监听图片路径发生改变
```js
watch: {
  'imageUrl'(val) {
    if (val) {
      this.init()
    }
  }
}
```
## 计算鼠标位置相对于canvas的坐标 `windowToCanvas(x, y)`
```js
windowToCanvas(x, y) {
  var box = this.$refs.canvas.getBoundingClientRect()
  return {
    x: x - box.left - (box.width - this.$refs.canvas.width) / 2,
    y: y - box.top - (box.height - this.$refs.canvas.height) / 2
  }
}
```
## 鼠标滚轮事件 `wheel(event)`
```js
wheel(event) {
  // 参考点坐标
  var pos = this.windowToCanvas(event.clientX, event.clientY)
  const wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40))
  // 图片上次的参考
  var newPos = {
    x: Number(((pos.x - this.imgX) / this.imgScale).toFixed(2)),
    y: Number(((pos.y - this.imgY) / this.imgScale).toFixed(2))
  }
  if (wheelDelta > 0) {
    this.imgScale += 0.1
  } else {
    this.imgScale -= 0.1
    if (this.imgScale < this.MINIMUM_SCALE) {
      this.imgScale = this.MINIMUM_SCALE
    }
  }
  this.imgX = (1 - this.imgScale) * newPos.x + (pos.x - newPos.x)
  this.imgY = (1 - this.imgScale) * newPos.y + (pos.y - newPos.y)
  this.drawImage()
}
```
## 鼠标移出元素事件 `mouseout()`
```js
mouseout() {
  this.dragging = false
}
```
