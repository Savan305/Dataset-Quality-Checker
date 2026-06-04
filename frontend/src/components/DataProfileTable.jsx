export default function DataProfileTable({ profile = {}, statistics = {} }) {
  const rows = Object.entries(profile).length ? Object.entries(profile) : Object.entries(statistics);

  if (!rows.length) return null;

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Data profiling</p>
          <h2>Statistics and cardinality</h2>
        </div>
        <span className="metric-chip">{rows.length} profiled</span>
      </div>
      <div className="quality-table">
        <div className="quality-row profile-row table-head">
          <span>Column</span>
          <span>Missing</span>
          <span>Unique</span>
          <span>Mean</span>
          <span>Median</span>
          <span>Min / Max</span>
        </div>
        {rows.slice(0, 12).map(([name, detail]) => (
          <div className="quality-row profile-row" key={name}>
            <strong>{name}</strong>
            <span>{detail.null_count ?? detail.missing_count ?? '-'}</span>
            <span>{detail.unique_count ?? '-'}</span>
            <span>{detail.mean ?? '-'}</span>
            <span>{detail.median ?? '-'}</span>
            <span>{formatRange(detail)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function formatRange(detail) {
  const min = detail.minimum ?? '-';
  const max = detail.maximum ?? '-';
  return `${min} / ${max}`;
}
