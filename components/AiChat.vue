<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isChatOpen = ref(false);
const messages = ref([]);
const userMessage = ref("");
const chatId = ref(null);
const isLoading = ref(false);

const openChat = () => {
  isChatOpen.value = true;
};

const handleClickOutside = (event) => {
  const aiElement = event.target.closest(".ai");
  if (!aiElement && isChatOpen.value) {
    isChatOpen.value = false;
  }
};

const sendMessage = async () => {
  if (!userMessage.value.trim() || isLoading.value) return;

  const message = userMessage.value.trim();
  userMessage.value = "";

  messages.value.push({
    type: "user",
    text: message,
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  isLoading.value = true;

  try {
    let response;

    if (!chatId.value) {
      response = await $fetch("/api/v1/student/ai/creating-chat", {
        method: "POST",
        body: {
          message,
        },
      });
      chatId.value = response.id;
      localStorage.setItem("aiChatId", response.id.toString());
    } else {
      response = await $fetch(
        `/api/v1/student/ai/${chatId.value}/sending-message`,
        {
          method: "POST",
          body: {
            message,
          },
        }
      );
    }

    messages.value.push({
      type: "bot",
      text: response.aiResponse,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  } catch (error) {
    console.error("Error sending message:", error);
    messages.value.push({
      type: "bot",
      text: "Sorry, something went wrong. Please try again.",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  } finally {
    isLoading.value = false;
  }
};

const handleKeyPress = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  const savedChatId = localStorage.getItem("aiChatId");
  if (savedChatId) {
    chatId.value = parseInt(savedChatId);
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="ai">
    <div class="ai__chat" :class="{ open: isChatOpen }">
      <div class="ai__chat-header">
        <Icon name="lucide:bot" />
        <div>
          <h4>Ivybek Bot</h4>
          <p>AI Support</p>
        </div>
      </div>
      <div class="ai__chat-body">
        <div v-if="messages.length === 0" class="empty-state">
          <Icon name="lucide:bot" class="empty-icon" />
          <p>Start a conversation with Ivybek Bot</p>
        </div>
        <template v-else>
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="msg.type === 'user' ? 'user__question' : 'bot__answer'"
          >
            <div :class="msg.type">
              <p>{{ msg.text }}</p>
            </div>
            <p class="time">{{ msg.time }}</p>
          </div>
        </template>
        <div v-if="isLoading" class="bot__answer">
          <div class="bot">
            <p class="typing">Typing...</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ai__btn" @click="openChat">
      <input
        type="text"
        class="title"
        placeholder="Write with AI"
        @click.stop="openChat"
        v-model="userMessage"
        @keypress="handleKeyPress"
      />
      <button @click="sendMessage" :disabled="isLoading || !userMessage.trim()">
        <img src="/images/ai.svg" alt="" class="icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.ai {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ffffffe5;
  backdrop-filter: blur(20px);
  border-radius: 28px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  width: 400px;
  border: 2px solid white;
  z-index: 10;
  overflow: hidden;
  padding: 6px;
}
.ai__btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px;
  position: relative;
  box-shadow: 0px 0px 47px -20px #ff6ec4;
  animation: shadowAnimation 10s ease infinite;
  border-radius: 20px;
}
.ai .title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #6a7282;
  margin: 0;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
}
.ai .icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
.ai__btn button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}
.ai__btn button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.ai__btn::after {
  pointer-events: none;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(
    45deg,
    #ff6ec4,
    #7873f5,
    #4ade80,
    #22d3ee,
    #facc15,
    #ff6ec4
  );
  animation: gradientAnimation 10s ease infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  padding: 5px;
}
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes shadowAnimation {
  0%,
  100% {
    box-shadow: 0px 0px 47px -20px #ff6ec4;
  }
  25% {
    box-shadow: 0px 0px 47px -20px #4ade80;
  }
  50% {
    box-shadow: 0px 0px 47px -20px #22d3ee;
  }
  75% {
    box-shadow: 0px 0px 47px -20px #facc15;
  }
}
.ai__chat {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.ai__chat.open {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
  margin-bottom: 8px;
}
.ai__chat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background: var(--blue);
  border-radius: 24px 24px 10px 10px;
}
.ai__chat-header span {
  width: 24px;
  height: 24px;
  color: white;
}
.ai__chat-header h4 {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}
.ai__chat-header p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: white;
}
.ai__chat-body {
  height: 354px;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: #9ca3af;
}
.empty-icon {
  width: 48px;
  height: 48px;
  color: #d1d5db;
}
.typing {
  font-style: italic;
  color: #6b7280;
}
.ai__chat-body .bot {
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 12px 12px 12px 4px;
  font-size: 14px;
  line-height: 20px;
  color: #374151;
  display: inline-flex;
  width: fit-content;
}
.ai__chat-body .user {
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 12px 12px 4px 12px;
  font-size: 14px;
  line-height: 20px;
  color: white;
  background: var(--blue);
  text-align: right;
  display: inline-flex;
  width: fit-content;
}
.time {
  font-size: 12px;
  line-height: 16px;
  color: #9ca3af;
  margin-top: 4px;
}
.bot__answer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user__question {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.ai__chat-input {
  display: flex;
  gap: 8px;
}
.ai__chat-input input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
.ai__chat-input button {
  padding: 8px 16px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
