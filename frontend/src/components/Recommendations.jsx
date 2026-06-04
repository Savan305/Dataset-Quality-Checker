import { Lightbulb, Sparkles } from 'lucide-react';

export default function Recommendations({ items = [], loading = false }) {
  if (loading) {
    return (
      <section className="panel recommendations skeleton-card">
        <span className="skeleton-line short" />
        <span className="skeleton-line" />
        <span className="skeleton-line" />
        <span className="skeleton-line" />
      </section>
    );
  }

  return (
    <section className="panel recommendations">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Next best actions</p>
          <h2>Recommendations</h2>
        </div>
        <Sparkles size={20} />
      </div>

      {items.length ? (
        <ul className="recommendation-list">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>
              <span className="recommendation-icon">
                <Lightbulb size={16} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state compact">
          <strong>No recommendations yet</strong>
          <span>Upload a CSV to generate quality guidance.</span>
        </div>
      )}
    </section>
  );
}
