import { useEffect, useState } from 'react';
import Toast from './components/Toast';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Upload from './pages/Upload';
import { useAnalysis } from './hooks/useAnalysis';
import { checkHealth } from './services/api';
import { saveHistoryEntry } from './services/history';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);
  const analysisState = useAnalysis();

  useEffect(() => {
    checkHealth().then(setApiOnline);
  }, []);

  const notify = (message, type = 'info') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  };

  const handleAnalysisComplete = async (result, file) => {
    analysisState.setAnalysis(result, file);
    await saveHistoryEntry(result, file);
    notify('Dataset analysis completed.', 'success');
  };

  const openHistoryReport = (entry) => {
    analysisState.setAnalysis(entry.analysis, null, {
      fileName: entry.fileName,
      uploadedAt: entry.uploadedAt
    });
    setActivePage('dashboard');
    notify('Saved report opened.', 'success');
  };

  const page = {
    dashboard: <Dashboard analysisState={analysisState} onNavigate={setActivePage} />,
    upload: (
      <Upload
        onNavigate={setActivePage}
        onAnalysisComplete={handleAnalysisComplete}
      />
    ),
    reports: (
      <Reports
        analysisState={analysisState}
        onNavigate={setActivePage}
        notify={notify}
        onOpenReport={openHistoryReport}
      />
    )
  }[activePage];

  return (
    <div className={darkMode ? 'theme-dark' : ''}>
      <DashboardLayout
        activePage={activePage}
        onNavigate={setActivePage}
        analysisState={analysisState}
        darkMode={darkMode}
        apiOnline={apiOnline}
        onToggleTheme={() => setDarkMode((value) => !value)}
      >
        {page}
      </DashboardLayout>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
