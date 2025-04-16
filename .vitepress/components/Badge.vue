<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  name: 'Badge'
})
const props = defineProps<{
  text: string
  type?: 'success' | 'info' | 'warning' | 'danger' | ''
  effect?: 'dark' | 'light' | 'plain'
  round?: boolean
  size?: 'large' | 'default' | 'small' | ''
}>()

const effect = computed(() => props.effect || 'plain')
const type = computed(() => props.type || 'primary')
const round = computed(() => props.round || true)
const size = computed(() => props.size || 'small')
</script>

<template>
  <el-tag :type="type" :effect="effect" :round="round" :size="size" v-text="props.text" />
</template>
