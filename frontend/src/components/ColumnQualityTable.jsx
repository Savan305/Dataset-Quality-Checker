export default function ColumnQualityTable({ columns = [] }) {
  const visibleColumns = columns.slice(0, 10);

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Column scoring</p>
          <h2>Column-level quality</h2>
        </div>
        <span className="metric-chip">{columns.length} columns</span>
      </div>
      <div className="quality-table">
        <div className="quality-row table-head">
          <span>Column</span>
          <span>Score</span>
          <span>Missing</span>
          <span>Unique</span>
          <span>Outliers</span>
        </div>
        {visibleColumns.map((column) => (
          <div className="quality-row" key={column.name}>
            <strong>{column.name}</strong>
            <span className="score-pill">{column.quality_score}</span>
            <span>{column.missing_rate}%</span>
            <span>{column.unique_count}</span>
            <span>{column.outlier_count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
