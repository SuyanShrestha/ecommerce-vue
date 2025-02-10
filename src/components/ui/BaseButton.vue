<script setup>
import { computed } from 'vue'

const props = defineProps({
  backgroundColor: { type: String, default: 'var(--button-primary)' },
  textColor: { type: String, default: 'white' },
  borderRadius: { type: String, default: '0.75rem' },
  padding: { type: String, default: '12px 18px' },
  border: { type: String, default: 'none' },
  hoverBackground: { type: String, default: 'var(--button-primary-hover)' },
})

const computedStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.textColor,
  borderRadius: props.borderRadius,
  padding: props.padding,
  border: props.border,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out',
}))

const hoverStyles = computed(() => ({
  backgroundColor: props.hoverBackground,
}))
</script>

<template>
  <button
    :style="computedStyles"
    @mouseover="computedStyles.backgroundColor = hoverStyles.backgroundColor"
    @mouseleave="computedStyles.backgroundColor = props.backgroundColor"
  >
    <slot></slot>
  </button>
</template>
