<script setup lang="ts">
import * as THREE from 'three'
import { nextTick, ref, watchEffect } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useElementSize } from '@vueuse/core';

const container = ref()
const { width, height } = useElementSize(container)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 100 / 100, 0.1, 2000)
camera.position.set(200, 200, 200)
const renderer = ref<THREE.WebGLRenderer>(new THREE.WebGLRenderer())

const material = new THREE.MeshBasicMaterial({
  color: 0x409eff
})
const geometry = new THREE.BoxGeometry(150, 150, 150)
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
scene.add(camera)

function animate() {
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  renderer.value.setSize(width.value, height.value)
  renderer.value.render(scene, camera)
  requestAnimationFrame(animate)
}

watchEffect(() => {
  camera.aspect = width.value / height.value
  camera.updateProjectionMatrix()
  renderer.value.setSize(width.value, height.value)
})

nextTick(() => {
  new OrbitControls(camera, renderer.value.domElement)
  container.value.appendChild(renderer.value.domElement)
  animate()
})
</script>

<template>
  <div ref="container" style="height: 400px;" />
</template>
