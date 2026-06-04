import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function QualityScoreCard({ score = 0, grade = 'D', loading = false }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  if (loading) {
    return (
      <section className="quality-card skeleton-card">
        <span className="skeleton-circle" />
        <div className="quality-copy">
          <span className="skeleton-line short" />
          <span className="skeleton-line large" />
          <span className="skeleton-line" />
        </div>
      </section>
    );
  }

  return (
    <section className="quality-card">
      <div className="score-ring" aria-label={`Quality score ${score} out of 100`}>
        <svg viewBox="0 0 140 140" role="img">
          <circle cx="70" cy="70" r={radius} className="ring-bg" />
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="ring-progress"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-value">
          <strong>{score}</strong>
          <span>/100</span>
        </div>
      </div>

      <div className="quality-copy">
        <div className="section-label">
          <ShieldCheck size={18} />
          <span>Quality score</span>
        </div>
        <h2>Dataset health is graded <span className={`grade-badge grade-${grade}`}>{grade}</span></h2>
        <p>
          The score blends missing data, duplicate records, type consistency, and outlier concentration into a
          single executive signal.
        </p>
        <div className="quality-status">
          <CheckCircle2 size={18} />
          <span>{score >= 90 ? 'Ready for downstream analytics' : 'Review recommended before production use'}</span>
        </div>
      </div>
    </section>
  );
}
