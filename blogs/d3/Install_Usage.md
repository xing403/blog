---
title: three.js 安装与使用
layout: doc
---

# three.js 安装与使用

<el-divider />

three.js 是一个基于 `WebGL` 的 `JavaScript` 库，用于创建 `3D` 图形。

## `three.js` 安装
```shell
npm install three
```
注意 `three.js` 的版本号


## 在项目中引入 `three.js`
```ts
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
```

```ts
const WIDTH = 400
const HEIGHT = 300
const container = ref() // 挂着元素的容器
const scene = new THREE.Scene() // 场景
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000) // 相机
camera.position.set(200, 200, 200)// 相机位置
const renderer = new THREE.WebGLRenderer()// 渲染器
renderer.setSize(WIDTH, HEIGHT) // 设置渲染器的尺寸
const material = new THREE.MeshBasicMaterial({color: 0x409eff})// 创建一个网格模型(材质)
const geometry = new THREE.BoxGeometry(100, 100, 100) // 创建一个网格模型(几何体)
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)   // 把网格模型添加到场景中
scene.add(camera) // 把相机添加到场景中

nextTick(() => {
  const controls = new OrbitControls(camera, renderer.domElement)
  container.value.appendChild(renderer.domElement)
})
```
### Scene 场景
可以理解为世界地图，是一个三维空间，可以放置 `物体`，可以放置`光源`，可以放置`摄像机`。

### PerspectiveCamera 透视相机
画面的透视，可以理解为眼睛的视角。

* 参数
  * `fov`：相机视角，类似视线宽度，值越大，相机视线内角度越大
  * `aspect`：相机的宽高比，类似可视屏的宽高比。
  * `near`：相机可视最近的距离。
  * `far`：相机可视最远的距离。 

### MeshBasicMaterial，BoxGeometry 网格模型材质和长方体几何
这里创建一个长方体 颜色 `0x409eff` 尺寸 : `(100, 100, 100)`
并且使用 `Mesh` 创建模型 


### WebGLRenderer 渲染器
将相当于捕获相机的当前的帧，并渲染到canvas画布上
* 需要在初始化中通过 `renderer.setSize` 设置渲染器的尺寸 并挂载到页面中

## OrbitControls 相机控制器
可以通过鼠标控制相机的移动，缩放，旋转

## 更新相机帧

```ts
function animate() { // 刷新
  requestAnimationFrame(animate)
  // 操作
  renderer.render(scene, camera)
}
// 当页面尺寸改变时，更新相机的宽高比
window.addEventListener('resize', () => {
  camera.aspect = WIDTH / HEIGHT
  camera.updateProjectionMatrix()
  renderer.setSize(WIDTH, HEIGHT)
})
```
## 效果
这里通过 修改 控制物体旋转
```ts
mesh.rotation.x += 0.01
mesh.rotation.y += 0.01
```
<script setup>
  import AutomaticRotation from '/examples/AutomaticRotation.vue'
</script>

::: raw
<AutomaticRotation />
:::

::: details 点击查看代码
<<< @/examples/AutomaticRotation.vue
:::
