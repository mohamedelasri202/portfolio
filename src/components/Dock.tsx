import React from 'react';
import type { AppId, WindowState } from '../types/os';
import { APPS } from '../data/portfolioData';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Folder,
  User,
  Terminal,
  FileText,
  Settings,
  Mail,
  HelpCircle,
} from 'lucide-react';

interface DockProps {
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  currentLang?: Language;
  onAppClick: (id: AppId) => void;
}

const getAppIcon = (iconName: string, size = 22) => {
  switch (iconName) {
    case 'Folder': return <Folder size={size} color="#38bdf8" />;
    case 'User': return <User size={size} color="#818cf8" />;
    case 'Terminal': return <Terminal size={size} color="#4ade80" />;
    case 'FileText': return <FileText size={size} color="#f472b6" />;
    case 'Settings': return <Settings size={size} color="#fbbf24" />;
    case 'Mail': return <Mail size={size} color="#34d399" />;
    default: return <HelpCircle size={size} color="#94a3b8" />;
  }
};

export const Dock: React.FC<DockProps> = ({ windows, activeAppId, currentLang = 'fr', onAppClick }) => {
  const tApps = TRANSLATIONS[currentLang].apps;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '60px',
        padding: '0 16px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass-bright)',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-dock)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 9990,
      }}
    >
      {APPS.map((app) => {
        const win = windows[app.id];
        const isOpen = win?.isOpen;
        const isActive = activeAppId === app.id && isOpen && !win?.isMinimized;
        const locApp = tApps[app.id as keyof typeof tApps];

        return (
          <div
            key={app.id}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => onAppClick(app.id)}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: isActive
                  ? 'rgba(56, 189, 248, 0.25)'
                  : isOpen
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.04)',
                border: isActive
                  ? '1px solid var(--accent-blue)'
                  : '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: isActive ? '0 0 15px var(--accent-blue-glow)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
              title={locApp?.shortName || app.shortName}
            >
              {getAppIcon(app.iconName)}
            </button>

            {isOpen && (
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  marginTop: '4px',
                  boxShadow: isActive ? '0 0 8px var(--accent-blue)' : 'none',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
