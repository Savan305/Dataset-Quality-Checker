import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const titles = {
  dashboard: 'Quality Command Center',
  upload: 'Upload Dataset',
  reports: 'Analysis Reports'
};

export default function DashboardLayout({ activePage, onNavigate, analysisState, darkMode, apiOnline, onToggleTheme, children }) {
  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} apiOnline={apiOnline} />
      <main className="main-shell">
        <Navbar
          pageTitle={titles[activePage] || 'Quality Command Center'}
          hasAnalysis={analysisState.hasAnalysis}
          fileName={analysisState.fileName}
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
        />
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
