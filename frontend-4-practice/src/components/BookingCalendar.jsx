import { useEffect, useState } from "react";
import { fetchSlots } from "../api";
import Calendar from "./Calendar";
import Selection from "./Selection";
import TimeSlots from "./TimeSlots";

export default function BookingCalendar({ today }) {
  const [month, setMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!selectedDate) return;
    let active = true;
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    async function loadSlots() {
      try {
        const { date, slots } = await fetchSlots({ day, month, year });
        if (!active) return;
        if (date.day !== day || date.month !== month || date.year !== year) {
          throw new Error("Дата в ответе не совпала с выбранной");
        }
        setResult({ slots });
      } catch {
        if (active) setResult({ error: "Не удалось загрузить слоты. Выберите другой день или обновите страницу." });
      }
    }
    loadSlots();
    // После смены дня даже запоздавшая ошибка не должна менять новое расписание.
    return () => { active = false; };
  }, [selectedDate]);

  function selectDay(date) {
    if (date?.getTime() === selectedDate?.getTime()) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setResult(null);
  }

  function changeMonth(step) {
    setMonth(current => new Date(current.getFullYear(), current.getMonth() + step, 1));
    selectDay(null);
  }

  const slots = result?.slots ?? [];
  const hasFreeTime = slots.some(slot => slot.available);
  return (
    <section className="schedule panel" aria-labelledby="month">
      <Calendar today={today} year={month.getFullYear()} month={month.getMonth()}
        selectedDate={selectedDate} onMonthChange={changeMonth} onDaySelect={selectDay}>
        <TimeSlots date={selectedDate} loading={Boolean(selectedDate && !result)}
          error={result?.error} slots={slots} hasFreeTime={hasFreeTime}
          selectedTime={selectedTime} onTimeSelect={setSelectedTime} />
      </Calendar>
      <Selection date={selectedDate} time={selectedTime} slotsReady={Boolean(result?.slots)} hasFreeTime={hasFreeTime} />
    </section>
  );
}
