<script setup>
import PageBanner from "@/components/PageBanner.vue";
import { ref, nextTick, onMounted, computed } from "vue";
import { message } from "ant-design-vue";

const { createChat, sendMessage, getChats, getChatById } = useAiEssays();

const currentChatId = ref("");
const essayText = ref("");
const messages = ref([]);
const isSuggestionHidden = ref(false);
const isLoading = ref(false);
const isSending = ref(false);
const isNewChat = ref(true);

const savedChats = ref([]);
const isLoadingChats = ref(false);

onMounted(async () => {
  await loadSavedChats();
});

const handleInput = (event) => {
  const textarea = event.target;
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

const handleSuggestionClick = (text) => {
  essayText.value = text;
  isSuggestionHidden.value = true;

  nextTick(() => {
    const textarea = document.querySelector(".chat__text-input");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.focus();
    }
  });
};

const handleSend = async () => {
  if (!essayText.value.trim() || isSending.value) return;

  const userMessage = essayText.value.trim();
  isSending.value = true;

  if (isNewChat.value || !currentChatId.value) {
    try {
      console.log("Creating new chat with message:", userMessage);
      const createResult = await createChat(userMessage);
      console.log("Create chat result:", createResult);

      if (!createResult.success || !createResult.uuid) {
        message.error(createResult.error || "Ошибка создания чата");
        isSending.value = false;
        return;
      }

      currentChatId.value = createResult.uuid;
      isNewChat.value = false;
      console.log("Chat created with UUID:", currentChatId.value);
    } catch (error) {
      console.error("Exception creating chat:", error);
      message.error("Произошла ошибка при создании чата");
      isSending.value = false;
      return;
    }
  }

  messages.value.push({
    role: "user",
    content: userMessage,
    timestamp: new Date().toISOString(),
  });

  essayText.value = "";

  nextTick(() => {
    const textarea = document.querySelector(".chat__text-input");
    if (textarea) {
      textarea.style.height = "auto";
    }
  });

  try {
    console.log("Sending message to UUID:", currentChatId.value);
    console.log("Message content:", userMessage);
    const result = await sendMessage(currentChatId.value, userMessage);
    console.log("Send message result:", result);

    if (result.success && result.data) {
      messages.value.push({
        role: "assistant",
        content: result.data.response || result.data.message || "Ответ получен",
        timestamp: new Date().toISOString(),
      });

      if (messages.value.length === 2) {
        await loadSavedChats();
      }

      scrollToBottom();
    } else {
      message.error(result.error || "Ошибка отправки сообщения");
    }
  } catch (error) {
    console.error("Exception sending message:", error);
    message.error("Произошла ошибка при отправке");
  } finally {
    isSending.value = false;
  }
};

const loadSavedChats = async () => {
  isLoadingChats.value = true;
  try {
    const result = await getChats(0, 50);
    if (result.success && result.data) {
      savedChats.value = result.data.content || result.data || [];
    }
  } catch (error) {
    console.error("Ошибка загрузки чатов:", error);
  } finally {
    isLoadingChats.value = false;
  }
};

const loadChat = async (uuid) => {
  isLoading.value = true;
  try {
    const result = await getChatById(uuid);
    console.log("Load chat result:", result); // Добавляем логирование
    if (result.success && result.data) {
      currentChatId.value = uuid;
      // Проверяем структуру данных
      messages.value = result.data.messages || result.data.content || [];
      console.log("Loaded messages:", messages.value); // Логируем загруженные сообщения
      isSuggestionHidden.value = messages.value.length > 0;
      isNewChat.value = false;

      nextTick(() => {
        scrollToBottom();
      });
    } else {
      message.error(result.error || "Ошибка загрузки чата");
    }
  } catch (error) {
    console.error("Exception loading chat:", error);
    message.error("Произошла ошибка при загрузке");
  } finally {
    isLoading.value = false;
  }
};

const createNewChat = () => {
  currentChatId.value = "";
  messages.value = [];
  essayText.value = "";
  isSuggestionHidden.value = false;
  isNewChat.value = true;
};

const scrollToBottom = () => {
  nextTick(() => {
    const messagesContainer = document.querySelector(".chat__messages");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
};

const hasMessages = computed(() => messages.value);

const shouldHideSuggestions = computed(() => {
  return (
    isSuggestionHidden.value ||
    essayText.value.trim().length > 0 ||
    !isNewChat.value
  );
});
</script>

<template>
  <div class="ai-essays-page">
    <PageBanner
      titleProps="AI Essays"
      iconProps="/page-icons/tasks.png"
      style="
        background: linear-gradient(
          to right,
          #9bbdfd,
          #febef2,
          #b8c5fc,
          #ff8af2
        );
      "
    />
    <section class="content-section">
      <div class="container">
        <div class="grid">
          <div class="left">
            <div class="chat-list-header">
              <h4 class="title">Saved Chats</h4>
              <button class="new-chat-btn" @click="createNewChat">
                <Icon name="lucide:plus" />
                New Chat
              </button>
            </div>

            <div class="saved-chats">
              <div v-if="isLoadingChats" class="loading">Loading...</div>
              <div v-else-if="savedChats.length === 0" class="empty-state">
                <p>No saved chats yet</p>
              </div>
              <div
                v-else
                v-for="chat in savedChats"
                :key="chat.uuid"
                class="chat-item"
                :class="{ active: currentChatId === chat.uuid }"
                @click="loadChat(chat.uuid)"
              >
                <div class="chat-item-icon">
                  <Icon name="lucide:message-square" />
                </div>
                <div class="chat-item-content">
                  <h5 class="chat-item-title">
                    {{ chat.title || "Untitled Chat" }}
                  </h5>
                  <p class="chat-item-date">
                    {{ new Date(chat.createdAt).toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="right">
            <div class="chat">
              <img src="/images/chat-bg.png" class="chat__bg" alt="" />
              <div class="chat__scroller">
                <div class="chat__header">
                  <img src="/images/chat.png" alt="" />
                  <h4 class="chat__title">
                    You can check your essay with our <br />
                    AI here
                  </h4>
                  <p class="chat__description">Write your essay and wait</p>
                </div>

                <div v-if="hasMessages" class="chat__messages">
                  <div
                    v-for="(msg, index) in messages.content"
                    :key="index"
                    class="message"
                    :class="{
                      user: msg.messageFrom === 'USER',
                      assistant: msg.messageFrom !== 'USER',
                    }"
                  >
                    <div class="message-avatar">
                      <Icon
                        v-if="msg.messageFrom === 'USER'"
                        name="lucide:user"
                      />
                      <Icon v-else name="lucide:bot" />
                    </div>
                    <div class="message-content">
                      <p>{{ msg.message || msg.content }}</p>
                    </div>
                  </div>
                </div>

                <div class="chat__flexer">
                  <div
                    class="chat__suggests"
                    :class="{ hidden: shouldHideSuggestions }"
                  >
                    <h4>Chat Suggestions for Your Essay</h4>
                    <div class="suggest__items">
                      <div
                        class="suggest__item"
                        @click="handleSuggestionClick('Narrative Essay')"
                      >
                        <Icon name="lucide:pencil" class="icon" />
                        Narrative Essay
                      </div>
                      <div
                        class="suggest__item"
                        @click="handleSuggestionClick('Descriptive Essay')"
                      >
                        <Icon name="lucide:pencil" class="icon" />
                        Descriptive Essay
                      </div>
                      <div
                        class="suggest__item"
                        @click="handleSuggestionClick('Expository Essay')"
                      >
                        <Icon name="lucide:pencil" class="icon" />
                        Expository Essay
                      </div>
                      <div
                        class="suggest__item"
                        @click="handleSuggestionClick('Persuasive Essay')"
                      >
                        <Icon name="lucide:pencil" class="icon" />
                        Persuasive Essay
                      </div>
                      <div
                        class="suggest__item"
                        @click="handleSuggestionClick('Comparative Essay')"
                      >
                        <Icon name="lucide:pencil" class="icon" />
                        Comparative Essay
                      </div>
                    </div>
                  </div>
                  <div
                    class="chat__input"
                    :class="{ extend: shouldHideSuggestions }"
                  >
                    <textarea
                      v-model="essayText"
                      class="chat__text-input"
                      placeholder="Type your essay prompt here..."
                      rows="1"
                      @input="handleInput"
                      @keydown.enter.exact.prevent="handleSend"
                      :disabled="isSending"
                    ></textarea>
                    <button
                      class="chat__send-btn"
                      @click="handleSend"
                      :disabled="isSending || !essayText.trim()"
                    >
                      <Icon
                        v-if="isSending"
                        name="lucide:loader-2"
                        class="spinning"
                      />
                      <span v-else>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ai-essays-page {
  gap: 24px;
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.grid {
  display: grid;
  grid-template-columns: 384px 1fr;
  margin-top: 24px;
  gap: 16px;
}

/* Левая панель с чатами */
.chat-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.chat-list-header .title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(
    89.61deg,
    #e60076 9.01%,
    #9810fa 81.21%,
    #7f22fe 153.42%
  );
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.new-chat-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.saved-chats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 70vh;
}

.saved-chats::-webkit-scrollbar {
  width: 6px;
}

.saved-chats::-webkit-scrollbar-track {
  background: transparent;
}

.saved-chats::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.chat-item:hover {
  background: var(--light-blue);
  border-color: var(--blue);
}

.chat-item.active {
  background: linear-gradient(to right, #9bbdfd22, #febef222);
  border-color: var(--blue);
}

.chat-item-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-blue);
  border-radius: 8px;
  font-size: 20px;
  color: var(--blue);
}

.chat-item-content {
  flex: 1;
  overflow: hidden;
}

.chat-item-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-dark);
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-item-date {
  font-size: 12px;
  color: var(--text-grey);
  margin: 0;
}

.loading,
.empty-state {
  padding: 24px;
  text-align: center;
  color: var(--text-grey);
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border);
}

/* Правая панель с чатом */
.chat {
  padding: 24px;
  border-radius: 16px;
  background: white;
  border: 1px solid var(--border);
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  overflow: hidden;
}
.chat__bg {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  opacity: 0.7;
}
.chat__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}
.chat__title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  background: linear-gradient(to right, #ff3076, #4560cc);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.chat__description {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-grey);
}

/* Сообщения */
.chat__messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
  position: relative;
  z-index: 2;
  background: #ffffffa3;
  backdrop-filter: blur(24px);
  border-radius: 16px;
  border: 3px solid #ffffff66;
}

.chat__messages::-webkit-scrollbar {
  width: 6px;
}

.chat__messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat__messages::-webkit-scrollbar-thumb {
  background: #888888b0;
  border-radius: 4px;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background: linear-gradient(89.61deg, #e60076 9.01%, #9810fa 81.21%);
  color: white;
}

.message.assistant .message-avatar {
  background: var(--light-blue);
  color: var(--blue);
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message.user .message-content {
  background: linear-gradient(89.61deg, #e60076 9.01%, #9810fa 81.21%);
  color: white;
}

.message-content p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Подсказки и ввод */
.chat__suggests {
  padding: 16px;
  border: 3px solid #ffffff66;
  background: #ffffffa3;
  backdrop-filter: blur(24px);
  border-radius: 16px;
  transition: all 0.3s;
}
.chat__suggests.hidden {
  display: none;
}
.chat__suggests h4 {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0%;
  margin-bottom: 20px;
}
.suggest__items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.suggest__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 500px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--text-grey);
  background: white;
}
.suggest__item:hover {
  background: var(--light-blue);
}
.chat__input {
  border: 3px solid #ffffff66;
  background: #ffffffa3;
  backdrop-filter: blur(24px);
  border-radius: 16px;
  position: relative;
  height: auto;
  transition: all 0.3s;
}
.chat__input.extend .chat__text-input {
  min-height: 200px;
}
.chat__text-input {
  padding: 16px 16px 56px 16px;
  width: 100%;
  height: auto;
  min-height: 56px;
  max-height: 300px;
  font-size: 16px;
  line-height: 24px;
  resize: none;
  overflow-y: auto;
}
.chat__text-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.chat__text-input::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}
.chat__text-input::-webkit-scrollbar-track {
  background: transparent;
}
.chat__text-input::-webkit-scrollbar-thumb {
  background: #888888b0;
  border-radius: 4px;
}
.chat__text-input::placeholder {
  color: var(--text-grey);
  opacity: 1;
}
.chat__send-btn {
  padding: 8px 12px;
  color: white;
  background: linear-gradient(
    89.61deg,
    #e60076 9.01%,
    #9810fa 81.21%,
    #7f22fe 153.42%
  );
  border: none;
  border-radius: 400px;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.chat__send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.chat__send-btn:hover:not(:disabled) {
  opacity: 0.9;
}
.chat__header img {
  width: 64px;
  height: 64px;
  object-fit: cover;
}
.chat__flexer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 2;
}
.chat__scroller {
  max-width: 824px;
  min-width: 824px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 2;
  height: 100%;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
