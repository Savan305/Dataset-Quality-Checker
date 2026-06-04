import { useEffect, useState } from 'react';
import { CalendarDays, Download, FileText, Wand2 } from 'lucide-react';
import {
  cleanDataset,
  cleanHistoryDataset,
  clearServerHistory,
  downloadBlob,
  generateHistoryReport,
  generateReport,
  getServerHistory,
  getServerHistoryReport
} from '../services/api';
import { clearHistory, fileFromHistory, getHistory } from '../services/history';

export default function Reports({ analysisState, onNavigate, notify, onOpenReport }) {
  const { hasAnalysis, analysis, fileName, uploadedAt, file } = analysisState;
  const [serverHistory, setServerHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const localHistory = getHistory();
  const history = serverHistory.length ? serverHistory : localHistory;

  useEffect(() => {
    let mounted = true;
    getServerHistory()
      .then((items) => {
        if (mounted) setServerHistory(Array.isArray(items) ? items : []);
      })
      .catch(() => {
        if (mounted) setServerHistory([]);
      })
      .finally(() => {
        if (mounted) setLoadingHistory(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const downloadPdf = async (targetFile = file) => {
    try {
      downloadBlob(await generateReport(targetFile));
      notify('PDF report downloaded.', 'success');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const downloadCleaned = async (targetFile = file) => {
    try {
      downloadBlob(await cleanDataset(targetFile));
      notify('Cleaned CSV downloaded.', 'success');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  if (!hasAnalysis && !history.length && !loadingHistory) {
    return (
      <section className="empty-state reports-empty">
        <FileText size={42} />
        <h2>No reports available</h2>
        <p>Reports are generated after a CSV dataset has been analyzed.</p>
        <button className="primary-button" type="button" onClick={() => onNavigate('upload')}>
          Upload CSV
        </button>
      </section>
    );
  }

  return (
    <div className="reports-page">
      {hasAnalysis ? (
        <>
          <section className="panel report-card">
            <div className="report-icon">
              <FileText size={26} />
            </div>
            <div className="report-body">
              <p className="eyebrow">Latest report</p>
              <h2>{fileName}</h2>
              <div className="report-meta">
                <span><CalendarDays size={16} /> {formatDate(uploadedAt)}</span>
                <span>Grade {analysis.grade}</span>
                <span>{analysis.score}/100 score</span>
              </div>
            </div>
            <div className="report-actions">
              <button className="secondary-button" type="button" onClick={() => downloadPdf()}>
                <Download size={17} />
                PDF
              </button>
              <button className="primary-button inline-button" type="button" onClick={() => downloadCleaned()}>
                <Wand2 size={17} />
                Clean CSV
              </button>
            </div>
          </section>

          <section className="panel report-summary">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Executive summary</p>
                <h2>Quality findings</h2>
              </div>
            </div>
            <div className="summary-table">
              <div><span>Rows</span><strong>{analysis.rows.toLocaleString()}</strong></div>
              <div><span>Columns</span><strong>{analysis.columns.toLocaleString()}</strong></div>
              <div><span>Missing values</span><strong>{analysis.missingTotal.toLocaleString()}</strong></div>
              <div><span>Duplicates</span><strong>{analysis.duplicateCount.toLocaleString()}</strong></div>
              <div><span>Outliers</span><strong>{analysis.outlierTotal.toLocaleString()}</strong></div>
            </div>
          </section>
        </>
      ) : (
        <section className="panel report-card">
          <div className="report-icon">
            <FileText size={26} />
          </div>
          <div className="report-body">
            <p className="eyebrow">Saved reports</p>
            <h2>Open a previous analysis</h2>
            <p className="insight-copy">Select a history item to restore its full dashboard report.</p>
          </div>
        </section>
      )}

      <section className="panel report-summary">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Dataset history</p>
            <h2>Recent uploads</h2>
          </div>
          {history.length ? (
            <button
              className="secondary-button compact-button"
              type="button"
              onClick={async () => {
                try {
                  await clearServerHistory();
                  clearHistory();
                  setServerHistory([]);
                  notify('Report history cleared.', 'success');
                } catch (error) {
                  notify(error.message, 'error');
                }
              }}
            >
              Clear
            </button>
          ) : null}
        </div>
        <HistoryList
          history={history}
          loading={loadingHistory}
          notify={notify}
          onOpenReport={onOpenReport}
          onDownloadPdf={downloadPdf}
          onDownloadCleaned={downloadCleaned}
          refreshHistory={(items) => setServerHistory(items)}
        />
      </section>
    </div>
  );
}

function HistoryList({ history, loading, notify, onOpenReport, onDownloadPdf, onDownloadCleaned }) {
  const openReport = async (item) => {
    try {
      if (item.analysis) {
        onOpenReport(item);
        return;
      }
      const entry = await getServerHistoryReport(item.id);
      onOpenReport(entry);
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const downloadPdf = async (item) => {
    try {
      if (item.analysis && item.csvText) {
        await onDownloadPdf(fileFromHistory(item));
        return;
      }
      downloadBlob(await generateHistoryReport(item.id, item.fileName));
      notify('PDF report downloaded.', 'success');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const downloadCleaned = async (item) => {
    try {
      if (item.analysis && item.csvText) {
        await onDownloadCleaned(fileFromHistory(item));
        return;
      }
      downloadBlob(await cleanHistoryDataset(item.id, item.fileName));
      notify('Cleaned CSV downloaded.', 'success');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  if (loading) {
    return <p className="insight-copy">Loading saved backend reports...</p>;
  }

  if (!history.length) {
    return <p className="insight-copy">No saved history yet.</p>;
  }

  return (
    <div className="history-list">
      {history.slice(0, 8).map((item) => (
        <div className="history-card" key={item.id || `${item.fileName}-${item.uploadedAt}`}>
          <div>
            <strong>{item.fileName}</strong>
            <span>{formatDate(item.uploadedAt)}</span>
          </div>
          <div className="report-meta">
            <span>{item.score}/100</span>
            <span>Grade {item.grade}</span>
          </div>
          <div className="report-actions">
            <button className="secondary-button compact-button" type="button" onClick={() => openReport(item)}>
              View
            </button>
            <button
              className="secondary-button compact-button"
              type="button"
              onClick={() => downloadPdf(item)}
            >
              PDF
            </button>
            <button
              className="primary-button inline-button compact-button"
              type="button"
              onClick={() => downloadCleaned(item)}
            >
              Clean CSV
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(value) {
  if (!value) return 'Just now';
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}
