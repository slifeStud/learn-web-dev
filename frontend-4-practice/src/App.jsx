import { useEffect, useState } from "react";
import { fetchToday } from "./api";
import BookingCalendar from "./components/BookingCalendar";
import BookingHeader from "./components/BookingHeader";
import BookingSummary from "./components/BookingSummary";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function App() {
  const [today, setToday] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetchToday()
      .then(({ year, month, day }) => {
        if (active) setToday(new Date(year, month, day));
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => { active = false; };
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="booking">
        <button className="back" type="button">←&ensp;Назад</button>
        <BookingHeader />
        <div className="booking-layout">
          {error && <p className="schedule panel" role="alert">Не удалось загрузить календарь. Обновите страницу.</p>}
          {!today && !error && <p className="schedule panel" role="status">Загрузка…</p>}
          {today && <BookingCalendar today={today} />}
          <BookingSummary />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
