<template>
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
</template>
