<script setup>
import PageBanner from "@/components/PageBanner.vue";

const essayText = ref("");

const handleInput = (event) => {
  const textarea = event.target;
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};
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
            <div class="paid">
              <h4 class="title">Paid Essays</h4>
              <div class="items">
                <div class="item">
                  <h5 class="item-title">
                    1. How AI is Transforming Education
                  </h5>
                </div>
                <div class="item">
                  <h5 class="item-title">2. AI and Its Impact on Society</h5>
                </div>
                <div class="item">
                  <h5 class="item-title">
                    3. ChatGPT: Revolutionizing Computer Interaction
                  </h5>
                </div>
                <div class="item">
                  <h5 class="item-title">
                    4. Coding with AI: A New Era of Programming
                  </h5>
                </div>
              </div>
            </div>
            <div class="unpaid">
              <h4 class="title">Unpaid Essays</h4>
              <div class="items">
                <div class="item">
                  <h5 class="item-title">
                    1. The Role of AI in Modern Healthcare
                  </h5>
                </div>
                <div class="item">
                  <h5 class="item-title">
                    2. Education in the Age of Artificial Intelligence
                  </h5>
                </div>
                <div class="item">
                  <h5 class="item-title">3. Stay human in the age of AI</h5>
                </div>
                <div class="item">
                  <h5 class="item-title">
                    4. Sam Altman: The Visionary Behind OpenAI
                  </h5>
                </div>
              </div>
              <div class="right"></div>
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
                <div class="chat__flexer">
                  <div class="chat__suggests">
                    <h4>Chat Suggestions for Your Essay</h4>
                    <div class="suggest__items">
                      <div class="suggest__item">
                        <Icon name="lucide:pencil" class="icon" />
                        Narrative Essay
                      </div>
                      <div class="suggest__item">
                        <Icon name="lucide:pencil" class="icon" />
                        Descriptive Essay
                      </div>
                      <div class="suggest__item">
                        <Icon name="lucide:pencil" class="icon" />
                        Expository Essay
                      </div>
                      <div class="suggest__item">
                        <Icon name="lucide:pencil" class="icon" />
                        Persuasive Essay
                      </div>
                      <div class="suggest__item">
                        <Icon name="lucide:pencil" class="icon" />
                        Comparative Essay
                      </div>
                    </div>
                  </div>
                  <div class="chat__input">
                    <textarea
                      v-model="essayText"
                      class="chat__text-input"
                      placeholder="Type your essay prompt here..."
                      rows="1"
                      @input="handleInput"
                    ></textarea>
                    <button class="chat__send-btn">Generate</button>
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
.paid {
  margin-bottom: 16px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(to bottom, #9bbdfd, white);
  border: 1px solid var(--border);
}
.paid h4 {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: 500;
  color: var(--blue);
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
}
.paid .items,
.unpaid .items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.paid .item,
.unpaid .item {
  font-size: 15px;
  line-height: 20px;
}
.unpaid {
  margin-bottom: 16px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(to bottom, #febef2, white);
  border: 1px solid var(--border);
}
.unpaid h4 {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: 500;
  color: var(--pink);
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
}
.chat {
  padding: 24px;
  border-radius: 16px;
  background: white;
  border: 1px solid var(--border);
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.chat__description {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-grey);
}
.chat__suggests {
  padding: 16px;
  border: 3px solid #ffffff66;
  background: #ffffffa3;
  backdrop-filter: blur(24px);
  border-radius: 16px;
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  position: relative;
  z-index: 2;
  height: 100%;
}
</style>
