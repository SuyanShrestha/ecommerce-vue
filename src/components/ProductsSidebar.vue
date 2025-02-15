<template>
  <div class="component-container">
    <input type="text" class="search-bar" v-model="searchText" placeholder="Search product..." />

    <div class="rating-filter-container section-container">
      <span class="filter-name">Filter by Rating</span>

      <div class="rating-filter-inner-container">
        <input
          type="text"
          class="rating-input"
          v-model="ratingForFilter"
          placeholder="Min Rating"
        />
        <button @click="handleRatingClick" class="filter-btn">Apply</button>
      </div>
    </div>

    <!-- sort by price -->
    <div class="price-sort-container section-container">
      <span class="filter-name">Filter by Price</span>
      <div class="price-sort-inner-container">
        <div class="price-input-container">
          <input type="text" class="price-input" v-model="minPrice" placeholder="Min Price" />
          <input type="text" class="price-input" v-model="maxPrice" placeholder="Max Price" />
        </div>
        <div class="custom-dropdown" @click="toggleDropdown">
          <button class="selected-option" :class="{ 'selected-option-pressed': dropdownOpen }">
            {{ selectedSortLabel }}
          </button>
          <ul v-if="dropdownOpen" class="dropdown-menu">
            <li
              v-for="option in sortOptions"
              :key="option.value"
              @click.stop="selectSortOption(option.value)"
              :class="{ selected: option.value === sortPriceBy }"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- categories -->
    <div class="category-container section-container">
      <span class="filter-name">Categories</span>
      <div v-if="categoryList.length === 0" class="loading-message">Loading categories...</div>
      <ul class="category-wrapper">
        <li
          class="category-item"
          @click="selectCategory('all')"
          :class="{ 'selected-category': selectedCategory === 'all' }"
        >
          ALL
        </li>
        <li
          v-for="category in categoryList"
          :key="category.id"
          class="category-item"
          @click="selectCategory(category)"
          :class="{ 'selected-category': selectedCategory === category }"
        >
          {{ category.name.toUpperCase() }}
        </li>
      </ul>
    </div>

    <div class="section-container">
      <button @click="resetAllFilters" class="filter-btn">Reset filters</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useDebounce } from '@/composables/useDebounce.js'

const store = useStore()
const props = defineProps({
  listType: {
    type: String,
    required: true,
  },
})
const searchText = ref('')
const ratingForFilter = ref('')
const sortPriceBy = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const dropdownOpen = ref(false)
const selectedCategory = ref('all')

const sortOptions = [
  { label: 'No Sorting', value: '' },
  { label: 'Low to High', value: 'low-to-high' },
  { label: 'High to Low', value: 'high-to-low' },
]

const selectedSortLabel = computed(() => {
  return sortOptions.find((opt) => opt.value === sortPriceBy.value)?.label || 'Select'
})

const categoryList = computed(() => store.state[props.listType].allCategories)

// filterBySearch
const debouncedSearchText = useDebounce(searchText, 500)

watch(debouncedSearchText, (newVal) => {
  store.commit(`${props.listType}/filterBySearch`, newVal)
})

// filterByRating
const handleRatingClick = () => {
  store.commit(`${props.listType}/filterByRating`, Number(ratingForFilter.value))
}

// filterByPrice
const debouncedMinPrice = useDebounce(minPrice, 500)
const debouncedMaxPrice = useDebounce(maxPrice, 500)

watch(debouncedMinPrice, (newVal) => {
  store.commit(`${props.listType}/filterByMinPrice`, newVal)
})
watch(debouncedMaxPrice, (newVal) => {
  store.commit(`${props.listType}/filterByMaxPrice`, newVal)
})

// sortPrice
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectSortOption = (value) => {
  sortPriceBy.value = value
  dropdownOpen.value = false
}

watch(sortPriceBy, (newSort) => {
  store.commit(`${props.listType}/sortPriceBy`, newSort)
})

// filter by category
const selectCategory = (category) => {
  selectedCategory.value = category
  store.commit(`${props.listType}/filterByCategory`, category)
}

const resetAllFilters = () => {
  searchText.value = ''
  ratingForFilter.value = ''
  minPrice.value = ''
  maxPrice.value = ''
  sortPriceBy.value = ''
  dropdownOpen.value = false
  selectedCategory.value = 'all'
  store.commit(`${props.listType}/resetAllFilters`)
}
</script>

<style scoped>
.component-container {
  width: 20vw;
  height: calc(100vh - 8vh);
  background: var(--background-light-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  padding: 2rem 0;
  overflow-y: auto;
}

.section-container {
  border-top: 1px solid var(--neumo-shadow-dark);
  padding-top: 2rem;
}

.search-bar,
.rating-input,
.price-input,
.selected-option {
  border: 1px solid var(--border-dark);
  border-radius: 2rem;
  background: var(--background-light-200);
  box-shadow:
    3px 3px 3px var(--neumo-shadow-dark),
    -2px -2px 2px var(--neumo-shadow-light);
  outline: none;
  height: 3rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.search-bar {
  width: 90%;
  padding: 1rem 2rem;
}

.search-bar:focus,
.rating-input:focus,
.price-input:focus {
  box-shadow:
    inset 3px 3px 3px var(--neumo-shadow-dark),
    inset -2px -2px 2px var(--neumo-shadow-light);
}

.rating-filter-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  width: 90%;
}

.rating-filter-inner-container {
  display: flex;
  gap: 2rem;
}

.rating-input {
  padding: 1rem 2rem;
  width: 14rem;
  /* width: 40%; */
}

.filter-btn {
  cursor: pointer;
  border-radius: 2rem;
  /* flex: 0.4; */
  min-width: 8rem;
  padding: 0 1rem;
  min-height: 3rem;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--button-text-dark);
  background: var(--button-secondary);
  transition: all 0.3s ease;
  box-shadow:
    2px 2px 8px rgba(0, 0, 0, 0.5),
    -2px -2px 8px rgba(255, 255, 255, 0.8);
}

.filter-btn:hover {
  background: var(--button-secondary-hover);
  color: var(--button-text-light);
}

/* price sorting */
.price-sort-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}

.price-sort-inner-container {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.price-input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-secondary);
}

.price-input {
  padding: 1rem 2rem;
  width: 12rem;
  /* width: 40%; */
}

/* Custom Dropdown */
.custom-dropdown {
  position: relative;
  transition: all 0.3s ease;
}

.selected-option {
  display: block;
  color: var(--text-secondary);
  cursor: pointer;
  text-align: center;
  align-content: center;

  font-size: 1rem;
  font-weight: bold;
  padding: 0 1.6rem;
}

.selected-option-pressed {
  box-shadow:
    inset 3px 3px 3px var(--neumo-shadow-dark),
    inset -2px -2px 2px var(--neumo-shadow-light);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--background-light-200);
  border: 1px solid var(--border-dark);
  border-top: none;
  border-radius: 1rem;
  box-shadow:
    3px 3px 3px var(--neumo-shadow-dark),
    -2px -2px 2px var(--neumo-shadow-light);
  padding: 0.5rem 0;
  z-index: 10;
  list-style-type: none;
}

.dropdown-menu li {
  padding: 0.8rem;
  cursor: pointer;
  text-align: center;
  transition: background 0.3s ease;
  color: var(--text-primary);
}

.dropdown-menu li:hover {
  background: var(--background-light-300);
}

.selected,
.selected-category {
  font-weight: bold;
  color: var(--text-secondary);
}

/* category section */
.category-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.category-wrapper {
  list-style-type: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-item {
  border: 1px solid var(--border-dark);
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 4px;
  padding: 0 1rem;
  background: var(--background-light-200);
  color: var(--text-secondary);
  box-shadow:
    3px 3px 3px var(--neumo-shadow-dark),
    -2px -2px 2px var(--neumo-shadow-light);
  outline: none;
  height: 3rem;
  width: 100%;
  transition: all 0.3s ease;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.selected-category {
  border: 1px solid var(--border-dark);
  border-radius: 4px;
  box-shadow:
    inset 3px 3px 3px var(--neumo-shadow-dark),
    inset -2px -2px 2px var(--neumo-shadow-light);
}
</style>
