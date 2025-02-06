<script setup>
import HomeOfferBarVue from './components/HomeOfferBar.vue'
import AppLayout from './layouts/AppLayout.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <HomeOfferBarVue v-if="route.name === 'home'" />
  <AppLayout />
</template>

<style scoped></style>
