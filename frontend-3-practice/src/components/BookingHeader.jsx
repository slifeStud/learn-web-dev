export default function BookingHeader() {
  return (
    <header className="booking-header">
      <p className="eyebrow">Шаг 3 из 5</p>
      <h1 className="page-title">Выберите дату и время</h1>
      <ol className="steps" aria-label="Шаги записи">
        <li className="step step-done">Мастер</li>
        <li className="step step-done">Услуга</li>
        <li className="step" aria-current="step">Время</li>
        <li className="step">Контакты</li>
        <li className="step">Проверка</li>
      </ol>
    </header>
  );
}
