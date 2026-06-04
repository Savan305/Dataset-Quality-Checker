import { AlertTriangle, Columns3, CopyCheck, Database, Table2 } from 'lucide-react';
import Charts from '../components/Charts';
import AdvancedInsights from '../components/AdvancedInsights';
import ColumnQualityTable from '../components/ColumnQualityTable';
import DataProfileTable from '../components/DataProfileTable';
import KPICard from '../components/KPICard';
import QualityScoreCard from '../components/QualityScoreCard';
import Recommendations from '../components/Recommendations';

export default function Dashboard({ analysisState, onNavigate }) {
  const { analysis, hasAnalysis, isAnalyzing, error } = analysisState;

  if (!hasAnalysis && !isAnalyzing) {
    return (
      <section className="empty-state dashboard-empty">
        <div className="empty-visual">
          <Database size={42} />
        </div>
        <h2>No dataset analyzed yet</h2>
        <p>Upload a CSV file to unlock quality scoring, issue summaries, charts, and recommendations.</p>
        <button className="primary-button" type="button" onClick={() => onNavigate('upload')}>
          Start analysis
        </button>
      </section>
    );
  }

  return (
    <div className="dashboard-grid">
      {error ? <div className="error-banner page-error">{error}</div> : null}

      <QualityScoreCard score={analysis.score} grade={analysis.grade} loading={isAnalyzing} />

      <section className="kpi-grid">
        <KPICard
          title="Dataset rows"
          value={analysis.rows.toLocaleString()}
          detail="Records analyzed"
          icon={Table2}
          tone="blue"
          loading={isAnalyzing}
        />
        <KPICard
          title="Dataset columns"
          value={analysis.columns.toLocaleString()}
          detail="Fields detected"
          icon={Columns3}
          tone="indigo"
          loading={isAnalyzing}
        />
        <KPICard
          title="Missing values"
          value={analysis.missingTotal.toLocaleString()}
          detail="Cells requiring attention"
          icon={AlertTriangle}
          tone="amber"
          loading={isAnalyzing}
        />
        <KPICard
          title="Duplicates"
          value={analysis.duplicateCount.toLocaleString()}
          detail="Repeated rows found"
          icon={CopyCheck}
          tone="green"
          loading={isAnalyzing}
        />
      </section>

      <Charts analysis={analysis} loading={isAnalyzing} />

      <AdvancedInsights analysis={analysis} />

      <ColumnQualityTable columns={analysis.columnProfiles} />

      <DataProfileTable profile={analysis.dataProfile} statistics={analysis.statistics} />

      <div className="insights-grid">
        <Recommendations items={analysis.recommendations} loading={isAnalyzing} />
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Schema profile</p>
              <h2>Column intelligence</h2>
            </div>
            <span className="metric-chip">{analysis.columnNames.length || analysis.columns} fields</span>
          </div>
          <div className="schema-grid">
            <div>
              <span>Numeric columns</span>
              <strong>{analysis.datatypes.numeric_count ?? analysis.datatypes.numeric_columns?.length ?? 0}</strong>
            </div>
            <div>
              <span>Categorical columns</span>
              <strong>{analysis.datatypes.categorical_count ?? analysis.datatypes.categorical_columns?.length ?? 0}</strong>
            </div>
            <div>
              <span>Outlier records</span>
              <strong>{analysis.outlierTotal}</strong>
            </div>
          </div>
          <div className="column-list">
            {(analysis.columnNames || []).slice(0, 8).map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
