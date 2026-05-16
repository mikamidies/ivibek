# 📅 Календарь бронирования - Документация

## Обзор

Календарь для бронирования занятий с учителями. Показывает недельное расписание с временными слотами от 10:00 до 22:00.

## 📁 Структура файлов

```
components/booking/
  └── WeeklyCalendar.vue      # Основной компонент календаря

utils/
  └── calendar.ts             # Утилиты для работы с датами

composables/
  └── booking.ts              # API методы (пока mock)

pages/
  └── booking.vue             # Страница бронирования
```

## 🎯 Основные возможности

### ✅ Реализовано:

1. **Недельное отображение** - ПН-ВС с правильными переходами между месяцами
2. **Временные слоты** - от 10:00 до 22:00 с шагом 1 час
3. **Навигация**:
   - Стрелки влево/вправо для переключения недель
   - Кнопка "Today" для возврата к текущей неделе
4. **Выбор слотов** - можно выбрать один или несколько часов
5. **Состояния ячеек**:
   - Доступные (синие при наведении)
   - Выбранные (синие)
   - Недоступные (серые, disabled)
   - Прошедшие (автоматически disabled)
6. **Интеграция** - связь с модалкой оплаты, передача выбранных слотов

### 🔧 Ключевые особенности реализации:

#### Переходы между месяцами

Календарь корректно обрабатывает ситуации когда неделя начинается в одном месяце, а заканчивается в другом:

```
30 октября (ПН)
31 октября (ВТ)
1 ноября (СР)
2 ноября (ЧТ)
3 ноября (ПТ)
4 ноября (СБ)
5 ноября (ВС)
```

#### Форматы данных

**Слот времени:**

```typescript
"2024-11-13_10:00"; // формат для внутреннего использования
```

**API доступные слоты (mock):**

```typescript
[
  "2024-11-13T10:00",
  "2024-11-13T11:00",
  // ...
];
```

## 🔌 Использование компонента

```vue
<WeeklyCalendar
  :mentor-id="selectedMentor?.id"
  :available-slots="availableSlots"
  @confirm="handleSlotsConfirm"
/>
```

### Props:

- `mentorId` (number, optional) - ID выбранного учителя
- `availableSlots` (string[], optional) - Массив доступных слотов от API

### Events:

- `confirm` - Событие при подтверждении выбора, передает массив выбранных слотов

## 🚀 TODO - Когда API будет готов:

### 1. В `composables/booking.ts`:

Заменить mock функцию на реальный API:

```typescript
const fetchAvailableSlots = async (mentorId: number) => {
  const token = useCookie("access_token");
  const url = `${apiBase}/api/v1/student/bookings/available-slots?mentorId=${mentorId}`;

  const data = await $fetch<string[]>(url, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  return data;
};
```

### 2. В `pages/booking.vue`:

Подключить реальные данные:

```typescript
import { useBooking } from "@/composables/booking";

const { fetchAvailableSlots } = useBooking();
const availableSlots = ref([]);

// При выборе учителя
const selectMentor = async (mentor) => {
  selectedMentor.value = mentor;
  availableSlots.value = await fetchAvailableSlots(mentor.id);
  bookModalVisible.value = true;
};
```

### 3. Реализовать бронирование:

```typescript
const handlePaymentOk = async () => {
  const { createBooking } = useBooking();

  const result = await createBooking({
    mentorId: selectedMentor.value.id,
    slots: selectedSlots.value,
    description: description.value,
  });

  if (result) {
    // Успешно забронировано
    paymentModalVisible.value = false;
  }
};
```

## 📋 Возможные форматы API ответов:

### Вариант 1: ISO строки

```json
["2024-11-13T10:00:00", "2024-11-13T11:00:00"]
```

### Вариант 2: Объекты

```json
[
  { "date": "2024-11-13", "time": "10:00" },
  { "date": "2024-11-13", "time": "11:00" }
]
```

**Примечание:** Если API вернет другой формат, нужно будет добавить преобразование в функцию `fetchAvailableSlots`.

## 🎨 Стилизация

Календарь использует CSS переменные из проекта:

- `--blue` - основной цвет для активных элементов
- `--light-blue` - фон для выделенных элементов
- `--border` - цвет границ
- `--dark` - основной текст
- `--light-grey` - вторичный текст

## 📱 Адаптивность

Календарь адаптивен и на мобильных устройствах переключается в режим горизонтальной прокрутки.

## 🐛 Известные ограничения

1. Временные слоты фиксированы: 10:00-22:00 с шагом 1 час
2. Mock данные для тестирования (ждем API)
3. Цены захардкожены в модалке оплаты

## 💡 Примечания для разработчика

- Все даты хранятся в формате ISO: `YYYY-MM-DD`
- Неделя начинается с понедельника (0) и заканчивается воскресеньем (6)
- Прошедшие слоты автоматически помечаются как недоступные
- При смене недели выбранные слоты сбрасываются
