# PC端和移动端交互事件
## 鼠标事件
### 鼠标左键单击
```javascript
click() {
  console.log('鼠标左键点击 ')
},

```
### 鼠标右键单击
```javascript
contextmenu() {
  console.log('鼠标右键点击 ')
},
```
### 鼠标左键双击点击
```javascript
dblclick() {
  console.log('鼠标左键双击点击 ')
},
```
### 鼠标按下
```javascript
mousedown() {
  console.log('鼠标按下')
},

```
### 鼠标释放
```javascript
mouseup() {
  console.log('鼠标释放')
},

```
### 鼠标移动
```javascript
mousemove() {
  console.log('鼠标移动')
},
```
### 鼠标移入
```javascript
mouseover() {
  console.log('鼠标移入')
},
```
### 鼠标移出
```javascript
mouseout() {
  console.log('鼠标移出')
},
```
### 鼠标进入（在元素内移动时触发，不会冒泡）
```javascript
mouseenter() {
  console.log('鼠标进入（在元素内移动时触发，不会冒泡）')
},
```
### 鼠标离开（从元素内移出时触发，不会冒泡）
```javascript
mouseleave() {
  console.log('鼠标离开（从元素内移出时触发，不会冒泡）')
},
```
### 鼠标滚轮滚动
```javascript
wheel() {
  console.log('鼠标滚轮滚动')
},
```
## 键盘事件
### 键盘按键按下
```javascript
keydown() {
  console.log('键盘按键按下')
},
```
### 键盘按键释放
```javascript
keyup() {
  console.log('键盘按键释放')
},
```
### 键盘按键输入
```javascript
keypress() {
  console.log('键盘按键输入')
},
```
## 触摸事件
### 触摸开始
```javascript
touchstart() {
  console.log('触摸开始')
},
```
### 触摸结束
```javascript
touchend() {
  console.log('触摸结束')
},
```
### 触摸移动
```javascript
touchmove() {
  console.log('触摸移动')
},
```
### 触摸取消
```javascript
touchcancel() {
  console.log('触摸取消')
},
```
## 拖放事件
### 拖动开始
```javascript
dragstart() {
  console.log('拖动开始')
},
```
### 拖动结束
```javascript
dragend() {
  console.log('拖动结束')
},
```
### 在可拖动元素上方拖动时触发
```javascript
dragover() {
  console.log('在可拖动元素上方拖动时触发')
},
```
### 拖动进入目标区域
```javascript
dragenter() {
  console.log('拖动进入目标区域')
},
```
### 拖动离开目标区域
```javascript
dragleave() {
  console.log('拖动离开目标区域')
},
```
### 完成拖放操作
```javascript
drop() {
  console.log('完成拖放操作')
},
```
## 窗口事件
### 窗口大小改变
```javascript
resize() {
  console.log('窗口大小改变')
},
```
### 滚动条滚动
```javascript
scroll() {
  console.log('滚动条滚动')
},
```
