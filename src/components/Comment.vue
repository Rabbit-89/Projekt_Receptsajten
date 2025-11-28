<script>
export default {
  name: "Comment",
  props: {
    comment: { type: Object, required: true }
  },
  data() {
    return {
      showReply: false,
      showReplies: false,
      replyText: ""
    };
  },
  computed: {
    formattedDate() {
      if (!this.comment.date) return ''
      const date = new Date(this.comment.date)
      const options = { 
        year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: '2-digit', hour12: true 
      }
      return date.toLocaleString('en-US', options).replace(',', ' ,')
    }
  },
  methods: {
    toggleReplyBox() {
      this.showReply = !this.showReply;
      
      this.showReplies = false;
    },
    sendReply() {
      if (!this.replyText.trim()) return;
      if (!this.comment.replies) this.$set(this.comment, "replies", []);
      this.comment.replies.push(this.replyText);
      this.replyText = "";
      this.showReply = false;
      this.showReplies = true;
    }
  }
};
</script>

<template>
<div class="comment-section">
  <div class="comment-card">
    <div class="avatar">{{ comment.author.charAt(0).toUpperCase() }}</div>
    <div class="content">
      <div class="header">
        <strong>{{ comment.author }}</strong>
        <span class="date">{{ formattedDate }}</span>
      </div>

      <p class="text">{{ comment.text }}</p>

      <div class="reply-actions">
        <button class="reply-btn" @click="toggleReplyBox">
          {{ showReply ? 'Cancel' : 'Reply' }}
        </button>

        <span 
          v-if="comment.replies && comment.replies.length"
          class="toggle-replies"
          @click="showReplies = !showReplies"
        >
          ↩ ({{ comment.replies.length }})
        </span>
      </div>

      <div v-if="showReply" class="reply-box">
        <textarea v-model="replyText" placeholder="Type your reply..." rows="3"></textarea>
        <button @click="sendReply">Send</button>
      </div>

      <div v-if="comment.replies && comment.replies.length && showReplies" class="replies">
        <p v-for="(r, i) in comment.replies" :key="i">{{ r }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

.comment-card {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--gold-color);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.date {
  color: gray;
  font-size: 0.8rem;
}

.text {
  margin: 0.3rem 0;
}

.reply-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.reply-btn {
  background: none;
  border: 2px solid #212F63;
  border-radius: 6px;
  color: var(--brown-color);
  cursor: pointer;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
}

.toggle-replies {
  cursor: pointer;
  font-weight: bold;
  color: #212F63;
  user-select: none;
}

.reply-box {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reply-box textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.reply-box button {
  align-self: flex-end;
  padding: 0.4rem 1rem;
  background: #573311;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.replies {
  margin-top: 0.5rem;
  padding-left: 1rem;
  color: #555;
}
.replies p{
  margin-bottom: 1rem;
  border: 2px solid #ddd;
}
</style>
