<template>
  <div class="hero-section">
    <div class="hero-left">
      <h1 class="headline">Fresh Arrivals Available</h1>
      <p class="subheading">Discover Our Newest Collections Today</p>
      <button class="cta-button">Get Started</button>
    </div>
    <div class="hero-right">
      <img src="../assets/hero-image.jpeg" alt="Hero Image" class="hero-image" />
    </div>
  </div>
</template>

<script></script>

<style scoped>
.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90vh;
  max-height: 100vh;
  background-color: var(--background-color);
  padding: 5rem 10rem;
  background: url('../assets/svg/wavy-trails.svg') no-repeat center center;
  background-size: cover;
  position: relative;
}

.hero-left {
  flex: 1;
  max-width: 500px;
}

.headline {
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
  line-height: 1.2;
}

.subheading {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin: 20px 0;
  max-width: 400px;
}

.cta-button {
  padding: 12px 25px;
  font-size: 1.2rem;
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  cursor: pointer;
}

.hero-right {
  flex: 1;
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}
</style>
