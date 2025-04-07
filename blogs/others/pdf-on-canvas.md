---
title: 实现pdf在canvas中展示
layout: doc
tags: [pdf, canvas, vue]
---

## 安装 pdfjs-dist
```shell
pnpm i pdfjs-dist
```

## 代码
```vue
<script setup lang="ts">
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import { ref, onMounted } from 'vue'
const canvasRef = ref()
const fileRef = ref()
const width = window.innerWidth
const numPages = ref(0)
function handleFile() {
  const file = fileRef.value.files[0]
  const fileReader = new FileReader()
  fileReader.onload = () => {
    const typedArray = new Uint8Array(fileReader.result)
    renderPDFToCanvas(typedArray)
  }

  fileReader.readAsArrayBuffer(file)
}
function renderPDFToCanvas(typedArray: Uint8Array) {
  const ctx = canvasRef.value.getContext('2d')

  getDocument({ data: typedArray }).promise.then(pdf => {
    // 
    numPages.value = pdf.numPages

    const renderPage = (pageNum: number) => {
      pdf.getPage(pageNum).then(page => {
        const viewport = page.getViewport({ scale: 1.5 })
        canvasRef.value.width = viewport.width
        canvasRef.value.height = viewport.height

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }

        page.render(renderContext)
      })
    }

    renderPage(1) // 从第一页开始渲染
  })

}
onMounted(() => {
  // 需要在项目的 /public 下加入 pdfjs-dist，在 node_modules 中可以找到
  GlobalWorkerOptions.workerSrc = `pdf.worker.js`
})
</script>

<template>
  <!-- 上传 pdf 文件 执行 handleFile -->
  <input type="file" ref="fileRef" @change="handleFile">
  <div>
    <canvas ref="canvasRef" :width="width" :height="0"></canvas>
  </div>
</template>
```
