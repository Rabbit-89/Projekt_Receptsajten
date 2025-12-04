<!-- ErrorMessageComment.vue -->
<script setup>

const props = defineProps({
  title: {
    type: String,
    default: "Error",
  },
  message: {
    type: String,
    required: true,
  },
});

// Emits//"close": triggered when the modal should be closed
const emit = defineEmits(["close"]);

// Function to emit the "close" event
//  Called when user clicks outside modal, X button, or OK button
const close = () => emit("close");

</script>

<template>
  <!-- Fullscreen overlay background, click closes modal -->
  <div class="modal-overlay" @click="close">
    <!-- Modal box content, click.stop prevents closing when clicking inside -->
    <div class="modal-content" @click.stop>
      <!-- Close button (X) -->
      <span class="close-btn" @click="close">&times;</span>

      <!-- Modal title -->
      <h2 class="modal-title">{{ title }}</h2>

      <!-- Modal message -->
      <p class="modal-message">{{ message }}</p>

      <!-- OK button to close modal -->
      <button class="modal-button" @click="close">OK</button>
    </div>
  </div>
</template>

<style scoped>
/* Background overlay for modal */
.modal-overlay {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal content box */
.modal-content {
  background-color: var(--light-yellow-color);
  color: var(--black-color);  
  border: 2px solid var(--orange-color); 
  border-radius: 12px;
  width: 90%;
  max-width: 420px;
  padding: 1.6rem;
  position: relative;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.25s ease-out;
}

/* Fade-in animation for modal */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.93); }
  to { opacity: 1; transform: scale(1); }
}

/* Close button (X) */
.close-btn {
  position: absolute;
  top: 10px;
  right: 16px;
  color: var(--black-color);
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
}
.close-btn:hover {
  color: var(--orange-color);
}

/* Modal title style */
.modal-title {
  font-family: var(--font-secondary);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--black-color);
}

/* Modal message text */
.modal-message {
  font-family: var(--font-main);
  color: var(--black-color);
  margin-bottom: 1.4rem;
  line-height: 1.4;
}

/* OK button style */
.modal-button {
  background-color: var(--orange-color);
  color: var(--black-color);
  padding: 0.6rem 1.8rem;
  border-radius: 30px;
  font-family: var(--font-main);
  cursor: pointer;
  font-size: 1rem;
}
.modal-button:hover {
  background-color: var(--light-yellow-color);
  border: 2px solid var(--orange-color); /* Highlight on hover */
}
</style>
