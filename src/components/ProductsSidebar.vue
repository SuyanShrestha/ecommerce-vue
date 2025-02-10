<template>
  <div class="component-container">
    <input type="text" class="search-bar" v-model="searchText" placeholder="Search product..." />

    <div class="rating-filter-container">
      <input
        type="text"
        class="rating-input"
        v-model="ratingForFilter"
        placeholder="Enter minimum rating"
      />
      <BaseButton @click="handleRatingClick">Filter by Rating</BaseButton>
    </div>

    <div class="price-sort-container">
      <span>Sort by Price</span>
      <select v-model="sortPriceBy">
        <option value="">No Sorting</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </div>

    <BaseButton @click="resetAllFilters">Reset filters</BaseButton>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useDebounce } from '@/composables/useDebounce.js'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useStore()
const searchText = ref('')
const ratingForFilter = ref('')
const sortPriceBy = ref('')

// filterBySearch
const debouncedSearchText = useDebounce(searchText, 500)

watch(debouncedSearchText, (newVal) => {
  console.log('debouncedSearchText.value: ', newVal)
  store.commit('products/filterBySearch', newVal)
})

// filterByRating
const handleRatingClick = () => {
  console.log('ratingForFilter:', ratingForFilter.value)
  store.commit('products/filterByRating', Number(ratingForFilter.value))
}

// sortPrice
watch(sortPriceBy, (newSort) => {
  console.log('sortPriceValue:', newSort)
  store.commit('products/sortPriceBy', newSort)
})

const resetAllFilters = () => {
  searchText.value = ''
  ratingForFilter.value = ''
  sortPriceBy.value = ''
  store.commit('products/resetAllFilters')
}
</script>

<style scoped>
.search-bar {
  width: 30vw;
  background: white;
  padding: 1rem 2rem;
}

.rating-input {
  padding: 0.5rem 1rem;
}
</style>
