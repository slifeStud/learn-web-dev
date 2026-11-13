export const monthFormat = new Intl.DateTimeFormat("ru", { month: "long" });
export const dayFormat = new Intl.DateTimeFormat("ru", { day: "numeric", month: "long" });
export const weekdayFormat = new Intl.DateTimeFormat("ru", { weekday: "long" });
export const fullDateFormat = new Intl.DateTimeFormat("ru", { dateStyle: "full" });

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function dateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// Каждая неделя в сетке начинается с понедельника и заканчивается воскресеньем.
export function buildCalendarGrid(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((offset + daysInMonth) / 7) * 7;
  return Array.from({ length: cellCount }, (_, i) => new Date(year, month, i + 1 - offset));
}
