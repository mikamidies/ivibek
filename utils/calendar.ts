/**
 * Утилиты для работы с календарем бронирования
 * Все функции работают с недельным представлением (ПН-ВС)
 */

export interface DayInfo {
  date: Date;
  dateString: string; // 'YYYY-MM-DD'
  dayNumber: number; // 1-31
  dayOfWeek: number; // 0-6 (0 = Понедельник)
  monthName: string;
  isToday: boolean;
  isCurrentMonth: boolean; // для визуального отличия дней из других месяцев
}

export interface TimeSlot {
  time: string; // '10:00'
  hour: number; // 10
}

/**
 * Получить начало недели (понедельник) для указанной даты
 */
export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Если воскресенье (0), то -6, иначе 1-day
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Получить конец недели (воскресенье) для указанной даты
 */
export const getWeekEnd = (date: Date): Date => {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

/**
 * Генерация массива из 7 дней для текущей недели
 * Ключевая функция: правильно обрабатывает переходы между месяцами
 */
export const generateWeekDays = (currentDate: Date): DayInfo[] => {
  const weekStart = getWeekStart(currentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentMonth = currentDate.getMonth();

  const days: DayInfo[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);

    const dayInfo: DayInfo = {
      date: date,
      dateString: formatDateToString(date),
      dayNumber: date.getDate(),
      dayOfWeek: i, // 0 = ПН, 6 = ВС
      monthName: getMonthName(date.getMonth()),
      isToday: date.getTime() === today.getTime(),
      isCurrentMonth: date.getMonth() === currentMonth,
    };

    days.push(dayInfo);
  }

  return days;
};

/**
 * Генерация временных слотов (10:00 - 22:00)
 */
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  for (let hour = 10; hour <= 22; hour++) {
    slots.push({
      time: `${hour}:00`,
      hour: hour,
    });
  }

  return slots;
};

/**
 * Переключение на предыдущую неделю
 */
export const getPreviousWeek = (currentDate: Date): Date => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() - 7);
  return newDate;
};

/**
 * Переключение на следующую неделю
 */
export const getNextWeek = (currentDate: Date): Date => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + 7);
  return newDate;
};

/**
 * Получить сегодняшнюю дату
 */
export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * Форматирование даты в строку YYYY-MM-DD
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Получить название месяца на русском
 */
export const getMonthName = (monthIndex: number): string => {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return months[monthIndex];
};

/**
 * Получить название дня недели на английском (короткое)
 */
export const getDayName = (dayOfWeek: number): string => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[dayOfWeek];
};

/**
 * Форматировать диапазон недели для отображения
 * Например: "Sep 8 - 14" или "Oct 30 - Nov 5" (при переходе между месяцами)
 */
export const formatWeekRange = (currentDate: Date): string => {
  const weekStart = getWeekStart(currentDate);
  const weekEnd = getWeekEnd(currentDate);

  const startMonth = getMonthNameShort(weekStart.getMonth());
  const endMonth = getMonthNameShort(weekEnd.getMonth());
  const startDay = weekStart.getDate();
  const endDay = weekEnd.getDate();

  if (weekStart.getMonth() === weekEnd.getMonth()) {
    // Одинаковый месяц: "Sep 8 - 14"
    return `${startMonth} ${startDay} - ${endDay}`;
  } else {
    // Разные месяцы: "Oct 30 - Nov 5"
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }
};

/**
 * Получить короткое название месяца на английском
 */
export const getMonthNameShort = (monthIndex: number): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthIndex];
};

/**
 * Проверка, прошла ли дата/время
 */
export const isPastDateTime = (
  dateString: string,
  timeString: string
): boolean => {
  const now = new Date();
  const [year, month, day] = dateString.split("-").map(Number);
  const [hour] = timeString.split(":").map(Number);

  const slotDate = new Date(year, month - 1, day, hour, 0, 0);

  return slotDate < now;
};

/**
 * Создание уникального ключа для слота (для v-for и отслеживания)
 */
export const getSlotKey = (dateString: string, timeString: string): string => {
  return `${dateString}_${timeString}`;
};
