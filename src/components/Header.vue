<script setup>
import Navigation from './Navigation.vue';

</script>

<template>
    <header class="hero">
        <img class="hero-image" src="../assets/HeroImage.png" alt="Delicious food" />
        <Navigation />
        <div class="hero-content">
            <h1>Welcome to Our Recipe App</h1>
            <p>Discover delicious recipes from around the world!</p>
            <button>Get Started</button>
        </div>
    </header>
</template>

<style scoped>
.hero{
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
    object-fit: cover; /* Ensure the image covers the area without distortion */
    z-index: 1; /* Place the image behind content */
    /* border-radius: 8px; */
}

.hero-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3; /* Place the text above the image and the nav */
    color: #ffffff;
    padding: 2rem;
    height: 100%;
}
</style>
