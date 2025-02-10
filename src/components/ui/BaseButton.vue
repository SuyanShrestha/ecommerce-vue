<script setup>
import { computed } from 'vue'

const props = defineProps({
  backgroundColor: { type: String, default: '' },
  textColor: { type: String, default: 'white' },
  borderRadius: { type: String, default: '1rem' },
  padding: { type: String, default: '10px 16px' },
})

const computedStyles = computed(() => ({
  backgroundColor: props.backgroundColor || 'var(--success-color)',
  color: props.textColor,
  borderRadius: props.borderRadius,
  padding: props.padding,
  border: 'none',
  cursor: 'pointer',
}))
</script>

<template>
  <button :style="computedStyles">
    <slot></slot>
  </button>
</template>
