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
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay for dark mode */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal content box */
.modal-content {
  background-color: #2a2a2a; /* Dark mode background */
  color: #f5f5f5; /* Light text for contrast */
  border: 2px solid #b7352b; /* Red border for error highlight */
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
  color: #f5f5f5;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
}
.close-btn:hover {
  color: #ff6961; /* Slight red hover effect */
}

/* Modal title style */
.modal-title {
  font-family: var(--font-secondary);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ff4c4c; /* Bright red title */
}

/* Modal message text */
.modal-message {
  font-family: var(--font-main);
  color: #e0e0e0; /* Light grey text */
  margin-bottom: 1.4rem;
  line-height: 1.4;
}

/* OK button style */
.modal-button {
  background-color: #573311;
  color: white;
  padding: 0.6rem 1.8rem;
  border-radius: 30px;
  font-family: var(--font-main);
  cursor: pointer;
  font-size: 1rem;
}
.modal-button:hover {
  background-color: #773f23;
  border: 2px solid #f9ae4a; /* Highlight on hover */
}
</style>
