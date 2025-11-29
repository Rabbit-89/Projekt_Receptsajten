<script setup></script>

<template>
  <footer class="footer">
    <!-- Background + Overlay -->
    <div class="footer-bg"></div>
    <div class="footer-overlay"></div>

    <!-- Content -->
    <div class="footer-content">
      
      <h2 class="title">
        About Us
      </h2>

      <p class="text">
        We help you find inspiration in the kitchen — whether you're starting
        the day with an energizing breakfast, preparing a quick lunch, cooking
        a comforting dinner, or finishing with a delicious dessert. Our goal is
        to make cooking easier, more enjoyable, and accessible for everyone.
        Explore our recipes, discover new favorites, and let the joy of food
        become a natural part of your everyday life.
      </p>
    </div>

    <!-- Social Icons -->
    <div class="icons">
      <div class="icon-box">
        <img src="@/assets/social/facebook.svg" alt="Facebook icon" />
      </div>

      <div class="icon-box">
        <img src="@/assets/social/instagram.svg" alt="Instagram icon" />
      </div>

      <div class="icon-box">
        <img src="@/assets/social/pinterest.svg" alt="Pinterest icon" />
      </div>

      <div class="icon-box">
        <img src="@/assets/social/twitter.svg" alt="Twitter icon" />
      </div>
    </div>

    <!-- Footer Bar -->
    <div class="footer-bar">
      <router-link to="/about" class="logo-link">
        <img
          src="@/assets/social/chas_logo.svg"
          class="logo"
          alt="ChasAcademy logo"
        />
      </router-link>
      <p>
        &copy; ChasAcademy | FUX2025 | 
        <router-link to="/" class="footer-link">
          <strong>About Grupp A &rarr;</strong>
        </router-link>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  min-height: 480px;
  overflow: hidden;
  color: white;
}

/* Background Image */
.footer-bg {
  position: absolute;
  inset: 0;
  background-image: url("@/assets/footer_bild.png"); /* PNG image */
  background-size: cover;
  background-position: center;
  z-index: 1;
}

/* Dark Overlay */
.footer-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 2;
}

/* Content */
.footer-content {
  position: relative;
  z-index: 3;
  max-width: 900px;
  padding: 4rem 2rem;
  text-align: left;
}

.title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-link {
  color: white;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

.text {
  font-size: 1.25rem;
  line-height: 1.7rem;
  margin-bottom: 3rem;
}

/* Social Icons */
.icons {
  position: relative;
  z-index: 3;
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  margin-bottom: 3rem;
  padding-left: 4rem;
}

.icon-box {
  width: 66px;
  height: 66px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

.icon-box:hover {
  opacity: 0.75;
}

.icon-box img {
  width: 44px;
  height: 44px;
}

/* Footer Bar */
.footer-bar {
  background: var(--brown-color);
  color: #fff;
  padding: 1.3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  z-index: 3;
}

.logo {
  height: 40px;
  cursor: pointer;
}

.logo-link {
  display: inline-block;
}

</style>
