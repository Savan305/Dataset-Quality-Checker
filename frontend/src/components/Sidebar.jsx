import { BarChart3, FileText, LayoutDashboard, UploadCloud } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload', icon: UploadCloud },
  { id: 'reports', label: 'Reports', icon: FileText }
];

export default function Sidebar({ activePage, onNavigate, apiOnline }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <BarChart3 size={22} />
        </div>
        <div>
          <span className="brand-name">DatasetQC</span>
          <span className="brand-subtitle">Quality Intelligence</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${active ? 'active' : ''}`}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <span className={`status-dot ${apiOnline ? '' : 'offline'}`} />
        <div>
          <strong>{apiOnline ? 'API connected' : 'API offline'}</strong>
          <small>127.0.0.1:8000</small>
        </div>
      </div>
    </aside>
  );
}
