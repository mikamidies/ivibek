<script setup>
import PageBanner from "@/components/PageBanner.vue";
import { ref, nextTick, onMounted, computed, watch } from "vue";
import { message } from "ant-design-vue";

const { createChat, sendMessage, getChats, getChatById } = useRecLetters();
const route = useRoute();
const router = useRouter();

const currentChatId = ref("");
const essayText = ref("");
const messages = ref([]);
const isSuggestionHidden = ref(false);
const isLoading = ref(false);
const isSending = ref(false);
const isNewChat = ref(true);
const isTyping = ref(false);

const savedChats = ref([]);
const isLoadingChats = ref(false);
const currentPage = ref(0);
const totalPages = ref(0);
const hasMoreChats = ref(true);
const chatsPerPage = 10;

const showPaymentButton = ref(false);
const messageCount = ref(0);

onMounted(async () => {
  await loadSavedChats();

  const chatId = route.query.chat;
  if (chatId) {
    await loadChat(chatId);
  }
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
      const createResult = await createChat(userMessage);

      if (!createResult.success || !createResult.uuid) {
        message.error(createResult.error || "Error creating chat");
        isSending.value = false;
        return;
      }

      currentChatId.value = createResult.uuid;
      isNewChat.value = false;
      messageCount.value = 1;
      showPaymentButton.value = true;

      await router.push({
        query: { chat: currentChatId.value },
      });

      messages.value.push({
        messageFrom: "USER",
        message: userMessage,
        timestamp: new Date().toISOString(),
      });

      essayText.value = "";
      nextTick(() => {
        const textarea = document.querySelector(".chat__text-input");
        if (textarea) {
          textarea.style.height = "auto";
        }
        scrollToBottom();
      });

      isSending.value = false;
      return;
    } catch (error) {
      console.error("Exception creating chat:", error);
      message.error("Error creating chat");
      isSending.value = false;
      return;
    }
  }

  if (showPaymentButton.value) {
    message.warning("Payment is required to continue the conversation");
    isSending.value = false;
    return;
  }

  messages.value.push({
    messageFrom: "USER",
    message: userMessage,
    timestamp: new Date().toISOString(),
  });

  essayText.value = "";

  nextTick(() => {
    const textarea = document.querySelector(".chat__text-input");
    if (textarea) {
      textarea.style.height = "auto";
    }
    scrollToBottom();
  });

  isTyping.value = true;
  scrollToBottom();

  try {
    const result = await sendMessage(currentChatId.value, userMessage);

    isTyping.value = false;

    if (result.success && result.data) {
      messages.value.push({
        messageFrom: "ASSISTANT",
        message:
          result.data.response || result.data.message || "Response received",
        timestamp: new Date().toISOString(),
      });

      messageCount.value++;
      await loadSavedChats();
      scrollToBottom();
    } else {
      message.error(result.error || "Error sending message");
    }
  } catch (error) {
    console.error("Exception sending message:", error);
    message.error("An error occurred while sending");
    isTyping.value = false;
  } finally {
    isSending.value = false;
  }
};

const loadSavedChats = async (append = false) => {
  if (isLoadingChats.value) return;
  if (append && !hasMoreChats.value) return;

  isLoadingChats.value = true;
  try {
    const page = append ? currentPage.value + 1 : 0;
    const result = await getChats(page, chatsPerPage);

    if (result.success && result.data) {
      const newChats = result.data.content || [];

      if (append) {
        savedChats.value = [...savedChats.value, ...newChats];
      } else {
        savedChats.value = newChats;
      }

      currentPage.value = page;
      totalPages.value = result.data.totalPages || 0;

      hasMoreChats.value = page + 1 < totalPages.value;
    }
  } catch (error) {
    console.error("Error loading chats:", error);
  } finally {
    isLoadingChats.value = false;
  }
};

const loadChat = async (uuid) => {
  isLoading.value = true;
  try {
    const result = await getChatById(uuid);
    if (result.success && result.data) {
      currentChatId.value = uuid;
      const loadedMessages =
        result.data.messages?.content ||
        result.data.content?.content ||
        result.data.messages ||
        result.data.content ||
        [];
      messages.value = Array.isArray(loadedMessages)
        ? [...loadedMessages].reverse()
        : [];
      isSuggestionHidden.value = messages.value.length > 0;
      isNewChat.value = false;

      const chatStatus = result.data.status;
      const userMessagesCount = messages.value.filter(
        (m) => m.messageFrom === "USER"
      ).length;

      if (chatStatus === "UNPAID" && userMessagesCount === 1) {
        showPaymentButton.value = true;
        messageCount.value = 1;
      } else {
        showPaymentButton.value = false;
        messageCount.value = userMessagesCount;
      }

      await router.push({ query: { chat: uuid } });

      nextTick(() => {
        scrollToBottom();
      });
    } else {
      message.error(result.error || "Error loading chat");
    }
  } catch (error) {
    console.error("Exception loading chat:", error);
    message.error("An error occurred while loading");
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
  showPaymentButton.value = false;
  messageCount.value = 0;

  router.push({ query: {} });
};

const scrollToBottom = () => {
  nextTick(() => {
    const messagesContainer = document.querySelector(".chat__messages");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
};

const hasMessages = computed(() => messages.value && messages.value.length > 0);

const shouldShowSuggestions = computed(() => {
  if (essayText.value.trim().length > 0) return false;
  if (!isNewChat.value) return false;
  if (hasMessages.value) return false;
  return true;
});

const handleChatsScroll = (event) => {
  if (!hasMoreChats.value || isLoadingChats.value) return;

  const container = event.target;
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight * 0.8) {
    loadSavedChats(true);
  }
};

const getStatusLabel = (status) => {
  const statuses = {
    UNPAID: "Unpaid",
    PAID: "Paid",
  };
  return statuses[status] || status;
};
</script>

<template>
  <div class="ai-essays-page">
    <PageBanner
      titleProps="Recommendation Letter AI"
      iconProps="/page-icons/booking.png"
      style="
        background: linear-gradient(
          to right,
          #2a6f97,
          #014f86,
          #01497c,
          #013a63
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

            <div class="saved-chats" @scroll="handleChatsScroll">
              <div
                v-if="isLoadingChats && savedChats.length === 0"
                class="loading"
              >
                Loading...
              </div>
              <div v-else-if="savedChats.length === 0" class="empty-state">
                <p>No saved chats yet</p>
              </div>
              <template v-else>
                <div
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
                    <div class="chat-item-info">
                      <p class="chat-item-date">
                        {{ new Date(chat.createdAt).toLocaleDateString() }}
                      </p>
                      <p
                        class="chat-item-status"
                        :class="`status--${chat.status?.toLowerCase()}`"
                      >
                        {{ getStatusLabel(chat.status) }}
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="isLoadingChats" class="loading-more">
                  <Icon name="lucide:loader-2" class="spinning" />
                  Loading more...
                </div>

                <div
                  v-else-if="!hasMoreChats && savedChats.length > 0"
                  class="no-more"
                >
                  No more chats
                </div>
              </template>
            </div>
          </div>

          <div class="right">
            <div class="chat">
              <img src="/images/rec-bg.png" class="chat__bg" alt="" />
              <div class="chat__scroller" :class="{ extend: hasMessages }">
                <div class="chat__header" v-if="!hasMessages">
                  <div class="chat__ball">
                    <img src="/images/chat.png" alt="" />
                  </div>
                  <h4 class="chat__title">
                    Get AI assistance for your <br />
                    Recommendation Letter
                  </h4>
                  <p class="chat__description">
                    Describe your letter requirements and get started
                  </p>
                </div>

                <div v-if="hasMessages" class="chat__messages">
                  <div
                    v-for="(msg, index) in messages"
                    :key="msg.id || index"
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

                  <div
                    v-if="isTyping"
                    class="message assistant typing-indicator"
                  >
                    <div class="message-avatar">
                      <Icon name="lucide:bot" />
                    </div>
                    <div class="message-content typing-content">
                      <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="payment-prompt"
                    v-if="showPaymentButton && messageCount === 1"
                  >
                    <div class="payment-card">
                      <div class="payment-blur">
                        <h4>Unlock Answer</h4>
                        <p>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. At, dolore, voluptas ducimus eum laboriosam
                          suscipit vitae vel nobis rem natus dignissimos quia
                          nihil ea iste eos reiciendis consequatur modi enim
                          facilis. Repellendus explicabo veniam, rerum ullam
                          magnam dicta eum cupiditate quasi omnis rem voluptate
                          soluta optio, asperiores facere? Omnis accusantium
                          reprehenderit harum optio numquam eos id alias earum
                          ab
                        </p>
                      </div>

                      <button
                        class="payment-btn"
                        @click="showPaymentButton = false"
                      >
                        Unlock Answer
                      </button>
                    </div>
                  </div>
                </div>

                <div class="chat__flexer">
                  <div v-if="shouldShowSuggestions" class="chat__suggests">
                    <h4>Suggestions for Your Recommendation Letter</h4>
                    <div class="suggest__items">
                      <div
                        class="suggest__item"
                        @click="
                          handleSuggestionClick(
                            'Academic Recommendation Letter'
                          )
                        "
                      >
                        <Icon name="lucide:graduation-cap" class="icon" />
                        Academic Letter
                      </div>
                      <div
                        class="suggest__item"
                        @click="
                          handleSuggestionClick('Professional Recommendation')
                        "
                      >
                        <Icon name="lucide:briefcase" class="icon" />
                        Professional Letter
                      </div>
                      <div
                        class="suggest__item"
                        @click="
                          handleSuggestionClick('Character Reference Letter')
                        "
                      >
                        <Icon name="lucide:user-check" class="icon" />
                        Character Reference
                      </div>
                      <div
                        class="suggest__item"
                        @click="
                          handleSuggestionClick('Graduate School Application')
                        "
                      >
                        <Icon name="lucide:book-open" class="icon" />
                        Graduate School
                      </div>
                      <div
                        class="suggest__item"
                        @click="
                          handleSuggestionClick(
                            'Scholarship Recommendation Letter'
                          )
                        "
                      >
                        <Icon name="lucide:award" class="icon" />
                        Scholarship Letter
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
                      placeholder="Describe your recommendation letter requirements..."
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
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: hidden;
}
.content-section {
  height: calc(100vh - 240px);
  overflow: hidden;
}
.container {
  height: 100%;
  padding-bottom: 24px;
  overflow: hidden;
  border-radius: 16px;
}
.grid {
  display: grid;
  grid-template-columns: 384px 1fr;
  margin-top: 24px;
  gap: 16px;
  height: 100%;
}
.left {
  height: 100%;
}
.left::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}
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
    #2a6f97 9.01%,
    #014f86 81.21%,
    #01497c 153.42%
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
  overflow-y: auto;
  border-radius: 16px;
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
  border-radius: 16px;
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
.chat {
  padding: 24px;
  border-radius: 16px;
  background: white;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.chat__bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  opacity: 1;
  pointer-events: none;
}
.right {
  height: 100%;
}
.chat__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  position: relative;
  z-index: 2;
  margin-bottom: 48px;
}
.chat__title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  background: linear-gradient(
    89.61deg,
    #2a6f97 9.01%,
    #014f86 81.21%,
    #01497c 153.42%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.chat__description {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-grey);
}
.chat__messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;
  padding: 24px 0;
  height: calc(100vh - 440px);
  overflow-y: auto;
  scroll-behavior: smooth;
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
  background: var(--light-blue);
  color: var(--blue);
}
.message.assistant .message-avatar {
  background: var(--light-blue);
  color: var(--blue);
}
.message-content {
  max-width: 70%;
  border: 3px solid #ffffff66;
  background: #ffffffa3;
  backdrop-filter: blur(24px);
  border-radius: 16px;
  position: relative;
  height: auto;
  transition: all 0.3s;
  padding: 16px;
  font-size: 14px;
  line-height: 20px;
  color: #364153;
}
.message-content p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
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
    #2a6f97 9.01%,
    #014f86 81.21%,
    #01497c 153.42%
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
  justify-content: center;
  position: relative;
  z-index: 2;
  height: 100%;
}
.chat__scroller.extend {
  justify-content: space-between;
}
.chat__scroller.extend .chat__input {
  position: absolute;
  bottom: 24px;
  left: 0px;
  width: 100%;
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

.payment-prompt {
  display: flex;
  justify-content: flex-start;
  padding: 16px 0;
}

.payment-card {
  border: 3px solid #ffffff66;
  background: #ffffffa3;
  backdrop-filter: blur(24px);
  border-radius: 16px;
  position: relative;
  height: auto;
  transition: all 0.3s;
  padding: 16px;
  font-size: 14px;
  line-height: 20px;
  color: #364153;
}

.payment-blur {
  filter: blur(8px);
  pointer-events: none;
}

.payment-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.payment-card h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.payment-card p {
  font-size: 14px;
  line-height: 24px;
  opacity: 0.9;
}

.payment-btn {
  padding: 12px 32px;
  background: var(--blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-more,
.no-more {
  padding: 12px;
  text-align: center;
  font-size: 12px;
  color: var(--text-grey);
}

.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.no-more {
  opacity: 0.6;
}

.status--unpaid {
  background: #ffebee;
  color: #d32f2f;
}

.status--paid {
  background: #e8f5e9;
  color: #388e3c;
}

.chat-item-status {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
}

.chat-item-info {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}

.typing-indicator .typing-content {
  padding: 12px 20px;
}

.typing-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: var(--blue);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(1) {
  animation-delay: 0s;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.chat__ball {
  background: #2a6f97;
  border-radius: 50%;
}
.chat__ball img {
  mix-blend-mode: hard-light;
}
</style>
