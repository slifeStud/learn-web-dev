import { buildCalendarGrid, capitalize, dateKey, fullDateFormat, monthFormat } from "../data/date";
import { schedule, today } from "../data/schedule";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function Calendar({ year, month, selectedDate, onMonthChange, onDaySelect, children }) {
  const firstDay = new Date(year, month, 1);
  return (
    <>
      <div className="month-heading">
        <h2 className="month" id="month" aria-live="polite">
          {capitalize(monthFormat.format(firstDay))} {year}
        </h2>
        <div className="month-controls">
          <button className="month-arrow" type="button" aria-label="Предыдущий месяц" onClick={() => onMonthChange(-1)}>‹</button>
          <button className="month-arrow" type="button" aria-label="Следующий месяц" onClick={() => onMonthChange(1)}>›</button>
        </div>
      </div>
      <div className="schedule-layout">
        <div className="calendar" role="group" aria-labelledby="month">
          {weekdays.map(day => <span className="weekday" key={day}>{day}</span>)}
          <div className="days">
            {buildCalendarGrid(year, month).map(date => {
              const key = dateKey(date);
              const otherMonth = date.getMonth() !== month;
              const disabled = otherMonth || date < today;
              const selected = date.getTime() === selectedDate?.getTime();
              const classes = ["day"];
              if (otherMonth) classes.push("day-other");
              if (selected) classes.push("day-selected");
              if (!selected && !disabled && schedule[key]) classes.push("day-open");
              return (
                <button key={key} className={classes.join(" ")} type="button" disabled={disabled}
                  aria-label={fullDateFormat.format(date)} aria-pressed={selected}
                  onClick={() => onDaySelect(date)}>
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
