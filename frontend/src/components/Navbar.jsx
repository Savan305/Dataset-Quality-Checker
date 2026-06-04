import { Activity, Bell, Moon, Search, Sun } from 'lucide-react';

export default function Navbar({ pageTitle, hasAnalysis, fileName, darkMode, onToggleTheme }) {
  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Dataset Quality Checker</p>
        <h1>{pageTitle}</h1>
      </div>

      <div className="navbar-actions">
        <label className="search-box">
          <Search size={16} />
          <input aria-label="Search reports" placeholder="Search datasets" />
        </label>
        <div className={`analysis-pill ${hasAnalysis ? 'ready' : ''}`}>
          <Activity size={16} />
          <span>{hasAnalysis ? fileName : 'No active dataset'}</span>
        </div>
        <button className="icon-button" type="button" aria-label="Toggle theme" title="Toggle theme" onClick={onToggleTheme}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-button" type="button" aria-label="Notifications" title="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
