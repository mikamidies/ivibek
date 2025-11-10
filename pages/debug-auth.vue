<script setup>
import { ref, computed, onMounted } from "vue";

definePageMeta({
  layout: "default",
});

const { user, accessToken, refreshToken, refresh } = useAuth();
const { tokenHistory, getStats, printHistory } = useTokenMonitor();

const stats = ref({});
const isRefreshing = ref(false);

const updateStats = () => {
  stats.value = getStats();
};

onMounted(() => {
  updateStats();

  setInterval(updateStats, 5000);
});

const manualRefresh = async () => {
  isRefreshing.value = true;
  await refresh();
  isRefreshing.value = false;
  updateStats();
};

const tokenPreview = (token) => {
  if (!token) return "Нет токена";
  if (token.length < 20) return token;
  return token.substring(0, 15) + "..." + token.substring(token.length - 10);
};

const formatTime = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("ru-RU");
};
</script>

<template>
  <div class="debug-page">
    <div class="container">
      <h1>🔍 Debug: Система аутентификации</h1>

      <div class="debug-section">
        <h2>👤 Текущий пользователь</h2>
        <div class="info-grid">
          <div class="info-item">
            <strong>ID:</strong> {{ user?.id || "Не загружен" }}
          </div>
          <div class="info-item">
            <strong>Username:</strong> {{ user?.username || "-" }}
          </div>
          <div class="info-item">
            <strong>Email:</strong> {{ user?.info?.email || "-" }}
          </div>
          <div class="info-item">
            <strong>Joined:</strong> {{ formatTime(user?.joinedAt) }}
          </div>
        </div>
      </div>

      <div class="debug-section">
        <h2>🔑 Токены</h2>
        <div class="token-info">
          <div class="token-item">
            <strong>Access Token:</strong>
            <code :class="{ valid: accessToken, invalid: !accessToken }">
              {{ tokenPreview(accessToken) }}
            </code>
            <span class="token-status">
              {{ accessToken ? "✅ Есть" : "❌ Нет" }}
            </span>
          </div>
          <div class="token-item">
            <strong>Refresh Token:</strong>
            <code :class="{ valid: refreshToken, invalid: !refreshToken }">
              {{ tokenPreview(refreshToken) }}
            </code>
            <span class="token-status">
              {{ refreshToken ? "✅ Есть" : "❌ Нет" }}
            </span>
          </div>
        </div>

        <button
          class="refresh-btn"
          @click="manualRefresh"
          :disabled="isRefreshing"
        >
          {{ isRefreshing ? "⏳ Обновление..." : "🔄 Обновить токены вручную" }}
        </button>
      </div>

      <div class="debug-section">
        <h2>📊 Статистика</h2>
        <div class="info-grid">
          <div class="info-item">
            <strong>Всего событий:</strong> {{ stats.totalEvents || 0 }}
          </div>
          <div class="info-item">
            <strong>За последние 15 мин:</strong>
            {{ stats.eventsLast15Min || 0 }}
          </div>
          <div class="info-item">
            <strong>Статус Access Token:</strong>
            {{ stats.hasAccessToken ? "✅ Валидный" : "❌ Нет" }}
          </div>
          <div class="info-item">
            <strong>Статус Refresh Token:</strong>
            {{ stats.hasRefreshToken ? "✅ Есть" : "❌ Нет" }}
          </div>
        </div>

        <div v-if="stats.lastEvent" class="last-event">
          <strong>Последнее событие:</strong>
          <div>{{ stats.lastEvent.event }}</div>
          <div class="time">{{ formatTime(stats.lastEvent.timestamp) }}</div>
        </div>
      </div>

      <div class="debug-section">
        <h2>📝 История событий</h2>
        <button class="print-btn" @click="printHistory">
          🖨️ Вывести в консоль
        </button>

        <div class="history-list">
          <div
            v-for="(event, index) in tokenHistory.slice().reverse()"
            :key="index"
            class="history-item"
          >
            <span class="time">{{ formatTime(event.timestamp) }}</span>
            <span class="event">{{ event.event }}</span>
            <span v-if="event.details" class="details">{{
              event.details
            }}</span>
          </div>

          <div v-if="tokenHistory.length === 0" class="empty">
            Пока событий нет
          </div>
        </div>
      </div>

      <div class="debug-section instructions">
        <h2>📖 Инструкция</h2>
        <ol>
          <li>Откройте Console (F12) чтобы видеть все логи</li>
          <li>
            Смотрите за эмодзи в логах:
            <ul>
              <li>✅ - успешная операция</li>
              <li>❌ - ошибка</li>
              <li>⚠️ - предупреждение</li>
              <li>🔄 - попытка обновления</li>
              <li>🔒 - проблема с токеном</li>
              <li>⏰ - превентивное обновление</li>
            </ul>
          </li>
          <li>
            Если вас разлогинило - проверьте последнее сообщение "🚪 Выполняется
            logout"
          </li>
          <li>Stack trace покажет откуда был вызван logout</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-page {
  padding: 40px 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  margin-bottom: 32px;
  color: #1a1a1a;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.debug-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #4560cc;
}

.info-item strong {
  display: block;
  margin-bottom: 4px;
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
}

.token-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.token-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.token-item strong {
  min-width: 130px;
  font-size: 14px;
}

.token-item code {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: "Courier New", monospace;
  font-size: 12px;
}

code.valid {
  background: #e8f5e9;
  color: #2e7d32;
}

code.invalid {
  background: #ffebee;
  color: #c62828;
}

.token-status {
  font-size: 14px;
  font-weight: 500;
}

.refresh-btn,
.print-btn {
  padding: 12px 24px;
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

.refresh-btn:hover:not(:disabled),
.print-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.print-btn {
  margin-bottom: 16px;
}

.last-event {
  margin-top: 16px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.last-event strong {
  display: block;
  margin-bottom: 8px;
  color: #1976d2;
}

.last-event .time {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.history-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.history-item {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.history-item:last-child {
  border-bottom: none;
}

.history-item .time {
  color: #666;
  font-family: "Courier New", monospace;
}

.history-item .event {
  font-weight: 500;
  color: #333;
}

.history-item .details {
  color: #999;
  font-size: 12px;
}

.empty {
  padding: 40px;
  text-align: center;
  color: #999;
}

.instructions {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
}

.instructions ol {
  margin: 0;
  padding-left: 24px;
}

.instructions li {
  margin-bottom: 12px;
  line-height: 1.6;
}

.instructions ul {
  margin-top: 8px;
  padding-left: 20px;
}

.instructions ul li {
  margin-bottom: 4px;
  font-size: 14px;
}
</style>
