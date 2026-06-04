export default function KPICard({ title, value, detail, icon: Icon, tone = 'neutral', loading = false }) {
  if (loading) {
    return (
      <article className="kpi-card skeleton-card">
        <span className="skeleton-line short" />
        <span className="skeleton-line large" />
        <span className="skeleton-line" />
      </article>
    );
  }

  return (
    <article className={`kpi-card tone-${tone}`}>
      <div className="kpi-icon">{Icon ? <Icon size={20} /> : null}</div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  );
}
