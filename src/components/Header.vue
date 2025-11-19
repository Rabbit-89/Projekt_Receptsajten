<script setup>
import Navigation from './Navigation.vue';

</script>

<template>
    <header class="hero">
        <img class="hero-image" src="../assets/HeroImage2.png" alt="Delicious food" />
        <Navigation />
        <div class="hero-content">
            <h1>Quick Recipes</h1>
            <p>Where fast meets flavorful</p>
        </div>
    </header>
</template>

<style scoped>
h1 {
    font-family: var(--font-secondary);
    font-size: 5rem;
}

p {
    font-family: var(--font-primary);
    font-size: 1.5rem;
    font-style: normal;
    line-height: 2rem;
    /* 160% */
    letter-spacing: 0.075rem;
}

.hero {
    /* margin: 2rem 0rem; */
    position: relative;
    text-align: center;
    background-color: #ececec;
    overflow: hidden;
    /* give the hero an explicit height so the absolutely positioned image fills it */
    min-height: 420px;
}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Ensure the image covers the area without distortion */
    z-index: 1;
    /* Place the image behind content */
    /* border-radius: 8px; */
}

.hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3;
    /* Place the text above the image and the nav */
    color: #ffffff;
    padding: 2rem;
    height: 100%;
    margin-top: 10%;
}
</style>
