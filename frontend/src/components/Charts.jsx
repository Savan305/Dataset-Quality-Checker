import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const emptyChartData = [{ name: 'No issues', count: 0 }];

export default function Charts({ analysis, loading = false }) {
  const missingData = analysis?.missingEntries?.length ? analysis.missingEntries : emptyChartData;
  const outlierData = analysis?.outlierEntries?.length ? analysis.outlierEntries : emptyChartData;
  const scoreData = [{ name: 'Score', value: analysis?.score || 0, fill: '#4f46e5' }];

  if (loading) {
    return (
      <section className="charts-grid">
        <div className="panel chart-panel skeleton-card"><span className="skeleton-chart" /></div>
        <div className="panel chart-panel skeleton-card"><span className="skeleton-chart" /></div>
      </section>
    );
  }

  return (
    <section className="charts-grid">
      <div className="panel chart-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Completeness</p>
            <h2>Missing values</h2>
          </div>
          <span className="metric-chip">{analysis?.missingTotal || 0} cells</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={missingData} margin={{ top: 20, right: 8, bottom: 8, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip cursor={{ fill: '#eef2ff' }} contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {missingData.map((_, index) => (
                <Cell key={`missing-${index}`} fill={index % 2 ? '#38bdf8' : '#4f46e5'} />
              ))}
              <LabelList dataKey="count" position="top" fill="#475569" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="panel chart-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Distribution</p>
            <h2>Outliers</h2>
          </div>
          <span className="metric-chip">{analysis?.outlierTotal || 0} records</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={outlierData} margin={{ top: 20, right: 8, bottom: 8, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip cursor={{ fill: '#fff7ed' }} contentStyle={tooltipStyle} />
            <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="count" position="top" fill="#475569" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="panel score-chart-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Reliability</p>
            <h2>Quality score trend</h2>
          </div>
          <span className="metric-chip grade-chip">{analysis?.grade || 'N/A'}</span>
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <RadialBarChart innerRadius="72%" outerRadius="100%" data={scoreData} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="value" cornerRadius={12} background={{ fill: '#e0e7ff' }} />
            <Tooltip contentStyle={tooltipStyle} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

const tooltipStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)'
};
