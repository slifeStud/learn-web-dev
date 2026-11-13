import { capitalize, dayFormat, weekdayFormat } from "../data/date";

export default function TimeSlots({ date, slots, selectedTime, hasFreeTime, onTimeSelect }) {
  return (
    <section className="times" aria-labelledby="selected-date">
      <h3 className="date-title" id="selected-date">{date ? dayFormat.format(date) : "Выберите дату"}</h3>
      <p className="date-weekday">{date && capitalize(weekdayFormat.format(date))}</p>
      <div className="slots">
        {slots.map(slot => (
          <button key={slot.time} className="slot" type="button" disabled={!slot.available}
            aria-pressed={slot.time === selectedTime} onClick={() => onTimeSelect(slot.time)}>
            {slot.time}{!slot.available && " · занято"}
          </button>
        ))}
        {date && !hasFreeTime && <p className="empty-slots">В этот день свободного времени нет.</p>}
      </div>
    </section>
  );
}
