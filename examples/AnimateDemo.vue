<script setup lang="ts">
import { ref } from 'vue';
import animate, { easing } from "animate.ts"

const easingFunction = ref({ ...easing })

const form = ref({
  start: 0,
  end: 300,
  duration: 1000,
  easing: 'easeOutBounce'
})
const animateBoxRef = ref()

function handleAnimate() {
  animate({
    start: form.value.start,
    end: form.value.end,
    duration: form.value.duration,
    easing: easing[form.value.easing],
    onStep: (value: number, x: number) => {
      animateBoxRef.value.style.left = `${x}px`
      animateBoxRef.value.style.top = `${value}px`
    }
  })
}
</script>

<template>
  <div>
    <el-form :model="form" label-width="80px">
      <el-form-item label="执行时间" prop="duration">
        <el-input-number v-model="form.duration" :min="1000" :step="500" />
      </el-form-item>
      <el-form-item label="执行时间" prop="easing">
        <el-select v-model="form.easing" clearable filterable style="width: 230px">
          <el-option v-for="item in Object.keys(easingFunction)" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAnimate">执行</el-button>
      </el-form-item>
    </el-form>
    <div style="width: 400px;height: 310px;position: relative;border-radius: 5px;border: 1px #ccc solid">
      <div ref="animateBoxRef" style="width: 10px;height: 10px;border-radius: 50%;position: absolute;background: #409eff;" />
    </div>
  </div>
</template>

