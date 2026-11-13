// 1. Данные. Учебное «сегодня» совпадает с датой в макете.
const today = new Date(2027, 2, 12);
const schedule = {
  "2027-03-12": [
    { time: "12:00", available: true },
    { time: "16:30", available: false },
  ],
  "2027-03-13": [{ time: "12:00", available: false }],
};

const monthFormat = new Intl.DateTimeFormat("ru", { month: "long" });
const dayFormat = new Intl.DateTimeFormat("ru", { day: "numeric", month: "long" });
const weekdayFormat = new Intl.DateTimeFormat("ru", { weekday: "long" });
const fullDateFormat = new Intl.DateTimeFormat("ru", { dateStyle: "full" });

// 2. Состояние календаря и выбора пользователя.
const state = {
  month: new Date(today.getFullYear(), today.getMonth(), 1),
  date: today,
  time: null,
};

// 3. Чистые функции.
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function dateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// Каждая неделя в сетке начинается с понедельника и заканчивается воскресеньем.
function buildCalendarGrid(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((offset + daysInMonth) / 7) * 7;
  return Array.from({ length: cellCount }, (_, i) => new Date(year, month, i + 1 - offset));
}

// 4. Отрисовка и обработчики.
const monthTitle = document.querySelector("#month");
const days = document.querySelector(".days");
const slots = document.querySelector(".slots");
const dateTitle = document.querySelector("#selected-date");
const weekday = document.querySelector(".date-weekday");
const selection = document.querySelector(".availability");
const hint = document.querySelector(".hint");

function renderCalendar() {
  const year = state.month.getFullYear();
  const month = state.month.getMonth();
  monthTitle.textContent = capitalize(monthFormat.format(state.month)) + " " + year;
  const buttons = buildCalendarGrid(year, month).map(date => {
    const button = document.createElement("button");
    const otherMonth = date.getMonth() !== month;
    const selected = state.date !== null && date.getTime() === state.date.getTime();
    button.type = "button";
    button.className = "day";
    button.textContent = date.getDate();
    button.dataset.day = date.getDate();
    button.disabled = otherMonth || date < today;
    button.classList.toggle("day-other", otherMonth);
    button.classList.toggle("day-selected", selected);
    button.classList.toggle("day-open", !selected && !button.disabled && Boolean(schedule[dateKey(date)]));
    button.setAttribute("aria-label", fullDateFormat.format(date));
    button.setAttribute("aria-pressed", String(selected));
    return button;
  });
  days.replaceChildren(...buttons);
}

function renderTimeSlots() {
  slots.replaceChildren();
  dateTitle.textContent = state.date ? dayFormat.format(state.date) : "Выберите дату";
  weekday.textContent = state.date ? capitalize(weekdayFormat.format(state.date)) : "";
  if (!state.date) return;

  const daySlots = schedule[dateKey(state.date)] || [];
  for (const slot of daySlots) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slot";
    button.disabled = !slot.available;
    button.dataset.time = slot.time;
    button.textContent = slot.available ? slot.time : slot.time + " · занято";
    button.setAttribute("aria-pressed", String(slot.time === state.time));
    slots.append(button);
  }
  if (!daySlots.some(slot => slot.available)) {
    const message = document.createElement("p");
    message.className = "empty-slots";
    message.textContent = "В этот день свободного времени нет.";
    slots.append(message);
  }
}

function updateSelection() {
  if (!state.date) {
    selection.textContent = "Дата пока не выбрана";
    hint.textContent = "Выберите день в календаре.";
    return;
  }
  const dateText = capitalize(fullDateFormat.format(state.date));
  selection.textContent = state.time ? dateText + " • " + state.time : dateText;
  const hasFreeTime = schedule[dateKey(state.date)]?.some(slot => slot.available);
  hint.textContent = state.time ? "Время выбрано." :
    hasFreeTime ? "Выберите свободное время, чтобы продолжить." : "Выберите другую дату.";
}

function render() {
  renderCalendar();
  renderTimeSlots();
  updateSelection();
}

function changeMonth(step) {
  state.month = new Date(state.month.getFullYear(), state.month.getMonth() + step, 1);
  state.date = null;
  state.time = null;
  render();
}

// 5. Инициализация. Контейнеры сохраняют обработчики при замене кнопок.
function init() {
  document.querySelector("#previous-month").addEventListener("click", () => changeMonth(-1));
  document.querySelector("#next-month").addEventListener("click", () => changeMonth(1));
  days.addEventListener("click", event => {
    const button = event.target.closest("button:enabled");
    if (!button || button.getAttribute("aria-pressed") === "true") return;
    state.date = new Date(state.month.getFullYear(), state.month.getMonth(), Number(button.dataset.day));
    state.time = null;
    render();
    days.querySelector('[aria-pressed="true"]').focus();
  });
  slots.addEventListener("click", event => {
    const button = event.target.closest("button:enabled");
    if (!button) return;
    state.time = button.dataset.time;
    for (const slot of slots.querySelectorAll("button")) {
      slot.setAttribute("aria-pressed", String(slot === button));
    }
    updateSelection();
  });
  render();
}

document.addEventListener("DOMContentLoaded", init);
