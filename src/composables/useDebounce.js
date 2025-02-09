import { ref, watch } from 'vue'

export function useDebounce(value, delay = 500) {
  const debouncedValue = ref(value.value)

  //   watch used to track reactivity on changes of value
  let timeout = null
  watch(value, () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = value.value
    }, delay)
  })

  return debouncedValue
}
