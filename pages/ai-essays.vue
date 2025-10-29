<script setup>
import PageBanner from "@/components/PageBanner.vue";
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
              <div class="chat__header">
                <img src="/images/chat.png" alt="" />
                <h4 class="chat__title">
                  You can check your essay with our AI here
                </h4>
                <p class="chat__description">Write your essay and wait</p>
              </div>
              <div class="chat__suggests">
                <h4>Prompt Suggestion for you</h4>
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
                <input
                  type="text"
                  class="chat__text-input"
                  placeholder="Type your essay prompt here..."
                />
                <button class="chat__send-btn">Generate</button>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
}
.chat__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  margin-bottom: 24px;
}
.chat__title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  background: linear-gradient(
      89.13deg,
      #37ccff -2.89%,
      #4560cc 54.3%,
      #ff3076 106.94%
    ),
    linear-gradient(89.61deg, #e60076 9.01%, #9810fa 81.21%, #7f22fe 153.42%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.chat__description {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-grey);
}
.chat__suggests {
  margin-bottom: 24px;
}
.suggest__items {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
.suggest__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.suggest__item:hover {
  background: var(--light-blue);
}
.suggest__item .icon {
  font-size: 16px;
  color: var(--blue);
}
.chat__input {
  display: flex;
  gap: 8px;
}
.chat__text-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
}
.chat__send-btn {
  padding: 12px 24px;
  background: var(--blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.3s;
}
.chat__header img {
  width: 64px;
  height: 64px;
}
</style>
