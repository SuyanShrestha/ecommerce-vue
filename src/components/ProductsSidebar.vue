<template>
  <div class="page-container">
    <input type="text" class="search-bar" v-model="searchText" placeholder="Search product..." />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useDebounce } from '@/composables/useDebounce.js'

const store = useStore()
const searchText = ref('')
const debouncedSearchText = useDebounce(searchText, 500)

watch(debouncedSearchText, (newVal) => {
  console.log('debouncedSearchText.value: ', newVal)
  store.commit('products/filterBySearch', newVal)
})
</script>

<style scoped>
.search-bar {
  width: 30vw;
  background: white;
  padding: 1rem 2rem;
}
</style>
