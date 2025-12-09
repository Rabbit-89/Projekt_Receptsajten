<script setup>
import { ref, watch } from "vue";

/*using emit to export the recipecard */
const emit = defineEmits(['search-update']);

/* Local search query to handle the input field */
const localSearchQuery = ref("");

/* Watch the localSearchQuery and emit the changes to the parent component */
watch(localSearchQuery, (query) => {
    /* Emit the new search query to the parent component */
    emit('search-update', query);
});

const executeSearch = () => {
    // This function is a method to handle the searchbar when the User uses the search button
    console.log("Searching for:", localSearchQuery.value);
}



</script>

<template>

    <form class="search-bar" @submit.prevent="executeSearch">
        
        <div class="search-container">
            <input type="text" v-model="localSearchQuery" placeholder="Search..." class="search-input" />
            <span class="search-icon"><img class="icon" src="../assets/icon_search.png"/></span> 
        </div>
 
        <!--- 
        <button type="submit" class="search-button">
        Search
        </button> -->
    </form>

</template>


<style scoped>
/* 1. Flex container för att arrangera fält och knapp */
.search-bar {
    position: relative;
  display: flex;
  gap: 10px; 
  padding: 20px;
  max-width: 800px; 
  margin: 0 auto;
}

/* 2. Wrapper för input och ikon */
.search-container {
  flex-grow: 1; 
  position: relative;
  background-color: var(--white-color); 
  border: 1px solid var(--brown-color); 
  border-radius: 8px; 
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 3. Själva inmatningsfältet */
.search-input {
  position: relative;
  width: 100%;
  padding: 12px 15px 12px 15px; 
  border: none;
  background-color: transparent; 
  font-size: 1rem;
  color: var(--black-color);
  box-sizing: border-box; 
}

.search-input:focus {
  outline: none; /* Ta bort standard-focus-ramen */

}


.search-icon {
  position: absolute;
  right: 10px;
  bottom: 0px;
}

.icon {
  top: 50%;
  transform: translateY(-50%); 
  /*pointer-events: none; /* Gör att klick passerar igenom till input 
  background: none;
  border: none;
  cursor: pointer; */
  line-height: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

}

@media screen and (max-width: 480px) {
  .search-bar {
    flex-direction: row; 
    position: relative;
  }

}

@media screen and (max-width: 768px) {
  .search-input {
    position: relative;
    font-size: 0.9rem;
}

}

@media screen and (max-width: 1024px) { 
    .search-input {
    font-size: 1rem;
}
}

</style>