<script setup lang="ts">
import * as THREE from 'three'
import { nextTick, ref} from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const WIDTH = 750
const HEIGHT = 400
const container = ref()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)
camera.position.set(200, 200, 200)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)

const material = new THREE.MeshBasicMaterial({
  color: 0x409eff
})
const geometry = new THREE.BoxGeometry(150, 150, 150)
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
scene.add(camera)

function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  renderer.render(scene, camera)
}
new OrbitControls(camera, renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = WIDTH / HEIGHT
  camera.updateProjectionMatrix()
  renderer.setSize(WIDTH, HEIGHT)
})
nextTick(() => {
  container.value.appendChild(renderer.domElement)
  new OrbitControls(camera, renderer.domElement)
  animate()
})

</script>

<template>
  <div ref="container" class="container" :style="{
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    margin: '0 auto'
  }" />
</template>
