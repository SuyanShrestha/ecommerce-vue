<template>
  <div class="about-section">
    <div class="about-left">
      <h2 class="about-title">About Us</h2>
      <p class="about-description">
        We are committed to providing the best and most innovative products to our customers. Our
        goal is to make your shopping experience memorable and hassle-free.
      </p>
      <p class="about-more">
        With years of expertise in the industry, we take pride in offering top-notch quality and
        service to each of our customers. Join us as we continue to innovate and provide products
        that meet your needs.
      </p>
    </div>
    <div class="about-right">
      <div class="stats-container">
        <div class="stat-card">
          <h3 class="stat-number">800+</h3>
          <p class="stat-label">Happy Customers</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">2+</h3>
          <p class="stat-label">Years in Business</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">2500+</h3>
          <p class="stat-label">Products Sold</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutSection',
}
</script>

<style scoped>
.about-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 12rem;
  background: url('../assets/svg/wavy.svg') no-repeat center center;
  background-size: cover;
  position: relative;
  height: 80vh;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.about-left {
  flex: 1;
  max-width: 500px;
}

.about-title {
  font-size: 2.8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1.2rem;
}

.about-description,
.about-more {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 20px;
}

.about-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stats-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 180px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: var(--success-color);
}

.stat-label {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-top: 10px;
}
</style>
