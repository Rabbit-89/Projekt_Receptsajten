<script setup></script>

<template>
  <footer class="footer">
    <!-- Background + Overlay -->
    <div class="footer-bg"></div>
    <div class="footer-overlay"></div>

    <!-- Content -->
    <div class="footer-content">
      
      <h2 class="title">
        About
      </h2>

      <p class="text">
        We help you discover the endless possibilities of your rice cooker, 
        from perfectly fluffy rice and hearty one-pot meals to surprising 
        desserts and breakfast dishes. Our goal is to show you how versatile 
        and convenient rice cooker cooking can be, making delicious meals 
        accessible for everyone. Explore our collection of rice cooker recipes, 
        discover new favorites, and transform your kitchen routine with the 
        simplicity and joy of one-pot cooking.
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
        <img
          src="@/assets/social/chas_logo.svg"
          class="logo"
          alt="ChasAcademy logo"
        />
      <p>
        &copy; ChasAcademy | FUX25  | Grupp A
      </p>
    </div>
  </footer>
</template>

<style scoped>
/* Footer Container */
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
  background-image: url("@/assets/footer_bild.png");
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
  max-width: 100%;
  padding: 4rem 1rem;
  text-align: left;
  margin: 0 auto;
}

.title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.text {
  font-size: 1.25rem;
  line-height: 1.7rem;
  margin-bottom: 3rem;
  max-width: 600px;
}

.footer-link {
  color: white;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

/* Social Icons */
.icons {
  position: relative;
  z-index: 3;
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  margin-bottom: 3rem;
  padding-left: 1rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
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

/* Media Queries */
@media (min-width: 1024px) {
  .footer-content {
    max-width: 1280px;
  }

  .icons {
    max-width: 1280px;
  }
}
</style>
