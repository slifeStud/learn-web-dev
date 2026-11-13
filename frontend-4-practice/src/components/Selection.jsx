import { capitalize, fullDateFormat } from "../data/date";

export default function Selection({ date, time, slotsReady, hasFreeTime }) {
  let hint = "Выберите день в календаре.";
  if (date && slotsReady) hint = hasFreeTime ? "Выберите свободное время, чтобы продолжить." : "Выберите другую дату.";
  if (time) hint = "Время выбрано.";

  return (
    <div className="selection" role="status">
      <p className="availability">
        {date ? capitalize(fullDateFormat.format(date)) : "Дата пока не выбрана"}
        {time && " • " + time}
      </p>
      {(!date || slotsReady) && <p className="hint">{hint}</p>}
    </div>
  );
}
