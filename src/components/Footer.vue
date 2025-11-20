<script setup></script>

<template>
  <footer class="footer">
    <!-- Bakgrundsbild -->
    <div class="footer-bg"></div>

    <!-- Sökfunktion -->
    <div class="footer-search">
      <div class="input-wrapper">
        <svg
          class="search-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
            fill="#573311"
          />
        </svg>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="This is a placeholder text..."
          class="search-input"
        />

        <svg
          class="select-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#1A3050"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- Innehåll -->
    <div class="footer-content">
      <h2 class="title">About Us</h2>

      <p class="text">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>

    <!-- Ikoner -->
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
        <img src="@/assets/social/twitter.svg" alt="twitter eller X icon" />
      </div>
    </div>

    <!-- Footer Bar -->
    <div class="footer-bar">
      <img src="@/assets/social/chas_logo.svg" class="logo" alt="ChasAcademy logo"/>
      <p> &#169; ChasAcademy | FUX2025</p>  <!--&copy; 	COPYRIGHT HTML symbols-->
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  min-height: 480px;
  overflow: hidden;
  color: white;
  font-family: var(--font-secondary);
}

/* Bakgrund */
.footer-bg {
  position: absolute;
  inset: 0;
  background-image: url("@/assets/footer_bild.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: 1;
}

/* Textinnehåll */
.footer-content {
  position: relative;
  z-index: 2;
  margin: auto;
  max-width: 900px;
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
}

/* Icons layout */
.icons {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 1.5rem; 
  justify-content: center; 
  margin-bottom: 3rem; 
  padding-bottom: 1rem; 
}

/* Extra för desktop */
@media (min-width: 768px) {
  .icons,
  .footer-content {
    justify-content: flex-start; 
    margin-bottom: 4rem; 
    padding-left: 4rem; 
  }
}

.icon-box {
  width: 55px;
  height: 55px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  opacity: 1;
  cursor: pointer;
}

.icon-box:hover {
    opacity: 0.75;
}

.icon-box img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  opacity: 1 !important;
}

/* Footerbar */
.footer-bar {
  position: relative;
  z-index: 2;
  background: var(--brown-color); /* #56320F;*/
  color: #fff;
  padding: 1.3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.logo {
  height: 40px;
  cursor: pointer;
}

.footer-search {
  max-width: 400px;
  margin: 2rem auto;
  position: relative;
  z-index: 2;
}

/* Desktop: flytta sökfältet till höger */
@media (min-width: 768px) {
  .footer-search {
    margin: 2rem 4rem 2rem auto !important;
    max-width: 350px; /* valfritt */
  }
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 42px 12px 14px;
  border-radius: 10px;
  padding-left: 3rem;

  background: var(--light-yellow-color);
  border: 2px solid #c8a88a;
  font-size: 16px;
  color: #4a2a14;

  box-shadow: 0 0 6px rgba(0, 0, 0, 0.35);
}

.search-input::placeholder {
  color: #8b6b55;
}

.select-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  margin-left: 3rem;
}
.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  margin-right: 3rem
}
</style>
