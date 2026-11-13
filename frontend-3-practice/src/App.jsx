import { useState } from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import BookingHeader from "./components/BookingHeader";
import BookingSummary from "./components/BookingSummary";
import Calendar from "./components/Calendar";
import TimeSlots from "./components/TimeSlots";
import Selection from "./components/Selection";
import { today, schedule } from "./data/schedule";
import { dateKey } from "./data/date";

export default function App() {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState(schedule[dateKey(today)]);
  const hasFreeTime = slots.some(slot => slot.available);

  function selectDay(date) {
    if (date?.getTime() === selectedDate?.getTime()) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setSlots(date ? schedule[dateKey(date)] ?? [] : []);
  }

  function changeMonth(step) {
    const next = new Date(year, month + step, 1);
    setMonth(next.getMonth());
    setYear(next.getFullYear());
    selectDay(null);
  }

  return (
    <>
      <SiteHeader />
      <main className="booking">
        <button className="back" type="button">←&ensp;Назад</button>
        <BookingHeader />
        <div className="booking-layout">
          <section className="schedule panel" aria-labelledby="month">
            <Calendar year={year} month={month} selectedDate={selectedDate}
              onMonthChange={changeMonth} onDaySelect={selectDay}>
              <TimeSlots date={selectedDate} slots={slots} hasFreeTime={hasFreeTime}
                selectedTime={selectedTime} onTimeSelect={setSelectedTime} />
            </Calendar>
            <Selection date={selectedDate} time={selectedTime} hasFreeTime={hasFreeTime} />
          </section>
          <BookingSummary />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
