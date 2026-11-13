export default function BookingSummary() {
  return (
    <aside className="summary panel" aria-labelledby="summary-title">
      <h2 className="eyebrow summary-title" id="summary-title">Твоя запись</h2>
      <dl className="details">
        <div className="detail">
          <dt className="detail-label">Мастер</dt>
          <dd className="detail-value">Павел Левин</dd>
        </div>
        <div className="detail">
          <dt className="detail-label">Услуга</dt>
          <dd className="detail-value">Мужская стрижка</dd>
        </div>
        <div className="detail">
          <dt className="detail-label">Длительность</dt>
          <dd className="detail-value">60 минут</dd>
        </div>
        <div className="detail">
          <dt className="detail-label">Стоимость</dt>
          <dd className="detail-value">2 400 ₽</dd>
        </div>
      </dl>
    </aside>
  );
}
