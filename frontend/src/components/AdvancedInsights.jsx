import { Brain, CheckCircle2, ClipboardCheck, ShieldAlert, Wand2 } from 'lucide-react';

export default function AdvancedInsights({ analysis }) {
  return (
    <section className="advanced-grid">
      <div className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">AI explanation</p>
            <h2>Quality narrative</h2>
          </div>
          <Brain size={20} />
        </div>
        <p className="insight-copy">{analysis.aiExplanation.summary || 'Upload a dataset to generate an explanation.'}</p>
        <div className="driver-list">
          {(analysis.aiExplanation.drivers || []).map((driver) => (
            <span key={driver}><CheckCircle2 size={15} /> {driver}</span>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Auto-cleaning</p>
            <h2>Cleaning plan</h2>
          </div>
          <Wand2 size={20} />
        </div>
        <ul className="compact-list">
          {analysis.cleaningPlan.length ? analysis.cleaningPlan.slice(0, 6).map((item, index) => (
            <li key={`${item.column}-${item.issue}-${index}`}>
              <strong>{item.column}</strong>
              <span>{item.action}</span>
            </li>
          )) : <li><strong>Looks clean</strong><span>No automatic cleanup required.</span></li>}
        </ul>
      </div>

      <div className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Validation</p>
            <h2>Format issues</h2>
          </div>
          <ShieldAlert size={20} />
        </div>
        <ul className="compact-list">
          {analysis.validationIssues.length ? analysis.validationIssues.map((issue, index) => (
            <li key={`${issue.column}-${issue.type}-${index}`}>
              <strong>{issue.column}</strong>
              <span>{issue.count} {issue.type.replace('_', ' ')} issues</span>
            </li>
          )) : <li><strong>No format issues</strong><span>Email, phone, and date checks passed where detected.</span></li>}
        </ul>
      </div>

      <div className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Scoring model</p>
            <h2>Penalty breakdown</h2>
          </div>
          <ClipboardCheck size={20} />
        </div>
        <div className="schema-grid">
          <div><span>Missing rate</span><strong>{analysis.penaltyBreakdown.missing_rate ?? 0}%</strong></div>
          <div><span>Duplicate rate</span><strong>{analysis.penaltyBreakdown.duplicate_rate ?? 0}%</strong></div>
          <div><span>Outlier rate</span><strong>{analysis.penaltyBreakdown.outlier_rate ?? 0}%</strong></div>
        </div>
      </div>
    </section>
  );
}
